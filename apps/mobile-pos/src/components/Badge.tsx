import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/theme";

export type BadgeVariant = "neutral" | "success" | "warning" | "error" | "info" | "primary";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

export function Badge({ label, variant = "neutral" }: BadgeProps) {
  const { colors, radii, spacing, fontFamily, fontSize } = useTheme();

  const palette: Record<BadgeVariant, { bg: string; text: string }> = {
    neutral: { bg: colors.surfaceSunken, text: colors.textSecondary },
    success: { bg: colors.successMuted, text: colors.success },
    warning: { bg: colors.warningMuted, text: colors.warning },
    error: { bg: colors.errorMuted, text: colors.error },
    info: { bg: colors.infoMuted, text: colors.info },
    primary: { bg: colors.primaryMuted, text: colors.primary },
  };

  const { bg, text } = palette[variant];

  return (
    <View
      style={[
        styles.pill,
        {
          backgroundColor: bg,
          borderRadius: radii.pill,
          paddingHorizontal: spacing.xs,
        },
      ]}
    >
      <Text style={{ color: text, fontFamily: fontFamily.medium, fontSize: fontSize.xs }}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: "flex-start",
    paddingVertical: 3,
  },
});
