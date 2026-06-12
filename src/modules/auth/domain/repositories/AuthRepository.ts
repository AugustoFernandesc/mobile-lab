import type { LoginCredentialsDTO } from '../../data/dtos/LoginCredentialsDTO';
import type { User } from '../entities/User';

export interface AuthRepository {
  login(credentials: LoginCredentialsDTO): Promise<User>;
}
