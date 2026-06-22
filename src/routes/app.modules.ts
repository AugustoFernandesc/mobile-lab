import type { AppIconName } from './module.types';
import { homeModule } from '../modules/home/module.config';
import { myWorkoutsModule } from '../modules/my-workouts/module.config';
import { myRegistrationModule } from '../modules/my-registration/module.config';
import { settingsModule } from '../modules/settings/module.config';

export const appModules = [
  homeModule,
  myWorkoutsModule,
  myRegistrationModule,
  settingsModule,
] as const;

export type AppRoute = (typeof appModules)[number]['routes'][number];

export type AppRouteName = AppRoute['name'];

export type AppStackParamList = { [Name in AppRouteName]: undefined };

export type MenuItem = {
  route: AppRouteName;
  title: string;
  icon: AppIconName;
};

export function getAppRoutes(): readonly AppRoute[] {
  return appModules.flatMap<AppRoute>((module) => module.routes);
}

export function getMenuItems(): MenuItem[] {
  return getAppRoutes()
    .filter((route) => route.showInMenu)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((route) => ({
      route: route.name,
      title: route.title,
      icon: route.icon ?? 'chevron-right',
    }));
}

const appRouteNames = new Set<string>(getAppRoutes().map((route) => route.name));

export function isAppRouteName(value: string | null | undefined): value is AppRouteName {
  return value != null && appRouteNames.has(value);
}
