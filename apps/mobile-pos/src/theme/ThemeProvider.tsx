import React, { createContext, useContext, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { ColorTokens, darkColors, lightColors } from "./colors";
import { radii } from "./radii";
import { spacing } from "./spacing";
import { makeShadows, Shadows } from "./shadows";
import { fontFamily, fontSize, lineHeight } from "./typography";

export type SchemePreference = "light" | "dark" | "system";

interface ThemeContextValue {
  colors: ColorTokens;
  spacing: typeof spacing;
  radii: typeof radii;
  shadows: Shadows;
  fontFamily: typeof fontFamily;
  fontSize: typeof fontSize;
  lineHeight: typeof lineHeight;
  isDark: boolean;
  preference: SchemePreference;
  setPreference: (preference: SchemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [preference, setPreference] = useState<SchemePreference>("system");

  const isDark = preference === "system" ? systemScheme === "dark" : preference === "dark";

  const value = useMemo<ThemeContextValue>(() => {
    const colors = isDark ? darkColors : lightColors;
    return {
      colors,
      spacing,
      radii,
      shadows: makeShadows(colors.shadow, isDark),
      fontFamily,
      fontSize,
      lineHeight,
      isDark,
      preference,
      setPreference,
    };
  }, [isDark, preference]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
