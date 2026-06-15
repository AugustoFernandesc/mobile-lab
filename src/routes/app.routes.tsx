import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '../modules/auth/presentation/screens/HomeScreen';
import { LoginScreen } from '../modules/auth/presentation/screens/LoginScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false, title: 'Login'}}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Inicio' }}
      />
    </Stack.Navigator>
  );
}
