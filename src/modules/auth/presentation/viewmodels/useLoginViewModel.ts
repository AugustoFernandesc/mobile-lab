import { useState } from 'react';
import axios from 'axios';

import { useLogin } from '../hooks/useLogin';

export function useLoginViewModel() {
  const loginMutation = useLogin();

  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleLogin(): Promise<boolean> {
    if (!cpf.trim() || !password.trim()) {
      setErrorMessage('Preencha CPF e senha para continuar.');
      return false;
    }

    try {
      setErrorMessage(null);

      await loginMutation.mutateAsync({ cpf, password });

      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        if (message === 'CPF ou senha inválidos' || message === 'CPF é obrigatório') {
          setErrorMessage('CPF ou senha inválidos.');
        } else {
          setErrorMessage('Erro ao realizar login.');
        }
      } else {
        setErrorMessage('Erro ao realizar login.');
      }

      return false;
    }
  }

  return {
    cpf,
    password,
    isLoading: loginMutation.isPending,
    errorMessage,
    setCpf,
    setPassword,
    handleLogin,
  };
}
