import { ActivityIndicator, Text, View } from 'react-native';

import { ErrorState, Screen } from '../../../../shared/components';
import { useThemeSettings } from '../../../../shared/context/ThemeSettingsContext';
import { useMyRegistration } from '../hooks/useMyRegistration';

export function MyRegistrationScreen() {
  const { appTheme } = useThemeSettings();
  const { registration, isLoading, errorMessage } = useMyRegistration();

  if (isLoading) {
    return (
      <Screen>
        <ActivityIndicator size="large" color={appTheme.colors.primary} />
      </Screen>
    );
  }

  if (errorMessage || !registration) {
    return (
      <Screen>
        <ErrorState message={errorMessage ?? 'Matrícula não encontrada.'} />
      </Screen>
    );
  }

  return (
    <Screen scrollable>
      <View style={{ gap: appTheme.spacing.md }}>
        <View
          style={{
            backgroundColor: appTheme.colors.primary,
            borderRadius: appTheme.radius.lg,
            padding: appTheme.spacing.xl,
          }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 14, opacity: 0.85 }}>
            Plano atual
          </Text>

          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 28,
              fontWeight: '800',
              marginTop: 6,
            }}
          >
            {registration.plan_name}
          </Text>

          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 18,
              fontWeight: '700',
              marginTop: 12,
            }}
          >
            R$ {Number(registration.monthly_value).toFixed(2)}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: appTheme.colors.border,
            borderRadius: appTheme.radius.lg,
            padding: appTheme.spacing.lg,
            gap: 14,
          }}
        >
          <InfoRow label="Vencimento" value={`Dia ${registration.due_day}`} />
          <InfoRow label="Desconto" value={`${registration.discount}%`} />
          <InfoRow label="Pix" value={registration.pix_key ?? '—'} />
          <InfoRow
            label="Status"
            value={registration.active ? 'Ativa' : 'Inativa'}
          />
        </View>
      </View>
    </Screen>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  const { appTheme } = useThemeSettings();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: appTheme.colors.textMuted, fontSize: 15 }}>
        {label}
      </Text>

      <Text
        style={{
          color: appTheme.colors.text,
          fontSize: 16,
          fontWeight: '700',
        }}
      >
        {value}
      </Text>
    </View>
  );
}
