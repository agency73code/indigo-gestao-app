import React, { memo, useMemo } from 'react';
import { styled, Text, XStack, YStack } from 'tamagui';

import type { StatusPillProps, SyncStatus } from './StatusPill.types';

// ── Styled components ────────────────────────────────────────

/** Pill container branco. */
const PillContainer = styled(XStack, {
  name: 'StatusPillContainer',
  height: 47,
  backgroundColor: '$statusPillBg',
  borderRadius: '$pill',
  alignItems: 'center',
  paddingHorizontal: '$6', // 24
  gap: '$2', // 8
});

/** Dot indicador de conexão. */
const StatusDot = styled(YStack, {
  name: 'StatusDot',
  width: 10,
  height: 10,
  borderRadius: '$pill',

  variants: {
    dotColor: {
      success: { backgroundColor: '$statusDotSuccess' },
      danger: { backgroundColor: '$statusDotDanger' },
    },
  } as const,

  defaultVariants: {
    dotColor: 'success',
  },
});

/** Label "Status:" prefixo. */
const PrefixLabel = styled(Text, {
  name: 'StatusPillPrefix',
  fontFamily: '$body',
  fontSize: '$1', // 12
  fontWeight: '500',
  color: '$statusPillText',
});

/** Texto principal (ex: "Conectado"). */
const MainLabel = styled(Text, {
  name: 'StatusPillMain',
  fontFamily: '$body',
  fontSize: '$1', // 12
  fontWeight: '600',
  color: '$statusPillText',
});

/** Texto secundário (ex: "Tudo enviado"). */
const SecondaryLabel = styled(Text, {
  name: 'StatusPillSecondary',
  fontFamily: '$body',
  fontSize: '$1', // 12
  fontWeight: '500',
  color: '$statusPillText',
  opacity: 0.7,
});

/** Badge numérico (22x22). */
const CountBadge = styled(XStack, {
  name: 'StatusCountBadge',
  width: 22,
  height: 22,
  borderRadius: '$pill',
  alignItems: 'center',
  justifyContent: 'center',

  variants: {
    badgeVariant: {
      warning: { backgroundColor: '$statusBadgeWarningBg' },
      error: { backgroundColor: '$statusBadgeErrorBg' },
    },
  } as const,

  defaultVariants: {
    badgeVariant: 'warning',
  },
});

const CountBadgeText = styled(Text, {
  name: 'StatusCountBadgeText',
  fontFamily: '$body',
  fontSize: 11,
  fontWeight: '600',

  variants: {
    badgeVariant: {
      warning: { color: '$statusBadgeWarningFg' },
      error: { color: '$statusBadgeErrorFg' },
    },
  } as const,

  defaultVariants: {
    badgeVariant: 'warning',
  },
});

/** Separador "•" */
const DotSeparator = styled(Text, {
  name: 'StatusDotSeparator',
  fontFamily: '$body',
  fontSize: '$1',
  fontWeight: '500',
  color: '$statusPillText',
  opacity: 0.4,
});

// ── Config por status ────────────────────────────────────────

interface StatusConfig {
  dotColor: 'success' | 'danger';
  mainText: string;
  secondaryText: (count: number) => string;
  showBadge: boolean;
  badgeVariant: 'warning' | 'error';
}

const STATUS_CONFIGS: Record<SyncStatus, StatusConfig> = {
  allSent: {
    dotColor: 'success',
    mainText: 'Conectado',
    secondaryText: () => 'Tudo enviado',
    showBadge: false,
    badgeVariant: 'warning',
  },
  sending: {
    dotColor: 'success',
    mainText: 'Conectado',
    secondaryText: (n) => `Enviando sessões`,
    showBadge: true,
    badgeVariant: 'warning',
  },
  error: {
    dotColor: 'success',
    mainText: 'Conectado',
    secondaryText: (n) => `${n} com falha`,
    showBadge: true,
    badgeVariant: 'error',
  },
  offline: {
    dotColor: 'danger',
    mainText: 'Sem internet',
    secondaryText: (n) => `salvas no celular`,
    showBadge: true,
    badgeVariant: 'warning',
  },
};

// ── Component ────────────────────────────────────────────────

function StatusPillComponent({ status, count = 0 }: StatusPillProps) {
  const config = useMemo(() => STATUS_CONFIGS[status], [status]);

  return (
    <PillContainer>
      <PrefixLabel>Status:</PrefixLabel>
      <StatusDot dotColor={config.dotColor} />
      <MainLabel>{config.mainText}</MainLabel>

      {config.showBadge && count > 0 && (
        <CountBadge badgeVariant={config.badgeVariant}>
          <CountBadgeText badgeVariant={config.badgeVariant}>
            {count}
          </CountBadgeText>
        </CountBadge>
      )}

      <DotSeparator>{'\u2022'}</DotSeparator>
      <SecondaryLabel>{config.secondaryText(count)}</SecondaryLabel>
    </PillContainer>
  );
}

export const StatusPill = memo(StatusPillComponent);
