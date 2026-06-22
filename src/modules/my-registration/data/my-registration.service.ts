import { api } from '../../../infra/http/api';
import { MyRegistrationResponse } from './my-registration.types';

export async function getMyRegistrationSummary(studentId: string) {
  const { data } = await api.get<MyRegistrationResponse>(
    `/students/${studentId}/registration-summary`,
  );

  return data;
}
