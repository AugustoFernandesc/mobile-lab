import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View } from 'react-native';

import { useThemeSettings } from '../context/ThemeSettingsContext';

type ScreenProps = {
  children: React.ReactNode;
  scrollable?: boolean;
};

export function Screen({ children, scrollable = false }: ScreenProps) {
  const { appTheme } = useThemeSettings();

  const content = scrollable ? (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: appTheme.spacing.lg,
      }}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={{ flex: 1, padding: appTheme.spacing.lg }}>{children}</View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: appTheme.colors.background }}>
      {content}
    </SafeAreaView>
  );
}
