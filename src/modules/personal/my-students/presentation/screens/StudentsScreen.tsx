import { ActivityIndicator, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { AppButton, EmptyState, Screen } from '../../../../../shared/components';
import { useThemeSettings } from '../../../../../shared/context/ThemeSettingsContext';
import { navigate } from '../../../../../routes/navigation.service';
import { useMyStudents } from '../hooks/useStudents';

export function StudentsScreen() {
  const { appTheme } = useThemeSettings();
  const { data: students, isLoading } = useMyStudents();

  if (isLoading) {
    return (
      <Screen>
        <ActivityIndicator size="large" color={appTheme.colors.primary} />
      </Screen>
    );
  }

  if (!students?.length) {
    return (
      <Screen>
        <EmptyState
          title="Nenhum aluno ainda"
          description="Quando um aluno se matricular vinculado a você, ele aparecerá aqui."
        />
      </Screen>
    );
  }

  return (
    <Screen scrollable>
      <AppButton
        label="Atribuir treinos"
        variant="primary"
        onPress={() => navigate('PersonalAssign')}
      />

      <View style={{ gap: appTheme.spacing.md }}>
        {students.map((student) => (
          <View
            key={student.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: appTheme.spacing.md,
              backgroundColor: appTheme.colors.surface,
              borderRadius: appTheme.radius.lg,
              borderWidth: 1,
              borderColor: appTheme.colors.border,
              padding: appTheme.spacing.xs,
            }}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: appTheme.colors.surfaceMuted,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialIcons name="person" size={24} color={appTheme.colors.primary} />
            </View>
            <Text style={{ color: appTheme.colors.text, fontSize: 16, fontWeight: '600', flex: 1 }}>
              {student.name}
            </Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}
