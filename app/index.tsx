import { Redirect } from 'expo-router';

import { useAuthStore } from '@/src/features/auth/store';

/**
 * Root index — redireciona para auth ou tabs baseado no status.
 * Este arquivo intercepta a rota "/" antes do Expo Router
 * resolver para (tabs)/index.tsx (Welcome).
 */
export default function RootIndex() {
  const status = useAuthStore((s) => s.status);

  if (status === 'authenticated') {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/login" />;
}
