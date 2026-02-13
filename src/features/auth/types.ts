export type AuthUser = {
  id: string;
  name: string;
  email: string | null;
  perfil_acesso: string;
  area_atuacao: unknown;
  avatar_url: string | null;
};

export type AuthSession = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};

export type LoginPayload = {
  accessInfo: string;
  password: string;
  deviceName?: string;
};

export type LoginResponse = {
  success: boolean;
  message?: string;
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};
