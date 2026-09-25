import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/theme";

interface IconButtonProps {
  name: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  size?: number;
  variant?: "surface" | "primary" | "ghost";
  badge?: boolean;
}

export function IconButton({ name, onPress, size = 20, variant = "surface", badge = false }: IconButtonProps) {
  const { colors } = useTheme();

  const bg =
    variant === "primary" ? colors.primary : variant === "ghost" ? "transparent" : colors.surface;
  const iconColor = variant === "primary" ? colors.onPrimary : colors.textPrimary;

  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: bg,
          borderColor: variant === "ghost" ? "transparent" : colors.border,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <Ionicons name={name} size={size} color={iconColor} />
      {badge ? <View style={[styles.badge, { backgroundColor: colors.error, borderColor: colors.background }]} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
  },
  badge: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
  },
});
