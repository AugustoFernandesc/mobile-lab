import { api } from '../../../../infra/http/api';
import type { PersonalStudent } from './students.types';

export async function getMyStudents(): Promise<PersonalStudent[]> {
  const { data } = await api.get<PersonalStudent[]>('/personal/mobile/my-students');
  return data;
}

export async function assignWorkout(idWorkout: string, idStudents: string[]): Promise<void> {
  await api.post('/personal/mobile/assignments', {
    id_workout: idWorkout,
    id_students: idStudents,
  });
}
