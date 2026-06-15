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
        }}
      />

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        cursorColor="blue"
        onChangeText={setEmail}
        style={{
          width: '70%',
          maxWidth: 320,
          borderWidth: 1,
          borderColor: errorMessage ? '#ff4d4f' : '#ccc',
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
          width: '70%',
          maxWidth: 320,
          borderWidth: 1,
          borderColor: errorMessage ? '#ff4d4f' : '#ccc',
          borderRadius: 8,
          padding: 12,
          marginTop: 12,
          backgroundColor: '#ccc',
        }}
        value={password}
      />

      {errorMessage ? (
        <Text
          style={{
            width: '70%',
            maxWidth: 320,
            marginTop: 12,
            paddingHorizontal: 12,
            paddingVertical: 10,
            backgroundColor: 'rgba(127, 29, 29, 0.85)',
            color: '#fff',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          {errorMessage}
        </Text>
      ) : null}

      <Pressable
        onPress={handleLogin}
        style={{
          backgroundColor: '#faf9f9',
          padding: 12,
          borderRadius: 8,
          width: '70%',
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
