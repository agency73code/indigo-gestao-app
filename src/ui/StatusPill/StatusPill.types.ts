/**
 * Status do sync para o pill do header.
 *
 * - allSent: Conectado • Tudo enviado
 * - sending: Conectado • Enviando N sessões
 * - error: Conectado • N com falha
 * - offline: Sem internet • N salvas no celular
 */
export type SyncStatus = 'allSent' | 'sending' | 'error' | 'offline';

export interface StatusPillProps {
  /** Estado atual da sincronização */
  status: SyncStatus;
  /** Quantidade de itens pendentes/falhos (obrigatório para sending, error, offline) */
  count?: number;
}
