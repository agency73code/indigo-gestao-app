export interface AreaSelectorBarProps {
  /** Área atualmente selecionada ('Todos' = todas) */
  currentArea: string;
  /** Lista de áreas disponíveis para o cliente */
  areas: string[];
  /** Callback ao selecionar uma área */
  onSelectArea: (area: string) => void;
}
