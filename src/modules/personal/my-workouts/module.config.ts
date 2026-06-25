import type { AppModule } from '../../../routes/module.types';
import { WorkoutsListScreen } from './presentation/screens/WorkoutsListScreen';
import { ExercisesScreen } from './presentation/screens/ExercisesScreen';
import { CreateWorkoutScreen } from './presentation/screens/CreateWorkoutScreen';

export const personalWorkoutsModule = {
  name: 'PersonalWorkouts',
  routes: [
    {
      name: 'PersonalWorkouts',
      title: 'Meus Treinos',
      component: WorkoutsListScreen,
      showInMenu: true,
      icon: 'fitness-center',
      order: 1,
    },
    {
      name: 'PersonalExercises',
      title: 'Exercícios',
      component: ExercisesScreen,
      showInMenu: false,
      hideMenuButton: true,
    },
    {
      name: 'PersonalCreateWorkout',
      title: 'Criar treino',
      component: CreateWorkoutScreen,
      showInMenu: false,
      hideMenuButton: true,
    },
  ],
} as const satisfies AppModule;
