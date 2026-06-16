import type { AuthSession } from '../../modules/auth/domain/entities/AuthSession';
import { secureStorage } from './secureStorage';

const ACCESS_TOKEN_KEY = 'mgcode.mobile_base.access_token';
const REFRESH_TOKEN_KEY = 'mgcode.mobile_base.refresh_token';
const USER_KEY = 'mgcode.mobile_base.user';

export const tokenStorage = {
  async getSession(): Promise<AuthSession | null> {
    const [accessToken, refreshToken, userJson] = await Promise.all([
      secureStorage.getItem(ACCESS_TOKEN_KEY),
      secureStorage.getItem(REFRESH_TOKEN_KEY),
      secureStorage.getItem(USER_KEY),
    ]);

    if (!accessToken || !refreshToken || !userJson) {
      return null;
    }

    try {
      return {
        accessToken,
        refreshToken,
        user: JSON.parse(userJson),
      };
    } catch {
      await this.clearSession();
      return null;
    }
  },

  async saveSession(session: AuthSession): Promise<void> {
    await Promise.all([
      secureStorage.setItem(ACCESS_TOKEN_KEY, session.accessToken),
      secureStorage.setItem(REFRESH_TOKEN_KEY, session.refreshToken),
      secureStorage.setItem(USER_KEY, JSON.stringify(session.user)),
    ]);
  },

  async getToken(): Promise<string | null> {
    return secureStorage.getItem(ACCESS_TOKEN_KEY);
  },

  async getRefreshToken(): Promise<string | null> {
    return secureStorage.getItem(REFRESH_TOKEN_KEY);
  },

  async setToken(token: string): Promise<void> {
    await secureStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  async setRefreshToken(refreshToken: string): Promise<void> {
    await secureStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  async clearSession(): Promise<void> {
    await Promise.all([
      secureStorage.removeItem(ACCESS_TOKEN_KEY),
      secureStorage.removeItem(REFRESH_TOKEN_KEY),
      secureStorage.removeItem(USER_KEY),
    ]);
  },
};
