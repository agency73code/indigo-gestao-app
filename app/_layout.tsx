import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { TamaguiProvider } from 'tamagui';

import { Sora_300Light, Sora_400Regular } from '@expo-google-fonts/sora';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { initDb, resetDb } from '@/src/data/db/initDb';
import { useAuthBootstrap } from '@/src/features/auth/useAuthBootstrap';
import { tamaguiConfig } from '@/src/styles/tamagui.config';
import { useMobileBootstrap } from '@/src/features/mobile/useMobileBootstrap';
import { testLogin } from '@/src/__debug__/testLogin';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // TODO: TENHO QUE ENTENDER AINDA ISSO
  const [dbReady, setDbReady] = useState(false);

  useAuthBootstrap();
  useMobileBootstrap();

  // TODO: APAGAR POS LOGIN 
  useEffect(() => {
    if (!dbReady) return;
    testLogin(); 
  }, [dbReady]);
  // TODO: APAGAR POS LOGIN 

  // TODO: TENHO QUE ENTENDER AINDA ISSO

  const [fontsLoaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterLight: require('@tamagui/font-inter/otf/Inter-Light.otf'),
    InterSemiBold: require('@tamagui/font-inter/otf/Inter-SemiBold.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    Sora_300Light,
    Sora_400Regular,
  });

  // inicializa DB
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await resetDb();
        await initDb();

        if (!cancelled) setDbReady(true);
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        console.error('Error initializing DB:', error);

        if (!cancelled) {
          setDbReady(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme ?? 'light'}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </TamaguiProvider>
  );
}
