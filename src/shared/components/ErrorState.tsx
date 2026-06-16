import { Text, View } from 'react-native';

import { useThemeSettings } from '../context/ThemeSettingsContext';

export function ErrorState({ message }: { message: string }) {
  const { appTheme } = useThemeSettings();

  return (
    <View
      style={{
        backgroundColor: appTheme.colors.dangerSoft,
        borderRadius: appTheme.radius.md,
        borderWidth: 1,
        borderColor: '#F5C2C7',
        padding: appTheme.spacing.md,
      }}
    >
      <Text style={{ color: appTheme.colors.danger, fontWeight: '700' }}>Algo deu errado</Text>
      <Text style={{ color: appTheme.colors.text, marginTop: appTheme.spacing.xs }}>{message}</Text>
    </View>
  );
}
