import type { ComponentType } from 'react';
import type MaterialIcons from '@expo/vector-icons/MaterialIcons';

export type AppIconName = keyof typeof MaterialIcons.glyphMap;

export type ModuleRoute = {
  name: string;
  title: string;
  component: ComponentType;
  showInMenu?: boolean;
  icon?: AppIconName;
  order?: number;
};

export type AppModule = {
  name: string;
  routes: readonly ModuleRoute[];
};
