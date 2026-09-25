import React, { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { Card } from "@/components/Card";
import { PriceText } from "@/components/PriceText";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { EmptyState } from "@/components/EmptyState";
import { useTheme } from "@/theme";
import { useCart } from "@/store/CartContext";
import { useToast } from "@/store/ToastContext";
import { useCompleteSale } from "@/store/useCompleteSale";
import { PAYMENT_METHODS, paymentIcon, paymentLabel } from "@/utils/payment";
import { formatRupiah } from "@/utils/currency";
import { PaymentEntry } from "@/types";

export default function SplitPaymentScreen() {
  const { colors, spacing, radii, fontFamily, fontSize } = useTheme();
  const cart = useCart();
  const toast = useToast();
  const completeSale = useCompleteSale();

  const [entries, setEntries] = useState<PaymentEntry[]>([]);
  const [method, setMethod] = useState<PaymentEntry["method"]>("cash");
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const paid = entries.reduce((s, e) => s + e.amount, 0);
  const remaining = Math.max(cart.grandTotal - paid, 0);
  const overpaid = paid > cart.grandTotal;

  const addEntry = () => {
    const value = Number(amount.replace(/[^0-9]/g, "")) || 0;
    if (value <= 0) {
      toast.show("Masukkan nominal pembayaran", "error");
      return;
    }
    if (value > remaining) {
      toast.show(`Nominal melebihi sisa tagihan (${formatRupiah(remaining)})`, "error");
      return;
    }
    setEntries((prev) => [...prev, { method, amount: value }]);
    setAmount("");
  };

  const removeEntry = (index: number) => {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const onComplete = async () => {
    if (remaining > 0) return;
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    completeSale(entries);
    setIsProcessing(false);
    router.replace("/payment-success");
  };

  if (cart.items.length === 0) {
    return (
      <Screen>
        <Header title="Split Payment" onBack={() => router.back()} />
        <EmptyState icon="cart-outline" title="Keranjang kosong" actionLabel="Kembali ke Kasir" onAction={() => router.replace("/(tabs)")} />
      </Screen>
    );
  }

  return (
    <Screen edges={["top", "left", "right", "bottom"]}>
      <Header title="Split Payment" subtitle={`Total ${formatRupiah(cart.grandTotal)}`} onBack={() => router.back()} />

      <View style={{ padding: spacing.md }}>
        <Card>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: colors.textSecondary, fontFamily: fontFamily.medium, fontSize: fontSize.sm }}>Total Tagihan</Text>
            <PriceText amount={cart.grandTotal} size="base" />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
            <Text style={{ color: colors.textSecondary, fontFamily: fontFamily.medium, fontSize: fontSize.sm }}>Sudah Dibayar</Text>
            <PriceText amount={paid} size="base" color={colors.success} />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
            <Text style={{ color: colors.textPrimary, fontFamily: fontFamily.bold, fontSize: fontSize.base }}>
              {overpaid ? "Kelebihan" : "Sisa Pembayaran"}
            </Text>
            <PriceText amount={Math.abs(cart.grandTotal - paid)} size="lg" weight="bold" color={remaining > 0 ? colors.error : colors.success} />
          </View>
        </Card>
      </View>

      <FlatList
        data={entries}
        keyExtractor={(_, index) => `entry-${index}`}
        contentContainerStyle={{ paddingHorizontal: spacing.md, gap: spacing.xs }}
        ListEmptyComponent={
          <Text style={{ color: colors.textTertiary, fontFamily: fontFamily.regular, fontSize: fontSize.sm, textAlign: "center", marginTop: spacing.xs }}>
            Belum ada metode pembayaran ditambahkan.
          </Text>
        }
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: colors.surfaceElevated,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: radii.md,
              padding: spacing.sm,
            }}
          >
            <Ionicons name={paymentIcon(item.method)} size={18} color={colors.primary} />
            <Text style={{ flex: 1, marginLeft: spacing.xs, color: colors.textPrimary, fontFamily: fontFamily.medium, fontSize: fontSize.sm }}>
              {paymentLabel(item.method)}
            </Text>
            <PriceText amount={item.amount} size="sm" />
            <Pressable onPress={() => removeEntry(index)} hitSlop={8} style={{ marginLeft: spacing.sm }}>
              <Ionicons name="close-circle" size={18} color={colors.textTertiary} />
            </Pressable>
          </View>
        )}
      />

      {remaining > 0 ? (
        <View style={{ padding: spacing.md }}>
          <Text style={{ color: colors.textPrimary, fontFamily: fontFamily.semibold, fontSize: fontSize.sm, marginBottom: spacing.xs }}>
            Tambah Metode Pembayaran
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: spacing.sm }}>
            {PAYMENT_METHODS.map((m) => {
              const selected = method === m.key;
              return (
                <Pressable
                  key={m.key}
                  onPress={() => setMethod(m.key)}
                  style={{
                    paddingHorizontal: spacing.sm,
                    paddingVertical: 8,
                    borderRadius: radii.pill,
                    borderWidth: 1.5,
                    borderColor: selected ? colors.primary : colors.border,
                    backgroundColor: selected ? colors.primaryMuted : colors.surface,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name={m.icon} size={14} color={selected ? colors.primary : colors.textSecondary} />
                  <Text style={{ marginLeft: 4, color: selected ? colors.primary : colors.textSecondary, fontFamily: fontFamily.medium, fontSize: fontSize.xs }}>
                    {m.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <View style={{ flexDirection: "row", gap: spacing.xs }}>
            <View style={{ flex: 1 }}>
              <Input
                placeholder={`Maks ${formatRupiah(remaining)}`}
                keyboardType="number-pad"
                value={amount}
                onChangeText={setAmount}
                onSubmitEditing={addEntry}
              />
            </View>
            <Button label="Sisa" fullWidth={false} variant="outline" onPress={() => setAmount(String(remaining))} style={{ paddingHorizontal: spacing.sm }} />
            <Button label="Tambah" fullWidth={false} onPress={addEntry} style={{ paddingHorizontal: spacing.md }} />
          </View>
        </View>
      ) : null}

      <View style={{ padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.border }}>
        <Button label="Selesaikan Pembayaran" onPress={onComplete} disabled={remaining > 0} loading={isProcessing} />
      </View>
    </Screen>
  );
}
