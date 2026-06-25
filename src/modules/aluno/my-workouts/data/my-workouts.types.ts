export type StudentWorkout = {
  id: string;
  id_workout: string;
  name: string;
  active: boolean;
};

export type WorkoutExercise = {
  id_exercise: string;
  name: string;
  muscle_group: string | null;
  observation: string | null;
  series: number;
  repetitions: number;
  weight: number | null;
  rest: number | null;
};
