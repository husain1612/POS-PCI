export const radii = {
  sm: 8,
  md: 10,
  lg: 14,
  xl: 20,
  pill: 999,
} as const;

export type RadiusToken = keyof typeof radii;
