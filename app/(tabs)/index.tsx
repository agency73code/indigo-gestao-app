import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { ScrollView } from 'tamagui';

import { useConnectivity } from '@/src/core/hooks/useConnectivity';
import { useAuthStore } from '@/src/features/auth/store';
import { useRecentSessions } from '@/src/features/session/hooks';
import { HomeHeader } from '@/src/ui/HomeHeader';
import { QuickActions } from '@/src/ui/QuickActions';
import { RecentSessions } from '@/src/ui/RecentSessions';

export default function HomeScreen() {
  const router = useRouter();
  const { isOnline } = useConnectivity();
  const { sessions, pendingCount } = useRecentSessions();
  const session = useAuthStore((s) => s.session);

  const userName = session?.user?.name ?? 'Terapeuta';
  const avatarSource = session?.user?.avatar_url ?? undefined;

  const handleActionPress = useCallback((key: string) => {
    if (key === 'clients') {
      router.push('/(tabs)/clients');
    }
  }, [router]);

  const handleNewSession = useCallback(() => {
    // TODO: navegar para criação de sessão
  }, []);

  const handleSessionPress = useCallback((id: string) => {
    // TODO: navegar para detalhe da sessão
  }, []);

  return (
    <ScrollView flex={1} backgroundColor="$screenBackground">
      <HomeHeader
        avatarSource={avatarSource}
        userName={userName}
        syncStatus={isOnline ? 'allSent' : 'offline'}
        syncCount={0}
        hasNotification
        onNotificationPress={() => {}}
      />

      <QuickActions
        onActionPress={handleActionPress}
        onNewSessionPress={handleNewSession}
        pendingSessionsCount={pendingCount}
      />

      <RecentSessions
        sessions={sessions}
        onSessionPress={handleSessionPress}
      />
    </ScrollView>
  );
}
