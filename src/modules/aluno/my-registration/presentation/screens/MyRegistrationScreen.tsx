import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Clipboard from 'expo-clipboard';

import { ErrorState, Screen } from '../../../../../shared/components';
import { useThemeSettings } from '../../../../../shared/context/ThemeSettingsContext';
import { useMyRegistration } from '../hooks/useMyRegistration';

export function MyRegistrationScreen() {
  const { appTheme } = useThemeSettings();
  const { registration, isLoading, errorMessage } = useMyRegistration();
  const [copiedPix, setCopiedPix] = useState(false);

  async function handleCopyPix() {
    if (!registration?.pix_key) return;

    await Clipboard.setStringAsync(registration.pix_key);
    setCopiedPix(true);

    setTimeout(() => {
      setCopiedPix(false);
    }, 1800);
  }

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

  const monthlyValue = Number(registration.monthly_value).toLocaleString(
    'pt-BR',
    {
      style: 'currency',
      currency: 'BRL',
    },
  );

  return (
    <Screen scrollable>
      <View style={{ gap: appTheme.spacing.lg }}>
        <View
          style={{
            backgroundColor: appTheme.colors.primary,
            borderRadius: appTheme.radius.lg,
            padding: appTheme.spacing.xl,
            gap: appTheme.spacing.md,
          }}
        >
          <View
            style={{
              alignSelf: 'flex-start',
              backgroundColor: 'rgba(255,255,255,0.18)',
              borderRadius: 999,
              paddingHorizontal: 12,
              paddingVertical: 6,
            }}
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 13,
                fontWeight: '700',
              }}
            >
              {registration.active ? 'Matrícula ativa' : 'Matrícula inativa'}
            </Text>
          </View>

          <View>
            <Text style={{ color: '#FFFFFF', fontSize: 14, opacity: 0.85 }}>
              Plano atual
            </Text>

            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 30,
                fontWeight: '900',
                marginTop: 6,
              }}
            >
              {registration.plan_name}
            </Text>
          </View>

          <View>
            <Text style={{ color: '#FFFFFF', fontSize: 14, opacity: 0.85 }}>
              Valor da Mensalidade
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 6,
              }}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 24,
                  fontWeight: '800',
                }}
              >
                {monthlyValue}
              </Text>

              {registration.discount > 0 ? (
                <View
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.18)',
                    borderRadius: 999,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    marginTop: 8, 
                  }}
                >
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 13,
                      fontWeight: '700',
                    }}
                  >
                    Desconto {registration.discount}%
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>


        <View style={{ gap: appTheme.spacing.md }}>
          <InfoCard
            icon="event"
            label="Vencimento"
            value={`Dia ${registration.due_day}`}
          />

          <InfoCard
            icon="check-circle"
            label="Status"
            value={registration.active ? 'Ativa' : 'Inativa'}
          />

          <View style={{ gap: 6 }}>
        <Pressable
          onPress={handleCopyPix}
          disabled={!registration.pix_key}
          style={{
            backgroundColor: appTheme.colors.surface,
            borderRadius: appTheme.radius.lg,
            borderWidth: 1,
            borderColor: appTheme.colors.border,
            padding: appTheme.spacing.lg,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            opacity: registration.pix_key ? 1 : 0.6,
          }}
        >
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 21,
              backgroundColor: appTheme.colors.surfaceMuted,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MaterialIcons
              name={copiedPix ? 'check' : 'pix'}
              size={22}
              color={copiedPix ? appTheme.colors.success : appTheme.colors.primary}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: appTheme.colors.textMuted,
                fontSize: 13,
                fontWeight: '700',
              }}
            >
              Chave Pix
            </Text>

            <Text
              numberOfLines={1}
              style={{
                color: appTheme.colors.text,
                fontSize: 17,
                fontWeight: '800',
                marginTop: 2,
              }}
            >
              {registration.pix_key ?? 'Não informada'}
            </Text>
          </View>

          <MaterialIcons
            name={copiedPix ? 'check' : 'content-copy'}
            size={20}
            color={copiedPix ? appTheme.colors.success : appTheme.colors.textMuted}
          />
        </Pressable>

        {copiedPix ? (
          <Text
            style={{
              color: appTheme.colors.success,
              fontSize: 13,
              fontWeight: '700',
              marginLeft: 4,
            }}
          >
            Chave Pix copiada!
          </Text>
        ) : null}
      </View>
        </View>
      </View>
    </Screen>
  );
}

type InfoCardProps = {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value: string;
};

function InfoCard({ icon, label, value }: InfoCardProps) {
  const { appTheme } = useThemeSettings();

  return (
    <View
      style={{
        backgroundColor: appTheme.colors.surface,
        borderRadius: appTheme.radius.lg,
        borderWidth: 1,
        borderColor: appTheme.colors.border,
        padding: appTheme.spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <View
        style={{
          width: 42,
          height: 42,
          borderRadius: 21,
          backgroundColor: appTheme.colors.surfaceMuted,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MaterialIcons name={icon} size={22} color={appTheme.colors.primary} />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: appTheme.colors.textMuted,
            fontSize: 13,
            fontWeight: '700',
          }}
        >
          {label}
        </Text>

        <Text
          style={{
            color: appTheme.colors.text,
            fontSize: 17,
            fontWeight: '800',
            marginTop: 2,
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}