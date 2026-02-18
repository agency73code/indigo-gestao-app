import { CloudUpload, Home, User, Users } from 'lucide-react-native';
import React, { memo, useCallback, useMemo } from 'react';
import { styled, Text, useTheme, XStack, YStack } from 'tamagui';

import type { BottomTabBarProps, TabItemDef, TabKey } from './BottomTabBar.types';

// ── Tab definitions ──────────────────────────────────────────
const TABS: readonly TabItemDef[] = [
  { key: 'home', label: 'Home', accessibilityLabel: 'Home' },
  { key: 'clients', label: 'Clientes', accessibilityLabel: 'Clientes' },
  { key: 'uploads', label: 'Envios', accessibilityLabel: 'Envios' },
  { key: 'profile', label: 'Perfil', accessibilityLabel: 'Perfil' },
] as const;

// ── Icon map ─────────────────────────────────────────────────
const ICON_MAP: Record<TabKey, typeof Home> = {
  home: Home,
  clients: Users,
  uploads: CloudUpload,
  profile: User,
};

const ICON_SIZE = 24;

// ── Styled components ────────────────────────────────────────

/** Container da bottom navigation — pill branco central. */
const NavContainer = styled(XStack, {
  name: 'BottomTabBarContainer',
  width: 343,
  height: '$11', // 64
  backgroundColor: '$bottomNavBg',
  borderRadius: '$pill',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: '$2', // 8
  paddingVertical: '$2', // 8
  alignSelf: 'center',
});

/** Frame do item ativo — pill expandido com ícone + label. */
const ActiveItemFrame = styled(XStack, {
  name: 'BottomTabBarActiveItem',
  height: '$7', // 48
  backgroundColor: '$bottomNavActiveBg',
  borderRadius: '$pill',
  paddingHorizontal: '$4', // 16
  paddingVertical: '$2', // 8
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$2.5', // 10
  minWidth: 48,
  pressStyle: { opacity: 0.9 },
});

/** Label do item ativo. */
const ActiveLabel = styled(Text, {
  name: 'BottomTabBarActiveLabel',
  fontFamily: '$body',
  fontSize: '$1', // 12
  fontWeight: '600',
  color: '$bottomNavActiveFg',
});

/** Frame do item inativo — círculo com ícone. */
const InactiveItemFrame = styled(XStack, {
  name: 'BottomTabBarInactiveItem',
  width: 48,
  height: 48,
  backgroundColor: '$bottomNavInactiveBg',
  borderRadius: '$pill',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 48,
  minHeight: 48,
  pressStyle: { opacity: 0.8 },
});

// ── TabItem subcomponent ─────────────────────────────────────

interface TabItemProps {
  tab: TabItemDef;
  isActive: boolean;
  onPress: (key: TabKey) => void;
}

const TabItem = memo(function TabItem({ tab, isActive, onPress }: TabItemProps) {
  const theme = useTheme();
  const IconComponent = ICON_MAP[tab.key];

  const handlePress = useCallback(() => {
    onPress(tab.key);
  }, [onPress, tab.key]);

  if (isActive) {
    return (
      <ActiveItemFrame
        onPress={handlePress}
        accessibilityRole="tab"
        accessibilityLabel={tab.accessibilityLabel}
        accessibilityState={{ selected: true }}
      >
        <IconComponent
          size={ICON_SIZE}
          color={theme.bottomNavActiveFg.val}
          strokeWidth={1.8}
        />
        <ActiveLabel>{tab.label}</ActiveLabel>
      </ActiveItemFrame>
    );
  }

  return (
    <InactiveItemFrame
      onPress={handlePress}
      accessibilityRole="tab"
      accessibilityLabel={tab.accessibilityLabel}
      accessibilityState={{ selected: false }}
    >
      <IconComponent
        size={ICON_SIZE}
        color={theme.bottomNavInactiveIcon.val}
        strokeWidth={1.8}
      />
    </InactiveItemFrame>
  );
});

// ── Main component ───────────────────────────────────────────

function BottomTabBarComponent({ activeTab, onTabPress }: BottomTabBarProps) {
  const tabs = useMemo(() => TABS, []);

  return (
    <YStack
      paddingBottom="$5" // 20 — safe area breathing room
      paddingTop="$2" // 8
      backgroundColor="$screenBackground"
      alignItems="center"
    >
      <NavContainer>
        {tabs.map((tab) => (
          <TabItem
            key={tab.key}
            tab={tab}
            isActive={activeTab === tab.key}
            onPress={onTabPress}
          />
        ))}
      </NavContainer>
    </YStack>
  );
}

export const BottomTabBar = memo(BottomTabBarComponent);
