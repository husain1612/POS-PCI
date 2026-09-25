import React from "react";
import { Text, TextStyle } from "react-native";
import { useTheme } from "@/theme";
import { formatRupiah } from "@/utils/currency";

interface PriceTextProps {
  amount: number;
  size?: "sm" | "base" | "md" | "lg" | "xl" | "xxl" | "display";
  weight?: "regular" | "medium" | "semibold" | "bold";
  color?: string;
  strikethrough?: boolean;
  style?: TextStyle;
}

export function PriceText({
  amount,
  size = "base",
  weight = "semibold",
  color,
  strikethrough = false,
  style,
}: PriceTextProps) {
  const { colors, fontFamily, fontSize } = useTheme();

  return (
    <Text
      style={[
        {
          color: color ?? colors.textPrimary,
          fontFamily: fontFamily[weight],
          fontSize: fontSize[size],
          textDecorationLine: strikethrough ? "line-through" : "none",
        },
        style,
      ]}
    >
      {formatRupiah(amount)}
    </Text>
  );
}
