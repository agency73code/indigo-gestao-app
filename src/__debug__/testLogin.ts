import { authService } from "../features/auth/authService";
import { HttpError } from "../features/auth/httpClient";
import { useAuthStore } from "../features/auth/store";


export async function testLogin() {
  try {
    console.log('[debug] starting login test');

    const session = await authService.login({
      accessInfo: 'Gubio_Santos.RnfU@indigogestao.com',
      password: 'Senha123',
    });

    console.log('[debug] login response', session);

    const state = useAuthStore.getState();
    console.log('[debug] store after login', {
      status: state.status,
      hasSession: !!state.session,
    });

  } catch (error) {
    if (error instanceof HttpError) {
        console.log('[debug] login failed (HttpError)', {
            status: error.status,
            data: error.data,
        });
    } else {
        console.log('[debug] login failed (unknown)', error);
    }
  }
}