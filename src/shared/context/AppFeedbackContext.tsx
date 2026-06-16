import { createContext, useContext, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

import { useThemeSettings } from './ThemeSettingsContext';

type AppFeedbackContextData = {
  beginLoading: () => void;
  endLoading: () => void;
  showError: (message: string) => void;
  clearError: () => void;
};

const AppFeedbackContext = createContext<AppFeedbackContextData | undefined>(undefined);

export function AppFeedbackProvider({ children }: { children: React.ReactNode }) {
  const { appTheme } = useThemeSettings();
  const [pendingRequests, setPendingRequests] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function beginLoading() {
    setPendingRequests((current) => current + 1);
  }

  function endLoading() {
    setPendingRequests((current) => Math.max(0, current - 1));
  }

  function showError(message: string) {
    setErrorMessage(message);
  }

  function clearError() {
    setErrorMessage(null);
  }

  const value = useMemo(
    () => ({
      beginLoading,
      endLoading,
      showError,
      clearError,
    }),
    []
  );

  return (
    <AppFeedbackContext.Provider value={value}>
      {children}

      {pendingRequests > 0 ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: appTheme.colors.overlay,
            justifyContent: 'center',
            alignItems: 'center',
            padding: appTheme.spacing.lg,
          }}
        >
          <View
            style={{
              backgroundColor: appTheme.colors.surface,
              paddingHorizontal: appTheme.spacing.lg,
              paddingVertical: appTheme.spacing.md,
              borderRadius: appTheme.radius.md,
              alignItems: 'center',
            }}
          >
            <ActivityIndicator size="large" color={appTheme.colors.primary} />
            <Text style={{ marginTop: appTheme.spacing.sm, color: appTheme.colors.text }}>
              Carregando...
            </Text>
          </View>
        </View>
      ) : null}

      {errorMessage ? (
        <View
          style={{
            position: 'absolute',
            left: appTheme.spacing.md,
            right: appTheme.spacing.md,
            bottom: appTheme.spacing.xl,
            backgroundColor: appTheme.colors.dangerSoft,
            borderRadius: appTheme.radius.md,
            borderWidth: 1,
            borderColor: '#F5C2C7',
            padding: appTheme.spacing.md,
          }}
        >
          <Text style={{ color: appTheme.colors.danger, fontWeight: '600' }}>Erro</Text>
          <Text style={{ color: appTheme.colors.text, marginTop: 4 }}>{errorMessage}</Text>
          <Pressable
            onPress={clearError}
            style={{
              marginTop: appTheme.spacing.sm,
              alignSelf: 'flex-start',
            }}
          >
            <Text style={{ color: appTheme.colors.primary, fontWeight: '700' }}>Fechar</Text>
          </Pressable>
        </View>
      ) : null}
    </AppFeedbackContext.Provider>
  );
}

export function useAppFeedback() {
  const context = useContext(AppFeedbackContext);

  if (!context) {
    throw new Error('useAppFeedback must be used within AppFeedbackProvider');
  }

  return context;
}
