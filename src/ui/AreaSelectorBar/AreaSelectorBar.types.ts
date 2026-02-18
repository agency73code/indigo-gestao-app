export interface AreaSelectorBarProps {
  /** Especialidade atualmente selecionada */
  currentArea: string;
  /** Se o cliente tem mais de uma área disponível */
  hasMultipleAreas: boolean;
  /** Callback ao pressionar "Trocar" */
  onChangeArea: () => void;
}
