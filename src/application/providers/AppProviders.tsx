import { AuthProvider } from '../../modules/auth/presentation/context/AuthContext';
import { AppShellProvider } from '../../shared/context/AppShellContext';
import { AppFeedbackProvider } from '../../shared/context/AppFeedbackContext';
import { ThemeSettingsProvider } from '../../shared/context/ThemeSettingsContext';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeSettingsProvider>
      <AppFeedbackProvider>
        <AppShellProvider>
          <AuthProvider>{children}</AuthProvider>
        </AppShellProvider>
      </AppFeedbackProvider>
    </ThemeSettingsProvider>
  );
}
