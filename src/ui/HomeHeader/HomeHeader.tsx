import { Bell } from 'lucide-react-native';
import React, { memo } from 'react';
import { styled, Text, useTheme, XStack, YStack } from 'tamagui';

import { Avatar } from '../Avatar';
import { StatusPill } from '../StatusPill';
import type { HomeHeaderProps } from './HomeHeader.types';

// ── Constants ────────────────────────────────────────────────
const NOTIF_BTN_SIZE = 38;
const NOTIF_ICON_SIZE = 16;
const NOTIF_DOT_SIZE = 14;

// ── Styled components ────────────────────────────────────────

/** Header container — fundo índigo, cantos inferiores arredondados. */
const HeaderContainer = styled(YStack, {
  name: 'HomeHeaderContainer',
  height: 172,
  backgroundColor: '$headerBg',
  borderBottomLeftRadius: '$header',
  borderBottomRightRadius: '$header',
  paddingHorizontal: '$5.5', // 22
  paddingBottom: '$5.5', // 22
  justifyContent: 'flex-end',
  gap: '$4', // 16
});

/** Row do avatar + texto + notificação. */
const TopRow = styled(XStack, {
  name: 'HomeHeaderTopRow',
  alignItems: 'center',
  justifyContent: 'space-between',
});

/** Container do avatar + textos. */
const UserInfo = styled(XStack, {
  name: 'HomeHeaderUserInfo',
  alignItems: 'center',
  gap: '$3', // 12
  flex: 1,
});

/** Container dos textos "Olá," e Nome. */
const UserTexts = styled(YStack, {
  name: 'HomeHeaderUserTexts',
  gap: '$-0.5', // 6
});

/** "Olá," — 14, regular */
const GreetingText = styled(Text, {
  name: 'HomeHeaderGreeting',
  fontFamily: '$body',
  fontSize: '$2', // 14
  fontWeight: '400',
  color: '$headerText',
});

/** Nome — 16, medium */
const NameText = styled(Text, {
  name: 'HomeHeaderName',
  fontFamily: '$body',
  fontSize: '$3', // 16
  fontWeight: '500',
  color: '$headerText',
});

/** Botão circular de notificação. */
const NotifButton = styled(XStack, {
  name: 'HomeHeaderNotifBtn',
  width: NOTIF_BTN_SIZE,
  height: NOTIF_BTN_SIZE,
  borderRadius: '$pill',
  backgroundColor: '$headerNotifBg',
  alignItems: 'center',
  justifyContent: 'center',
  pressStyle: { opacity: 0.8 },
});

/** Dot vermelho de notificação não lida. */
const NotifDot = styled(YStack, {
  name: 'HomeHeaderNotifDot',
  position: 'absolute',
  top: -2,
  right: -2,
  width: NOTIF_DOT_SIZE,
  height: NOTIF_DOT_SIZE,
  borderRadius: '$pill',
  backgroundColor: '$headerNotifDot',
  borderWidth: 2,
  borderColor: '$headerBg',
});

// ── Component ────────────────────────────────────────────────

function HomeHeaderComponent({
  avatarSource,
  userName,
  syncStatus,
  syncCount = 0,
  hasNotification = false,
  onNotificationPress,
}: HomeHeaderProps) {
  const theme = useTheme();

  return (
    <HeaderContainer>
      <TopRow>
        <UserInfo>
          <Avatar
            source={avatarSource}
            size="md"
            fallbackInitials={userName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
            accessibilityLabel={`Avatar de ${userName}`}
          />
          <UserTexts>
            <GreetingText>Olá,</GreetingText>
            <NameText>{userName}</NameText>
          </UserTexts>
        </UserInfo>

        <XStack>
          <NotifButton
            onPress={onNotificationPress}
            accessibilityRole="button"
            accessibilityLabel="Notificações"
          >
            <Bell
              size={NOTIF_ICON_SIZE}
              color={theme.headerNotifIcon.val}
              strokeWidth={2}
            />
            {hasNotification && <NotifDot />}
          </NotifButton>
        </XStack>
      </TopRow>

      <StatusPill status={syncStatus} count={syncCount} />
    </HeaderContainer>
  );
}

export const HomeHeader = memo(HomeHeaderComponent);
