import React, { memo } from 'react';
import { Input, Label, YStack } from 'tamagui';

import { AppText } from '../Text';
import type { InputFieldProps } from './InputField.types';

/**
 * InputField — campo de entrada com label e mensagem de erro.
 * Usa Input do Tamagui com tokens do tema.
 * Borda muda para $borderColorFocus em foco e $destructive em erro.
 */
function InputFieldComponent({
  label,
  error,
  placeholder,
  value,
  onChangeText,
  disabled = false,
  keyboardType = 'default',
  secureTextEntry = false,
  rightElement,
}: InputFieldProps) {
  const hasError = Boolean(error);

  return (
    <YStack gap="$1.5">
      {label ? (
        <Label fontFamily="$body" fontWeight="500" fontSize="$2" color="$color">
          {label}
        </Label>
      ) : null}

      <YStack>
        <Input
          placeholder={placeholder}
          placeholderTextColor="$placeholderColor"
          value={value}
          onChangeText={onChangeText}
          disabled={disabled}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          backgroundColor="$inputBackground"
          borderWidth={1}
          borderColor={hasError ? '$destructive' : '$borderColor'}
          borderRadius="$3"
          height={56}
          paddingHorizontal="$3"
          paddingRight={rightElement ? '$10' : '$3'}
          fontFamily="$body"
          fontSize="$2"
          color="$color"
          focusStyle={{
            borderColor: hasError ? '$destructive' : '$borderColorFocus',
            borderWidth: 2,
          }}
          accessibilityLabel={label ?? placeholder}
        />

        {rightElement ? (
          <YStack
            position="absolute"
            right={0}
            top={0}
            bottom={0}
            justifyContent="center"
            paddingRight="$3"
          >
            {rightElement}
          </YStack>
        ) : null}
      </YStack>

      {hasError ? (
        <AppText variant="muted" color="$destructive">
          {error}
        </AppText>
      ) : null}
    </YStack>
  );
}

export const InputField = memo(InputFieldComponent);
