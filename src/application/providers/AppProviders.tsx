import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from '../../modules/auth/presentation/context/AuthContext';
import { AppShellProvider } from '../../shared/context/AppShellContext';
import { AppFeedbackProvider } from '../../shared/context/AppFeedbackContext';
import { ThemeSettingsProvider } from '../../shared/context/ThemeSettingsContext';

const queryClient = new QueryClient();

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeSettingsProvider>
        <AppFeedbackProvider>
          <AppShellProvider>
            <AuthProvider>{children}</AuthProvider>
          </AppShellProvider>
        </AppFeedbackProvider>
      </ThemeSettingsProvider>
    </QueryClientProvider>
  );
}
