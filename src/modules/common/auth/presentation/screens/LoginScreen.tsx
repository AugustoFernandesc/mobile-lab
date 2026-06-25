import { Image, View, ImageBackground } from 'react-native';

import { AppButton, AppInput, Footer } from '../../../../../shared/components';
import { useThemeSettings } from '../../../../../shared/context/ThemeSettingsContext';
import { useLogin } from '../hooks/useLogin';

export function LoginScreen() {
  const { appTheme } = useThemeSettings();
  const {
    cpf,
    password,
    isLoading,
    errorMessage,
    setCpf,
    setPassword,
    handleLogin,
  } = useLogin();

  return (
    <>

     <ImageBackground
        source={require('../../../../../assets/telalogin2.png')}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            paddingHorizontal: appTheme.spacing.lg,
            backgroundColor: 'rgba(0,0,0,0.35)',
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
            source={require('../../../../../assets/logoMgFitClean.png')}
            style={{
              width: 180,
              height: 180,
              alignSelf: 'center',
            }}
            resizeMode="contain"
          />

          <View
            style={{
              width: '100%',
              maxWidth: 320,
              gap: appTheme.spacing.lg,
              borderRadius: appTheme.radius.lg,
              borderColor: appTheme.colors.border,
              padding: appTheme.spacing.lg,
            }}
          >
            <AppInput
              value={cpf}
              onChangeText={setCpf}
              placeholder="CPF"
              autoCapitalize="none"
              keyboardType="phone-pad"
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
      </ImageBackground>
    </>
  );
}
