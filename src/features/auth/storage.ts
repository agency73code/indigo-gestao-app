import * as SecureStore from 'expo-secure-store';
import type { AuthSession } from '@/src/features/auth/types';

const KEY = 'auth_session_v1';

export async function saveSession(session: AuthSession): Promise<void> {
    await SecureStore.setItemAsync(KEY, JSON.stringify(session));
}

export async function getSession(): Promise<AuthSession | null> {
    const raw = await SecureStore.getItemAsync(KEY);
    if (!raw) return null;

    try {
        return JSON.parse(raw) as AuthSession;
    } catch {
        await SecureStore.deleteItemAsync(KEY);
        return null;
    }
}

export async function clearSession(): Promise<void> {
    await SecureStore.deleteItemAsync(KEY);
}