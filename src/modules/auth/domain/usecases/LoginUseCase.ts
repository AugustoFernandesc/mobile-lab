import type { LoginCredentialsDTO } from '../../data/dtos/LoginCredentialsDTO';
import type { User } from '../entities/User';
import type { AuthRepository } from '../repositories/AuthRepository';

export class LoginUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(credentials: LoginCredentialsDTO): Promise<User> {
    return this.authRepository.login(credentials);
  }
}
