import type { ReactNode } from 'react';

export interface SelectItemProps {
  /** Texto principal do item */
  title: string;
  /** Conteúdo customizado para substituir o título texto (ex: SpecialtyChip) */
  titleContent?: ReactNode;
  /** Texto secundário (opcional) */
  subtitle?: string;
  /** Se o item está selecionado */
  selected: boolean;
  /** Callback ao pressionar */
  onPress: () => void;
  /** Tipo de indicador: radio (single select) ou check (multi select) */
  type?: 'radio' | 'check';
}
