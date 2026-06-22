import { api } from '../../../infra/http/api';
import { decodeJwtPayload } from '../../../infra/http/jwt';
import type { AuthSession } from '../domain/entities/AuthSession';
import type { LoginCredentials } from '../domain/entities/LoginCredentials';
import type { UserRole } from '../domain/entities/User';
import type { LoginRequestDTO, LoginResponseDTO } from './auth.types';

function removeBearerPrefix(token: string) {
  return token.replace(/^Bearer\s+/i, '');
}

function onlyDigits(value: string) {
  return value.replace(/\D/g, '');
}

function mapSession(response: LoginResponseDTO): AuthSession {
  const claims = decodeJwtPayload(response.token);

  const id = response.id ?? claims?.sub;
  const idPeople = response.id_people ?? claims?.id_people;
  const role: UserRole = response.role ?? claims?.role ?? 'student';

  if (!id || !idPeople) {
    throw new Error('Resposta de login sem identificador do usuário.');
  }

  return {
    accessToken: removeBearerPrefix(response.token),
    refreshToken: removeBearerPrefix(response.refresh_token),
    user: {
      id,
      idPeople,
      name: response.name ?? claims?.name ?? 'Usuario',
      role,
    },
  };
}

export async function login(credentials: LoginCredentials): Promise<AuthSession> {
  const payload: LoginRequestDTO = {
    cpf: onlyDigits(credentials.cpf),
    password: credentials.password.trim(),
  };

  const response = await api.post<LoginResponseDTO>('/mobile/login', payload);

  return mapSession(response.data);
}
