import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AppButton, AppInput, Screen } from '../../../../../shared/components';
import { useThemeSettings } from '../../../../../shared/context/ThemeSettingsContext';
import { MUSCLE_GROUPS } from '../../data/workouts.types';
import { useCreateExercise, useCreateWorkout, useExercises } from '../hooks/useWorkouts';

type WorkoutItem = {
  id_exercise: string;
  name: string;
  series: string;
  repetitions: string;
  observation: string;
};

export function CreateWorkoutScreen() {
  const { appTheme } = useThemeSettings();
  const navigation = useNavigation();
  const exercisesQuery = useExercises();
  const createExercise = useCreateExercise();
  const createWorkout = useCreateWorkout();

  const [name, setName] = useState('');
  const [items, setItems] = useState<WorkoutItem[]>([]);
  const [search, setSearch] = useState('');
  const [newMuscleGroup, setNewMuscleGroup] = useState<string>(MUSCLE_GROUPS[0]);
  const [error, setError] = useState<string | null>(null);

  function addExercise(idExercise: string, exerciseName: string) {
    setSearch('');
    setItems((prev) => {
      if (prev.some((item) => item.id_exercise === idExercise)) return prev;
      return [...prev, { id_exercise: idExercise, name: exerciseName, series: '3', repetitions: '12', observation: '' }];
    });
  }

  function removeItem(idExercise: string) {
    setItems((prev) => prev.filter((item) => item.id_exercise !== idExercise));
  }

  function updateItem(idExercise: string, field: 'series' | 'repetitions' | 'observation', value: string) {
    const sanitized = field === 'observation' ? value : value.replace(/\D/g, '');
    setItems((prev) =>
      prev.map((item) => (item.id_exercise === idExercise ? { ...item, [field]: sanitized } : item)),
    );
  }

  function handleCreateExercise() {
    const trimmed = search.trim();
    if (!trimmed) {
      setError('Digite o nome do exercício.');
      return;
    }
    setError(null);
    createExercise.mutate(
      { name: trimmed, muscleGroup: newMuscleGroup },
      {
        onSuccess: (exercise) => addExercise(exercise.id, exercise.name),
        onError: () => setError('Não foi possível criar o exercício (talvez o nome já exista).'),
      },
    );
  }

  function handleSubmit() {
    if (!name.trim()) return setError('Dê um nome ao treino.');
    if (items.length === 0) return setError('Adicione ao menos um exercício.');
    setError(null);

    const exercises = items.map((item, index) => ({
      id_exercise: item.id_exercise,
      series: Number(item.series) || 0,
      repetitions: Number(item.repetitions) || 0,
      observation: item.observation.trim() || undefined,
      order_position: index,
    }));

    createWorkout.mutate(
      { name: name.trim(), exercises },
      {
        onSuccess: () => {
          Alert.alert('Pronto!', 'Treino criado. Agora é só atribuir aos alunos.');
          navigation.goBack();
        },
        onError: () => setError('Não foi possível salvar o treino. Tente novamente.'),
      },
    );
  }

  const addedIds = new Set(items.map((item) => item.id_exercise));
  const term = search.trim().toLowerCase();
  const active = (exercisesQuery.data ?? []).filter((exercise) => exercise.active);
  const matches = active.filter(
    (exercise) => !addedIds.has(exercise.id) && exercise.name.toLowerCase().includes(term),
  );
  const hasExactMatch = active.some((exercise) => exercise.name.toLowerCase() === term);
  const showCreate = term.length > 0 && !hasExactMatch;

  const numberInputStyle = {
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    borderRadius: appTheme.radius.sm,
    paddingHorizontal: appTheme.spacing.sm,
    paddingVertical: 8,
    width: 52,
    textAlign: 'center' as const,
    color: appTheme.colors.text,
    backgroundColor: appTheme.colors.background,
  };

  return (
    <Screen scrollable>
      <AppInput label="Nome do treino" value={name} onChangeText={setName} placeholder="Ex.: Peito e Tríceps" />

      <Text style={{ color: appTheme.colors.text, fontWeight: '700' as const }}>
        Exercícios do treino ({items.length})
      </Text>

      {items.length === 0 ? (
        <Text style={{ color: appTheme.colors.textMuted }}>Nenhum exercício ainda. Busque ou crie abaixo.</Text>
      ) : (
        items.map((item) => (
          <View
            key={item.id_exercise}
            style={{
              borderWidth: 1,
              borderColor: appTheme.colors.primary,
              borderRadius: appTheme.radius.md,
              padding: appTheme.spacing.sm,
              backgroundColor: appTheme.colors.surface,
              gap: appTheme.spacing.sm,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: appTheme.spacing.sm }}>
              <Text style={{ color: appTheme.colors.text, fontWeight: '600', flex: 1 }}>{item.name}</Text>
              <TextInput
                value={item.series}
                onChangeText={(v) => updateItem(item.id_exercise, 'series', v)}
                keyboardType="number-pad"
                style={numberInputStyle}
              />
              <Text style={{ color: appTheme.colors.textMuted }}>x</Text>
              <TextInput
                value={item.repetitions}
                onChangeText={(v) => updateItem(item.id_exercise, 'repetitions', v)}
                keyboardType="number-pad"
                style={numberInputStyle}
              />
              <Pressable onPress={() => removeItem(item.id_exercise)} hitSlop={8}>
                <Text style={{ color: appTheme.colors.danger, fontSize: 18, fontWeight: '800' }}>✕</Text>
              </Pressable>
            </View>
            <TextInput
              value={item.observation}
              onChangeText={(v) => updateItem(item.id_exercise, 'observation', v)}
              placeholder="Descrição / observação (opcional)"
              placeholderTextColor={appTheme.colors.textMuted}
              style={{
                borderWidth: 1,
                borderColor: appTheme.colors.border,
                borderRadius: appTheme.radius.sm,
                paddingHorizontal: appTheme.spacing.md,
                paddingVertical: 8,
                color: appTheme.colors.text,
                backgroundColor: appTheme.colors.background,
              }}
            />
          </View>
        ))
      )}

      <Text style={{ color: appTheme.colors.text, fontWeight: '700' as const }}>
        Adicionar exercício
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: appTheme.spacing.sm,
          borderWidth: 1,
          borderColor: appTheme.colors.border,
          borderRadius: appTheme.radius.md,
          paddingHorizontal: appTheme.spacing.md,
          backgroundColor: appTheme.colors.surface,
        }}
      >
        <Text style={{ color: appTheme.colors.textMuted }}>🔍</Text>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar ou criar exercício"
          placeholderTextColor={appTheme.colors.textMuted}
          style={{ flex: 1, paddingVertical: 12, color: appTheme.colors.text }}
        />
      </View>

      {exercisesQuery.isLoading ? (
        <ActivityIndicator color={appTheme.colors.primary} />
      ) : (
        <View style={{ gap: 6 }}>
          {matches.map((exercise) => (
            <Pressable
              key={exercise.id}
              onPress={() => addExercise(exercise.id, exercise.name)}
              style={{
                borderWidth: 1,
                borderColor: appTheme.colors.border,
                borderRadius: appTheme.radius.sm,
                paddingVertical: 8,
                paddingHorizontal: appTheme.spacing.md,
                backgroundColor: appTheme.colors.surface,
              }}
            >
              <Text style={{ color: appTheme.colors.text }}>+ {exercise.name}</Text>
            </Pressable>
          ))}

          {showCreate ? (
            <View
              style={{
                borderWidth: 1,
                borderColor: appTheme.colors.primary,
                borderRadius: appTheme.radius.sm,
                padding: appTheme.spacing.sm,
                backgroundColor: appTheme.colors.surface,
                gap: appTheme.spacing.sm,
              }}
            >
              <Text style={{ color: appTheme.colors.text }}>{'Criar "' + search.trim() + '"'}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', gap: 6 }}>
                  {MUSCLE_GROUPS.map((group) => {
                    const isActive = group === newMuscleGroup;
                    return (
                      <Pressable
                        key={group}
                        onPress={() => setNewMuscleGroup(group)}
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
              <AppButton
                label={createExercise.isPending ? 'Criando...' : 'Criar e adicionar'}
                onPress={handleCreateExercise}
                disabled={createExercise.isPending}
              />
            </View>
          ) : null}
        </View>
      )}

      {error ? (
        <Text style={{ color: appTheme.colors.danger, fontWeight: '600' }}>{error}</Text>
      ) : null}

      <AppButton
        label={createWorkout.isPending ? 'Salvando...' : 'Salvar treino'}
        variant="primary"
        onPress={handleSubmit}
        disabled={createWorkout.isPending}
      />
    </Screen>
  );
}
