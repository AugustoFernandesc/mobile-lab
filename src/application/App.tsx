import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { AppProviders } from './providers/AppProviders';
import AppRoutes from '../routes/app.routes';
import { navigationRef } from '../routes/navigation.service';
import { useThemeSettings } from '../shared/context/ThemeSettingsContext';

function AppNavigation() {
  const { appTheme, colorScheme } = useThemeSettings();

  const baseNavigationTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  const navigationTheme = {
    ...baseNavigationTheme,
    colors: {
      ...baseNavigationTheme.colors,
      primary: appTheme.colors.primary,
      background: appTheme.colors.background,
      card: appTheme.colors.background,
      text: appTheme.colors.text,
      border: appTheme.colors.border,
    },
  };

  return (
    <>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <AppRoutes />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <AppProviders>
      <AppNavigation />
    </AppProviders>
  );
}
