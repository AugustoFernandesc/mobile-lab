import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { AppButton, Screen } from '../../../../../shared/components';
import { useThemeSettings } from '../../../../../shared/context/ThemeSettingsContext';
import { MUSCLE_GROUPS } from '../../data/workouts.types';
import { useCreateExercise, useDeactivateExercise, useExercises } from '../hooks/useWorkouts';

export function ExercisesScreen() {
  const { appTheme } = useThemeSettings();
  const exercisesQuery = useExercises();
  const createExercise = useCreateExercise();
  const deactivateExercise = useDeactivateExercise();

  const [name, setName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState<string>(MUSCLE_GROUPS[0]);
  const [error, setError] = useState<string | null>(null);

  const exercises = (exercisesQuery.data ?? []).filter((exercise) => exercise.active);

  function handleCreate() {
    if (!name.trim()) {
      setError('Digite o nome do exercício.');
      return;
    }
    setError(null);
    createExercise.mutate(
      { name: name.trim(), muscleGroup },
      {
        onSuccess: () => setName(''),
        onError: () => setError('Não foi possível criar (talvez o nome já exista).'),
      },
    );
  }

  return (
    <Screen scrollable>
      <View
        style={{
          backgroundColor: appTheme.colors.surface,
          borderRadius: appTheme.radius.lg,
          borderWidth: 1,
          borderColor: appTheme.colors.border,
          padding: appTheme.spacing.lg,
          gap: appTheme.spacing.sm,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: '800', color: appTheme.colors.text }}>
          Novo exercício
        </Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Nome (ex.: Supino Reto)"
          placeholderTextColor={appTheme.colors.textMuted}
          style={{
            borderWidth: 1,
            borderColor: appTheme.colors.border,
            borderRadius: appTheme.radius.sm,
            paddingHorizontal: appTheme.spacing.md,
            paddingVertical: 12,
            color: appTheme.colors.text,
            backgroundColor: appTheme.colors.background,
          }}
        />

        <Text style={{ color: appTheme.colors.textMuted, fontSize: 13 }}>Grupo muscular</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {MUSCLE_GROUPS.map((group) => {
              const isActive = group === muscleGroup;
              return (
                <Pressable
                  key={group}
                  onPress={() => setMuscleGroup(group)}
                  style={{
                    borderWidth: 1,
                    borderColor: isActive ? appTheme.colors.primary : appTheme.colors.border,
                    backgroundColor: isActive ? appTheme.colors.primary : appTheme.colors.background,
                    borderRadius: appTheme.radius.sm,
                    paddingVertical: 6,
                    paddingHorizontal: appTheme.spacing.md,
                  }}
                >
                  <Text style={{ color: isActive ? '#FFFFFF' : appTheme.colors.text, fontSize: 12 }}>
                    {group}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        {error ? <Text style={{ color: appTheme.colors.danger }}>{error}</Text> : null}

        <AppButton
          label={createExercise.isPending ? 'Criando...' : '+ Criar exercício'}
          variant="primary"
          onPress={handleCreate}
          disabled={createExercise.isPending}
        />
      </View>

      <Text style={{ fontSize: 18, fontWeight: '700', color: appTheme.colors.text }}>
        Exercícios cadastrados
      </Text>

      {exercisesQuery.isLoading ? (
        <ActivityIndicator color={appTheme.colors.primary} />
      ) : exercises.length === 0 ? (
        <Text style={{ color: appTheme.colors.textMuted }}>Nenhum exercício ainda.</Text>
      ) : (
        <View style={{ gap: appTheme.spacing.sm }}>
          {exercises.map((exercise) => (
            <View
              key={exercise.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: appTheme.colors.surface,
                borderRadius: appTheme.radius.md,
                borderWidth: 1,
                borderColor: appTheme.colors.border,
                padding: appTheme.spacing.md,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ color: appTheme.colors.text, fontWeight: '600' }}>{exercise.name}</Text>
                <Text style={{ color: appTheme.colors.textMuted, fontSize: 12 }}>{exercise.muscle_group}</Text>
              </View>
              <Pressable onPress={() => deactivateExercise.mutate(exercise.id)} hitSlop={8}>
                <MaterialIcons name="delete-outline" size={22} color={appTheme.colors.danger} />
              </Pressable>
            </View>
          ))}
        </View>
      )}
    </Screen>
  );
}
