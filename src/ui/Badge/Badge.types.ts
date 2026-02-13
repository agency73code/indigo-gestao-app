export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'success';

export interface BadgeProps {
  /** Variante visual */
  variant?: BadgeVariant;
  /** Texto do badge */
  children: React.ReactNode;
}
