import { View, Image } from 'react-native';

import { Screen } from '../../../../shared/components';

export function HomeScreen() {
  return (
    <Screen>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={require('../../../../assets/logoMGCode.png')}
          resizeMode="contain"
          style={{
            width: 280,
            height: 120,
          }}
        />
      </View>
    </Screen>
  );
}
