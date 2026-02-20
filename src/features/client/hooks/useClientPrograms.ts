import { useCallback, useEffect, useMemo, useState } from 'react';

import { clientRepository } from '@/src/data/repositories/clientRepository';
import { programRepository } from '@/src/data/repositories/programRepository';
import type { ClientDetailData } from '@/src/data/mappers/clientMapper';
import type { ProgramItemData } from '@/src/ui/ProgramCard';

interface UseClientProgramsReturn {
  client: ClientDetailData | null;
  programs: ProgramItemData[];
  currentArea: string;
  areas: string[];
  loading: boolean;
  error: string | null;
  setCurrentArea: (area: string) => void;
  refresh: () => void;
}

export function useClientPrograms(clientId: string): UseClientProgramsReturn {
  const [client, setClient] = useState<ClientDetailData | null>(null);
  const [allPrograms, setAllPrograms] = useState<Record<string, ProgramItemData[]>>({});
  const [currentArea, setCurrentArea] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!clientId) {
      setClient(null);
      setAllPrograms({});
      setCurrentArea('');
      setError('Cliente inválido');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [clientData, programsByArea] = await Promise.all([
        clientRepository.getById(clientId),
        programRepository.getByClient(clientId),
      ]);

      if (!clientData) {
        setClient(null);
        setAllPrograms({});
        setCurrentArea('');
        setError('Cliente não encontrado');
        return;
      }

      setClient(clientData);
      setAllPrograms(programsByArea);

      const areasList = Object.keys(programsByArea);
      setCurrentArea((previousArea) => {
        if (previousArea && areasList.includes(previousArea)) {
          return previousArea;
        }

        return areasList[0] ?? '';
      });
    } catch (err) {
      console.error('[useClientPrograms] fetchData error:', err);
      const message =
        err instanceof Error ? err.message : 'Erro ao carregar programas';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const areas = useMemo(() => Object.keys(allPrograms), [allPrograms]);

  const programs = useMemo(
    () => allPrograms[currentArea] ?? [],
    [allPrograms, currentArea],
  );

  return {
    client,
    programs,
    currentArea,
    areas,
    loading,
    error,
    setCurrentArea,
    refresh: () => {
      void fetchData();
    },
  };
}
