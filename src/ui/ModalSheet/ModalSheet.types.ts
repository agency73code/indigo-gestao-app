import type { ReactNode } from 'react';

export interface ModalSheetProps {
  /** Controla visibilidade do modal */
  isOpen: boolean;
  /** Callback ao fechar (tap no overlay ou botão) */
  onClose: () => void;
  /** Título do modal (heading) */
  title: string;
  /** Subtítulo opcional abaixo do título */
  subtitle?: string;
  /** Conteúdo do body (entre separator e footer) */
  children: ReactNode;
  /** Conteúdo do footer (botões de ação) */
  footer?: ReactNode;
}
