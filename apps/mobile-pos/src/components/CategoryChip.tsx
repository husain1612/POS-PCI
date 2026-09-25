import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "@/theme";

interface CategoryChipProps {
  label: string;
  selected?: boolean;
  onPress: () => void;
}

export function CategoryChip({ label, selected = false, onPress }: CategoryChipProps) {
  const { colors, radii, spacing, fontFamily, fontSize } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: spacing.sm,
        height: 36,
        borderRadius: radii.pill,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: selected ? colors.primary : colors.surface,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: selected ? colors.primary : colors.border,
      }}
    >
      <Text
        style={{
          color: selected ? colors.onPrimary : colors.textSecondary,
          fontFamily: fontFamily.medium,
          fontSize: fontSize.sm,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
