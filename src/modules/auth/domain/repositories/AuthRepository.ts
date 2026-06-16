import type { AuthSession } from '../entities/AuthSession';
import type { LoginCredentials } from '../entities/LoginCredentials';

export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<AuthSession>;
  refresh(refreshToken: string): Promise<AuthSession>;
}
