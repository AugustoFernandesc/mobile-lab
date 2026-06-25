export type UserRole = 'student' | 'personal';

export interface User {
  id: string;
  idPeople: string;
  name: string;
  role: UserRole;
  email?: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginCredentials {
  cpf: string;
  password: string;
}

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
