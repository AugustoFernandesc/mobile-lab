import { createNavigationContainerRef } from '@react-navigation/native';

import type { AppStackParamList, AuthStackParamList } from './navigation.types';

export type RootNavigationParamList = AuthStackParamList & AppStackParamList;

export const navigationRef = createNavigationContainerRef<RootNavigationParamList>();

export function getCurrentRouteName(): string | null {
  return navigationRef.getCurrentRoute()?.name ?? null;
}

export function navigate(routeName: string, params?: Record<string, unknown>) {
  if (!navigationRef.isReady()) {
    return;
  }

  (navigationRef as unknown as { navigate: (name: string, nextParams?: unknown) => void }).navigate(
    routeName,
    params
  );
}
