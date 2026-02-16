export interface InputFieldProps {
  /** Label exibido acima do input */
  label?: string;
  /** Mensagem de erro exibida abaixo */
  error?: string;
  /** Placeholder do input */
  placeholder?: string;
  /** Valor controlado */
  value?: string;
  /** Callback de mudança de valor */
  onChangeText?: (text: string) => void;
  /** Desabilitar interação */
  disabled?: boolean;
  /** Tipo de teclado */
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  /** Esconder texto (password) */
  secureTextEntry?: boolean;
  /** Elemento renderizado à direita dentro do input (ex: ícone de toggle senha) */
  rightElement?: React.ReactNode;
}
