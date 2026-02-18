import React, { useCallback } from 'react';
import { ScrollView } from 'tamagui';

import { useConnectivity } from '@/src/core/hooks/useConnectivity';
import { useRecentSessions } from '@/src/features/session/hooks';
import { HomeHeader } from '@/src/ui/HomeHeader';
import { QuickActions } from '@/src/ui/QuickActions';
import { RecentSessions } from '@/src/ui/RecentSessions';

export default function HomeScreen() {
  const { isOnline } = useConnectivity();
  const { sessions } = useRecentSessions();

  const handleActionPress = useCallback((key: string) => {
    // TODO: navegar para a tela correspondente
  }, []);

  const handleNewSession = useCallback(() => {
    // TODO: navegar para criação de sessão
  }, []);

  const handleSessionPress = useCallback((id: string) => {
    // TODO: navegar para detalhe da sessão
  }, []);

  return (
    <ScrollView flex={1} backgroundColor="$screenBackground">
      <HomeHeader
        avatarSource="https://i.pravatar.cc/150?u=natan"
        userName="Natan Oliveira"
        syncStatus={isOnline ? 'allSent' : 'offline'}
        syncCount={0}
        hasNotification
        onNotificationPress={() => {}}
      />

      <QuickActions
        onActionPress={handleActionPress}
        onNewSessionPress={handleNewSession}
      />

      <RecentSessions
        sessions={sessions}
        onSessionPress={handleSessionPress}
      />
    </ScrollView>
  );
}
