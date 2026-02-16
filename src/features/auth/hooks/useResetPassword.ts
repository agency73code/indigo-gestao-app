import { useCallback, useState } from 'react';
import { z } from 'zod';

import { authService } from '../authService';

const passwordSchema = z.object({
  password: z.string().min(8, 'Mínimo 8 caracteres'),
  confirmPassword: z.string().min(1, 'Confirme a senha'),
});

type FieldErrors = {
  password?: string;
  confirmPassword?: string;
};

/**
 * useResetPassword — hook para redefinir senha.
 * Valida com Zod (min 8 chars + match), chama authService.resetPassword, controla loading/erro.
 */
export function useResetPassword(token: string) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  const toggleConfirmVisibility = useCallback(() => {
    setIsConfirmVisible((prev) => !prev);
  }, []);

  const validate = useCallback((): boolean => {
    const result = passwordSchema.safeParse({ password, confirmPassword });

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

    if (password !== confirmPassword) {
      setFieldErrors({ confirmPassword: 'Senhas não coincidem' });
      return false;
    }

    setFieldErrors({});
    return true;
  }, [password, confirmPassword]);

  const resetPassword = useCallback(async (): Promise<boolean> => {
    setError(null);

    if (!validate()) return false;

    setLoading(true);
    try {
      await authService.resetPassword(token, password);
      return true;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro ao redefinir senha';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [token, password, validate]);

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    fieldErrors,
    isPasswordVisible,
    isConfirmVisible,
    togglePasswordVisibility,
    toggleConfirmVisibility,
    resetPassword,
  } as const;
}
