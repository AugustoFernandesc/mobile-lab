import { api } from '../../../../infra/http/api';
import type { CreateWorkoutPayload, Exercise, PersonalWorkout } from './workouts.types';

export async function getExercises(): Promise<Exercise[]> {
  const { data } = await api.get<{ data: Exercise[] }>('/exercises', {
    params: { page: 0, limit: 100 },
  });
  return data.data ?? [];
}

export async function createExercise(name: string, muscleGroup: string): Promise<Exercise> {
  const { data } = await api.post<Exercise>('/exercises', {
    name,
    muscle_group: muscleGroup,
  });
  return data;
}

export async function deactivateExercise(id: string): Promise<void> {
  await api.patch(`/exercises/${id}/status`);
}

export async function getMyWorkouts(): Promise<PersonalWorkout[]> {
  const { data } = await api.get<PersonalWorkout[]>('/personal/mobile/my-workouts');
  return data;
}

export async function createWorkout(payload: CreateWorkoutPayload): Promise<PersonalWorkout> {
  const { data } = await api.post<PersonalWorkout>('/personal/mobile/workouts', payload);
  return data;
}
