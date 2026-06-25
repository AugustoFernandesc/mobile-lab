import type { AppModule } from '../../../routes/module.types';
import { MyRegistrationScreen } from './presentation/screens/MyRegistrationScreen';

export const myRegistrationModule = {
  name: 'MyRegistration',
  routes: [
    {
      name: 'MyRegistration',
      title: 'Minha Matrícula',
      component: MyRegistrationScreen,
      showInMenu: true,
      icon: 'assignment',
      order: 2,
    },
  ],
} as const satisfies AppModule;
