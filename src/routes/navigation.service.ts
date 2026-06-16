import { createNavigationContainerRef } from '@react-navigation/native';

import type { AppStackParamList, AuthStackParamList } from './navigation.types';

export type RootNavigationParamList = AuthStackParamList & AppStackParamList;

export const navigationRef = createNavigationContainerRef<RootNavigationParamList>();

export function getCurrentRouteName(): keyof RootNavigationParamList | null {
  return navigationRef.getCurrentRoute()?.name ?? null;
}

export function navigate<RouteName extends keyof RootNavigationParamList>(
  routeName: RouteName,
  params?: RootNavigationParamList[RouteName]
) {
  if (!navigationRef.isReady()) {
    return;
  }

  (navigationRef as unknown as { navigate: (name: RouteName, nextParams?: RootNavigationParamList[RouteName]) => void }).navigate(
    routeName,
    params
  );
}
