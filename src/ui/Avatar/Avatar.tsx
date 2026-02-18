import React, { memo } from 'react';
import { styled, Avatar as TamaguiAvatar, Text } from 'tamagui';

import type { AvatarProps, AvatarSize } from './Avatar.types';

// ── Size map ─────────────────────────────────────────────────

const SIZE_MAP: Record<AvatarSize, number> = {
  sm: 40,
  md: 44,
  lg: 56,
  xl: 72,
};

const FONT_SIZE_MAP: Record<AvatarSize, number> = {
  sm: 14,
  md: 16,
  lg: 20,
  xl: 28,
};

// ── Fallback styled ──────────────────────────────────────────

const FallbackText = styled(Text, {
  name: 'AvatarFallbackText',
  fontFamily: '$body',
  fontWeight: '600',
  color: '$primaryForeground',
});

// ── Component ────────────────────────────────────────────────

function AvatarComponent({
  source,
  size = 'md',
  fallbackInitials,
  accessibilityLabel,
}: AvatarProps) {
  const pixelSize = SIZE_MAP[size];
  const fontSize = FONT_SIZE_MAP[size];
  const src = typeof source === 'string' ? source : undefined;

  return (
    <TamaguiAvatar
      circular
      size={pixelSize}
      accessibilityLabel={accessibilityLabel}
    >
      <TamaguiAvatar.Image
        src={src}
        accessibilityLabel={accessibilityLabel}
      />
      <TamaguiAvatar.Fallback
        backgroundColor="$primary"
        alignItems="center"
        justifyContent="center"
        delayMs={200}
      >
        <FallbackText fontSize={fontSize}>
          {fallbackInitials ?? '?'}
        </FallbackText>
      </TamaguiAvatar.Fallback>
    </TamaguiAvatar>
  );
}

export const Avatar = memo(AvatarComponent);
