import type { AppModule } from '../../../routes/module.types';
import { HomeScreen } from './presentation/screens/HomeScreen';

export const homeModule = {
  name: 'Home',
  routes: [
    {
      name: 'Home',
      title: 'Home',
      component: HomeScreen,
      showInMenu: false,
    },
  ],
} as const satisfies AppModule;
