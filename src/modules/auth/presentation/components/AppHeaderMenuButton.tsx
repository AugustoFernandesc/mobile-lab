import { Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useAppShell } from '../../../../shared/context/AppShellContext';
import { useThemeSettings } from '../../../../shared/context/ThemeSettingsContext';

export function AppHeaderMenuButton() {
  const { toggleMenu } = useAppShell();
  const { appTheme } = useThemeSettings();

  return (
    <Pressable
      onPress={toggleMenu}
      style={{
        marginLeft: 4,
        paddingVertical: 6,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
      }}
      accessibilityRole="button"
      accessibilityLabel="Abrir menu lateral"
    >
      <MaterialIcons
        name="menu"
        size={30}
        color={appTheme.colors.primary}
      />
    </Pressable>
  );
}
