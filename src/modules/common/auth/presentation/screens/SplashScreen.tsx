import { ActivityIndicator, Text, View } from 'react-native';

import { useThemeSettings } from '../../../../../shared/context/ThemeSettingsContext';

export function SplashScreen() {
  const { appTheme } = useThemeSettings();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: appTheme.spacing.lg,
      }}
    >
      <ActivityIndicator size="large" color={appTheme.colors.primary} />
      <Text
        style={{
          color: appTheme.colors.text,
          marginTop: appTheme.spacing.md,
          fontSize: 16,
          fontWeight: '600',
        }}
      >
        Restaurando sessao segura...
      </Text>
    </View>
  );
}
