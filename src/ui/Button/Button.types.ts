export type ButtonVariant = 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  /** Variante visual do botão */
  variant?: ButtonVariant;
  /** Tamanho do botão */
  size?: ButtonSize;
  /** Desabilitar interação */
  disabled?: boolean;
  /** Callback ao pressionar */
  onPress?: () => void;
  /** Conteúdo textual */
  children: React.ReactNode;
}
