import React, { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { PriceText } from "@/components/PriceText";
import { QuantityStepper } from "@/components/QuantityStepper";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { EmptyState } from "@/components/EmptyState";
import { Divider } from "@/components/Divider";
import { useTheme } from "@/theme";
import { useCart } from "@/store/CartContext";
import { useToast } from "@/store/ToastContext";
import { CartItem } from "@/types";

export default function CartScreen() {
  const { colors, spacing, radii, fontFamily, fontSize } = useTheme();
  const cart = useCart();
  const toast = useToast();
  const [promoCode, setPromoCode] = useState("");

  const onApplyPromo = () => {
    if (!promoCode.trim()) return;
    const result = cart.applyPromoCode(promoCode);
    toast.show(result.message, result.success ? "success" : "error");
    if (result.success) setPromoCode("");
  };

  const describeItem = (item: CartItem) => {
    const parts: string[] = [];
    if (item.variantLabel) parts.push(item.variantLabel);
    if (item.modifiers.length) parts.push(item.modifiers.map((m) => m.name).join(", "));
    if (item.notes) parts.push(`Catatan: ${item.notes}`);
    return parts.join(" • ");
  };

  return (
    <Screen edges={["top", "left", "right", "bottom"]}>
      <Header title="Keranjang" subtitle={`${cart.itemCount} item`} onBack={() => router.back()} />

      {cart.items.length === 0 ? (
        <EmptyState
          icon="cart-outline"
          title="Keranjang masih kosong"
          description="Tambahkan produk untuk mulai transaksi."
          actionLabel="Mulai Belanja"
          onAction={() => router.replace("/(tabs)")}
        />
      ) : (
        <>
          <FlatList
            data={cart.items}
            keyExtractor={(item) => item.cartItemId}
            contentContainerStyle={{ padding: spacing.md, paddingBottom: 260, gap: spacing.sm }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const lineTotal = cart.lineTotal(item);
              const discount = cart.lineDiscount(item);
              return (
                <View
                  style={{
                    backgroundColor: colors.surfaceElevated,
                    borderRadius: radii.lg,
                    borderWidth: 1,
                    borderColor: colors.border,
                    padding: spacing.sm,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: radii.md,
                        backgroundColor: `${item.color}26`,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ fontSize: 20 }}>{item.emoji}</Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: spacing.sm }}>
                      <Text numberOfLines={2} style={{ color: colors.textPrimary, fontFamily: fontFamily.medium, fontSize: fontSize.base }}>
                        {item.name}
                      </Text>
                      {describeItem(item) ? (
                        <Text numberOfLines={2} style={{ color: colors.textTertiary, fontFamily: fontFamily.regular, fontSize: fontSize.xs, marginTop: 2 }}>
                          {describeItem(item)}
                        </Text>
                      ) : null}
                    </View>
                    <Pressable onPress={() => cart.removeItem(item.cartItemId)} hitSlop={8}>
                      <Ionicons name="trash-outline" size={18} color={colors.textTertiary} />
                    </Pressable>
                  </View>

                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: spacing.sm }}>
                    <QuantityStepper
                      size="sm"
                      value={item.quantity}
                      onChange={(q) => cart.updateQuantity(item.cartItemId, q)}
                      min={0}
                    />
                    <Pressable
                      onPress={() => router.push(`/discount?itemId=${item.cartItemId}`)}
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Ionicons name="pricetag-outline" size={14} color={colors.primary} />
                      <Text style={{ color: colors.primary, fontFamily: fontFamily.medium, fontSize: fontSize.xs, marginLeft: 4 }}>
                        {item.discount ? "Ubah Diskon" : "+ Diskon"}
                      </Text>
                    </Pressable>
                    <View style={{ alignItems: "flex-end" }}>
                      {discount > 0 ? (
                        <PriceText amount={lineTotal} size="sm" strikethrough color={colors.textTertiary} />
                      ) : null}
                      <PriceText amount={lineTotal - discount} size="base" />
                    </View>
                  </View>
                </View>
              );
            }}
            ListHeaderComponent={
              <Pressable
                onPress={() => router.push("/discount?itemId=cart")}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: colors.surface,
                  borderRadius: radii.md,
                  padding: spacing.sm,
                  marginBottom: spacing.sm,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="pricetags-outline" size={16} color={colors.textSecondary} />
                  <Text style={{ color: colors.textPrimary, fontFamily: fontFamily.medium, fontSize: fontSize.sm, marginLeft: spacing.xs }}>
                    Diskon Keseluruhan
                  </Text>
                </View>
                <Text style={{ color: colors.primary, fontFamily: fontFamily.medium, fontSize: fontSize.sm }}>
                  {cart.cartDiscount ? "Ubah" : "Atur"}
                </Text>
              </Pressable>
            }
          />

          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: colors.surfaceElevated,
              borderTopWidth: 1,
              borderTopColor: colors.border,
              padding: spacing.md,
            }}
          >
            <View style={{ flexDirection: "row", gap: spacing.xs, marginBottom: spacing.sm }}>
              <View style={{ flex: 1 }}>
                <Input
                  placeholder="Kode promo (cth: NUSANTARA10)"
                  autoCapitalize="characters"
                  value={promoCode}
                  onChangeText={setPromoCode}
                  onSubmitEditing={onApplyPromo}
                />
              </View>
              <Button label="Pakai" fullWidth={false} variant="secondary" onPress={onApplyPromo} style={{ paddingHorizontal: spacing.md }} />
            </View>

            {cart.promo ? (
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                <Text style={{ color: colors.success, fontFamily: fontFamily.medium, fontSize: fontSize.xs }}>
                  {cart.promo.label}
                </Text>
                <Pressable onPress={cart.clearPromo}>
                  <Text style={{ color: colors.error, fontFamily: fontFamily.medium, fontSize: fontSize.xs }}>Hapus</Text>
                </Pressable>
              </View>
            ) : null}

            <Divider style={{ marginVertical: spacing.xs }} />
            <SummaryRow label="Subtotal" amount={cart.subtotal} />
            {cart.itemDiscountTotal > 0 && <SummaryRow label="Diskon Item" amount={-cart.itemDiscountTotal} tone="success" />}
            {cart.cartDiscountAmount > 0 && <SummaryRow label="Diskon Keseluruhan" amount={-cart.cartDiscountAmount} tone="success" />}
            {cart.promoDiscountAmount > 0 && <SummaryRow label="Diskon Promo" amount={-cart.promoDiscountAmount} tone="success" />}
            <SummaryRow label="Pajak (PPN 11%)" amount={cart.taxTotal} />
            <Divider style={{ marginVertical: spacing.xs }} />
            <SummaryRow label="Total" amount={cart.grandTotal} emphasize />

            <Button
              label="Lanjut ke Pembayaran"
              onPress={() => router.push("/checkout")}
              style={{ marginTop: spacing.sm }}
            />
          </View>
        </>
      )}
    </Screen>
  );
}

function SummaryRow({
  label,
  amount,
  tone,
  emphasize,
}: {
  label: string;
  amount: number;
  tone?: "success";
  emphasize?: boolean;
}) {
  const { colors, fontFamily, fontSize } = useTheme();
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 3 }}>
      <Text
        style={{
          color: emphasize ? colors.textPrimary : colors.textSecondary,
          fontFamily: emphasize ? fontFamily.semibold : fontFamily.regular,
          fontSize: emphasize ? fontSize.base : fontSize.sm,
        }}
      >
        {label}
      </Text>
      <PriceText
        amount={amount}
        size={emphasize ? "lg" : "sm"}
        weight={emphasize ? "bold" : "medium"}
        color={tone === "success" ? colors.success : undefined}
      />
    </View>
  );
}
