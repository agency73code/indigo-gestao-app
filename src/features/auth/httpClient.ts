import { clearSession, getSession, saveSession } from './storage';
import type { AuthSession, LoginResponse } from './types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? '';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type RequestOptions = {
    method?: HttpMethod;
    headers?: Record<string, string>;
    body?: unknown;
    auth?: boolean;
};

export class HttpError extends Error {
    status: number;
    data: unknown;

    constructor(status: number, data: unknown, message = 'HTTP Error') {
        super(message);
        this.status = status;
        this.data = data;
    }
}

// MELHORIA 1: Singleton para evitar race condition no refresh
let refreshPromise: Promise<boolean> | null = null;

export function createHttpClient(baseUrl = API_BASE_URL) {
    async function request<T>(path: string, options: RequestOptions = {}, retry = true): Promise<T> {
        const method = options.method ?? 'GET';
        const authEnabled = options.auth ?? true;

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers ?? {}),
        };

        if (authEnabled) {
            const session = await getSession();
            if (session?.accessToken) headers.Authorization = `Bearer ${session.accessToken}`;
        }

        const res = await fetch(`${baseUrl}${path}`, {
            method,
            headers,
            body: options.body === undefined ? undefined : JSON.stringify(options.body),
        });

        // tenta ler body como json (ou texto)
        const rawText = await res.text();
        const data = rawText ? safeJsonParse(rawText) : null;

        // Se 401 e authEnabled, tenta refresh 1x e refaz
        if (res.status === 401 && authEnabled && retry) {
            const refreshed = await tryRefresh(baseUrl);
            if (refreshed) {
                return request<T>(path, options, false);
            }
            // refresh falhou => sessão inválida
            await clearSession();
            throw new HttpError(401, data, 'Unauthorized (refresh failed)');
        }

        if (!res.ok) {
            throw new HttpError(res.status, data, `Request failed: ${method} ${path}`);
        }

        return data as T;
    }

    return {
        request,
        get: <T>(path: string, opts?: Omit<RequestOptions, 'method' | 'body'>) =>
            request<T>(path, { ...opts, method: 'GET' }),
        post: <T>(path: string, body?: unknown, opts?: Omit<RequestOptions, 'method' | 'body'>) =>
            request<T>(path, { ...opts, method: 'POST', body }),
        put: <T>(path: string, body?: unknown, opts?: Omit<RequestOptions, 'method' | 'body'>) =>
            request<T>(path, { ...opts, method: 'PUT', body }),
        patch: <T>(path: string, body?: unknown, opts?: Omit<RequestOptions, 'method' | 'body'>) =>
            request<T>(path, { ...opts, method: 'PATCH', body }),
        delete: <T>(path: string, opts?: Omit<RequestOptions, 'method' | 'body'>) =>
            request<T>(path, { ...opts, method: 'DELETE' }),
    };
}

// Race condition protegida + validação robusta
async function tryRefresh(baseUrl: string): Promise<boolean> {
    // Se já existe um refresh em andamento, reutiliza a mesma Promise
    if (refreshPromise) {
        return refreshPromise;
    }

    refreshPromise = (async () => {
        try {
            const session = await getSession();
            if (!session?.refreshToken) return false;

            const res = await fetch(`${baseUrl}/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken: session.refreshToken }),
            });

            const rawText = await res.text();
            const data = rawText ? safeJsonParse(rawText) : null;

            if (!res.ok) return false;

            const parsed = data as LoginResponse;
            
            // Validação completa da resposta
            if (!parsed?.success || !parsed?.accessToken || !parsed?.refreshToken || !parsed?.user) {
                return false;
            }

            const nextSession: AuthSession = {
                accessToken: parsed.accessToken,
                refreshToken: parsed.refreshToken,
                user: parsed.user,
            };

            await saveSession(nextSession);
            return true;
        } catch (error) {
            console.error('Refresh failed:', error);
            return false;
        } finally {
        // Limpa o singleton para permitir futuros refreshes
        refreshPromise = null;
        }
    })();

    return refreshPromise;
}

function safeJsonParse(text: string): unknown {
    try {
        return JSON.parse(text);
    } catch {
        return { raw: text };
    }
}