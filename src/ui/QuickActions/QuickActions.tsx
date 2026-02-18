import { CalendarClock, Plus, Users } from 'lucide-react-native';
import React, { memo, useCallback } from 'react';
import { styled, Text, useTheme, XStack, YStack } from 'tamagui';

import type { QuickActionsProps } from './QuickActions.types';

// ── Constants ────────────────────────────────────────────────
const ICON_SIZE = 24;
const NEW_SESSION_CIRCLE = 45;
const QUICK_CARD_HEIGHT = 122;
const NEW_SESSION_HEIGHT = 65;

// ── Styled: Section ──────────────────────────────────────────

const Section = styled(YStack, {
  name: 'QuickActionsSection',
  paddingHorizontal: '$5.5', // 22
  marginTop: '$5', // 20
  gap: '$3', // 12
});

const SectionTitle = styled(Text, {
  name: 'QuickActionsSectionTitle',
  fontFamily: '$heading',
  fontSize: '$4', // 18
  fontWeight: '400',
  color: '$bottomNavInactiveIcon', // NEUTRAL_900
});

// ── Styled: Quick Cards ──────────────────────────────────────

const CardsRow = styled(XStack, {
  name: 'QuickActionsCardsRow',
  gap: '$3', // 12
});

const QuickCard = styled(YStack, {
  name: 'QuickActionsCard',
  flex: 1,
  height: QUICK_CARD_HEIGHT,
  backgroundColor: '$bottomNavInactiveBg', // neutral200 / #EEEBE5
  borderRadius: 24,
  padding: '$4', // 16
  justifyContent: 'flex-end',
  gap: 5, // 5px icon → label
  pressStyle: { opacity: 0.85 },
});

const CardLabel = styled(Text, {
  name: 'QuickActionsCardLabel',
  fontFamily: '$body',
  fontSize: '$3', // 16
  fontWeight: '400',
  color: '$bottomNavInactiveIcon', // NEUTRAL_900
});

// ── Styled: New Session CTA ──────────────────────────────────

const NewSessionButton = styled(XStack, {
  name: 'QuickActionsNewSession',
  marginTop: '$2', // 8 extra (12 gap + 8 = 20)
  height: NEW_SESSION_HEIGHT,
  backgroundColor: '$primary',
  borderRadius: '$pill',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: '$5.5', // 22
  paddingRight: '$2.5', // 10
  paddingVertical: '$2.5', // 10
  pressStyle: { opacity: 0.9 },
});

const NewSessionLabel = styled(Text, {
  name: 'QuickActionsNewSessionLabel',
  fontFamily: '$body',
  fontSize: '$4', // 18
  fontWeight: '400',
  color: '$primaryForeground',
});

const PlusCircle = styled(XStack, {
  name: 'QuickActionsPlusCircle',
  width: NEW_SESSION_CIRCLE,
  height: NEW_SESSION_CIRCLE,
  borderRadius: '$pill',
  backgroundColor: '$card', // white
  alignItems: 'center',
  justifyContent: 'center',
});

// ── Icon map ─────────────────────────────────────────────────
const ICON_MAP: Record<string, typeof Users> = {
  clients: Users,
  pending: CalendarClock,
};

// ── Actions config ───────────────────────────────────────────
const ACTIONS = [
  { key: 'clients', label: 'Buscar\nclientes', icon: 'clients' },
  { key: 'pending', label: 'Sessões\npendentes', icon: 'pending' },
] as const;

// ── Component ────────────────────────────────────────────────

function QuickActionsComponent({ onActionPress, onNewSessionPress }: QuickActionsProps) {
  const theme = useTheme();

  const handleCardPress = useCallback(
    (key: string) => () => onActionPress(key),
    [onActionPress],
  );

  return (
    <Section>
      <SectionTitle>Ações Rápidas</SectionTitle>

      <CardsRow>
        {ACTIONS.map((action) => {
          const IconComponent = ICON_MAP[action.icon];
          return (
            <QuickCard
              key={action.key}
              onPress={handleCardPress(action.key)}
              accessibilityRole="button"
              accessibilityLabel={action.label.replace('\n', ' ')}
            >
              <IconComponent
                size={ICON_SIZE}
                color={theme.bottomNavInactiveIcon.val}
                strokeWidth={1.8}
              />
              <CardLabel>{action.label}</CardLabel>
            </QuickCard>
          );
        })}
      </CardsRow>

      <NewSessionButton
        onPress={onNewSessionPress}
        accessibilityRole="button"
        accessibilityLabel="Nova sessão"
      >
        <NewSessionLabel>Nova sessão</NewSessionLabel>
        <PlusCircle>
          <Plus
            size={ICON_SIZE}
            color={theme.primary.val}
            strokeWidth={2}
          />
        </PlusCircle>
      </NewSessionButton>
    </Section>
  );
}

export const QuickActions = memo(QuickActionsComponent);
