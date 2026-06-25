import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { AppButton, EmptyState, Screen } from '../../../../../shared/components';
import { useThemeSettings } from '../../../../../shared/context/ThemeSettingsContext';
import { useAssignWorkout, useMyStudents } from '../hooks/useStudents';
import { useMyWorkouts } from '../../../my-workouts/presentation/hooks/useWorkouts';

type Tab = 'workouts' | 'students';

export function AssignScreen() {
  const { appTheme } = useThemeSettings();
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const workoutsQuery = useMyWorkouts();
  const studentsQuery = useMyStudents();
  const assignWorkout = useAssignWorkout();

  const [activeTab, setActiveTab] = useState<Tab>('workouts');
  const [selectedWorkouts, setSelectedWorkouts] = useState<string[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const workouts = workoutsQuery.data ?? [];
  const students = studentsQuery.data ?? [];
  const allStudentsSelected = students.length > 0 && selectedStudents.length === students.length;

  function goToTab(tab: Tab) {
    setActiveTab(tab);
    setError(null);
    Animated.timing(slideAnim, {
      toValue: tab === 'workouts' ? 0 : -width,
      duration: 260,
      useNativeDriver: true,
    }).start();
  }

  function toggleWorkout(id: string) {
    setSelectedWorkouts((prev) => (prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]));
  }

  function toggleStudent(id: string) {
    setSelectedStudents((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  }

  function toggleAllStudents() {
    setSelectedStudents(allStudentsSelected ? [] : students.map((s) => s.id));
  }

  function handleAssign() {
    if (selectedWorkouts.length === 0) {
      setError('Escolha ao menos um treino.');
      goToTab('workouts');
      return;
    }
    if (selectedStudents.length === 0) {
      setError('Selecione ao menos um aluno.');
      return;
    }
    setError(null);
    assignWorkout.mutate(
      { idWorkouts: selectedWorkouts, idStudents: selectedStudents },
      {
        onSuccess: () => {
          Alert.alert('Pronto!', 'Treinos atribuídos com sucesso.');
          navigation.goBack();
        },
        onError: () => setError('Não foi possível atribuir. Tente novamente.'),
      },
    );
  }

  function CheckboxRow({
    id,
    checked,
    label,
    onPress,
    bold,
  }: {
    id: string;
    checked: boolean;
    label: string;
    onPress: () => void;
    bold?: boolean;
  }) {
    return (
      <Pressable
        key={id}
        onPress={onPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: appTheme.spacing.sm,
          paddingVertical: appTheme.spacing.md,
          borderBottomWidth: 1,
          borderBottomColor: appTheme.colors.border,
        }}
      >
        <MaterialIcons
          name={checked ? 'check-box' : 'check-box-outline-blank'}
          size={35}
          color={checked ? appTheme.colors.primary : appTheme.colors.textMuted}
        />
        <Text style={{ color: appTheme.colors.text, fontWeight: bold ? '700' : '400', flex: 1, fontSize: 16 }}>
          {label}
        </Text>
      </Pressable>
    );
  }

  if (workoutsQuery.isLoading || studentsQuery.isLoading) {
    return (
      <Screen>
        <ActivityIndicator size="large" color={appTheme.colors.primary} />
      </Screen>
    );
  }

  if (workouts.length === 0) {
    return (
      <Screen>
        <EmptyState title="Nenhum treino criado" description="Crie um treino antes de atribuir aos alunos." />
      </Screen>
    );
  }

  const tabBg = appTheme.colors.surface;
  const tabActiveBg = appTheme.colors.primary;
  const tabActiveTxt = '#FFFFFF';
  const tabInactiveTxt = appTheme.colors.textMuted;

  return (
    <View style={{ flex: 1, backgroundColor: appTheme.colors.background }}>
      {/* Painéis deslizantes */}
      <View style={{ flex: 1, overflow: 'hidden' }}>
        <Animated.View
          style={{
            flexDirection: 'row',
            width: width * 2,
            flex: 1,
            transform: [{ translateX: slideAnim }],
          }}
        >
          {/* Painel 1: Treinos */}
          <ScrollView
            style={{ width }}
            contentContainerStyle={{ padding: appTheme.spacing.lg, gap: appTheme.spacing.sm }}
          >
            <Text style={{ color: appTheme.colors.textMuted, fontSize: 13, marginBottom: 4 }}>
              Selecione os treinos que serão atribuídos
            </Text>
            {workouts.map((workout) => (
              <CheckboxRow
                key={workout.id}
                id={workout.id}
                checked={selectedWorkouts.includes(workout.id)}
                label={workout.name}
                onPress={() => toggleWorkout(workout.id)}
              />
            ))}
          </ScrollView>

          {/* Painel 2: Alunos */}
          <ScrollView
            style={{ width }}
            contentContainerStyle={{ padding: appTheme.spacing.lg, gap: appTheme.spacing.sm }}
          >
            <Text style={{ color: appTheme.colors.textMuted, fontSize: 13, marginBottom: 4 }}>
              Selecione os alunos que receberão os treinos
            </Text>
            {students.length === 0 ? (
              <Text style={{ color: appTheme.colors.textMuted }}>Você ainda não tem alunos vinculados.</Text>
            ) : (
              <>
                <CheckboxRow
                  id="all"
                  checked={allStudentsSelected}
                  label="Selecionar todos"
                  onPress={toggleAllStudents}
                  bold
                />
                {students.map((student) => (
                  <CheckboxRow
                    key={student.id}
                    id={student.id}
                    checked={selectedStudents.includes(student.id)}
                    label={student.name}
                    onPress={() => toggleStudent(student.id)}
                  />
                ))}
              </>
            )}
          </ScrollView>
        </Animated.View>
      </View>

      {/* Rodapé: tabs + erro + botão */}
      <View
        style={{
          backgroundColor: appTheme.colors.surface,
          borderTopWidth: 1,
          borderTopColor: appTheme.colors.border,
          paddingHorizontal: appTheme.spacing.lg,
          paddingTop: appTheme.spacing.md,
          paddingBottom: appTheme.spacing.lg,
          gap: appTheme.spacing.md,
        }}
      >
        {/* Tabs */}
        <View style={{ flexDirection: 'row', gap: appTheme.spacing.sm }}>
          <Pressable
            onPress={() => goToTab('workouts')}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              paddingVertical: appTheme.spacing.md,
              borderRadius: appTheme.radius.md,
              backgroundColor: activeTab === 'workouts' ? tabActiveBg : tabBg,
              borderWidth: 1,
              borderColor: activeTab === 'workouts' ? appTheme.colors.primary : appTheme.colors.border,
            }}
          >
            <MaterialIcons
              name="fitness-center"
              size={18}
              color={activeTab === 'workouts' ? tabActiveTxt : tabInactiveTxt}
            />
            <Text style={{ color: activeTab === 'workouts' ? tabActiveTxt : tabInactiveTxt, fontWeight: '700' }}>
              Treinos{selectedWorkouts.length > 0 ? ` (${selectedWorkouts.length})` : ''}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => goToTab('students')}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              paddingVertical: appTheme.spacing.md,
              borderRadius: appTheme.radius.md,
              backgroundColor: activeTab === 'students' ? tabActiveBg : tabBg,
              borderWidth: 1,
              borderColor: activeTab === 'students' ? appTheme.colors.primary : appTheme.colors.border,
            }}
          >
            <MaterialIcons
              name="group"
              size={18}
              color={activeTab === 'students' ? tabActiveTxt : tabInactiveTxt}
            />
            <Text style={{ color: activeTab === 'students' ? tabActiveTxt : tabInactiveTxt, fontWeight: '700' }}>
              Alunos{selectedStudents.length > 0 ? ` (${selectedStudents.length})` : ''}
            </Text>
          </Pressable>
        </View>

        {error ? (
          <Text style={{ color: appTheme.colors.danger, fontWeight: '600', textAlign: 'center' }}>{error}</Text>
        ) : null}

        <AppButton
          label={assignWorkout.isPending ? 'Atribuindo...' : `Atribuir ${selectedWorkouts.length > 0 ? `${selectedWorkouts.length} treino(s)` : ''}`.trim()}
          variant="primary"
          onPress={handleAssign}
          disabled={assignWorkout.isPending || selectedWorkouts.length === 0}
        />
      </View>
    </View>
  );
}
