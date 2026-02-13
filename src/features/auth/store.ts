import { create } from 'zustand';
import { AuthSession } from './types';
import { clearSession as clearSessionStorage, getSession, saveSession } from './storage';

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

type AuthState = {
    status: AuthStatus;
    session: AuthSession | null;
    bootstrap: () => Promise<void>;
    setSession: (session: AuthSession) => Promise<void>;
    clearSession: () => Promise<void>;
    logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
    status: 'loading',
    session: null,

    bootstrap: async (): Promise<void> => {
        const session = await getSession();

        set({
            session,
            status: session ? 'authenticated' : 'unauthenticated',
        });
    },

    setSession: async (session: AuthSession): Promise<void> => {
        await saveSession(session);

        set({
            session,
            status: 'authenticated',
        });
    },

    clearSession: async (): Promise<void> => {
        await clearSessionStorage();

        set({
            session: null,
            status: 'unauthenticated',
        });
    },

    logout: async (): Promise<void> => {
        await clearSessionStorage();

        set({
            session: null,
            status: 'unauthenticated',
        });
    },
}));