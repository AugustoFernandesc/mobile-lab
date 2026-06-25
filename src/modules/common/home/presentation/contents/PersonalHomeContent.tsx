import { Text } from 'react-native';

import { Screen } from '../../../../../shared/components';
import { useThemeSettings } from '../../../../../shared/context/ThemeSettingsContext';
import { navigate } from '../../../../../routes/navigation.service';
import { useAuth } from '../../../auth/presentation/context/AuthContext';
import { useExercises, useMyWorkouts } from '../../../../personal/my-workouts/presentation/hooks/useWorkouts';
import { useMyStudents } from '../../../../personal/my-students/presentation/hooks/useStudents';
import { HomeHeader } from '../components/HomeHeader';
import { HomeCard } from '../components/HomeCard';

export function PersonalHomeContent() {
  const { appTheme } = useThemeSettings();
  const { session } = useAuth();
  const workoutsQuery = useMyWorkouts();
  const exercisesQuery = useExercises();
  const studentsQuery = useMyStudents();

  const totalWorkouts = workoutsQuery.data?.length ?? 0;
  const activeExercises = (exercisesQuery.data ?? []).filter((e) => e.active).length;
  const totalStudents = studentsQuery.data?.length ?? 0;

  return (
    <Screen scrollable>
      <HomeHeader name={session?.user.name ?? 'Personal'} />

      <HomeCard icon="fitness-center" title="Treinos" buttonLabel="Gerenciar" onPress={() => navigate('PersonalWorkouts')}>
        <Text style={{ color: appTheme.colors.text }}>
          {totalWorkouts} {totalWorkouts === 1 ? 'treino criado' : 'treinos criados'}
        </Text>
        <Text style={{ color: appTheme.colors.textMuted }}>
          Templates prontos para atribuir aos alunos
        </Text>
      </HomeCard>

      <HomeCard icon="list-alt" title="Exercícios" buttonLabel="Ver exercícios" onPress={() => navigate('PersonalExercises')}>
        <Text style={{ color: appTheme.colors.text }}>
          {activeExercises} {activeExercises === 1 ? 'exercício ativo' : 'exercícios ativos'}
        </Text>
        <Text style={{ color: appTheme.colors.textMuted }}>
          Catálogo de movimentos disponíveis
        </Text>
      </HomeCard>

      <HomeCard icon="group" title="Alunos" buttonLabel="Ver alunos" onPress={() => navigate('PersonalStudents')}>
        <Text style={{ color: appTheme.colors.text }}>
          {totalStudents} {totalStudents === 1 ? 'aluno vinculado' : 'alunos vinculados'}
        </Text>
        <Text style={{ color: appTheme.colors.textMuted }}>
          Gerencie seus alunos e atribua treinos
        </Text>
      </HomeCard>
    </Screen>
  );
}
