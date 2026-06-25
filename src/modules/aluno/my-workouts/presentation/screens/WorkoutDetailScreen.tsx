import { useLayoutEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ErrorState, Screen } from '../../../../../shared/components';
import { useThemeSettings } from '../../../../../shared/context/ThemeSettingsContext';
import { WorkoutExercise } from '../../data/my-workouts.types';
import { useWorkoutExercises } from '../hooks/useMyWorkouts';

type WorkoutDetailParams = {
  idStudentWorkout: string;
  name: string;
};

function groupByMuscle(exercises: WorkoutExercise[]) {
  const groups: { muscle: string; items: WorkoutExercise[] }[] = [];
  for (const exercise of exercises) {
    const muscle = exercise.muscle_group ?? 'OUTROS';
    let group = groups.find((g) => g.muscle === muscle);
    if (!group) {
      group = { muscle, items: [] };
      groups.push(group);
    }
    group.items.push(exercise);
  }
  return groups;
}

export function WorkoutDetailScreen() {
  const { appTheme } = useThemeSettings();
  const navigation = useNavigation();
  const route = useRoute();
  const { idStudentWorkout, name } = route.params as WorkoutDetailParams;

  const { exercises, isLoading, errorMessage } = useWorkoutExercises(idStudentWorkout, true);

  useLayoutEffect(() => {
    navigation.setOptions({ title: name ?? 'Treino' });
  }, [navigation, name]);

  if (isLoading) {
    return (
      <Screen>
        <ActivityIndicator size="large" color={appTheme.colors.primary} />
      </Screen>
    );
  }

  if (errorMessage) {
    return (
      <Screen>
        <ErrorState message={errorMessage} />
      </Screen>
    );
  }

  if (exercises.length === 0) {
    return (
      <Screen>
        <Text style={{ color: appTheme.colors.textMuted }}>Sem exercícios neste treino.</Text>
      </Screen>
    );
  }

  return (
    <Screen scrollable>
      <View style={{ gap: appTheme.spacing.xl }}>
        {groupByMuscle(exercises).map((group) => (
          <View key={group.muscle} style={{ gap: appTheme.spacing.md }}>
            <Text
              style={{
                color: appTheme.colors.primary,
                fontSize: 35,
                fontWeight: '800',
                letterSpacing: 0.5,
                textAlign: 'center'
              }}
            >
            {group.muscle}
            </Text>

            {group.items.map((exercise) => (
              <View
                key={exercise.id_exercise}
                style={{
                  backgroundColor: appTheme.colors.surface,
                  borderRadius: appTheme.radius.md,
                  borderWidth: 1,
                  borderColor: appTheme.colors.border,
                  padding: appTheme.spacing.md,
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ color: appTheme.colors.text, fontWeight: '700', flex: 1 }}>
                    {exercise.name}
                  </Text>
                  <Text style={{ color: appTheme.colors.textMuted, fontWeight: '600' }}>
                    {exercise.series}x{exercise.repetitions}
                    {exercise.weight ? ` • ${exercise.weight}kg` : ''}
                  </Text>
                </View>

                {exercise.rest ? (
                  <Text style={{ color: appTheme.colors.textMuted, fontSize: 12, marginTop: 4 }}>
                    Descanso: {exercise.rest}s
                  </Text>
                ) : null}

                {exercise.observation ? (
                  <Text style={{ color: appTheme.colors.textMuted, fontSize: 12, marginTop: 2 }}>
                    {exercise.observation}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        ))}
      </View>
    </Screen>
  );
}
