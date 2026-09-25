import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "@/theme";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
export type ButtonSize = "md" | "lg";

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
}

export function Button({
  label,
  onPress,
  variant = "primary",
  size = "lg",
  disabled = false,
  loading = false,
  fullWidth = true,
  leftIcon,
  rightIcon,
  style,
}: ButtonProps) {
  const { colors, radii, spacing, fontFamily, fontSize } = useTheme();
  const isDisabled = disabled || loading;

  const palette: Record<ButtonVariant, { bg: string; bgPressed: string; text: string; borderColor?: string }> = {
    primary: { bg: colors.primary, bgPressed: colors.primaryPressed, text: colors.onPrimary },
    secondary: { bg: colors.surfaceSunken, bgPressed: colors.border, text: colors.textPrimary },
    outline: { bg: "transparent", bgPressed: colors.surface, text: colors.textPrimary, borderColor: colors.border },
    ghost: { bg: "transparent", bgPressed: colors.surface, text: colors.primary },
    destructive: { bg: colors.error, bgPressed: colors.error, text: "#FFFFFF" },
  };

  const { bg, bgPressed, text, borderColor } = palette[variant];
  const height = size === "lg" ? 52 : 44;

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          height,
          borderRadius: radii.md,
          paddingHorizontal: spacing.md,
          backgroundColor: pressed ? bgPressed : bg,
          borderWidth: borderColor ? 1 : 0,
          borderColor: borderColor ?? "transparent",
          opacity: isDisabled ? 0.5 : 1,
          alignSelf: fullWidth ? "stretch" : "flex-start",
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={text} />
      ) : (
        <View style={styles.content}>
          {leftIcon ? <View style={{ marginRight: spacing.xxs }}>{leftIcon}</View> : null}
          <Text
            style={{
              color: text,
              fontFamily: fontFamily.semibold,
              fontSize: size === "lg" ? fontSize.md : fontSize.base,
            }}
            numberOfLines={1}
          >
            {label}
          </Text>
          {rightIcon ? <View style={{ marginLeft: spacing.xxs }}>{rightIcon}</View> : null}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
