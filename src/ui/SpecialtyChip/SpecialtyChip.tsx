import React, { memo, useMemo } from 'react';
import { styled, Text, XStack } from 'tamagui';

import { DEFAULT_SPECIALTY_COLOR, getSpecialtyColors } from '@/src/utils/specialtyColors';

import type { SpecialtyChipProps } from './SpecialtyChip.types';

// ── Constants ────────────────────────────────────────────────
const CHIP_HEIGHT = 20;

// ── Styled ───────────────────────────────────────────────────

const ChipFrame = styled(XStack, {
  name: 'SpecialtyChipFrame',
  height: CHIP_HEIGHT,
  borderRadius: '$pill',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: '$2', // 8
});

const ChipLabel = styled(Text, {
  name: 'SpecialtyChipLabel',
  fontFamily: '$body',
  fontSize: 10,
  fontWeight: '400',
});

// ── Component ────────────────────────────────────────────────

function SpecialtyChipComponent({ label, isOverflow = false }: SpecialtyChipProps) {
  const colors = useMemo(() => {
    if (isOverflow) return DEFAULT_SPECIALTY_COLOR;
    return getSpecialtyColors(label);
  }, [label, isOverflow]);

  return (
    <ChipFrame backgroundColor={colors.bg}>
      <ChipLabel color={colors.text}>{label}</ChipLabel>
    </ChipFrame>
  );
}

export const SpecialtyChip = memo(SpecialtyChipComponent);
