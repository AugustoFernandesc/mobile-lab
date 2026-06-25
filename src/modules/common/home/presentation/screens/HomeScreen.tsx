import { useAuth } from '../../../auth/presentation/context/AuthContext';
import { PersonalHomeContent } from '../contents/PersonalHomeContent';
import { StudentHomeContent } from '../contents/StudentHomeContent';

export function HomeScreen() {
  const { session } = useAuth();

  if (session?.user.role === 'personal') {
    return <PersonalHomeContent />;
  }

  return <StudentHomeContent />;
}
