import { useCallback, useEffect, useMemo, useState } from 'react';

import { clientRepository } from '@/src/data/repositories/clientRepository';
import type { ClientItemData } from '@/src/ui/ClientCard';

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
 */
export function useClients(): UseClientsReturn {
  const [allClients, setAllClients] = useState<ClientItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await clientRepository.getAll();
      setAllClients(data);
    } catch (err) {
      console.error('[useClients] getAll error:', err);
      const message =
        err instanceof Error ? err.message : 'Erro ao carregar clientes';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchClients();
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
    refresh: () => {
      void fetchClients();
    },
  };
}
