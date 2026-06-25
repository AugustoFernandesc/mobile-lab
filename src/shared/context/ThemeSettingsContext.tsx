import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';

import { appStorage } from '../../infra/storage/appStorage';
import {
  buildTheme,
  primaryColorOptions,
  type AppTheme,
  type ColorScheme,
  type PrimaryColorOptionId,
} from '../theme';

const THEME_SETTINGS_STORAGE_KEY = 'mgcode.mobile_base.theme_settings';

type ThemeSettingsState = {
  primaryColorId: PrimaryColorOptionId;
  isCompactMenu: boolean;
};

type ThemeSettingsContextData = ThemeSettingsState & {
  appTheme: AppTheme;
  colorScheme: ColorScheme;
  colorOptions: typeof primaryColorOptions;
  setPrimaryColorId: (primaryColorId: PrimaryColorOptionId) => void;
  setCompactMenu: (isCompactMenu: boolean) => void;
};

const defaultState: ThemeSettingsState = {
  primaryColorId: 'blue',
  isCompactMenu: false,
};

const ThemeSettingsContext = createContext<ThemeSettingsContextData | undefined>(undefined);

export function ThemeSettingsProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const colorScheme: ColorScheme = systemScheme === 'dark' ? 'dark' : 'light';

  const [settings, setSettings] = useState<ThemeSettingsState>(defaultState);

  useEffect(() => {
    async function restoreSettings() {
      const storedSettings = await appStorage.getItem<Partial<ThemeSettingsState>>(
        THEME_SETTINGS_STORAGE_KEY
      );

      if (storedSettings) {
        setSettings({
          primaryColorId: storedSettings.primaryColorId ?? defaultState.primaryColorId,
          isCompactMenu: storedSettings.isCompactMenu ?? defaultState.isCompactMenu,
        });
      }
    }

    restoreSettings();
  }, []);

  async function persist(nextSettings: ThemeSettingsState) {
    setSettings(nextSettings);
    await appStorage.setItem(THEME_SETTINGS_STORAGE_KEY, nextSettings);
  }

  const setPrimaryColorId = useCallback((primaryColorId: PrimaryColorOptionId) => {
    void persist({ ...settings, primaryColorId });
  }, [settings]);

  const setCompactMenu = useCallback((isCompactMenu: boolean) => {
    void persist({ ...settings, isCompactMenu });
  }, [settings]);

  const appTheme = useMemo(
    () => buildTheme(colorScheme, settings.primaryColorId),
    [colorScheme, settings.primaryColorId]
  );

  const value = useMemo(
    () => ({
      ...settings,
      appTheme,
      colorScheme,
      colorOptions: primaryColorOptions,
      setPrimaryColorId,
      setCompactMenu,
    }),
    [appTheme, colorScheme, setCompactMenu, setPrimaryColorId, settings]
  );

  return <ThemeSettingsContext.Provider value={value}>{children}</ThemeSettingsContext.Provider>;
}

export function useThemeSettings() {
  const context = useContext(ThemeSettingsContext);

  if (!context) {
    throw new Error('useThemeSettings must be used within ThemeSettingsProvider');
  }

  return context;
}
