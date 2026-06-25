import { Text, View } from 'react-native';

import { useThemeSettings } from '../../../../../shared/context/ThemeSettingsContext';

type Props = {
  name: string;
  subtitle?: string;
};

export function HomeHeader({ name, subtitle = 'Bem-vindo ao MGFit' }: Props) {
  const { appTheme } = useThemeSettings();

  return (
    <View>
      <Text style={{ fontSize: 26, fontWeight: '800', color: appTheme.colors.text }}>
        Olá, {name} 💪
      </Text>
      <Text style={{ marginTop: 4, fontSize: 16, color: appTheme.colors.textMuted }}>
        {subtitle}
      </Text>
    </View>
  );
}
