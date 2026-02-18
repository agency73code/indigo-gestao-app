import React, { memo, useCallback } from 'react';
import { styled, Text, YStack } from 'tamagui';

import { SessionCard } from '@/src/ui/SessionCard';

import type { RecentSessionsProps } from './RecentSessions.types';

// ── Styled ───────────────────────────────────────────────────

const Section = styled(YStack, {
  name: 'RecentSessionsSection',
  paddingHorizontal: '$5.5', // 22
  marginTop: '$5', // 20
  gap: '$2.5', // 10 (title -> card)
});

const SectionTitle = styled(Text, {
  name: 'RecentSessionsTitle',
  fontFamily: '$heading',
  fontSize: '$4', // 18
  fontWeight: '400',
  color: '$bottomNavInactiveIcon', // NEUTRAL_900
});

const ListCard = styled(YStack, {
  name: 'RecentSessionsListCard',
  backgroundColor: '$sessionListBg',
  borderRadius: 16,
});

// ── Component ────────────────────────────────────────────────

function RecentSessionsComponent({ sessions, onSessionPress }: RecentSessionsProps) {
  const handlePress = useCallback(
    (id: string) => onSessionPress(id),
    [onSessionPress],
  );

  if (sessions.length === 0) {
    return null;
  }

  return (
    <Section>
      <SectionTitle>Últimas sessões</SectionTitle>

      <ListCard>
        {sessions.map((session, index) => (
          <SessionCard
            key={session.id}
            item={session}
            onPress={handlePress}
            showSeparator={index < sessions.length - 1}
          />
        ))}
      </ListCard>
    </Section>
  );
}

export const RecentSessions = memo(RecentSessionsComponent);
