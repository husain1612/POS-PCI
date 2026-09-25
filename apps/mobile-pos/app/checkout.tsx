import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { Card } from "@/components/Card";
import { PriceText } from "@/components/PriceText";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Divider } from "@/components/Divider";
import { EmptyState } from "@/components/EmptyState";
import { useTheme } from "@/theme";
import { useCart } from "@/store/CartContext";
import { useToast } from "@/store/ToastContext";
import { useCompleteSale } from "@/store/useCompleteSale";
import { PAYMENT_METHODS } from "@/utils/payment";
import { formatRupiah } from "@/utils/currency";
import { PaymentMethod } from "@/types";

const CASH_PRESETS = [50000, 100000, 150000, 200000];

export default function CheckoutScreen() {
  const { colors, spacing, radii, fontFamily, fontSize } = useTheme();
  const cart = useCart();
  const toast = useToast();
  const completeSale = useCompleteSale();

  const [method, setMethod] = useState<PaymentMethod>("cash");
  const [cashReceived, setCashReceived] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.items.length === 0) {
    return (
      <Screen>
        <Header title="Checkout" onBack={() => router.back()} />
        <EmptyState
          icon="cart-outline"
          title="Keranjang kosong"
          description="Tambahkan produk sebelum checkout."
          actionLabel="Kembali ke Kasir"
          onAction={() => router.replace("/(tabs)")}
        />
      </Screen>
    );
  }

  const cashValue = Number(cashReceived.replace(/[^0-9]/g, "")) || 0;
  const change = cashValue - cart.grandTotal;
  const cashInsufficient = method === "cash" && cashValue < cart.grandTotal;

  const onPay = async () => {
    if (method === "split") {
      router.push("/split-payment");
      return;
    }
    if (cashInsufficient) {
      toast.show("Uang diterima kurang dari total tagihan", "error");
      return;
    }
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    completeSale([{ method, amount: cart.grandTotal }]);
    setIsProcessing(false);
    router.replace("/payment-success");
  };

  return (
    <Screen edges={["top", "left", "right", "bottom"]}>
      <Header title="Checkout" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={{ padding: spacing.md, paddingBottom: 220 }} showsVerticalScrollIndicator={false}>
        <Card>
          <SummaryRow label="Subtotal" amount={cart.subtotal} />
          {cart.itemDiscountTotal > 0 && <SummaryRow label="Diskon Item" amount={-cart.itemDiscountTotal} tone="success" />}
          {cart.cartDiscountAmount > 0 && <SummaryRow label="Diskon Keseluruhan" amount={-cart.cartDiscountAmount} tone="success" />}
          {cart.promoDiscountAmount > 0 && <SummaryRow label={`Diskon Promo (${cart.promo?.code})`} amount={-cart.promoDiscountAmount} tone="success" />}
          <SummaryRow label="Pajak (PPN 11%)" amount={cart.taxTotal} />
          <Divider style={{ marginVertical: spacing.xs }} />
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ color: colors.textPrimary, fontFamily: fontFamily.bold, fontSize: fontSize.lg }}>Grand Total</Text>
            <PriceText amount={cart.grandTotal} size="xxl" weight="bold" />
          </View>
        </Card>

        <Text style={{ color: colors.textPrimary, fontFamily: fontFamily.semibold, fontSize: fontSize.base, marginTop: spacing.lg, marginBottom: spacing.xs }}>
          Metode Pembayaran
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.xs }}>
          {PAYMENT_METHODS.map((m) => {
            const selected = method === m.key;
            return (
              <Pressable
                key={m.key}
                onPress={() => setMethod(m.key)}
                style={{
                  width: "31%",
                  aspectRatio: 1.15,
                  borderRadius: radii.md,
                  borderWidth: 1.5,
                  borderColor: selected ? colors.primary : colors.border,
                  backgroundColor: selected ? colors.primaryMuted : colors.surfaceElevated,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name={m.icon} size={22} color={selected ? colors.primary : colors.textSecondary} />
                <Text style={{ marginTop: 6, color: selected ? colors.primary : colors.textSecondary, fontFamily: fontFamily.medium, fontSize: fontSize.xs, textAlign: "center" }}>
                  {m.label}
                </Text>
              </Pressable>
            );
          })}
          <Pressable
            onPress={() => setMethod("split")}
            style={{
              width: "31%",
              aspectRatio: 1.15,
              borderRadius: radii.md,
              borderWidth: 1.5,
              borderColor: method === "split" ? colors.primary : colors.border,
              backgroundColor: method === "split" ? colors.primaryMuted : colors.surfaceElevated,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="git-branch-outline" size={22} color={method === "split" ? colors.primary : colors.textSecondary} />
            <Text style={{ marginTop: 6, color: method === "split" ? colors.primary : colors.textSecondary, fontFamily: fontFamily.medium, fontSize: fontSize.xs, textAlign: "center" }}>
              Split Payment
            </Text>
          </Pressable>
        </View>

        {method === "cash" ? (
          <View style={{ marginTop: spacing.lg }}>
            <Input
              label="Uang Diterima"
              placeholder="Masukkan nominal"
              keyboardType="number-pad"
              value={cashReceived}
              onChangeText={setCashReceived}
              leftAdornment={<Text style={{ color: colors.textTertiary, marginRight: 4, fontFamily: fontFamily.medium }}>Rp</Text>}
            />
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: spacing.xs }}>
              <Pressable
                onPress={() => setCashReceived(String(cart.grandTotal))}
                style={{ paddingHorizontal: spacing.sm, paddingVertical: 6, borderRadius: radii.pill, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border }}
              >
                <Text style={{ color: colors.textSecondary, fontFamily: fontFamily.medium, fontSize: fontSize.xs }}>Uang Pas</Text>
              </Pressable>
              {CASH_PRESETS.map((preset) => (
                <Pressable
                  key={preset}
                  onPress={() => setCashReceived(String(preset))}
                  style={{ paddingHorizontal: spacing.sm, paddingVertical: 6, borderRadius: radii.pill, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border }}
                >
                  <Text style={{ color: colors.textSecondary, fontFamily: fontFamily.medium, fontSize: fontSize.xs }}>
                    {formatRupiah(preset)}
                  </Text>
                </Pressable>
              ))}
            </View>

            {cashValue > 0 ? (
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: spacing.md }}>
                <Text style={{ color: colors.textSecondary, fontFamily: fontFamily.medium, fontSize: fontSize.sm }}>
                  {change >= 0 ? "Kembalian" : "Kurang"}
                </Text>
                <PriceText amount={Math.abs(change)} color={change >= 0 ? colors.success : colors.error} />
              </View>
            ) : null}
          </View>
        ) : null}
      </ScrollView>

      <View style={{ padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.background }}>
        <Button
          label={method === "split" ? "Lanjut ke Split Payment" : `Bayar ${formatRupiah(cart.grandTotal)}`}
          onPress={onPay}
          loading={isProcessing}
          disabled={cashInsufficient}
        />
      </View>
    </Screen>
  );
}

function SummaryRow({ label, amount, tone }: { label: string; amount: number; tone?: "success" }) {
  const { colors, fontFamily, fontSize } = useTheme();
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 3 }}>
      <Text style={{ color: colors.textSecondary, fontFamily: fontFamily.regular, fontSize: fontSize.sm }}>{label}</Text>
      <PriceText amount={amount} size="sm" weight="medium" color={tone === "success" ? colors.success : undefined} />
    </View>
  );
}
