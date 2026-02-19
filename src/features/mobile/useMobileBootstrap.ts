import { useEffect } from 'react';
import { useAuthStore } from '@/src/features/auth/store';
import { mobileBootstrapService } from './mobileBootstrapService';

export function useMobileBootstrap(enabled: boolean): void {
    const authStatus = useAuthStore((state) => state.status);

    useEffect(() => {
        if (!enabled) return;
        if (authStatus !== 'authenticated') return;

        void mobileBootstrapService.runBootstrap();
    }, [enabled, authStatus]);
}