import type { SessionItemData } from '@/src/ui/SessionCard';

export interface RecentSessionsProps {
  /** Lista de sessões a exibir */
  sessions: SessionItemData[];
  /** Callback ao pressionar uma sessão */
  onSessionPress: (id: string) => void;
}
