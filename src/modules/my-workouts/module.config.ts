import type { AppModule } from '../../routes/module.types';
import { MyWorkoutsScreen } from './presentation/screens/MyWorkoutsScreen';

export const myWorkoutsModule = {
  name: 'MyWorkouts',
  routes: [
    {
      name: 'MyWorkouts',
      title: 'Meus Treinos',
      component: MyWorkoutsScreen,
      showInMenu: true,
      icon: 'fitness-center',
      order: 1,
    },
  ],
} as const satisfies AppModule;
