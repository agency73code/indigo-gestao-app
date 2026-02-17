import { useCallback, useState } from 'react';
import { z } from 'zod';

import { authService } from '../authService';
import { HttpError } from '../httpClient';

const loginSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(1, 'Senha obrigatória'),
});

type FieldErrors = {
  email?: string;
  password?: string;
};

type ErrorResponse = {
  message?: string;
};

function getLoginErrorMessage(error: unknown): string {
  if (error instanceof HttpError) {
    const data = error.data as ErrorResponse | null;

    if (data?.message) {
      return data.message;
    }

    if (error.status === 401) {
      return 'Credenciais inválidas. Confira seu e-mail e senha.';
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Não foi possível entrar agora. Tente novamente.'
}

/**
 * useLogin — hook de autenticação (login).
 * Valida com Zod, chama authService.login, controla loading/erro.
 */
export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  const validate = useCallback((): boolean => {
    const result = loginSchema.safeParse({ email: email.trim(), password });

    if (!result.success) {
      const errors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = String(issue.path[0]) as keyof FieldErrors;
        if (!errors[field]) {
          errors[field] = issue.message;
        }
      }
      setFieldErrors(errors);
      return false;
    }

    setFieldErrors({});
    return true;
  }, [email, password]);

  const login = useCallback(async (): Promise<boolean> => {
    setError(null);

    if (!validate()) return false;

    setLoading(true);
    try {
      await authService.login({
        accessInfo: email.trim(),
        password,
      });
      return true;
    } catch (err) {
      setError(getLoginErrorMessage(err));
      return false;
    } finally {
      setLoading(false);
    }
  }, [email, password, validate]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    fieldErrors,
    isPasswordVisible,
    togglePasswordVisibility,
    login,
  } as const;
}
