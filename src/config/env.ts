const rawApiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

function isValidUrl(value: string): boolean {
    try {
        const url = new URL(value);
        return Boolean(url.protocol && url.host);
    } catch {
        return false;
    }
}

function buildEnvErrorMessage(value: string | undefined): string {
    if (!value) {
        return 'Missing EXPO_PUBLIC_API_BASE_URL. Define it in your Expo env (.env / eas env).';
    }

    return `Invalid EXPO_PUBLIC_API_BASE_URL: "${value}".`;
}

function resolveApiBaseUrl(): string {
    const value = rawApiBaseUrl?.trim();

    if (!value || !isValidUrl(value)) {
        const message = buildEnvErrorMessage(value);

        if (__DEV__) {
            throw new Error(message)
        }

        console.error(message);
        return '';
    }
    
    return value.replace(/\/$/, '');
}

export const API_BASE_URL = resolveApiBaseUrl();