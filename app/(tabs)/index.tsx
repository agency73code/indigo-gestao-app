import React, { useCallback } from 'react';
import { ScrollView } from 'tamagui';

import { HomeHeader } from '@/src/ui/HomeHeader';
import { QuickActions } from '@/src/ui/QuickActions';

export default function HomeScreen() {
  const handleActionPress = useCallback((key: string) => {
    // TODO: navegar para a tela correspondente
  }, []);

  const handleNewSession = useCallback(() => {
    // TODO: navegar para criação de sessão
  }, []);

  return (
    <ScrollView flex={1} backgroundColor="$screenBackground">
      <HomeHeader
        avatarSource="https://i.pravatar.cc/150?u=natan"
        userName="Natan Oliveira"
        syncStatus="sending"
        syncCount={3}
        hasNotification
        onNotificationPress={() => {}}
      />

      <QuickActions
        onActionPress={handleActionPress}
        onNewSessionPress={handleNewSession}
      />
    </ScrollView>
  );
}
