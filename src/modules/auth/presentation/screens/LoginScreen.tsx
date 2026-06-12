import { Image, ImageBackground, Pressable, Text, TextInput } from 'react-native';

import { Footer } from '../../../../shared/components/Footer';
import { useLoginViewModel } from '../viewmodels/useLoginViewModel';

export function LoginScreen() {
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
    <ImageBackground
      source={require('../../../../assets/imageFundo.jpeg')}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
      }}
    >
      <Image
        source={require('../../../../assets/logoMgFitClean.png')}
        style={{
          width: 150,
          height: 150,
          marginBottom: 24,
        }}
      />

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        cursorColor="blue"
        onChangeText={setEmail}
        style={{
          width: '100%',
          maxWidth: 320,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 12,
          backgroundColor: '#ccc',
        }}
        value={email}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        cursorColor="blue"
        onChangeText={setPassword}
        style={{
          width: '100%',
          maxWidth: 320,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 12,
          marginTop: 12,
          backgroundColor: '#ccc',
        }}
        value={password}
      />

      {errorMessage ? (
        <Text style={{ color: '#fff', marginTop: 12 }}>{errorMessage}</Text>
      ) : null}

      <Pressable
        onPress={handleLogin}
        style={{
          backgroundColor: '#faf9f9',
          padding: 12,
          borderRadius: 8,
          width: '100%',
          maxWidth: 320,
          alignItems: 'center',
          marginTop: 16,
          opacity: isLoading ? 0.7 : 1,
        }}
      >
        <Text style={{ color: 'black', fontWeight: 'bold' }}>
          {isLoading ? 'Entrando...' : 'Entrar'}
        </Text>
      </Pressable>

      <Footer />
    </ImageBackground>
  );
}
