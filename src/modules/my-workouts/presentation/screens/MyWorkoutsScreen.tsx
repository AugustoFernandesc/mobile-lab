import { Text, View } from 'react-native';

import { Screen } from '../../../../shared/components';
import { useThemeSettings } from '../../../../shared/context/ThemeSettingsContext';


export function MyWorkoutsScreen() {
  const { appTheme } = useThemeSettings();

  return (
    <Screen scrollable>
      <View
        style={{
          backgroundColor: appTheme.colors.primaryDark,
          borderRadius: appTheme.radius.lg,
          padding: appTheme.spacing.lg,
        }}
      >
       
      </View>

    
    </Screen>
  );
}
