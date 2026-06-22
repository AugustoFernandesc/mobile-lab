import type { UserRole } from '../domain/entities/User';

export interface LoginRequestDTO {
  cpf: string;
  password: string;
}

export interface LoginResponseDTO {
  token: string;
  refresh_token: string;
  name?: string;
  role?: UserRole;
  id?: string;
  id_people?: string;
}
