export const primaryColorOptions = [
  { id: 'blue', label: 'Azul', value: '#0F62FE', darkValue: '#0A3EA8' },
  { id: 'green', label: 'Verde', value: '#198754', darkValue: '#146C43' },
  { id: 'orange', label: 'Laranja', value: '#F97316', darkValue: '#C2410C' },
  { id: 'red', label: 'Vermelho', value: '#DC2626', darkValue: '#991B1B' },
  { id: 'teal', label: 'Teal', value: '#0F766E', darkValue: '#115E59' },
  { id: 'black', label: 'Preto', value: '#000000', darkValue: '#ffffff' },
] as const;

export type PrimaryColorOptionId = (typeof primaryColorOptions)[number]['id'];
export type SideMenuTheme = 'dark' | 'light';

export const theme = {
  colors: {
    primary: '#0F62FE',
    primaryDark: '#0A3EA8',
    background: '#F4F7FB',
    surface: '#FFFFFF',
    surfaceMuted: '#E9EEF5',
    border: '#D7E0EA',
    text: '#14213D',
    textMuted: '#5C6B82',
    success: '#198754',
    danger: '#C62828',
    dangerSoft: '#FDEDED',
    overlay: 'rgba(15, 23, 42, 0.35)',
    black: '#000000'
  },
  spacing: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 10,
    md: 16,
    lg: 24,
  },
};

export type AppTheme = typeof theme;

export function getPrimaryColorOption(primaryColorId: PrimaryColorOptionId) {
  return (
    primaryColorOptions.find((option) => option.id === primaryColorId) ?? primaryColorOptions[0]
  );
}

export function buildTheme(primaryColorId: PrimaryColorOptionId): AppTheme {
  const primaryColor = getPrimaryColorOption(primaryColorId);

  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary: primaryColor.value,
      primaryDark: primaryColor.darkValue,
    },
  };
}
