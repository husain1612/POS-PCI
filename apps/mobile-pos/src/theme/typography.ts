export const fontFamily = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semibold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
} as const;

export const fontSize = {
  xs: 12,
  sm: 13,
  base: 15,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  display: 30,
} as const;

export const lineHeight = {
  xs: 16,
  sm: 18,
  base: 21,
  md: 22,
  lg: 24,
  xl: 26,
  xxl: 30,
  display: 36,
} as const;

export type FontSizeToken = keyof typeof fontSize;
