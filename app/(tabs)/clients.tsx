import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { styled, YStack } from 'tamagui';

import { useClients } from '@/src/features/client/hooks';
import type { ClientItemData } from '@/src/ui/ClientCard';
import { ClientCard } from '@/src/ui/ClientCard';
import { ClientsHeader } from '@/src/ui/ClientsHeader';

// ── Styled ───────────────────────────────────────────────────

const ScreenContainer = styled(YStack, {
  name: 'ClientsScreenContainer',
  flex: 1,
  backgroundColor: '$screenBackground',
});

const ListContainer = styled(YStack, {
  name: 'ClientsListContainer',
  paddingHorizontal: '$5.5', // 22
  paddingTop: '$5', // 20
  paddingBottom: '$20', // bottom safe area
  gap: '$2.5', // 10 between cards
});

// ── Component ────────────────────────────────────────────────

export default function ClientsScreen() {
  const { clients, searchText, setSearchText } = useClients();

  const handleClientPress = useCallback((id: string) => {
    // TODO: navegar para detalhe do cliente
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: ClientItemData }) => (
      <ClientCard item={item} onPress={handleClientPress} />
    ),
    [handleClientPress],
  );

  const keyExtractor = useCallback(
    (item: ClientItemData) => item.id,
    [],
  );

  return (
    <ScreenContainer>
      <ClientsHeader
        isOnline
        searchText={searchText}
        onSearchChange={setSearchText}
      />

      <FlatList
        data={clients}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{
          paddingHorizontal: 22,
          paddingTop: 10,
          paddingBottom: 100,
          gap: 10,
        }}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
}
