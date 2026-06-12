import type { LoginCredentialsDTO } from '../dtos/LoginCredentialsDTO';
import type { User } from '../../domain/entities/User';
import type { AuthRepository } from '../../domain/repositories/AuthRepository';

export class AuthRepositoryImpl implements AuthRepository {
  async login(credentials: LoginCredentialsDTO): Promise<User> {
    return {
      id: '1',
      name: 'Usuario Demo',
      email: credentials.email,
    };
  }
}
