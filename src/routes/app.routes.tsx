import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppHeaderMenuButton } from '../application/shell/AppHeaderMenuButton';
import { AppHeaderLogoutButton } from '../application/shell/AppHeaderLogoutButton';
import { AppSideMenu } from '../application/shell/AppSideMenu';
import { LoginScreen } from '../modules/auth/presentation/screens/LoginScreen';
import { SplashScreen } from '../modules/auth/presentation/screens/SplashScreen';
import { PersonalHomeScreen } from '../modules/personal/presentation/screens/PersonalHomeScreen';
import { useAuth } from '../modules/auth/presentation/context/AuthContext';
import { useThemeSettings } from '../shared/context/ThemeSettingsContext';
import { getAppRoutes } from './app.modules';
import type { AppStackParamList, AuthStackParamList } from './navigation.types';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();
const PersonalStack = createNativeStackNavigator<{ PersonalHome: undefined }>();

const appRoutes = getAppRoutes();

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
        {appRoutes.map((route) => (
          <AppStack.Screen
            key={route.name}
            name={route.name}
            component={route.component}
            options={{ title: route.title }}
          />
        ))}
      </AppStack.Navigator>
      <AppSideMenu />
    </>
  );
}

function PersonalRoutes() {
  const { appTheme } = useThemeSettings();

  return (
    <PersonalStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerStyle: { backgroundColor: appTheme.colors.background },
        contentStyle: { backgroundColor: appTheme.colors.background },
        headerTitleStyle: { color: appTheme.colors.text },
        headerTintColor: appTheme.colors.text,
        headerRight: () => <AppHeaderLogoutButton />,
      }}
    >
      <PersonalStack.Screen
        name="PersonalHome"
        component={PersonalHomeScreen}
        options={{ title: 'Área do Personal' }}
      />
    </PersonalStack.Navigator>
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

  return session?.user.role === 'personal' ? <PersonalRoutes /> : <AppRoutesStack />;
}
