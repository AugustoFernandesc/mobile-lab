import type { AppModule } from '../../../routes/module.types';
import { SettingsScreen } from './presentation/screens/SettingsScreen';

export const settingsModule = {
  name: 'Settings',
  routes: [
    {
      name: 'Settings',
      title: 'Configurações',
      component: SettingsScreen,
      showInMenu: true,
      icon: 'settings',
      order: 3,
    },
  ],
} as const satisfies AppModule;
