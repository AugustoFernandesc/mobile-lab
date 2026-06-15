import type { LoginCredentialsDTO } from '../dtos/LoginCredentialsDTO';
import type { User } from '../../domain/entities/User';
import type { AuthRepository } from '../../domain/repositories/AuthRepository';

export const DEMO_AUTH_CREDENTIALS = {
  email: 'demo@mobile.com',
  password: '123456',
};

export class AuthRepositoryImpl implements AuthRepository {
  async login(credentials: LoginCredentialsDTO): Promise<User> {
    const normalizedEmail = credentials.email.trim().toLowerCase();
    const normalizedPassword = credentials.password.trim();

    if (
      normalizedEmail !== DEMO_AUTH_CREDENTIALS.email ||
      normalizedPassword !== DEMO_AUTH_CREDENTIALS.password
    ) {
      throw new Error('Email ou senha invalidos.');
    }

    return {
      id: '1',
      name: 'Usuario Demo',
      email: DEMO_AUTH_CREDENTIALS.email,
    };
  }
}
