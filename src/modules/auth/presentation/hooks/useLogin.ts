import { useMutation } from '@tanstack/react-query';

import { login } from '../../data/auth.service';
import type { LoginCredentials } from '../../domain/entities/LoginCredentials';
import { useAuth } from '../context/AuthContext';

export function useLogin() {
  const { completeSignIn } = useAuth();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: (session) => completeSignIn(session),
  });
}
