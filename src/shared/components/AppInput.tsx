import { Text, TextInput, View } from 'react-native';

import { useThemeSettings } from '../context/ThemeSettingsContext';

type AppInputProps = {
  label?: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  errorMessage?: string | null;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
};

export function AppInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  errorMessage,
  autoCapitalize = 'sentences',
  keyboardType = 'default',
}: AppInputProps) {
  const { appTheme } = useThemeSettings();

  return (
    <View style={{ width: '100%' }}>
      {label ? (
        <Text
          style={{
            color: appTheme.colors.text,
            fontWeight: '600',
            marginTop: 20,
          }}
        >
          {label}
        </Text>
      ) : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={appTheme.colors.textMuted}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        style={{
          borderWidth: 1,
          borderColor: errorMessage ? appTheme.colors.danger : appTheme.colors.border,
          borderRadius: appTheme.radius.sm,
          paddingHorizontal: appTheme.spacing.md,
          paddingVertical: 14,
          backgroundColor: appTheme.colors.surface,
          color: appTheme.colors.text,
        }}
      />
      {errorMessage ? (
        <Text style={{ marginTop: 6, color: appTheme.colors.danger }}>{errorMessage}</Text>
      ) : null}
    </View>
  );
}
