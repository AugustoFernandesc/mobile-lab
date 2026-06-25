import { Text } from 'react-native';

import { Screen } from '../../../../../shared/components';
import { useThemeSettings } from '../../../../../shared/context/ThemeSettingsContext';

import { navigate } from '../../../../../routes/navigation.service';
import { useAuth } from '../../../auth/presentation/context/AuthContext';
import { useMyRegistration } from '../../../../aluno/my-registration/presentation/hooks/useMyRegistration';
import { useMyWorkouts } from '../../../../aluno/my-workouts/presentation/hooks/useMyWorkouts';
import { HomeHeader } from '../components/HomeHeader';
import { HomeCard } from '../components/HomeCard';

export function StudentHomeContent() {
  const { appTheme } = useThemeSettings();
  const { session } = useAuth();
  const { registration, isLoading, errorMessage } = useMyRegistration();
  const { workouts, isLoading: workoutsLoading } = useMyWorkouts();

  const totalWorkouts = workouts.length;
  const activeWorkouts = workouts.filter((w) => w.active).length;

  return (
    <Screen scrollable>
      <HomeHeader name={session?.user.name ?? 'Aluno'} />

      <HomeCard
        icon="assignment"
        title="Minha matrícula"
        buttonLabel="Ver detalhes"
        onPress={() => navigate('MyRegistration')}
      >
        {isLoading ? (
          <Text style={{ color: appTheme.colors.textMuted }}>Carregando matrícula...</Text>
        ) : errorMessage ? (
          <Text style={{ color: appTheme.colors.danger }}>{errorMessage}</Text>
        ) : (
          <>
            <Text style={{ color: appTheme.colors.text }}>
              Plano atual: {registration?.plan_name ?? '-'}
            </Text>
            <Text style={{ color: appTheme.colors.text }}>
              Vencimento: dia {registration?.due_day ?? '-'}
            </Text>
            <Text style={{ color: appTheme.colors.text }}>
              Status: {registration?.active ? 'Ativa' : 'Inativa'}
            </Text>
          </>
        )}
      </HomeCard>

      <HomeCard
        icon="fitness-center"
        title="Meus treinos"
        buttonLabel="Ver treinos"
        onPress={() => navigate('MyWorkouts')}
      >
        {workoutsLoading ? (
          <Text style={{ color: appTheme.colors.textMuted }}>Carregando treinos...</Text>
        ) : (
          <>
            <Text style={{ color: appTheme.colors.text }}>
              {totalWorkouts} {totalWorkouts === 1 ? 'treino atribuído' : 'treinos atribuídos'}
            </Text>
            <Text style={{ color: appTheme.colors.textMuted }}>
              {activeWorkouts} {activeWorkouts === 1 ? 'ativo no momento' : 'ativos no momento'}
            </Text>
          </>
        )}
      </HomeCard>

      <HomeCard
        icon="settings"
        title="Configurações"
        buttonLabel="Configurar"
        onPress={() => navigate('Settings')}
      >
        <Text style={{ color: appTheme.colors.textMuted }}>
          Tema, conta e preferências
        </Text>
      </HomeCard>
    </Screen>
  );
}
