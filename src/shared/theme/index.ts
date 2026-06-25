export const primaryColorOptions = [
  { id: 'blue', label: 'Azul', value: '#0F62FE', darkValue: '#0A3EA8' },
  { id: 'green', label: 'Verde', value: '#198754', darkValue: '#146C43' },
  { id: 'orange', label: 'Laranja', value: '#F97316', darkValue: '#C2410C' },
  { id: 'red', label: 'Vermelho', value: '#DC2626', darkValue: '#991B1B' },
  { id: 'teal', label: 'Teal', value: '#0F766E', darkValue: '#115E59' },
  { id: 'black', label: 'Preto', value: '#000000', darkValue: '#ffffff' },
] as const;

export type PrimaryColorOptionId = (typeof primaryColorOptions)[number]['id'];
export type ColorScheme = 'light' | 'dark';

const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
};

const radius = {
  sm: 10,
  md: 16,
  lg: 24,
};

const lightColors = {
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
  black: '#000000',
};

const darkColors: typeof lightColors = {
  primary: '#0F62FE',
  primaryDark: '#0A3EA8',
  background: '#0B1220',
  surface: '#131C2E',
  surfaceMuted: '#1C2740',
  border: '#2A3651',
  text: '#F4F7FB',
  textMuted: '#9AA7BD',
  success: '#2FB67C',
  danger: '#F87171',
  dangerSoft: '#3A1D1D',
  overlay: 'rgba(0, 0, 0, 0.5)',
  black: '#000000',
};

export type AppTheme = {
  colors: typeof lightColors;
  spacing: typeof spacing;
  radius: typeof radius;
};

export function getPrimaryColorOption(primaryColorId: PrimaryColorOptionId) {
  return (
    primaryColorOptions.find((option) => option.id === primaryColorId) ?? primaryColorOptions[0]
  );
}

export function buildTheme(scheme: ColorScheme, primaryColorId: PrimaryColorOptionId): AppTheme {
  const baseColors = scheme === 'dark' ? darkColors : lightColors;
  const primaryColor = getPrimaryColorOption(primaryColorId);

  return {
    colors: {
      ...baseColors,
      primary: primaryColor.value,
      primaryDark: primaryColor.darkValue,
    },
    spacing,
    radius,
  };
}
