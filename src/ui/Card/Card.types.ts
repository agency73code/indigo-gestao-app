export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps {
  /** Padding interno do card */
  padding?: CardPadding;
  /** Conteúdo do card */
  children: React.ReactNode;
}
