export type AppTextVariant = 'pageTitle' | 'cardTitle' | 'label' | 'body' | 'muted';

export interface AppTextProps {
  /** Variante tipográfica */
  variant?: AppTextVariant;
  /** Conteúdo textual */
  children: React.ReactNode;
}
