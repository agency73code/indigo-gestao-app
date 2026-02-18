import React, { memo, useMemo } from 'react';
import { styled, Text, XStack } from 'tamagui';

import type { ProgramStatusBadgeProps } from './ProgramStatusBadge.types';

// ── Constants ────────────────────────────────────────────────
const BADGE_HEIGHT = 18;

// ── Styled ───────────────────────────────────────────────────

const BadgeFrame = styled(XStack, {
  name: 'ProgramStatusBadgeFrame',
  height: BADGE_HEIGHT,
  borderRadius: '$pill',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: '$2', // 8
});

const BadgeText = styled(Text, {
  name: 'ProgramStatusBadgeText',
  fontFamily: '$body',
  fontSize: 12,
  fontWeight: '500',
});

// ── Component ────────────────────────────────────────────────

function ProgramStatusBadgeComponent({ status, pendingCount = 1 }: ProgramStatusBadgeProps) {
  const config = useMemo(() => {
    if (status === 'active') {
      return {
        bg: '$programBadgeActiveBg',
        fg: '$programBadgeActiveFg',
        label: 'Ativo',
      };
    }

    const plural = pendingCount > 1 ? 'Registros pendentes' : 'Registro pendente';
    return {
      bg: '$programBadgePendingBg',
      fg: '$programBadgePendingFg',
      label: `${pendingCount} ${plural}`,
    };
  }, [status, pendingCount]);

  return (
    <BadgeFrame backgroundColor={config.bg}>
      <BadgeText color={config.fg}>{config.label}</BadgeText>
    </BadgeFrame>
  );
}

export const ProgramStatusBadge = memo(ProgramStatusBadgeComponent);
