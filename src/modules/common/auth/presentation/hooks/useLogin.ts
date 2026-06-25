import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { login } from '../../data/auth.service';
import type { LoginCredentials } from '../../data/auth.types';
import { useAuth } from '../context/AuthContext';

export function useLogin() {
  const { completeSignIn } = useAuth();

  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: (session) => completeSignIn(session),
  });

  async function handleLogin(): Promise<boolean> {
    if (!cpf.trim() || !password.trim()) {
      setErrorMessage('Preencha CPF e senha para continuar.');
      return false;
    }

    try {
      setErrorMessage(null);
      await mutation.mutateAsync({ cpf, password });
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;
        setErrorMessage(
          message === 'CPF ou senha inválidos' || message === 'CPF é obrigatório'
            ? 'CPF ou senha inválidos.'
            : 'Erro ao realizar login.'
        );
      } else {
        setErrorMessage('Erro ao realizar login.');
      }
      return false;
    }
  }

  return {
    cpf,
    password,
    isLoading: mutation.isPending,
    errorMessage,
    setCpf,
    setPassword,
    handleLogin,
  };
}
