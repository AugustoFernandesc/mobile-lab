import type { User } from './User';

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  user: User;
}
