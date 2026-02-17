import { useCallback, useState } from 'react';
import { z } from 'zod';

import { authService } from '../authService';

const forgotPasswordSchema = z.object({
  email: z.string().email('E-mail inválido'),
});

type FieldErrors = {
  email?: string;
};

/**
 * useForgotPassword — hook para solicitar recuperação de senha.
 * Valida com Zod, chama authService.forgotPassword, controla loading/erro.
 */
export function useForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const validate = useCallback((): boolean => {
    const result = forgotPasswordSchema.safeParse({ email: email.trim() });

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
  }, [email]);

  const sendInstructions = useCallback(async (): Promise<boolean> => {
    setError(null);

    if (!validate()) return false;

    setLoading(true);
    try {
      await authService.forgotPassword(email.trim());
      return true;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro ao enviar instruções';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [email, validate]);

  return {
    email,
    setEmail,
    loading,
    error,
    fieldErrors,
    sendInstructions,
  } as const;
}
