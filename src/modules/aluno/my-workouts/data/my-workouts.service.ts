import { api } from '../../../../infra/http/api';
import { StudentWorkout, WorkoutExercise } from './my-workouts.types';

export async function getMyWorkouts(): Promise<StudentWorkout[]> {
  const { data } = await api.get<StudentWorkout[]>('/student/mobile/workouts');
  return data;
}

export async function getWorkoutExercises(
  idStudentWorkout: string,
): Promise<WorkoutExercise[]> {
  const { data } = await api.get<WorkoutExercise[]>(
    `/student/mobile/workouts/${idStudentWorkout}/exercises`,
  );
  return data;
}
