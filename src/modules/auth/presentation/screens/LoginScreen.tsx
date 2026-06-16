import { Image, View } from 'react-native';

import { AppButton, AppInput, Footer } from '../../../../shared/components';
import { useThemeSettings } from '../../../../shared/context/ThemeSettingsContext';
import { useLoginViewModel } from '../viewmodels/useLoginViewModel';

export function LoginScreen() {
  const { appTheme } = useThemeSettings();
  const {
    email,
    password,
    isLoading,
    errorMessage,
    setEmail,
    setPassword,
    handleLogin,
  } = useLoginViewModel();

  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
          paddingHorizontal: appTheme.spacing.lg,
          backgroundColor: appTheme.colors.background,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Image
            source={require('../../../../assets/logoMGCode.png')}
            style={{
              width: 180,
              height: 120,
              alignSelf: 'center',
            }}
            resizeMode="contain"
          />

          <View
            style={{
              width: '100%',
              maxWidth: 320,
              gap: appTheme.spacing.lg,
              backgroundColor: appTheme.colors.surface,
              borderRadius: appTheme.radius.lg,
              borderWidth: 1,
              borderColor: appTheme.colors.border,
              padding: appTheme.spacing.lg,
            }}
          >
            <AppInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              errorMessage={null}
            />

            <AppInput
              value={password}
              onChangeText={setPassword}
              placeholder="Senha"
              secureTextEntry
              errorMessage={errorMessage}
            />

            <AppButton
              label={isLoading ? 'ENTRANDO...' : 'ENTRAR'}
              onPress={handleLogin}
              disabled={isLoading}
            />
          </View>
        </View>
      </View>
      <Footer />
    </>
  );
}
