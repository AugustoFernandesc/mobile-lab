import { View, Text, Pressable, Linking } from 'react-native';

export function Footer() {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 24,
        width: '100%',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: '#fff', fontSize: 12 }}>
        © {new Date().getFullYear()}{' '}
        <Text
          style={{ color: 'red', fontWeight: 'bold' }}
          onPress={() => Linking.openURL('https://www.mgcode.com.br/')}
        >
          mgCode
        </Text>
        . Todos direitos reservados .
      </Text>
    </View>
  );
}