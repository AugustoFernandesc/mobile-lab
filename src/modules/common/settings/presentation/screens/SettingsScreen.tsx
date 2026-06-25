import { Pressable, Switch, Text, View } from 'react-native';

import { Screen } from '../../../../../shared/components';
import { useThemeSettings } from '../../../../../shared/context/ThemeSettingsContext';

export function SettingsScreen() {
  const {
    appTheme,
    colorOptions,
    primaryColorId,
    isCompactMenu,
    setPrimaryColorId,
    setCompactMenu,
  } = useThemeSettings();

  return (
    <Screen scrollable>

      <View style={{ marginTop: appTheme.spacing.xs, gap: appTheme.spacing.lg }}>
        <View
          style={{
            backgroundColor: appTheme.colors.surface,
            borderRadius: appTheme.radius.md,
            borderWidth: 1,
            borderColor: appTheme.colors.border,
            padding: appTheme.spacing.md,
          }}
        >
          <Text style={{ color: appTheme.colors.text, fontSize: 18, fontWeight: '700' }}>
            Cor primária
          </Text>
          <Text style={{ color: appTheme.colors.textMuted, marginTop: appTheme.spacing.xs }}>
            Escolha uma das opcoes para destacar botoes, acentos e interacoes.
          </Text>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: appTheme.spacing.sm,
              marginTop: appTheme.spacing.md,
            }}
          >
            {colorOptions.map((option) => {
              const isActive = option.id === primaryColorId;

              return (
                <Pressable
                  key={option.id}
                  onPress={() => setPrimaryColorId(option.id)}
                  style={{
                    width: '30%',
                    minWidth: 94,
                    borderRadius: appTheme.radius.md,
                    borderWidth: 2,
                    borderColor: isActive ? appTheme.colors.text : appTheme.colors.border,
                    padding: appTheme.spacing.sm,
                    backgroundColor: appTheme.colors.surfaceMuted,
                  }}
                >
                  <View
                    style={{
                      width: '100%',
                      height: 22,
                      borderRadius: appTheme.radius.sm,
                      backgroundColor: option.value,
                    }}
                  />
                  <Text
                    style={{
                      color: appTheme.colors.text,
                      fontWeight: isActive ? '700' : '600',
                      marginTop: appTheme.spacing.xs,
                    }}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View
          style={{
            backgroundColor: appTheme.colors.surface,
            borderRadius: appTheme.radius.md,
            borderWidth: 1,
            borderColor: appTheme.colors.border,
            padding: appTheme.spacing.md,
            gap: appTheme.spacing.md,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 1, marginRight: appTheme.spacing.md }}>
              <Text style={{ color: appTheme.colors.text, fontSize: 18, fontWeight: '700' }}>
                Menu lateral compacto
              </Text>
              <Text style={{ color: appTheme.colors.textMuted, marginTop: 4 }}>
                Quando ativo, reduz a largura do drawer e destaca uma navegacao mais enxuta.
              </Text>
            </View>

            <Switch
              value={isCompactMenu}
              onValueChange={setCompactMenu}
              thumbColor="#FFFFFF"
              trackColor={{
                false: appTheme.colors.border,
                true: appTheme.colors.primary,
              }}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}
