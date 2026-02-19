import type { BottomTabBarProps as RNBottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Redirect, Tabs } from 'expo-router';
import React, { useCallback } from 'react';

import { useAuthStore } from '@/src/features/auth/store';
import type { TabKey } from '@/src/ui/BottomTabBar';
import { BottomTabBar } from '@/src/ui/BottomTabBar';

/**
 * Mapeia o nome da rota do Expo Router para a chave de tab do BottomTabBar.
 * `index` → `home` porque Expo Router usa `index` para a rota raiz.
 */
const ROUTE_TO_TAB: Record<string, TabKey> = {
  index: 'home',
  clients: 'clients',
  uploads: 'uploads',
  profile: 'profile',
};

const TAB_TO_ROUTE: Record<TabKey, string> = {
  home: 'index',
  clients: 'clients',
  uploads: 'uploads',
  profile: 'profile',
};

function CustomTabBar({ state, navigation }: RNBottomTabBarProps) {
  const logout = useAuthStore((s) => s.logout); // TODO: APAGAR
  const currentRoute = state.routes[state.index]?.name ?? 'index';
  const activeTab: TabKey = ROUTE_TO_TAB[currentRoute] ?? 'home';

  const handleTabPress = useCallback(
    (tabKey: TabKey) => {
      if (tabKey === 'profile') { // TODO: APAGAR
        void logout();
        return;
      }

      const routeName = TAB_TO_ROUTE[tabKey];
      const event = navigation.emit({
        type: 'tabPress',
        target: state.routes.find((r) => r.name === routeName)?.key ?? '',
        canPreventDefault: true,
      });

      if (!event.defaultPrevented) {
        navigation.navigate(routeName);
      }
    },
    [logout, navigation, state.routes], // TODO: APAGAR logout
  );

  return <BottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />;
}

export default function TabLayout() {
  const status = useAuthStore((s) => s.status);

  if (status !== 'authenticated') {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="clients" />
      <Tabs.Screen name="uploads" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
