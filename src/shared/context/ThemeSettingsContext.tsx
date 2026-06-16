import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { appStorage } from '../../infra/storage/appStorage';
import {
  buildTheme,
  primaryColorOptions,
  type AppTheme,
  type PrimaryColorOptionId,
  type SideMenuTheme,
} from '../theme';

const THEME_SETTINGS_STORAGE_KEY = 'mgcode.mobile_base.theme_settings';

type ThemeSettingsState = {
  primaryColorId: PrimaryColorOptionId;
  isCompactMenu: boolean;
  sideMenuTheme: SideMenuTheme;
};

type ThemeSettingsContextData = ThemeSettingsState & {
  appTheme: AppTheme;
  colorOptions: typeof primaryColorOptions;
  setPrimaryColorId: (primaryColorId: PrimaryColorOptionId) => void;
  setCompactMenu: (isCompactMenu: boolean) => void;
  setSideMenuTheme: (sideMenuTheme: SideMenuTheme) => void;
};

const defaultState: ThemeSettingsState = {
  primaryColorId: 'blue',
  isCompactMenu: false,
  sideMenuTheme: 'dark',
};

const ThemeSettingsContext = createContext<ThemeSettingsContextData | undefined>(undefined);

export function ThemeSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<ThemeSettingsState>(defaultState);

  useEffect(() => {
    async function restoreSettings() {
      const storedSettings = await appStorage.getItem<ThemeSettingsState>(
        THEME_SETTINGS_STORAGE_KEY
      );

      if (storedSettings) {
        setSettings(storedSettings);
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

  const setSideMenuTheme = useCallback((sideMenuTheme: SideMenuTheme) => {
    void persist({ ...settings, sideMenuTheme });
  }, [settings]);

  const appTheme = useMemo(() => buildTheme(settings.primaryColorId), [settings.primaryColorId]);

  const value = useMemo(
    () => ({
      ...settings,
      appTheme,
      colorOptions: primaryColorOptions,
      setPrimaryColorId,
      setCompactMenu,
      setSideMenuTheme,
    }),
    [appTheme, setCompactMenu, setPrimaryColorId, setSideMenuTheme, settings]
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
