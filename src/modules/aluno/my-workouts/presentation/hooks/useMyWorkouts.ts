import { useQuery } from '@tanstack/react-query';

import { getMyWorkouts, getWorkoutExercises } from '../../data/my-workouts.service';

export function useMyWorkouts() {
  const query = useQuery({ queryKey: ['my-workouts'], queryFn: getMyWorkouts });

  return {
    workouts: query.data ?? [],
    isLoading: query.isLoading,
    errorMessage: query.isError
      ? 'Não foi possível carregar seus treinos. Tente novamente.'
      : null,
    reload: query.refetch,
  };
}

export function useWorkoutExercises(idStudentWorkout: string, enabled: boolean) {
  const query = useQuery({
    queryKey: ['my-workouts', idStudentWorkout, 'exercises'],
    queryFn: () => getWorkoutExercises(idStudentWorkout),
    enabled,
  });

  return {
    exercises: query.data ?? [],
    isLoading: query.isLoading,
    errorMessage: query.isError ? 'Não foi possível carregar os exercícios.' : null,
  };
}
