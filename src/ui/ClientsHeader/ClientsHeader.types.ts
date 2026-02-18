export interface ClientsHeaderProps {
  /** Se o dispositivo está online */
  isOnline: boolean;
  /** Texto de busca atual */
  searchText: string;
  /** Callback ao digitar no campo de busca */
  onSearchChange: (text: string) => void;
}
