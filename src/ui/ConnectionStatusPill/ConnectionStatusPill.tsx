import React, { memo } from 'react';
import { styled, Text, XStack, YStack } from 'tamagui';

import type { ConnectionStatusPillProps } from './ConnectionStatusPill.types';

// ── Constants ────────────────────────────────────────────────
const DOT_SIZE = 12;

// ── Styled ───────────────────────────────────────────────────

const PillFrame = styled(XStack, {
  name: 'ConnectionStatusPill',
  height: 26,
  borderRadius: '$pill',
  backgroundColor: '$statusPillBg',
  alignItems: 'center',
  paddingHorizontal: '$2.5', // 10
  gap: '$1.5', // 6
});

const StatusDot = styled(YStack, {
  name: 'ConnectionStatusDot',
  width: DOT_SIZE,
  height: DOT_SIZE,
  borderRadius: '$pill',
});

const PillText = styled(Text, {
  name: 'ConnectionStatusPillText',
  fontFamily: '$body',
  fontSize: 10,
  fontWeight: '500',
  color: '$statusPillText',
});

const DotSeparator = styled(Text, {
  name: 'ConnectionStatusDotSep',
  fontFamily: '$body',
  fontSize: 10,
  fontWeight: '500',
  color: '$statusPillText',
});

// ── Component ────────────────────────────────────────────────

function ConnectionStatusPillComponent({ isOnline, compact }: ConnectionStatusPillProps) {
  return (
    <PillFrame>
      <StatusDot
        backgroundColor={isOnline ? '$statusDotSuccess' : '$warning'}
      />
      {isOnline ? (
        <PillText>Conectado</PillText>
      ) : compact ? (
        <PillText>Sem internet</PillText>
      ) : (
        <>
          <PillText>Sem internet</PillText>
          <DotSeparator>•</DotSeparator>
          <PillText>dados salvos</PillText>
        </>
      )}
    </PillFrame>
  );
}

export const ConnectionStatusPill = memo(ConnectionStatusPillComponent);
