/** Chaves das tabs disponíveis na bottom navigation. */
export type TabKey = 'home' | 'clients' | 'uploads' | 'profile';

/** Definição de cada item de tab. */
export interface TabItemDef {
  /** Chave única da tab */
  key: TabKey;
  /** Label exibido quando ativo */
  label: string;
  /** Label de acessibilidade */
  accessibilityLabel: string;
}

export interface BottomTabBarProps {
  /** Tab atualmente selecionada */
  activeTab: TabKey;
  /** Callback ao pressionar uma tab */
  onTabPress: (tabKey: TabKey) => void;
}
