import { View, Text, Linking } from 'react-native';

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
      <Text style={{ color: '#ffffff', fontSize: 12 }}>
        © {new Date().getFullYear()}{' '}
        <Text
          onPress={() => Linking.openURL('https://www.mgcode.com.br/')}
        >
          <Text style={{ color: 'red', fontWeight: 'bold' }}>{'<'}</Text>
          <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>mg</Text>
          <Text style={{ color: 'red', fontWeight: 'bold' }}>{'/>'}</Text>
          <Text style={{ color: '#ffffff', fontWeight: 'bold' }}> code</Text>
        </Text>
        . Todos os direitos reservados.
      </Text>
    </View>
  );
}