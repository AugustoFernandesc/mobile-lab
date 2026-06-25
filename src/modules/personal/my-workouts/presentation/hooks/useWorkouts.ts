import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createExercise,
  createWorkout,
  deactivateExercise,
  getExercises,
  getMyWorkouts,
} from '../../data/workouts.service';
import type { CreateWorkoutPayload } from '../../data/workouts.types';

export function useExercises() {
  return useQuery({ queryKey: ['exercises'], queryFn: getExercises });
}

export function useMyWorkouts() {
  return useQuery({ queryKey: ['personal', 'my-workouts'], queryFn: getMyWorkouts });
}

export function useCreateExercise() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, muscleGroup }: { name: string; muscleGroup: string }) =>
      createExercise(name, muscleGroup),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
    },
  });
}

export function useDeactivateExercise() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deactivateExercise(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
    },
  });
}

export function useCreateWorkout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateWorkoutPayload) => createWorkout(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personal', 'my-workouts'] });
    },
  });
}
