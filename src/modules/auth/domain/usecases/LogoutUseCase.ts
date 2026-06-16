import type { AuthSessionRepository } from '../repositories/AuthSessionRepository';

export class LogoutUseCase {
  constructor(private readonly authSessionRepository: AuthSessionRepository) {}

  async execute(): Promise<void> {
    await this.authSessionRepository.clearSession();
  }
}
