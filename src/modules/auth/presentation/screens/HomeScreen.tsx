import { Pressable, ScrollView, Text, View } from 'react-native';

const modules = ['Pessoas', 'Planos', 'Matriculas', 'Recebimentos'];

export function HomeScreen() {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 24,
        backgroundColor: '#f4f7fb',
      }}
    >
      <View style={{ marginTop: 48 }}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: '700',
            color: '#14213d',
          }}
        >
          Bem-vindo
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: '#4f5d75',
            marginTop: 8,
            marginBottom: 24,
          }}
        >
          Escolha um modulo para continuar.
        </Text>

        <View style={{ gap: 16 }}>
          {modules.map((module) => (
            <Pressable
              key={module}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 16,
                padding: 20,
                borderWidth: 1,
                borderColor: '#d9e2ec',
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#1f2937',
                }}
              >
                {module}
              </Text>
              <Text
                style={{
                  marginTop: 6,
                  color: '#6b7280',
                }}
              >
                Modulo demonstrativo.
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
