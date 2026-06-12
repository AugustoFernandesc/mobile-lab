import { useState } from 'react';

import { AuthRepositoryImpl } from '../../data/repositories/AuthRepositoryImpl';
import { LoginUseCase } from '../../domain/usecases/LoginUseCase';

const loginUseCase = new LoginUseCase(new AuthRepositoryImpl());

export function useLoginViewModel() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleLogin() {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      await loginUseCase.execute({ email, password });
    } catch {
      setErrorMessage('Nao foi possivel realizar o login.');
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
