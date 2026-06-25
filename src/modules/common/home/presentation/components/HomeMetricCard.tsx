import { Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useThemeSettings } from '../../../../../shared/context/ThemeSettingsContext';
import type { AppIconName } from '../../../../../routes/module.types';

type Props = {
  icon: AppIconName;
  label: string;
  value: number;
};

export function HomeMetricCard({ icon, label, value }: Props) {
  const { appTheme } = useThemeSettings();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme.colors.surface,
        borderRadius: appTheme.radius.md,
        borderWidth: 1,
        borderColor: appTheme.colors.border,
        padding: appTheme.spacing.md,
        gap: 6,
      }}
    >
      <MaterialIcons name={icon} size={22} color={appTheme.colors.primary} />
      <Text style={{ color: appTheme.colors.text, fontSize: 24, fontWeight: '800' }}>
        {value}
      </Text>
      <Text style={{ color: appTheme.colors.textMuted, fontSize: 12 }}>{label}</Text>
    </View>
  );
}
