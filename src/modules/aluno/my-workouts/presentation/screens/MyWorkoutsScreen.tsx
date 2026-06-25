import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { EmptyState, ErrorState, Screen } from '../../../../../shared/components';
import { useThemeSettings } from '../../../../../shared/context/ThemeSettingsContext';
import { navigate } from '../../../../../routes/navigation.service';
import { useMyWorkouts } from '../hooks/useMyWorkouts';

export function MyWorkoutsScreen() {
  const { appTheme } = useThemeSettings();
  const { workouts, isLoading, errorMessage } = useMyWorkouts();

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

  if (workouts.length === 0) {
    return (
      <Screen>
        <EmptyState
          title="Nenhum treino ainda"
          description="Seu personal ainda não atribuiu treinos para você."
        />
      </Screen>
    );
  }

  return (
    <Screen scrollable>
      <View style={{ gap: appTheme.spacing.md }}>
        {workouts.map((workout) => (
          <Pressable
            key={workout.id}
            onPress={() => navigate('WorkoutDetail', { idStudentWorkout: workout.id, name: workout.name })}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: appTheme.spacing.md,
              backgroundColor: appTheme.colors.surface,
              borderRadius: appTheme.radius.lg,
              borderWidth: 1,
              borderColor: appTheme.colors.border,
              padding: appTheme.spacing.lg,
            }}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: appTheme.colors.surfaceMuted,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialIcons name="fitness-center" size={22} color={appTheme.colors.primary} />
            </View>
            <Text style={{ color: appTheme.colors.text, fontSize: 17, fontWeight: '700', flex: 1 }}>
              {workout.name}
            </Text>
            <MaterialIcons name="chevron-right" size={24} color={appTheme.colors.textMuted} />
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}
