import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
  AuthRepositoryImpl,
  DEMO_AUTH_CREDENTIALS,
} from '../../data/repositories/AuthRepositoryImpl';
import { LoginUseCase } from '../../domain/usecases/LoginUseCase';
import type { RootStackParamList } from '../../../../routes/app.routes';

export function useLoginViewModel() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const loginUseCase = new LoginUseCase(new AuthRepositoryImpl());  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleLogin(): Promise<boolean> {
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Preencha email e senha para continuar.');
      return false;
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);

      await loginUseCase.execute({ email, password });
      navigation.navigate('Home');

      return true;
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Nao foi possivel realizar o login.'
      );
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
    demoCredentials: DEMO_AUTH_CREDENTIALS,
    setEmail,
    setPassword,
    handleLogin,
  };
}
