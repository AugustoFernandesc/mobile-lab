import { useMutation, useQuery } from '@tanstack/react-query';

import { assignWorkout, getMyStudents } from '../../data/students.service';

export function useMyStudents() {
  return useQuery({ queryKey: ['personal', 'my-students'], queryFn: getMyStudents });
}

export function useAssignWorkout() {
  return useMutation({
    mutationFn: ({ idWorkouts, idStudents }: { idWorkouts: string[]; idStudents: string[] }) =>
      Promise.all(idWorkouts.map((idWorkout) => assignWorkout(idWorkout, idStudents))),
  });
}
