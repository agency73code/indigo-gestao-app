import { Redirect, Stack } from 'expo-router';

import { useAuthStore } from '@/src/features/auth/store';

/**
 * Auth group layout — redirects to tabs when authenticated.
 * Headerless Stack for login, forgot-password, email-sent, reset-password, success.
 */
export default function AuthLayout() {
  const status = useAuthStore((s) => s.status);

  if (status === 'authenticated') {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="email-sent" />
      <Stack.Screen name="reset-password" />
      <Stack.Screen name="success" />
    </Stack>
  );
}
