export interface ClientDetailHeaderProps {
  /** Nome do cliente */
  clientName: string;
  /** Idade do cliente em anos */
  clientAge: number;
  /** URL da foto do avatar */
  avatarUrl: string;
  /** Iniciais para fallback do avatar */
  fallbackInitials: string;
  /** Se o dispositivo está online */
  isOnline: boolean;
  /** Callback ao pressionar botão voltar */
  onBack: () => void;
  /** Área de atuação atual */
  currentArea?: string;
  /** Se o cliente tem múltiplas áreas */
  hasMultipleAreas?: boolean;
  /** Callback ao trocar área */
  onChangeArea?: () => void;
}
