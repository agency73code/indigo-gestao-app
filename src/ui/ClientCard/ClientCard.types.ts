export interface ClientItemData {
  /** ID único do cliente */
  id: string;
  /** Nome completo */
  name: string;
  /** Idade em anos */
  age: number;
  /** URL da foto */
  avatarUrl: string;
  /** Iniciais para fallback do avatar */
  fallbackInitials: string;
  /** Lista de especialidades (labels completos) */
  specialties: string[];
}

export interface ClientCardProps {
  /** Dados do cliente */
  item: ClientItemData;
  /** Callback ao pressionar o card */
  onPress: (id: string) => void;
  /** Máximo de chips visíveis antes do "+N" */
  maxChips?: number;
}
