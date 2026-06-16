import { Text, View } from 'react-native';

import { useThemeSettings } from '../context/ThemeSettingsContext';

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { appTheme } = useThemeSettings();

  return (
    <View
      style={{
        backgroundColor: appTheme.colors.surface,
        borderRadius: appTheme.radius.md,
        padding: appTheme.spacing.lg,
        borderWidth: 1,
        borderColor: appTheme.colors.border,
      }}
    >
      <Text style={{ color: appTheme.colors.text, fontSize: 18, fontWeight: '700' }}>
        {title}
      </Text>
      <Text style={{ color: appTheme.colors.textMuted, marginTop: appTheme.spacing.xs }}>
        {description}
      </Text>
    </View>
  );
}
