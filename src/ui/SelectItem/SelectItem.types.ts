export interface SelectItemProps {
  /** Texto principal do item */
  title: string;
  /** Texto secundário (opcional) */
  subtitle?: string;
  /** Se o item está selecionado */
  selected: boolean;
  /** Callback ao pressionar */
  onPress: () => void;
  /** Tipo de indicador: radio (single select) ou check (multi select) */
  type?: 'radio' | 'check';
}
