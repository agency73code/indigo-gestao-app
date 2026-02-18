import { ChevronRight, MoreVertical, Plus } from 'lucide-react-native';
import React, { memo, useCallback } from 'react';
import { styled, Text, useTheme, XStack, YStack } from 'tamagui';

import { ProgramStatusBadge } from '@/src/ui/ProgramStatusBadge';
import { SpecialtyChip } from '@/src/ui/SpecialtyChip';

import type { ProgramCardProps } from './ProgramCard.types';

// ── Constants ────────────────────────────────────────────────
const MENU_ICON_SIZE = 16;
const PLUS_CIRCLE_SIZE = 20;
const PLUS_ICON_SIZE = 10;
const CHEVRON_SIZE = 18;
const NEW_SESSION_HEIGHT = 30;
const VIEW_SESSIONS_HEIGHT = 30;

// ── Styled ───────────────────────────────────────────────────

const CardFrame = styled(YStack, {
  name: 'ProgramCardFrame',
  backgroundColor: '$sessionListBg', // neutral200
  borderRadius: 24,
  padding: '$4', // 16
  gap: '$3', // 12
});

const TopRow = styled(XStack, {
  name: 'ProgramCardTopRow',
  alignItems: 'flex-start',
  gap: '$2', // 8
});

const ProgramName = styled(Text, {
  name: 'ProgramCardName',
  fontFamily: '$body',
  fontSize: 14,
  fontWeight: '600',
  color: '$sessionText', // gray800
  flex: 1,
  numberOfLines: 2,
});

const MenuButton = styled(XStack, {
  name: 'ProgramCardMenu',
  width: 24,
  height: 24,
  alignItems: 'center',
  justifyContent: 'center',
  pressStyle: { opacity: 0.6 },
});

const MetaRow = styled(XStack, {
  name: 'ProgramCardMeta',
  alignItems: 'center',
  gap: '$2.5', // 10
});

const MetaText = styled(Text, {
  name: 'ProgramCardMetaText',
  fontFamily: '$body',
  fontSize: 10,
  fontWeight: '500',
  color: '$sessionText',
});

const ActionsRow = styled(XStack, {
  name: 'ProgramCardActions',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const NewSessionButton = styled(XStack, {
  name: 'ProgramCardNewSession',
  height: NEW_SESSION_HEIGHT,
  borderRadius: '$pill',
  backgroundColor: '$primary',
  alignItems: 'center',
  paddingLeft: '$1.5', // 6
  paddingRight: '$3', // 12
  gap: '$2', // 8
  pressStyle: { opacity: 0.85 },
});

const PlusCircle = styled(XStack, {
  name: 'ProgramCardPlusCircle',
  width: PLUS_CIRCLE_SIZE,
  height: PLUS_CIRCLE_SIZE,
  borderRadius: '$pill',
  backgroundColor: '$primaryForeground',
  alignItems: 'center',
  justifyContent: 'center',
});

const NewSessionText = styled(Text, {
  name: 'ProgramCardNewSessionText',
  fontFamily: '$body',
  fontSize: 12,
  fontWeight: '500',
  color: '$primaryForeground',
});

const ViewSessionsButton = styled(XStack, {
  name: 'ProgramCardViewSessions',
  height: VIEW_SESSIONS_HEIGHT,
  borderRadius: '$pill',
  backgroundColor: '$statusPillBg', // white
  alignItems: 'center',
  paddingHorizontal: '$3', // 12
  gap: '$1', // 4
  pressStyle: { opacity: 0.7 },
});

const ViewSessionsText = styled(Text, {
  name: 'ProgramCardViewSessionsText',
  fontFamily: '$body',
  fontSize: 12,
  fontWeight: '500',
  color: '$sessionText',
});

// ── Component ────────────────────────────────────────────────

function ProgramCardComponent({
  item,
  onNewSession,
  onViewSessions,
  onPress,
  onMenu,
}: ProgramCardProps) {
  const theme = useTheme();

  const handlePress = useCallback(() => onPress(item.id), [onPress, item.id]);
  const handleNewSession = useCallback(() => onNewSession(item.id), [onNewSession, item.id]);
  const handleViewSessions = useCallback(() => onViewSessions(item.id), [onViewSessions, item.id]);
  const handleMenu = useCallback(() => onMenu(item.id), [onMenu, item.id]);

  return (
    <CardFrame
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`Programa ${item.name}`}
    >
      {/* Top: nome + badge status + menu */}
      <TopRow>
        <ProgramName>{item.name}</ProgramName>
        <ProgramStatusBadge
          status={item.status}
          pendingCount={item.pendingCount}
        />
        <MenuButton
          onPress={handleMenu}
          accessibilityRole="button"
          accessibilityLabel="Menu do programa"
        >
          <MoreVertical
            size={MENU_ICON_SIZE}
            color={theme.sessionText.val}
            strokeWidth={2}
          />
        </MenuButton>
      </TopRow>

      {/* Meta: chip especialidade + última sessão */}
      <MetaRow>
        <SpecialtyChip label={item.specialty} />
        <MetaText>{`Última sessão: ${item.lastSessionLabel}`}</MetaText>
      </MetaRow>

      {/* Actions: Nova sessão + Ver sessões */}
      <ActionsRow>
        <NewSessionButton
          onPress={handleNewSession}
          accessibilityRole="button"
          accessibilityLabel="Nova sessão"
        >
          <PlusCircle>
            <Plus
              size={PLUS_ICON_SIZE}
              color={theme.primary.val}
              strokeWidth={2.5}
            />
          </PlusCircle>
          <NewSessionText>Nova sessão</NewSessionText>
        </NewSessionButton>

        <ViewSessionsButton
          onPress={handleViewSessions}
          accessibilityRole="button"
          accessibilityLabel="Ver sessões"
        >
          <ViewSessionsText>Ver sessões</ViewSessionsText>
          <ChevronRight
            size={CHEVRON_SIZE}
            color={theme.sessionText.val}
            strokeWidth={2}
          />
        </ViewSessionsButton>
      </ActionsRow>
    </CardFrame>
  );
}

export const ProgramCard = memo(ProgramCardComponent);
