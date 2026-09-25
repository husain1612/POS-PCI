import React from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "@/theme";

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  elevated?: boolean;
  padded?: boolean;
}

export function Card({ children, onPress, style, elevated = true, padded = true }: CardProps) {
  const { colors, radii, spacing, shadows } = useTheme();

  const baseStyle: ViewStyle = {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radii.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: padded ? spacing.md : 0,
    ...(elevated ? shadows.sm : {}),
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [baseStyle, { opacity: pressed ? 0.85 : 1 }, style]}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={[baseStyle, style]}>{children}</View>;
}
