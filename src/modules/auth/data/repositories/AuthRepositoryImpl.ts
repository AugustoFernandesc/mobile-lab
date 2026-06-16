import { api } from '../../../../infra/http/api';
import type { AuthSession } from '../../domain/entities/AuthSession';
import type { LoginCredentials } from '../../domain/entities/LoginCredentials';
import type { AuthRepository } from '../../domain/repositories/AuthRepository';
import type { LoginRequestDTO } from '../dtos/LoginRequestDTO';
import type { LoginResponseDTO } from '../dtos/LoginResponseDTO';

function removeBearerPrefix(token: string) {
  return token.replace(/^Bearer\s+/i, '');
}

function mapSession(response: LoginResponseDTO, fallbackLogin: string): AuthSession {
  return {
    accessToken: removeBearerPrefix(response.token),
    refreshToken: removeBearerPrefix(response.refresh_token),
    user: {
      id: response.user?.id ?? fallbackLogin,
      name: response.user?.name ?? 'Usuario',
      email: response.user?.email ?? fallbackLogin,
    },
  };
}

export class AuthRepositoryImpl implements AuthRepository {
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    const payload: LoginRequestDTO = {
      login: credentials.email.trim().toLowerCase(),
      password: credentials.password.trim(),
    };

    const response = await api.post<LoginResponseDTO>('/login', payload);

    return mapSession(response.data, payload.login);
  }

  async refresh(refreshToken: string): Promise<AuthSession> {
    const response = await api.post<LoginResponseDTO>('/refresh-token', {
      refresh_token: refreshToken,
    });

    return mapSession(response.data, 'session@mgcode.local');
  }
}
