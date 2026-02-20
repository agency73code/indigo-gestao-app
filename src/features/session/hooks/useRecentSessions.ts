import { useCallback, useEffect, useState } from 'react';

import { sessionRepository } from '@/src/data/repositories/sessionRepository';
import type { SessionItemData } from '@/src/ui/SessionCard';

interface UseRecentSessionsReturn {
  sessions: SessionItemData[];
  pendingCount: number;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

/**
 * Hook que fornece as sessões recentes para a Home.
 */
export function useRecentSessions(): UseRecentSessionsReturn {
  const [sessions, setSessions] = useState<SessionItemData[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [data, pending] = await Promise.all([
        sessionRepository.getRecent(),
        sessionRepository.getPendingCount(),
      ]);
      setSessions(data);
      setPendingCount(pending);
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
    pendingCount,
    loading,
    error,
    refresh: () => {
      void fetchSessions();
    },
  };
}
