import type { ProgramStatus } from '@/src/ui/ProgramStatusBadge';

export interface ProgramItemData {
  /** ID único do programa */
  id: string;
  /** Nome do programa (ex: "Comunicação funcional") */
  name: string;
  /** Especialidade associada (label completo) */
  specialty: string;
  /** Label de última sessão (ex: "há 2 dias") */
  lastSessionLabel: string;
  /** Status do programa */
  status: ProgramStatus;
  /** Contagem de registros pendentes (quando status='pending') */
  pendingCount?: number;
}

export interface ProgramCardProps {
  /** Dados do programa */
  item: ProgramItemData;
  /** Callback ao pressionar "Nova sessão" */
  onNewSession: (programId: string) => void;
  /** Callback ao pressionar "Ver sessões" */
  onViewSessions: (programId: string) => void;
  /** Callback ao pressionar o card inteiro */
  onPress: (programId: string) => void;
  /** Callback ao pressionar menu (3 pontinhos) */
  onMenu: (programId: string) => void;
}
