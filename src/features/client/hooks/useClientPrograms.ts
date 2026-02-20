import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  MOCK_CLIENT_DETAIL,
  MOCK_PROGRAMS,
  type MockClientDetail,
} from '@/src/features/client/mocks/clientPrograms.mock';
import type { ProgramItemData } from '@/src/ui/ProgramCard';

/**
 * Flag para controlar uso de mock.
 * Trocar para `false` quando a API real estiver integrada.
 */
const USE_MOCK = true;
const TODOS_LABEL = 'Todos';

interface UseClientProgramsReturn {
  client: MockClientDetail | null;
  programs: ProgramItemData[];
  currentArea: string;
  areas: string[];
  loading: boolean;
  error: string | null;
  setCurrentArea: (area: string) => void;
  refresh: () => void;
}

/**
 * Hook que fornece dados de um cliente + seus programas ativos filtrados por área.
 *
 * Quando `USE_MOCK = true`, retorna dados mockados.
 * Quando `USE_MOCK = false`, chamará o repository real (a implementar).
 *
 * Fluxo futuro: useClientPrograms → clientRepository.getById() + programRepository.getByClient() → SQLite
 */
export function useClientPrograms(_clientId: string): UseClientProgramsReturn {
  const [client, setClient] = useState<MockClientDetail | null>(null);
  const [allPrograms, setAllPrograms] = useState<Record<string, ProgramItemData[]>>({});
  const [currentArea, setCurrentArea] = useState(TODOS_LABEL);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);

    try {
      if (USE_MOCK) {
        setClient(MOCK_CLIENT_DETAIL);
        setAllPrograms(MOCK_PROGRAMS);
        setCurrentArea(TODOS_LABEL);
        setLoading(false);
        return;
      }

      // TODO: usar repository quando disponível
      // const clientData = await clientRepository.getById(clientId);
      // const programsData = await programRepository.getByClient(clientId);
      setLoading(false);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro ao carregar programas';
      setError(message);
      setLoading(false);
    }
  }, [_clientId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const areas = useMemo(() => client?.areas ?? [], [client]);

  const programs = useMemo(() => {
    if (currentArea === TODOS_LABEL) {
      return Object.values(allPrograms).flat();
    }
    return allPrograms[currentArea] ?? [];
  }, [allPrograms, currentArea]);

  return {
    client,
    programs,
    currentArea,
    areas,
    loading,
    error,
    setCurrentArea,
    refresh: fetchData,
  };
}
