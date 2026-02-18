export type SpecialtyKey =
  | 'fonoaudiologia'
  | 'terapia_aba'
  | 'fisioterapia'
  | 'psicologia'
  | 'terapia_ocupacional'
  | 'neuropsicologia';

export interface SessionItemData {
  /** ID único da sessão */
  id: string;
  /** URL ou require() da foto do paciente */
  avatarSource: string | number;
  /** Nome completo do paciente */
  patientName: string;
  /** Iniciais para fallback do avatar */
  fallbackInitials: string;
  /** Idade do paciente (ex: "12 anos") */
  age: string;
  /** Chave da especialidade */
  specialty: SpecialtyKey;
  /** Label da especialidade exibida no chip */
  specialtyLabel: string;
  /** Tempo decorrido (ex: "Há 2 horas") */
  timeAgo: string;
}

export interface SessionCardProps {
  /** Dados da sessão */
  item: SessionItemData;
  /** Callback ao pressionar o card */
  onPress: (id: string) => void;
  /** Se deve exibir o separador inferior */
  showSeparator: boolean;
}
