export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  /** URL (string) ou require() (number) da imagem */
  source: string | number;
  /** Tamanho do avatar: sm=32, md=44, lg=56, xl=72 */
  size?: AvatarSize;
  /** Iniciais para fallback (ex: "NO" para Natan Oliveira) */
  fallbackInitials?: string;
  /** Label de acessibilidade */
  accessibilityLabel?: string;
}
