import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppHeaderMenuButton } from '../application/shell/AppHeaderMenuButton';
import { AppHeaderLogoutButton } from '../application/shell/AppHeaderLogoutButton';
import { AppSideMenu } from '../application/shell/AppSideMenu';
import { LoginScreen } from '../modules/common/auth/presentation/screens/LoginScreen';
import { SplashScreen } from '../modules/common/auth/presentation/screens/SplashScreen';
import { useAuth } from '../modules/common/auth/presentation/context/AuthContext';
import { useThemeSettings } from '../shared/context/ThemeSettingsContext';
import { getMenuItemsForRole, getRoutesForRole } from './app.modules';
import type { UserRole } from '../modules/common/auth/data/auth.types';
import type { AppStackParamList, AuthStackParamList } from './navigation.types';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

function AuthRoutes() {
  const { appTheme } = useThemeSettings();

  return (
    <View style={{ flex: 1, backgroundColor: appTheme.colors.background }}>
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Login" component={LoginScreen} />
      </AuthStack.Navigator>
    </View>
  );
}

function useShellScreenOptions() {
  const { appTheme } = useThemeSettings();

  return {
    headerShadowVisible: false,
    headerTitleAlign: 'center' as const,
    headerStyle: { backgroundColor: appTheme.colors.background },
    contentStyle: { backgroundColor: appTheme.colors.background },
    headerTitleStyle: { color: appTheme.colors.text },
    headerTintColor: appTheme.colors.text,
    headerRight: () => <AppHeaderLogoutButton />,
  };
}

/**
 * Navegador único, dirigido pelos módulos do papel logado.
 * Adicionar uma tela = criar um module.config e registrá-lo em app.modules.ts.
 */
function RoleRoutes({ role }: { role: UserRole | undefined }) {
  const { appTheme } = useThemeSettings();
  const screenOptions = useShellScreenOptions();
  const routes = getRoutesForRole(role);
  const menuItems = getMenuItemsForRole(role);

  return (
    <View style={{ flex: 1, backgroundColor: appTheme.colors.background }}>
      <AppStack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        {routes.map((route) => (
          <AppStack.Screen
            key={route.name}
            name={route.name as keyof AppStackParamList}
            component={route.component}
            options={{
              title: route.title,
              ...(route.hideMenuButton ? {} : { headerLeft: () => <AppHeaderMenuButton /> }),
            }}
          />
        ))}
      </AppStack.Navigator>
      <AppSideMenu menuItems={menuItems} homeRoute="Home" />
    </View>
  );
}

export default function AppRoutes() {
  const { isAuthenticated, isBootstrapping, session } = useAuth();

  if (isBootstrapping) {
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    return <AuthRoutes />;
  }

  return <RoleRoutes role={session?.user.role} />;
}
