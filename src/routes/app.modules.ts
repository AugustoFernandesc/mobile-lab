import type { AppIconName, AppModule, ModuleRoute } from './module.types';
import type { UserRole } from '../modules/common/auth/data/auth.types';
import { homeModule } from '../modules/common/home/module.config';
import { settingsModule } from '../modules/common/settings/module.config';
import { myWorkoutsModule } from '../modules/aluno/my-workouts/module.config';
import { myRegistrationModule } from '../modules/aluno/my-registration/module.config';
import { personalWorkoutsModule } from '../modules/personal/my-workouts/module.config';
import { personalStudentsModule } from '../modules/personal/my-students/module.config';

/** Módulos do aluno. */
export const studentAppModules = [
  homeModule,
  myWorkoutsModule,
  myRegistrationModule,
  settingsModule,
] as const;

/** Módulos do personal. */
export const personalAppModules = [
  homeModule,
  personalWorkoutsModule,
  personalStudentsModule,
  settingsModule,
] as const;

type AppRoute =
  | (typeof studentAppModules)[number]['routes'][number]
  | (typeof personalAppModules)[number]['routes'][number];

export type AppRouteName = AppRoute['name'];

export type AppStackParamList = { [Name in AppRouteName]: undefined };

export type MenuItem = {
  route: AppRouteName;
  title: string;
  icon: AppIconName;
};

function modulesForRole(role: UserRole | undefined): readonly AppModule[] {
  return role === 'personal' ? personalAppModules : studentAppModules;
}

function flattenRoutes(modules: readonly AppModule[]): readonly ModuleRoute[] {
  return modules.flatMap((module) => module.routes);
}

export function getRoutesForRole(role: UserRole | undefined): readonly ModuleRoute[] {
  return flattenRoutes(modulesForRole(role));
}

export function getMenuItemsForRole(role: UserRole | undefined): MenuItem[] {
  return flattenRoutes(modulesForRole(role))
    .filter((route) => route.showInMenu)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((route) => ({
      route: route.name as AppRouteName,
      title: route.title,
      icon: route.icon ?? 'chevron-right',
    }));
}
