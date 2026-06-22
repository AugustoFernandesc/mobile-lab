import { Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useThemeSettings } from '../../shared/context/ThemeSettingsContext';
import { useAuth } from '../../modules/auth/presentation/context/AuthContext';

export function AppHeaderLogoutButton() {
  const { signOut } = useAuth();
  const { appTheme } = useThemeSettings();

  return (
    <Pressable
      onPress={signOut}
      style={{ marginRight: 4, paddingVertical: 6, paddingLeft: 10 }}
      accessibilityRole="button"
      accessibilityLabel="Encerrar sessao"
    >
      <MaterialIcons name="logout" size={24} color={appTheme.colors.primary} />
    </Pressable>
  );
}
