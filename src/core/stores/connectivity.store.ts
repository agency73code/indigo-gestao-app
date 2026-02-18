import { create } from 'zustand';

interface ConnectivityState {
  /** Indica se o dispositivo está conectado à internet */
  isOnline: boolean;
  /** Atualiza o estado de conectividade */
  setOnline: (value: boolean) => void;
}

/**
 * Store global mínimo para status de conectividade.
 *
 * Atualizado pelo ConnectivityProvider (que escuta NetInfo).
 * Consumido pelo hook useConnectivity().
 */
export const useConnectivityStore = create<ConnectivityState>((set) => ({
  isOnline: true, // assume online até NetInfo dizer o contrário
  setOnline: (value: boolean) => set({ isOnline: value }),
}));
