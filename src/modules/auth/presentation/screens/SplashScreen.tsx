import { ActivityIndicator, Text, View } from 'react-native';

import { theme } from '../../../../shared/theme';

export function SplashScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.text,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.lg,
      }}
    >
      <ActivityIndicator size="large" color="#FFFFFF" />
      <Text
        style={{
          color: '#FFFFFF',
          marginTop: theme.spacing.md,
          fontSize: 16,
          fontWeight: '600',
        }}
      >
        Restaurando sessao segura...
      </Text>
    </View>
  );
}
