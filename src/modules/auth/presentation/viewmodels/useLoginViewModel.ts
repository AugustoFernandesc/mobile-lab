import { useState } from 'react';
import axios from 'axios';

import { useAuth } from '../context/AuthContext';
import { AuthRepositoryImpl } from '../../data/repositories/AuthRepositoryImpl';
import { LoginUseCase } from '../../domain/usecases/LoginUseCase';

const loginUseCase = new LoginUseCase(new AuthRepositoryImpl());

export function useLoginViewModel() {
  const { completeSignIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleLogin(): Promise<boolean> {
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Preencha login e senha para continuar.');
      return false;
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);

      const session = await loginUseCase.execute({ email, password });
      await completeSignIn(session);

      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        if (message === 'Invalid email' || message === 'Invalid username or password') {
          setErrorMessage('Email ou senha inválidos.');
        } else {
          setErrorMessage('Erro ao realizar login.');
        }
      } else {
        setErrorMessage('Erro ao realizar login.');
      }

      return false;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    email,
    password,
    isLoading,
    errorMessage,
    setEmail,
    setPassword,
    handleLogin,
  };
}
