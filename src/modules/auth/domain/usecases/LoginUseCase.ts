import type { AuthSession } from '../entities/AuthSession';
import type { LoginCredentials } from '../entities/LoginCredentials';
import type { AuthRepository } from '../repositories/AuthRepository';

export class LoginUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(credentials: LoginCredentials): Promise<AuthSession> {
    return this.authRepository.login(credentials);
  }
}
