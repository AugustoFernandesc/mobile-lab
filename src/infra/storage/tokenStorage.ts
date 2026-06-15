import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const tokenStorage = {
  async getToken() {
    return AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  },

  async setToken(token: string) {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  async getRefreshToken() {
    return AsyncStorage.getItem(REFRESH_TOKEN_KEY);
  },

  async setRefreshToken(refreshToken: string) {
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  async removeToken() {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
  },

  async removeRefreshToken() {
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};
