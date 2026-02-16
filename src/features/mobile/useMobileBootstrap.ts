import { useEffect } from 'react';
import { useAuthStore } from '@/src/features/auth/store';
import { mobileBootstrapService } from './mobileBootstrapService';

export function useMobileBootstrap(): void {
    const authStatus = useAuthStore((state) => state.status);

    useEffect(() => {
        if (authStatus !== 'authenticated') {
            return;
        }

        void mobileBootstrapService.runBootstrap();
    }, [authStatus]);
}