import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/theme";
import { Product } from "@/types";
import { PriceText } from "./PriceText";

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onQuickAdd?: () => void;
}

export function ProductCard({ product, onPress, onQuickAdd }: ProductCardProps) {
  const { colors, radii, spacing, fontFamily, fontSize, shadows } = useTheme();
  const outOfStock = product.stock <= 0;
  const lowStock = product.stock > 0 && product.stock <= 5;
  const hasChoices = Boolean(product.variantGroups?.length || product.modifierGroups?.length);

  return (
    <Pressable
      onPress={onPress}
      disabled={outOfStock}
      style={({ pressed }) => [
        styles.card,
        shadows.sm,
        {
          backgroundColor: colors.surfaceElevated,
          borderRadius: radii.lg,
          borderColor: colors.border,
          opacity: pressed ? 0.9 : outOfStock ? 0.55 : 1,
        },
      ]}
    >
      <View
        style={[
          styles.thumb,
          { backgroundColor: `${product.color}26`, borderRadius: radii.md },
        ]}
      >
        <Text style={{ fontSize: 30 }}>{product.emoji}</Text>
        {!outOfStock && (
          <Pressable
            onPress={onQuickAdd ?? onPress}
            hitSlop={8}
            style={[
              styles.quickAdd,
              { backgroundColor: colors.primary, borderColor: colors.background },
            ]}
          >
            <Ionicons name={hasChoices ? "options" : "add"} size={16} color={colors.onPrimary} />
          </Pressable>
        )}
      </View>

      <Text
        numberOfLines={2}
        style={{
          color: colors.textPrimary,
          fontFamily: fontFamily.medium,
          fontSize: fontSize.sm,
          marginTop: spacing.xs,
          minHeight: 34,
        }}
      >
        {product.name}
      </Text>

      <View style={styles.bottomRow}>
        <PriceText amount={product.price} size="sm" />
        {outOfStock ? (
          <Text style={{ color: colors.error, fontFamily: fontFamily.medium, fontSize: fontSize.xs }}>
            Habis
          </Text>
        ) : (
          <Text
            style={{
              color: lowStock ? colors.warning : colors.textTertiary,
              fontFamily: fontFamily.regular,
              fontSize: fontSize.xs,
            }}
          >
            Stok {product.stock}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth,
  },
  thumb: {
    height: 84,
    alignItems: "center",
    justifyContent: "center",
  },
  quickAdd: {
    position: "absolute",
    right: 6,
    bottom: 6,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
});
