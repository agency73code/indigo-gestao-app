import NetInfo from '@react-native-community/netinfo';
import { useEffect } from 'react';

import { useConnectivityStore } from '@/src/core/stores/connectivity.store';

/**
 * Provider que escuta mudanças de rede via NetInfo e
 * atualiza o Zustand store de conectividade.
 *
 * Deve ser chamado UMA VEZ no RootLayout — não renderiza nada.
 */
export function useConnectivityListener(): void {
  const setOnline = useConnectivityStore((s) => s.setOnline);

  useEffect(() => {
    // Listener que dispara a cada mudança de rede
    const unsubscribe = NetInfo.addEventListener((state) => {
      const connected = state.isConnected ?? false;
      setOnline(connected);
    });

    return () => {
      unsubscribe();
    };
  }, [setOnline]);
}
