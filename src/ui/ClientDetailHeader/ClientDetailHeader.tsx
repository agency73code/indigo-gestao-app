import { ChevronLeft } from 'lucide-react-native';
import React, { memo, useCallback } from 'react';
import { styled, Text, useTheme, XStack, YStack } from 'tamagui';

import { AreaSelectorBar } from '@/src/ui/AreaSelectorBar';
import { Avatar } from '@/src/ui/Avatar';
import { ConnectionStatusPill } from '@/src/ui/ConnectionStatusPill';

import type { ClientDetailHeaderProps } from './ClientDetailHeader.types';

// ── Constants ────────────────────────────────────────────────
const BACK_BUTTON_SIZE = 38;
const BACK_ICON_SIZE = 24;
const AVATAR_SIZE = 38;

// ── Styled ───────────────────────────────────────────────────

const HeaderContainer = styled(YStack, {
  name: 'ClientDetailHeaderContainer',
  backgroundColor: '$headerBg',
  borderBottomLeftRadius: '$header', // 45
  borderBottomRightRadius: '$header',
  paddingHorizontal: '$5.5', // 22
  paddingBottom: '$5.5', // 22
  paddingTop: '$12', // 48 — safe area
  justifyContent: 'flex-end',
  gap: '$4', // 16
});

const ContentRow = styled(XStack, {
  name: 'ClientDetailHeaderRow',
  alignItems: 'center',
  gap: '$3', // 12
});

const BackButton = styled(XStack, {
  name: 'ClientDetailBackButton',
  width: BACK_BUTTON_SIZE,
  height: BACK_BUTTON_SIZE,
  borderRadius: '$pill',
  backgroundColor: '$headerNotifBg', // gray100
  alignItems: 'center',
  justifyContent: 'center',
  pressStyle: { opacity: 0.8 },
});

const InfoColumn = styled(YStack, {
  name: 'ClientDetailInfo',
  flex: 1,
  minWidth: 0,
});

const ClientName = styled(Text, {
  name: 'ClientDetailName',
  fontFamily: '$body',
  fontSize: 16,
  fontWeight: '500',
  color: '$headerText', // gray100
  numberOfLines: 1,
});

const ClientAge = styled(Text, {
  name: 'ClientDetailAge',
  fontFamily: '$body',
  fontSize: 12,
  fontWeight: '500',
  color: '$headerText',
});

// ── Component ────────────────────────────────────────────────

function ClientDetailHeaderComponent({
  clientName,
  clientAge,
  avatarUrl,
  fallbackInitials,
  isOnline,
  onBack,
  currentArea,
  hasMultipleAreas,
  onChangeArea,
}: ClientDetailHeaderProps) {
  const theme = useTheme();

  const handleBack = useCallback(() => {
    onBack();
  }, [onBack]);

  return (
    <HeaderContainer>
      <ContentRow>
        <BackButton
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <ChevronLeft
            size={BACK_ICON_SIZE}
            color={theme.headerNotifIcon.val}
            strokeWidth={2}
          />
        </BackButton>

        <Avatar
          source={avatarUrl}
          size="sm"
          fallbackInitials={fallbackInitials}
          accessibilityLabel={`Foto de ${clientName}`}
        />

        <InfoColumn>
          <ClientName>{clientName}</ClientName>
          <ClientAge>{`${clientAge} anos`}</ClientAge>
        </InfoColumn>

        <ConnectionStatusPill isOnline={isOnline} compact />
      </ContentRow>

      {currentArea && onChangeArea && (
        <AreaSelectorBar
          currentArea={currentArea}
          hasMultipleAreas={hasMultipleAreas ?? false}
          onChangeArea={onChangeArea}
        />
      )}
    </HeaderContainer>
  );
}

export const ClientDetailHeader = memo(ClientDetailHeaderComponent);
