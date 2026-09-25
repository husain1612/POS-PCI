import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/theme";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}

export function QuantityStepper({ value, onChange, min = 0, max = 99, size = "md" }: QuantityStepperProps) {
  const { colors, radii, fontFamily, fontSize } = useTheme();
  const dimension = size === "sm" ? 28 : 34;

  const decrease = () => {
    if (value - 1 < min) return;
    onChange(value - 1);
  };
  const increase = () => {
    if (value + 1 > max) return;
    onChange(value + 1);
  };

  return (
    <View
      style={[
        styles.row,
        { borderColor: colors.border, borderRadius: radii.md, backgroundColor: colors.surface },
      ]}
    >
      <Pressable
        onPress={decrease}
        disabled={value <= min}
        hitSlop={6}
        style={[styles.button, { width: dimension, height: dimension, opacity: value <= min ? 0.35 : 1 }]}
      >
        <Ionicons name="remove" size={size === "sm" ? 14 : 16} color={colors.textPrimary} />
      </Pressable>
      <Text
        style={{
          minWidth: 22,
          textAlign: "center",
          color: colors.textPrimary,
          fontFamily: fontFamily.semibold,
          fontSize: size === "sm" ? fontSize.sm : fontSize.base,
        }}
      >
        {value}
      </Text>
      <Pressable
        onPress={increase}
        disabled={value >= max}
        hitSlop={6}
        style={[styles.button, { width: dimension, height: dimension, opacity: value >= max ? 0.35 : 1 }]}
      >
        <Ionicons name="add" size={size === "sm" ? 14 : 16} color={colors.textPrimary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 4,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
});
