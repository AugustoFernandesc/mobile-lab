import type { AuthSession } from '../../domain/entities/AuthSession';
import type { AuthSessionRepository } from '../../domain/repositories/AuthSessionRepository';
import { tokenStorage } from '../../../../infra/storage/tokenStorage';

export class AuthSessionRepositoryImpl implements AuthSessionRepository {
  async getSession(): Promise<AuthSession | null> {
    return tokenStorage.getSession();
  }

  async saveSession(session: AuthSession): Promise<void> {
    await tokenStorage.saveSession(session);
  }

  async clearSession(): Promise<void> {
    await tokenStorage.clearSession();
  }

  async getAccessToken(): Promise<string | null> {
    return tokenStorage.getToken();
  }

  async getRefreshToken(): Promise<string | null> {
    return tokenStorage.getRefreshToken();
  }
}
