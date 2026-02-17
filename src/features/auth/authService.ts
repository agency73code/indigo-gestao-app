import { createHttpClient, HttpError } from "./httpClient";
import { useAuthStore } from "./store";
import { AuthSession, LoginPayload, LoginResponse } from "./types";

const httpClient = createHttpClient();

function toAuthSession(response: LoginResponse): AuthSession {
    return {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        user: response.user,
    };
}

function assertValidLoginResponse(data: LoginResponse): void {
    if (!data.success || !data.accessToken || !data.refreshToken || !data.user) {
        throw new HttpError(401, data, 'Invalid login response payload');
    }
}

export const authService = {
    async login(payload: LoginPayload): Promise<AuthSession> {
        const data = await httpClient.post<LoginResponse>('/auth/login', payload, { auth: false });
        assertValidLoginResponse(data);

        const session = toAuthSession(data);
        await useAuthStore.getState().setSession(session);

        return session;
    },

    async logout(): Promise<void> {
        try {
            await httpClient.post('/auth/logout');
        } catch (error) {
            if (!(error instanceof HttpError) || error.status >= 500) {
                console.warn('Remote logout failed; clearing local session anyway.', error);
            }
        } finally {
            await useAuthStore.getState().clearSession();
        }
    },

    async me(): Promise<AuthSession['user']> {
        return httpClient.get<AuthSession['user']>('/auth/me');
    },

    async validateSession(): Promise<boolean> {
        try {
            await authService.me();
            return true;
        } catch {
            await useAuthStore.getState().clearSession();
            return false;
        }
    },

    async forgotPassword(email: string): Promise<void> {
        await httpClient.post('/auth/forgot-password', { email }, { auth: false });
    },

    async resetPassword(token: string, password: string): Promise<void> {
        await httpClient.post('/auth/reset-password', { token, password }, { auth: false });
    },
};