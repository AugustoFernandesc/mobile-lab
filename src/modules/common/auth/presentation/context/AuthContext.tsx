import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { setUnauthorizedHandler } from '../../../../../infra/http/api';
import { tokenStorage } from '../../../../../infra/storage/tokenStorage';
import type { AuthSession } from '../../data/auth.types';

type AuthContextData = {
  session: AuthSession | null;
  isAuthenticated: boolean;
  isBootstrapping: boolean;
  completeSignIn: (session: AuthSession) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    async function bootstrapSession() {
      try {
        const restoredSession = await tokenStorage.getSession();
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
    await tokenStorage.saveSession(nextSession);
    setSession(nextSession);
  }

  async function signOut() {
    await tokenStorage.clearSession();
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
