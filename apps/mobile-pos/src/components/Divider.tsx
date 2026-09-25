import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "@/theme";

export function Divider({ style }: { style?: ViewStyle }) {
  const { colors, spacing } = useTheme();
  return (
    <View
      style={[
        { height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginVertical: spacing.sm },
        style,
      ]}
    />
  );
}
