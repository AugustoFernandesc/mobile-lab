import type { AppStackParamList } from './app.modules';

export type { AppStackParamList };

export type AuthStackParamList = {
  Login: undefined;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace -- padrão oficial do React Navigation para tipar a navegação globalmente
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList, AuthStackParamList {}
  }
}
