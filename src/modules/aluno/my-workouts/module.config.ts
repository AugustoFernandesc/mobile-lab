import type { AppModule } from '../../../routes/module.types';
import { MyWorkoutsScreen } from './presentation/screens/MyWorkoutsScreen';
import { WorkoutDetailScreen } from './presentation/screens/WorkoutDetailScreen';

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
    {
      name: 'WorkoutDetail',
      title: 'Treino',
      component: WorkoutDetailScreen,
      showInMenu: false,
      hideMenuButton: true,
    },
  ],
} as const satisfies AppModule;
