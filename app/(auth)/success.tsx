import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, ScrollView, useWindowDimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { YStack, useTheme } from 'tamagui';

import { Button } from '@/src/ui/Button';
import { Card } from '@/src/ui/Card';
import { AppText } from '@/src/ui/Text';

const CURVE_HEIGHT = 50;

/**
 * SuccessScreen — confirmação de redefinição de senha bem-sucedida.
 * Tela informativa, sem lógica de negócio.
 */
export default function SuccessScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const primaryColor = String(theme.primary?.val ?? '#274160');

  const handleBackToLogin = () => {
    router.replace('/(auth)/login');
  };

  return (
    <YStack flex={1} backgroundColor="$screenBackground">
      <StatusBar style="light" />

      {/* Primary header area */}
      <YStack backgroundColor="$primary" height={screenHeight * 0.35} />

      {/* SVG curved transition */}
      <Svg width={screenWidth} height={CURVE_HEIGHT} style={{ marginTop: -1 }}>
        <Path
          d={`M 0 0 L ${screenWidth} 0 Q ${screenWidth / 2} ${CURVE_HEIGHT} 0 0 Z`}
          fill={primaryColor}
        />
      </Svg>

      {/* Content in Card */}
      <Card
        flex={1}
        marginHorizontal="$4"
        marginTop={-150}
        marginBottom="$4"
        zIndex={1}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <YStack gap="$5" flex={1} alignItems="center">
            {/* Illustration */}
            <YStack alignItems="center" marginTop="$4">
              <Image
                source={require('@/assets/icones/senha.redefinida.assets.png')}
                style={{ width: 146, height: 128 }}
                resizeMode="contain"
              />
            </YStack>

            {/* Header text */}
            <YStack gap="$2" alignItems="center">
              <AppText variant="pageTitle" textAlign="center">
                Senha alterada com{'\n'}sucesso!
              </AppText>
              <AppText
                variant="body"
                color="$textSecondary"
                textAlign="center"
                paddingHorizontal="$4"
              >
                Pronto! Agora você já pode usar sua nova senha para acessar a
                conta.
              </AppText>
            </YStack>

            {/* Back to login button */}
            <YStack width="100%">
              <Button
                variant="default"
                size="lg"
                onPress={handleBackToLogin}
              >
                Voltar ao login
              </Button>
            </YStack>

            {/* Logo */}
            <YStack alignItems="center">
              <Image
                source={require('@/assets/logo/logo.indigo.png')}
                style={{ width: 164, height: 164 }}
                resizeMode="contain"
              />
            </YStack>
          </YStack>
        </ScrollView>
      </Card>
    </YStack>
  );
}
