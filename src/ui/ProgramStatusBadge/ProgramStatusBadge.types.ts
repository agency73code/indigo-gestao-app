export type ProgramStatus = 'active' | 'pending';

export interface ProgramStatusBadgeProps {
  /** Status do programa */
  status: ProgramStatus;
  /** Contagem de registros pendentes (obrigatório quando status='pending') */
  pendingCount?: number;
}
