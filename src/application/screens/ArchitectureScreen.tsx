import { Text, View } from 'react-native';

import { Screen } from '../../shared/components';
import { useThemeSettings } from '../../shared/context/ThemeSettingsContext';

const architectureItems = [
  'React Native + Expo',
  'TypeScript',
  'MVVM',
  'Clean Architecture',
  'Feature First',
  'Autenticação',
  'Sessão persistente',
  'AuthStack e AppStack',
  'Secure Storage',
  'Axios',
  'Interceptors HTTP',
  'Context Providers',
  'Tema global',
  'Componentes compartilhados',
  'AppButton',
  'AppInput',
  'Screen',
  'EmptyState',
  'ErrorState',
];

export function ArchitectureScreen() {
  const { appTheme } = useThemeSettings();

  return (
    <Screen scrollable>
      <View
        style={{
          backgroundColor: appTheme.colors.primaryDark,
          borderRadius: appTheme.radius.lg,
          padding: appTheme.spacing.lg,
        }}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 28, fontWeight: '700' }}>
          Arquitetura da Base
        </Text>
        <Text style={{ color: 'rgba(255,255,255,0.82)', marginTop: appTheme.spacing.sm }}>
          Visão rápida do que esta base corporativa entrega para novos aplicativos React
          Native Expo da MGCode.
        </Text>
      </View>

      <View style={{ marginTop: appTheme.spacing.lg, gap: appTheme.spacing.md }}>
        {architectureItems.map((item) => (
          <View
            key={item}
            style={{
              backgroundColor: appTheme.colors.surface,
              borderRadius: appTheme.radius.md,
              borderWidth: 1,
              borderColor: appTheme.colors.border,
              padding: appTheme.spacing.md,
              flexDirection: 'row',
              alignItems: 'center',
              gap: appTheme.spacing.md,
            }}
          >
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                backgroundColor: appTheme.colors.primary,
              }}
            />
            <Text style={{ color: appTheme.colors.text, fontSize: 16, fontWeight: '700' }}>
              {item}
            </Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}
