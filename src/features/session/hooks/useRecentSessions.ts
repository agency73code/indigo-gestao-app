import { useCallback, useEffect, useState } from 'react';

import { MOCK_RECENT_SESSIONS } from '@/src/features/session/mocks/recentSessions.mock';
import type { SessionItemData } from '@/src/ui/SessionCard';

/**
 * Flag para controlar uso de mock.
 * Trocar para `false` quando a API real estiver integrada.
 */
const USE_MOCK = true;

interface UseRecentSessionsReturn {
  sessions: SessionItemData[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

/**
 * Hook que fornece as sessões recentes para a Home.
 *
 * Quando `USE_MOCK = true`, retorna dados mockados.
 * Quando `USE_MOCK = false`, chamará o repository real (a implementar).
 *
 * Fluxo futuro: useRecentSessions → sessionRepository.getRecent() → SQLite
 */
export function useRecentSessions(): UseRecentSessionsReturn {
  const [sessions, setSessions] = useState<SessionItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = useCallback(() => {
    setLoading(true);
    setError(null);

    try {
      if (USE_MOCK) {
        // Simula um pequeno delay para parecer real
        setSessions(MOCK_RECENT_SESSIONS);
        setLoading(false);
        return;
      }

      // TODO: usar sessionRepository.getRecent() quando disponível
      // const data = await sessionRepository.getRecent();
      // setSessions(data);
      setLoading(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar sessões';
      setError(message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return { sessions, loading, error, refresh: fetchSessions };
}
