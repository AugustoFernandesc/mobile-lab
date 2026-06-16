import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { setUnauthorizedHandler } from '../../../../infra/http/api';
import type { AuthSession } from '../../domain/entities/AuthSession';
import { LogoutUseCase } from '../../domain/usecases/LogoutUseCase';
import { RestoreSessionUseCase } from '../../domain/usecases/RestoreSessionUseCase';
import { AuthSessionRepositoryImpl } from '../../data/repositories/AuthSessionRepositoryImpl';

type AuthContextData = {
  session: AuthSession | null;
  isAuthenticated: boolean;
  isBootstrapping: boolean;
  completeSignIn: (session: AuthSession) => Promise<void>;
  signOut: () => Promise<void>;
};

const authSessionRepository = new AuthSessionRepositoryImpl();
const restoreSessionUseCase = new RestoreSessionUseCase(authSessionRepository);
const logoutUseCase = new LogoutUseCase(authSessionRepository);

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    async function bootstrapSession() {
      try {
        const restoredSession = await restoreSessionUseCase.execute();
        setSession(restoredSession);
      } finally {
        setIsBootstrapping(false);
      }
    }

    bootstrapSession();
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(async () => {
      await signOut();
    });

    return () => setUnauthorizedHandler(null);
  }, []);

  async function completeSignIn(nextSession: AuthSession) {
    await authSessionRepository.saveSession(nextSession);
    setSession(nextSession);
  }

  async function signOut() {
    await logoutUseCase.execute();
    setSession(null);
  }

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: !!session?.accessToken,
      isBootstrapping,
      completeSignIn,
      signOut,
    }),
    [isBootstrapping, session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
