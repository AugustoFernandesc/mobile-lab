import { type ReactNode } from 'react';
import { View } from 'react-native';

import { useThemeSettings } from '../../../../../shared/context/ThemeSettingsContext';

type Props = {
  children: ReactNode;
};

export function HomeMetricGrid({ children }: Props) {
  const { appTheme } = useThemeSettings();

  return (
    <View style={{ flexDirection: 'row', gap: appTheme.spacing.sm }}>
      {children}
    </View>
  );
}
