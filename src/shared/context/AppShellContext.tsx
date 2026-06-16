import { createContext, useContext, useMemo, useState } from 'react';

type AppShellContextData = {
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
};

const AppShellContext = createContext<AppShellContextData | undefined>(undefined);

export function AppShellProvider({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function openMenu() {
    setIsMenuOpen(true);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function toggleMenu() {
    setIsMenuOpen((current) => !current);
  }

  const value = useMemo(
    () => ({
      isMenuOpen,
      openMenu,
      closeMenu,
      toggleMenu,
    }),
    [isMenuOpen]
  );

  return <AppShellContext.Provider value={value}>{children}</AppShellContext.Provider>;
}

export function useAppShell() {
  const context = useContext(AppShellContext);

  if (!context) {
    throw new Error('useAppShell must be used within AppShellProvider');
  }

  return context;
}
