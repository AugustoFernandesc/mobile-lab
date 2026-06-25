export type Exercise = {
  id: string;
  name: string;
  muscle_group: string;
  active: boolean;
};

export type WorkoutExercisePayload = {
  id_exercise: string;
  series: number;
  repetitions: number;
  observation?: string;
  order_position: number;
};

export type CreateWorkoutPayload = {
  name: string;
  description?: string;
  exercises: WorkoutExercisePayload[];
};

export type PersonalWorkout = {
  id: string;
  name: string;
};

export const MUSCLE_GROUPS = [
  'PEITO',
  'COSTAS',
  'OMBRO',
  'BICEPS',
  'TRICEPS',
  'PERNA',
  'GLUTEO',
  'ABDOMEN',
  'PANTURRILHA',
  'QUADRICEPS',
  'POSTERIOR',
  'TRAPÉZIO',
  'ANTEBRAÇO',
  'LOMBAR',
  'CARDIO',
  'CORPO_INTEIRO',
] as const;

export type MuscleGroup = (typeof MUSCLE_GROUPS)[number];
