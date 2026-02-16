import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Redirect, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Spinner, TamaguiProvider, YStack } from 'tamagui';

import { Sora_300Light, Sora_400Regular } from '@expo-google-fonts/sora';

import { initDb } from '@/src/data/db/initDb';
import { useAuthStore } from '@/src/features/auth/store';
import { useAuthBootstrap } from '@/src/features/auth/useAuthBootstrap';
import { tamaguiConfig } from '@/src/styles/tamagui.config';
import { SplashAnimated } from '@/src/ui/SplashAnimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useAuthBootstrap();

  const authStatus = useAuthStore((s) => s.status);
  const [showSplash, setShowSplash] = useState(true);

  const [fontsLoaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterLight: require('@tamagui/font-inter/otf/Inter-Light.otf'),
    InterSemiBold: require('@tamagui/font-inter/otf/Inter-SemiBold.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    Sora_300Light,
    Sora_400Regular,
  });

  useEffect(() => {
    (async () => {
      try {
        await initDb();
      } catch (error) {
        console.error('Error initializing DB:', error);
      }
    })();
  }, []);

  useEffect(() => {
    if (fontsLoaded && authStatus !== 'loading') {
      // Hide the native splash — our custom animation takes over
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, authStatus]);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  // TODO: habilitar dark mode quando o Figma estiver pronto.
  // Por enquanto forçamos light para manter fidelidade visual.
  const appTheme = 'light' as const;

  // Show loading while fonts or auth bootstrap are pending
  if (!fontsLoaded || authStatus === 'loading') {
    return (
      <TamaguiProvider config={tamaguiConfig} defaultTheme={appTheme}>
        <YStack flex={1} backgroundColor="$primary" alignItems="center" justifyContent="center">
          <Spinner size="large" color="$primaryForeground" />
        </YStack>
      </TamaguiProvider>
    );
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={appTheme}>
      <ThemeProvider value={DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal', headerShown: true }} />
        </Stack>

        {/* Redirect based on auth status */}
        {authStatus === 'unauthenticated' ? (
          <Redirect href="/(auth)/login" />
        ) : (
          <Redirect href="/(tabs)" />
        )}

        {/* Animated splash overlay — renders on top of real screens */}
        {showSplash && (
          <SplashAnimated onAnimationComplete={handleSplashComplete} />
        )}

        <StatusBar style="auto" />
      </ThemeProvider>
    </TamaguiProvider>
  );
}
