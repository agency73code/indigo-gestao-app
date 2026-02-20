import type { SyncStatus } from '../StatusPill/StatusPill.types';

export interface HomeHeaderProps {
  /** URL ou require() da imagem do avatar */
  avatarSource?: string | number | null;
  /** Nome do usuário para exibição */
  userName: string;
  /** Status da sincronização */
  syncStatus: SyncStatus;
  /** Quantidade de itens pendentes (para StatusPill) */
  syncCount?: number;
  /** Se há notificações não lidas */
  hasNotification?: boolean;
  /** Callback ao pressionar o botão de notificação */
  onNotificationPress?: () => void;
}
