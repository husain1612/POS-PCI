import { Platform } from "react-native";

export interface ShadowStyle {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export function makeShadows(shadowColor: string, isDark: boolean) {
  const opacity = isDark ? 0.5 : 0.08;
  const build = (offsetY: number, radius: number, elevation: number): ShadowStyle =>
    Platform.select({
      android: {
        shadowColor,
        shadowOffset: { width: 0, height: offsetY },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation,
      },
      default: {
        shadowColor,
        shadowOffset: { width: 0, height: offsetY },
        shadowOpacity: opacity,
        shadowRadius: radius,
        elevation,
      },
    }) as ShadowStyle;

  return {
    sm: build(1, 3, 2),
    md: build(2, 8, 4),
    lg: build(6, 16, 8),
  };
}

export type Shadows = ReturnType<typeof makeShadows>;
