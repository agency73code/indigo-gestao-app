import { useConnectivityStore } from '@/src/core/stores/connectivity.store';

interface UseConnectivityReturn {
  /** `true` se o dispositivo está conectado à internet */
  isOnline: boolean;
}

/**
 * ⚠️  Trocar para `true` para forçar estado offline (teste de UI).
 * NUNCA commitar como `true`.
 */
const FORCE_OFFLINE = true;

/**
 * Hook para consumir o status de conectividade em qualquer tela.
 *
 * Depende do `useConnectivityListener()` estar ativo no RootLayout.
 */
export function useConnectivity(): UseConnectivityReturn {
  const isOnline = useConnectivityStore((s) => s.isOnline);
  return { isOnline: FORCE_OFFLINE ? false : isOnline };
}
