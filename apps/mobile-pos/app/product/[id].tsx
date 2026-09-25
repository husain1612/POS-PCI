import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { PriceText } from "@/components/PriceText";
import { QuantityStepper } from "@/components/QuantityStepper";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { EmptyState } from "@/components/EmptyState";
import { useTheme } from "@/theme";
import { useCart } from "@/store/CartContext";
import { useToast } from "@/store/ToastContext";
import { MOCK_PRODUCTS } from "@/data/mockData";
import { CartItemModifier } from "@/types";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, spacing, radii, fontFamily, fontSize } = useTheme();
  const cart = useCart();
  const toast = useToast();

  const product = useMemo(() => MOCK_PRODUCTS.find((p) => p.id === id), [id]);

  const [variantId, setVariantId] = useState<string | undefined>(
    product?.variantGroups?.[0]?.options[0]?.id
  );
  const [modifierIds, setModifierIds] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  if (!product) {
    return (
      <Screen>
        <Header title="Produk" onBack={() => router.back()} />
        <EmptyState icon="alert-circle-outline" title="Produk tidak ditemukan" />
      </Screen>
    );
  }

  const variantGroup = product.variantGroups?.[0];
  const selectedVariant = variantGroup?.options.find((o) => o.id === variantId);

  const toggleModifier = (groupMax: number, optionId: string) => {
    setModifierIds((prev) => {
      const isSelected = prev.includes(optionId);
      if (isSelected) return prev.filter((id_) => id_ !== optionId);
      if (groupMax === 1) return [optionId];
      if (prev.length >= groupMax) {
        toast.show(`Maksimal ${groupMax} tambahan untuk kelompok ini`, "error");
        return prev;
      }
      return [...prev, optionId];
    });
  };

  const selectedModifiers: CartItemModifier[] = (product.modifierGroups ?? []).flatMap((group) =>
    group.options
      .filter((opt) => modifierIds.includes(opt.id))
      .map((opt) => ({ groupId: group.id, optionId: opt.id, name: opt.name, price: opt.price }))
  );

  const unitPrice = product.price + (selectedVariant?.priceDelta ?? 0) + selectedModifiers.reduce((s, m) => s + m.price, 0);
  const totalPrice = unitPrice * quantity;

  const onAddToCart = () => {
    cart.addItem({
      product,
      quantity,
      variant: selectedVariant ? { groupId: variantGroup!.id, optionId: selectedVariant.id, name: selectedVariant.name, priceDelta: selectedVariant.priceDelta } : undefined,
      modifiers: selectedModifiers,
      notes: notes.trim() || undefined,
    });
    toast.show(`${product.name} ditambahkan ke keranjang`, "success");
    router.back();
  };

  return (
    <Screen edges={["top", "left", "right", "bottom"]}>
      <Header title="Detail Produk" onBack={() => router.back()} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
        <View style={[styles.hero, { backgroundColor: `${product.color}22` }]}>
          <Text style={{ fontSize: 72 }}>{product.emoji}</Text>
        </View>

        <View style={{ padding: spacing.md }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Text style={{ flex: 1, color: colors.textPrimary, fontFamily: fontFamily.bold, fontSize: fontSize.xl, marginRight: spacing.sm }}>
              {product.name}
            </Text>
            <PriceText amount={product.price} size="lg" />
          </View>
          <Text style={{ color: colors.textSecondary, fontFamily: fontFamily.regular, fontSize: fontSize.sm, marginTop: spacing.xxs }}>
            {product.description}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: spacing.sm, gap: 6 }}>
            <View style={{ backgroundColor: colors.surface, borderRadius: radii.pill, paddingHorizontal: spacing.xs, paddingVertical: 3 }}>
              <Text style={{ color: colors.textSecondary, fontFamily: fontFamily.medium, fontSize: fontSize.xs }}>
                SKU {product.sku}
              </Text>
            </View>
            <View style={{ backgroundColor: product.stock <= 5 ? colors.warningMuted : colors.surface, borderRadius: radii.pill, paddingHorizontal: spacing.xs, paddingVertical: 3 }}>
              <Text style={{ color: product.stock <= 5 ? colors.warning : colors.textSecondary, fontFamily: fontFamily.medium, fontSize: fontSize.xs }}>
                Stok {product.stock}
              </Text>
            </View>
          </View>

          {variantGroup ? (
            <View style={{ marginTop: spacing.lg }}>
              <Text style={{ color: colors.textPrimary, fontFamily: fontFamily.semibold, fontSize: fontSize.base }}>
                {variantGroup.name} {variantGroup.required ? <Text style={{ color: colors.error }}>*</Text> : null}
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: spacing.xs }}>
                {variantGroup.options.map((opt) => {
                  const selected = opt.id === variantId;
                  return (
                    <Pressable
                      key={opt.id}
                      onPress={() => setVariantId(opt.id)}
                      style={{
                        paddingHorizontal: spacing.sm,
                        paddingVertical: spacing.xs,
                        borderRadius: radii.md,
                        borderWidth: 1.5,
                        borderColor: selected ? colors.primary : colors.border,
                        backgroundColor: selected ? colors.primaryMuted : colors.surface,
                      }}
                    >
                      <Text style={{ color: selected ? colors.primary : colors.textPrimary, fontFamily: fontFamily.medium, fontSize: fontSize.sm }}>
                        {opt.name} {opt.priceDelta > 0 ? `(+${opt.priceDelta.toLocaleString("id-ID")})` : ""}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ) : null}

          {(product.modifierGroups ?? []).map((group) => (
            <View key={group.id} style={{ marginTop: spacing.lg }}>
              <Text style={{ color: colors.textPrimary, fontFamily: fontFamily.semibold, fontSize: fontSize.base }}>
                {group.name}
              </Text>
              <Text style={{ color: colors.textTertiary, fontFamily: fontFamily.regular, fontSize: fontSize.xs, marginBottom: spacing.xs }}>
                Pilih maksimal {group.max}
              </Text>
              <View style={{ gap: spacing.xxs }}>
                {group.options.map((opt) => {
                  const selected = modifierIds.includes(opt.id);
                  return (
                    <Pressable
                      key={opt.id}
                      onPress={() => toggleModifier(group.max, opt.id)}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingVertical: spacing.xs,
                        paddingHorizontal: spacing.sm,
                        borderRadius: radii.md,
                        borderWidth: 1,
                        borderColor: selected ? colors.primary : colors.border,
                        backgroundColor: selected ? colors.primaryMuted : colors.surfaceElevated,
                      }}
                    >
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Ionicons
                          name={selected ? "checkbox" : "square-outline"}
                          size={18}
                          color={selected ? colors.primary : colors.textTertiary}
                        />
                        <Text style={{ marginLeft: spacing.xs, color: colors.textPrimary, fontFamily: fontFamily.regular, fontSize: fontSize.sm }}>
                          {opt.name}
                        </Text>
                      </View>
                      <Text style={{ color: colors.textSecondary, fontFamily: fontFamily.medium, fontSize: fontSize.xs }}>
                        {opt.price > 0 ? `+Rp${opt.price.toLocaleString("id-ID")}` : "Gratis"}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ))}

          <View style={{ marginTop: spacing.lg }}>
            <Input label="Catatan (opsional)" placeholder="Contoh: less ice, tanpa sedotan" value={notes} onChangeText={setNotes} />
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.bottomBar,
          { backgroundColor: colors.surfaceElevated, borderTopColor: colors.border, padding: spacing.md },
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.sm }}>
          <QuantityStepper value={quantity} onChange={setQuantity} min={1} />
          <PriceText amount={totalPrice} size="xl" />
        </View>
        <Button
          label={product.stock <= 0 ? "Stok Habis" : "Tambah ke Keranjang"}
          onPress={onAddToCart}
          disabled={product.stock <= 0}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
