import React, { memo } from 'react';
import { styled, Text, XStack } from 'tamagui';

import type { ButtonProps } from './Button.types';

/**
 * Button — componente de botão com variantes.
 * Pill shape por padrão (borderRadius = 9999).
 * Variantes: default, outline, secondary, ghost, destructive.
 * Compound: ButtonFrame (XStack) + ButtonLabel (Text).
 */
const ButtonFrame = styled(XStack, {
  name: 'ButtonFrame',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$pill',
  gap: '$2',
  cursor: 'pointer',
  pressStyle: { opacity: 0.85 },

  variants: {
    variant: {
      default: { backgroundColor: '$primary' },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$borderColor',
      },
      secondary: { backgroundColor: '$selectDefaultBg' },
      ghost: {
        backgroundColor: 'transparent',
        pressStyle: { backgroundColor: '$backgroundPress' },
      },
      destructive: { backgroundColor: '$destructive' },
    },
    size: {
      sm: { height: 32, paddingHorizontal: '$3' },
      md: { height: 40, paddingHorizontal: '$4' },
      modal: { height: 43, paddingHorizontal: '$6', flex: 1 },
      lg: { height: 56, paddingHorizontal: '$6' },
    },
    disabled: {
      true: { opacity: 0.5, pointerEvents: 'none' },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

const ButtonLabel = styled(Text, {
  name: 'ButtonLabel',
  fontFamily: '$body',
  fontWeight: '500',

  variants: {
    variant: {
      default: { color: '$primaryForeground' },
      outline: { color: '$color' },
      secondary: { color: '$neutral800' },
      ghost: { color: '$primary' },
      destructive: { color: '$destructiveForeground' },
    },
    size: {
      sm: { fontSize: '$1' },  // 12
      md: { fontSize: '$2' },  // 14
      modal: { fontSize: '$1' },  // 12
      lg: { fontSize: '$3' },  // 16
    },
  } as const,

  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

function ButtonComponent({
  variant = 'default',
  size = 'md',
  disabled = false,
  onPress,
  children,
}: ButtonProps) {
  return (
    <ButtonFrame
      variant={variant}
      size={size}
      disabled={disabled}
      onPress={disabled ? undefined : onPress}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      <ButtonLabel variant={variant} size={size}>
        {children}
      </ButtonLabel>
    </ButtonFrame>
  );
}

export const Button = memo(ButtonComponent);
