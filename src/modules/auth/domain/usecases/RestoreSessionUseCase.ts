import type { AuthSession } from '../entities/AuthSession';
import type { AuthSessionRepository } from '../repositories/AuthSessionRepository';

export class RestoreSessionUseCase {
  constructor(private readonly authSessionRepository: AuthSessionRepository) {}

  async execute(): Promise<AuthSession | null> {
    return this.authSessionRepository.getSession();
  }
}
