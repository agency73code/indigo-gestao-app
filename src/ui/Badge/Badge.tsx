import React, { memo } from 'react';
import { styled, Text, XStack } from 'tamagui';

import type { BadgeProps } from './Badge.types';

/**
 * Badge — indicador visual pequeno com variantes.
 * Pill shape, fonte pequena, sem interação.
 * Compound: BadgeFrame (XStack) + BadgeLabel (Text).
 */
const BadgeFrame = styled(XStack, {
  name: 'BadgeFrame',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'flex-start',
  paddingHorizontal: '$2',
  paddingVertical: 2,
  borderRadius: 9999,

  variants: {
    variant: {
      default: { background: '$primary' },
      secondary: { background: '$secondary' },
      destructive: { background: '$destructive' },
      outline: {
        background: 'transparent',
        borderWidth: 1,
        borderColor: '$borderColor',
      },
      success: { background: '$success' },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
  },
});

const BadgeLabel = styled(Text, {
  name: 'BadgeLabel',
  fontFamily: '$body',
  fontWeight: '500',
  fontSize: 11,
  lineHeight: 16,

  variants: {
    variant: {
      default: { color: '$primaryForeground' },
      secondary: { color: '$secondaryForeground' },
      destructive: { color: '$destructiveForeground' },
      outline: { color: '$color' },
      success: { color: '#FFFFFF' },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
  },
});

function BadgeComponent({ variant = 'default', children }: BadgeProps) {
  return (
    <BadgeFrame variant={variant}>
      <BadgeLabel variant={variant}>{children}</BadgeLabel>
    </BadgeFrame>
  );
}

export const Badge = memo(BadgeComponent);
