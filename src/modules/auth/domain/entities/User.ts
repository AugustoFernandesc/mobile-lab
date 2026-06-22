export type UserRole = 'student' | 'personal';

export interface User {
  id: string;
  idPeople: string;
  name: string;
  role: UserRole;
  email?: string;
}
