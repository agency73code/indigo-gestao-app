import { useCallback, useEffect, useMemo, useState } from 'react';

import { MOCK_CLIENTS } from '@/src/features/client/mocks/clients.mock';
import type { ClientItemData } from '@/src/ui/ClientCard';

/**
 * Flag para controlar uso de mock.
 * Trocar para `false` quando a API real estiver integrada.
 */
const USE_MOCK = true;

interface UseClientsReturn {
  clients: ClientItemData[];
  loading: boolean;
  error: string | null;
  searchText: string;
  setSearchText: (text: string) => void;
  refresh: () => void;
}

/**
 * Hook que fornece a lista de clientes com busca por nome.
 *
 * Quando `USE_MOCK = true`, retorna dados mockados.
 * Quando `USE_MOCK = false`, chamará o repository real (a implementar).
 *
 * Fluxo futuro: useClients → clientRepository.getAll() → SQLite
 */
export function useClients(): UseClientsReturn {
  const [allClients, setAllClients] = useState<ClientItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  const fetchClients = useCallback(() => {
    setLoading(true);
    setError(null);

    try {
      if (USE_MOCK) {
        setAllClients(MOCK_CLIENTS);
        setLoading(false);
        return;
      }

      // TODO: usar clientRepository.getAll() quando disponível
      // const data = await clientRepository.getAll();
      // setAllClients(data);
      setLoading(false);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro ao carregar clientes';
      setError(message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  /** Filtra clientes pelo nome (case-insensitive) */
  const clients = useMemo(() => {
    if (!searchText.trim()) {
      return allClients;
    }

    const query = searchText.toLowerCase().trim();
    return allClients.filter((client) =>
      client.name.toLowerCase().includes(query),
    );
  }, [allClients, searchText]);

  return {
    clients,
    loading,
    error,
    searchText,
    setSearchText,
    refresh: fetchClients,
  };
}
