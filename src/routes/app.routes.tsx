import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ArchitectureScreen } from '../application/screens/ArchitectureScreen';
import { SettingsPlaceholderScreen } from '../application/screens/SettingsPlaceholderScreen';
import { AppHeaderMenuButton } from '../modules/auth/presentation/components/AppHeaderMenuButton';
import { AppHeaderLogoutButton } from '../modules/auth/presentation/components/AppHeaderLogoutButton';
import { AppSideMenu } from '../modules/auth/presentation/components/AppSideMenu';
import { HomeScreen } from '../modules/auth/presentation/screens/HomeScreen';
import { LoginScreen } from '../modules/auth/presentation/screens/LoginScreen';
import { SplashScreen } from '../modules/auth/presentation/screens/SplashScreen';
import { useAuth } from '../modules/auth/presentation/context/AuthContext';
import { useThemeSettings } from '../shared/context/ThemeSettingsContext';
import type { AppStackParamList, AuthStackParamList } from './navigation.types';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

function AuthRoutes() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}

function AppRoutesStack() {
  const { appTheme } = useThemeSettings();

  return (
    <>
      <AppStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: appTheme.colors.background,
          },
          contentStyle: {
            backgroundColor: appTheme.colors.background,
          },
          headerTitleStyle: {
            color: appTheme.colors.text,
          },
          headerTintColor: appTheme.colors.text,
          headerLeft: () => <AppHeaderMenuButton />,
          headerRight: () => <AppHeaderLogoutButton />,
        }}
      >
        <AppStack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <AppStack.Screen
          name="Architecture"
          component={ArchitectureScreen}
          options={{ title: 'Arquitetura' }}
        />
        <AppStack.Screen
          name="Settings"
          component={SettingsPlaceholderScreen}
          options={{ title: 'Configurações' }}
        />
      </AppStack.Navigator>
      <AppSideMenu />
    </>
  );
}

export default function AppRoutes() {
  const { isAuthenticated, isBootstrapping } = useAuth();

  if (isBootstrapping) {
    return <SplashScreen />;
  }

  return isAuthenticated ? <AppRoutesStack /> : <AuthRoutes />;
}
