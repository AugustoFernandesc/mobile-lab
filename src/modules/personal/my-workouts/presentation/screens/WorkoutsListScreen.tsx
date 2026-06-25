import { type ComponentProps } from 'react';
import { Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { AppButton, Screen } from '../../../../../shared/components';
import { useThemeSettings } from '../../../../../shared/context/ThemeSettingsContext';
import { navigate } from '../../../../../routes/navigation.service';

type IconName = ComponentProps<typeof MaterialIcons>['name'];

export function WorkoutsListScreen() {
  const { appTheme } = useThemeSettings();

  function ActionCard({
    icon,
    title,
    description,
    buttonLabel,
    onPress,
  }: {
    icon: IconName;
    title: string;
    description: string;
    buttonLabel: string;
    onPress: () => void;
  }) {
    return (
      <View
        style={{
          backgroundColor: appTheme.colors.surface,
          borderRadius: appTheme.radius.lg,
          borderWidth: 1,
          borderColor: appTheme.colors.border,
          padding: appTheme.spacing.lg,
          gap: appTheme.spacing.md,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <MaterialIcons name={icon} size={24} color={appTheme.colors.primary} />
          <Text style={{ fontSize: 20, fontWeight: '800', color: appTheme.colors.text }}>{title}</Text>
        </View>
        <Text style={{ color: appTheme.colors.textMuted }}>{description}</Text>
        <AppButton label={buttonLabel} variant="primary" onPress={onPress} />
      </View>
    );
  }

  return (
    <Screen scrollable>
      <ActionCard
        icon="list-alt"
        title="Criar exercício"
        description="Cadastre os exercícios que você usa para montar os treinos."
        buttonLabel="Ver exercícios"
        onPress={() => navigate('PersonalExercises')}
      />
      <ActionCard
        icon="fitness-center"
        title="Criar treino"
        description="Monte um treino com vários exercícios (ex.: Peito e Tríceps)."
        buttonLabel="Criar treino"
        onPress={() => navigate('PersonalCreateWorkout')}
      />
    </Screen>
  );
}
