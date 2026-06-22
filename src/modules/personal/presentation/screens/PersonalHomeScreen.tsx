import { Screen, EmptyState } from '../../../../shared/components';
import { useAuth } from '../../../auth/presentation/context/AuthContext';

export function PersonalHomeScreen() {
  const { session } = useAuth();

  return (
    <Screen>
      <EmptyState
        title={`Olá, ${session?.user.name ?? 'Personal'}`}
        description="A área do personal ainda está em construção. Em breve você terá acesso aos seus alunos e treinos por aqui."
      />
    </Screen>
  );
}
