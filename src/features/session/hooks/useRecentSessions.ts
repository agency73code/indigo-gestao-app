import { useCallback, useEffect, useState } from 'react';

import type { SessionItemData } from '@/src/ui/SessionCard';
import { sessionRepository } from '@/src/data/repositories/sessionRepository';

interface UseRecentSessionsReturn {
  sessions: SessionItemData[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

/**
 * Hook que fornece as sessões recentes para a Home.
 */
export function useRecentSessions(): UseRecentSessionsReturn {
  const [sessions, setSessions] = useState<SessionItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await sessionRepository.getRecent();
      setSessions(data);
    } catch (err) {
      console.error('[useRecentSessions] getRecent error:', err);
      const message =
        err instanceof Error ? err.message : 'Erro ao carregar sessões';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchSessions();
  }, [fetchSessions]);

  return {
    sessions,
    loading,
    error,
    refresh: () => {
      void fetchSessions();
    },
  };
}
