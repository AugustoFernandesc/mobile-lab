import { api } from '../../../../infra/http/api';
import { tokenStorage } from '../../../../infra/storage/tokenStorage';
import type { LoginCredentialsDTO } from '../dtos/LoginCredentialsDTO';
import type { User } from '../../domain/entities/User';
import type { AuthRepository } from '../../domain/repositories/AuthRepository';

type LoginApiResponse = {
  token: string;
  refresh_token: string;
};

type LoginRequestDTO = {
  login: string;
  password: string;
};

function removeBearerPrefix(token: string) {
  return token.replace(/^Bearer\s+/i, '');
}

export class AuthRepositoryImpl implements AuthRepository {
  async login(credentials: LoginCredentialsDTO): Promise<User> {
    const payload: LoginRequestDTO = {
      login: credentials.email.trim().toLowerCase(),
      password: credentials.password.trim(),
    };
    
    
    
    const response = await api.post<LoginApiResponse>('/login', payload);
    const accessToken = removeBearerPrefix(response.data.token);
    const refreshToken = removeBearerPrefix(response.data.refresh_token);

    await tokenStorage.setToken(accessToken);
    await tokenStorage.setRefreshToken(refreshToken);

    return {
      id: payload.login,
      name: 'Usuario',
      email: payload.login,
    };
  }
}
