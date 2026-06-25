import { type ReactNode } from 'react';
import { Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { AppButton } from '../../../../../shared/components';
import { useThemeSettings } from '../../../../../shared/context/ThemeSettingsContext';
import type { AppIconName } from '../../../../../routes/module.types';

type Props = {
  icon: AppIconName;
  title: string;
  children?: ReactNode;
  buttonLabel?: string;
  onPress?: () => void;
};

export function HomeCard({ icon, title, children, buttonLabel, onPress }: Props) {
  const { appTheme } = useThemeSettings();

  return (
    <View
      style={{
        backgroundColor: appTheme.colors.surface,
        borderRadius: appTheme.radius.lg,
        borderWidth: 1,
        borderColor: appTheme.colors.border,
        padding: appTheme.spacing.lg,
        gap: appTheme.spacing.md,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <MaterialIcons name={icon} size={24} color={appTheme.colors.primary} />
        <Text style={{ fontSize: 20, fontWeight: '800', color: appTheme.colors.text }}>
          {title}
        </Text>
      </View>

      {children}

      {buttonLabel && onPress ? (
        <AppButton label={buttonLabel} variant="primary" onPress={onPress} />
      ) : null}
    </View>
  );
}
