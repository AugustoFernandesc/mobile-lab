import { Pressable, Text } from 'react-native';

import { useThemeSettings } from '../context/ThemeSettingsContext';

type AppButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
};

export function AppButton({
  label,
  onPress,
  variant = 'secondary',
  disabled = false,
}: AppButtonProps) {
  const { appTheme } = useThemeSettings();

  const backgroundColor =
    variant === 'primary'
      ? appTheme.colors.primary
      : variant === 'danger'
        ? appTheme.colors.danger
        : appTheme.colors.surface;

  const textColor = variant === 'secondary' ? appTheme.colors.text : '#FFFFFF';

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={{
        backgroundColor,
        borderRadius: appTheme.radius.sm,
        paddingVertical: 12,
        paddingHorizontal: appTheme.spacing.sm,
        alignItems: 'center',
        borderWidth: variant === 'secondary' ? 1 : 0,
        borderColor: appTheme.colors.border,
        opacity: disabled ? 0.6 : 1,
        marginBottom: 20,
      }}
    >
      <Text style={{ color: textColor, fontWeight: '700', fontSize: 14 }}>{label}</Text>
    </Pressable>
  );
}
