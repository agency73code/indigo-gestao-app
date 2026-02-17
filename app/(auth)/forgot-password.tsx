import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    useWindowDimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { XStack, YStack, useTheme } from 'tamagui';

import { useForgotPassword } from '@/src/features/auth/hooks';
import { Button } from '@/src/ui/Button';
import { Card } from '@/src/ui/Card';
import { InputField } from '@/src/ui/InputField';
import { AppText } from '@/src/ui/Text';

const CURVE_HEIGHT = 50;

/**
 * ForgotPasswordScreen — tela de recuperação de senha.
 * UI → Hook (useForgotPassword) → authService.forgotPassword → API externa.
 */
export default function ForgotPasswordScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const primaryColor = String(theme.primary?.val ?? '#274160');

  const {
    email,
    setEmail,
    loading,
    error,
    fieldErrors,
    sendInstructions,
  } = useForgotPassword();

  const handleSendInstructions = async () => {
    const success = await sendInstructions();
    if (success) {
      router.replace('/(auth)/email-sent');
    }
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <YStack gap="$5" flex={1}>
              {/* Header text */}
              <YStack gap="$2">
                <AppText variant="pageTitle">
                  Esqueci minha senha
                </AppText>
                <AppText variant="body" color="$textSecondary">
                  Digite seu e-mail para receber as instruções de recuperação
                </AppText>
              </YStack>

              {/* Form field */}
              <InputField
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                error={fieldErrors.email}
              />

              {/* General error */}
              {error ? (
                <AppText variant="muted" color="$destructive" textAlign="center">
                  {error}
                </AppText>
              ) : null}

              {/* Back to login link */}
              <XStack justifyContent="flex-end" alignItems="center" gap="$2">
                <AppText variant="body" color="$textSecondary">
                  Lembrou sua Senha?
                </AppText>
                <Link href="/(auth)/login">
                  <AppText
                    variant="body"
                    fontWeight="600"
                    color="$primary"
                    textDecorationLine="underline"
                  >
                    Faça Login
                  </AppText>
                </Link>
              </XStack>

              {/* Submit button */}
              <Button
                variant="default"
                size="lg"
                onPress={handleSendInstructions}
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar instruções'}
              </Button>

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
        </KeyboardAvoidingView>
      </Card>
    </YStack>
  );
}
