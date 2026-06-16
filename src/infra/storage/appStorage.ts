import AsyncStorage from '@react-native-async-storage/async-storage';

export const appStorage = {
  async getItem<T>(key: string): Promise<T | null> {
    const rawValue = await AsyncStorage.getItem(key);

    if (!rawValue) {
      return null;
    }

    return JSON.parse(rawValue) as T;
  },

  async setItem<T>(key: string, value: T): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
};
