import { useQuery } from '@tanstack/react-query';

import { useAuth } from '../../../../common/auth/presentation/context/AuthContext';
import { getMyRegistrationSummary } from '../../data/my-registration.service';

export function useMyRegistration() {
  const { session } = useAuth();
  const studentId = session?.user.id ?? null;

  const query = useQuery({
    queryKey: ['my-registration', studentId],
    queryFn: () => getMyRegistrationSummary(studentId as string),
    enabled: !!studentId,
  });

  const errorMessage = !studentId
    ? 'Não foi possível identificar o aluno logado.'
    : query.isError
      ? 'Não foi possível carregar sua matrícula. Tente novamente.'
      : null;

  return {
    registration: query.data ?? null,
    isLoading: query.isLoading,
    errorMessage,
    reload: query.refetch,
  };
}
