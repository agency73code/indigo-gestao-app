
/** Definição de cada card de ação rápida. */
export interface QuickActionItem {
  /** Chave única */
  key: string;
  /** Label exibido no card */
  label: string;
}

export interface QuickActionsProps {
  /** Callback ao pressionar um card de ação */
  onActionPress: (key: string) => void;
  /** Callback ao pressionar "Nova sessão" */
  onNewSessionPress: () => void;
  /** Número de sessões pendentes (para exibir badge) */
  pendingSessionsCount?: number;
}
