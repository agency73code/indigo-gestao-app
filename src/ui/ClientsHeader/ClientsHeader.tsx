import { Search, Users } from 'lucide-react-native';
import React, { memo } from 'react';
import { Input, styled, Text, useTheme, XStack, YStack } from 'tamagui';

import { ConnectionStatusPill } from '@/src/ui/ConnectionStatusPill';

import type { ClientsHeaderProps } from './ClientsHeader.types';

// ── Constants ────────────────────────────────────────────────
const ICON_CIRCLE_SIZE = 38;
const ICON_SIZE = 24;
const SEARCH_ICON_SIZE = 20;
const SEARCH_HEIGHT = 47;

// ── Styled ───────────────────────────────────────────────────

const HeaderContainer = styled(YStack, {
  name: 'ClientsHeaderContainer',
  height: 172,
  backgroundColor: '$headerBg',
  borderBottomLeftRadius: '$header', // 45
  borderBottomRightRadius: '$header',
  paddingHorizontal: '$5.5', // 22
  paddingBottom: '$5.5', // 22
  justifyContent: 'flex-end',
  gap: '$4', // 16
});

const TopRow = styled(XStack, {
  name: 'ClientsHeaderTopRow',
  alignItems: 'center',
  gap: '$3', // 12
});

const IconCircle = styled(XStack, {
  name: 'ClientsHeaderIconCircle',
  width: ICON_CIRCLE_SIZE,
  height: ICON_CIRCLE_SIZE,
  borderRadius: '$pill',
  backgroundColor: '$headerNotifBg', // gray100
  alignItems: 'center',
  justifyContent: 'center',
});

const TitleText = styled(Text, {
  name: 'ClientsHeaderTitle',
  fontFamily: '$heading',
  fontSize: '$4', // 18
  fontWeight: '400',
  color: '$headerText', // gray100
  flex: 1,
});

// ── Search Bar ───────────────────────────────────────────────

const SearchContainer = styled(XStack, {
  name: 'ClientsSearchContainer',
  height: SEARCH_HEIGHT,
  borderRadius: '$pill',
  backgroundColor: '$headerNotifBg', // gray100 / white
  alignItems: 'center',
  paddingHorizontal: '$4', // 16
  gap: '$3', // 12
});

const SearchInput = styled(Input, {
  name: 'ClientsSearchInput',
  flex: 1,
  fontFamily: '$body',
  fontSize: 12,
  fontWeight: '400',
  color: '$statusPillText',
  borderWidth: 0,
  backgroundColor: 'transparent',
  height: SEARCH_HEIGHT,
  paddingHorizontal: 0,
  placeholderTextColor: '$textSecondary',
});

// ── Component ────────────────────────────────────────────────

function ClientsHeaderComponent({
  isOnline,
  searchText,
  onSearchChange,
}: ClientsHeaderProps) {
  const theme = useTheme();

  return (
    <HeaderContainer>
      <TopRow>
        <IconCircle>
          <Users
            size={ICON_SIZE}
            color={theme.headerNotifIcon.val}
            strokeWidth={1.8}
          />
        </IconCircle>

        <TitleText>Clientes</TitleText>

        <ConnectionStatusPill isOnline={isOnline} />
      </TopRow>

      <SearchContainer>
        <Search
          size={SEARCH_ICON_SIZE}
          color={theme.textSecondary.val}
          strokeWidth={1.8}
        />
        <SearchInput
          value={searchText}
          onChangeText={onSearchChange}
          placeholder="Pesquisar pelo nome do cliente..."
        />
      </SearchContainer>
    </HeaderContainer>
  );
}

export const ClientsHeader = memo(ClientsHeaderComponent);
