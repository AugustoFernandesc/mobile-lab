import type { AppModule } from '../../../routes/module.types';
import { StudentsScreen } from './presentation/screens/StudentsScreen';
import { AssignScreen } from './presentation/screens/AssignScreen';

export const personalStudentsModule = {
  name: 'PersonalStudents',
  routes: [
    {
      name: 'PersonalStudents',
      title: 'Meus Alunos',
      component: StudentsScreen,
      showInMenu: true,
      icon: 'group',
      order: 2,
    },
    {
      name: 'PersonalAssign',
      title: 'Atribuir treino',
      component: AssignScreen,
      showInMenu: false,
      hideMenuButton: true,
    },
  ],
} as const satisfies AppModule;
