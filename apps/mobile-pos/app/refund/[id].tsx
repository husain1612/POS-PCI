import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { Card } from "@/components/Card";
import { PriceText } from "@/components/PriceText";
import { QuantityStepper } from "@/components/QuantityStepper";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { EmptyState } from "@/components/EmptyState";
import { ConfirmModal } from "@/components/ConfirmModal";
import { useTheme } from "@/theme";
import { useTransactions } from "@/store/TransactionsContext";
import { useToast } from "@/store/ToastContext";

const REASONS = ["Barang rusak", "Salah pesan", "Pelanggan komplain", "Stok tidak tersedia", "Lainnya"];

export default function RefundScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, spacing, radii, fontFamily, fontSize } = useTheme();
  const { getTransaction, refundTransaction } = useTransactions();
  const toast = useToast();

  const transaction = getTransaction(id as string);
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [reason, setReason] = useState(REASONS[0]);
  const [notes, setNotes] = useState("");
  const [confirmVisible, setConfirmVisible] = useState(false);

  const refundableItems = useMemo(
    () => (transaction ? transaction.items.filter((it) => it.quantity - it.refundedQuantity > 0) : []),
    [transaction]
  );

  if (!transaction) {
    return (
      <Screen>
        <Header title="Refund" onBack={() => router.back()} />
        <EmptyState icon="alert-circle-outline" title="Transaksi tidak ditemukan" />
      </Screen>
    );
  }

  if (refundableItems.length === 0) {
    return (
      <Screen>
        <Header title="Refund" onBack={() => router.back()} />
        <EmptyState icon="checkmark-done-outline" title="Semua item sudah direfund" description="Tidak ada item yang tersisa untuk direfund." />
      </Screen>
    );
  }

  const toggleItem = (productId: string, max: number) => {
    setSelected((prev) => {
      const next = { ...prev };
      if (next[productId]) {
        delete next[productId];
      } else {
        next[productId] = max > 0 ? 1 : 0;
      }
      return next;
    });
  };

  const setQty = (productId: string, qty: number, max: number) => {
    setSelected((prev) => ({ ...prev, [productId]: Math.min(Math.max(qty, 0), max) }));
  };

  const refundAmount = refundableItems.reduce((sum, item) => {
    const qty = selected[item.productId];
    if (!qty) return sum;
    const perUnit = item.lineTotal / item.quantity;
    return sum + Math.round(perUnit * qty);
  }, 0);

  const selectedCount = Object.values(selected).filter((v) => v > 0).length;

  const onSubmit = () => {
    if (selectedCount === 0) {
      toast.show("Pilih minimal satu item untuk direfund", "error");
      return;
    }
    setConfirmVisible(true);
  };

  const onConfirm = () => {
    const items = Object.entries(selected)
      .filter(([, qty]) => qty > 0)
      .map(([productId, quantity]) => ({ productId, quantity }));
    refundTransaction(transaction.id, { items, reason: `${reason}${notes ? ` — ${notes}` : ""}`, amount: refundAmount });
    setConfirmVisible(false);
    toast.show("Refund berhasil diproses", "success");
    router.back();
  };

  return (
    <Screen edges={["top", "left", "right", "bottom"]}>
      <Header title="Refund Transaksi" subtitle={transaction.transactionNumber} onBack={() => router.back()} />

      <ScrollView contentContainerStyle={{ padding: spacing.md, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <Text style={{ color: colors.textPrimary, fontFamily: fontFamily.semibold, fontSize: fontSize.base, marginBottom: spacing.xs }}>
          Pilih Item
        </Text>
        <View style={{ gap: spacing.xs }}>
          {refundableItems.map((item) => {
            const max = item.quantity - item.refundedQuantity;
            const qty = selected[item.productId] ?? 0;
            const isSelected = qty > 0;
            return (
              <Card key={item.productId} padded={false} style={{ padding: spacing.sm }}>
                <Pressable
                  onPress={() => toggleItem(item.productId, max)}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Ionicons name={isSelected ? "checkbox" : "square-outline"} size={20} color={isSelected ? colors.primary : colors.textTertiary} />
                  <View style={{ flex: 1, marginLeft: spacing.xs }}>
                    <Text style={{ color: colors.textPrimary, fontFamily: fontFamily.medium, fontSize: fontSize.sm }}>{item.name}</Text>
                    <Text style={{ color: colors.textTertiary, fontFamily: fontFamily.regular, fontSize: fontSize.xs }}>
                      Dibeli {item.quantity}x • Tersedia untuk refund {max}x
                    </Text>
                  </View>
                </Pressable>
                {isSelected ? (
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: spacing.xs }}>
                    <QuantityStepper size="sm" value={qty} onChange={(v) => setQty(item.productId, v, max)} min={1} max={max} />
                    <PriceText amount={Math.round((item.lineTotal / item.quantity) * qty)} size="sm" />
                  </View>
                ) : null}
              </Card>
            );
          })}
        </View>

        <Text style={{ color: colors.textPrimary, fontFamily: fontFamily.semibold, fontSize: fontSize.base, marginTop: spacing.lg, marginBottom: spacing.xs }}>
          Alasan Refund
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {REASONS.map((r) => {
            const selectedReason = reason === r;
            return (
              <Pressable
                key={r}
                onPress={() => setReason(r)}
                style={{
                  paddingHorizontal: spacing.sm,
                  paddingVertical: 8,
                  borderRadius: radii.pill,
                  borderWidth: 1.5,
                  borderColor: selectedReason ? colors.primary : colors.border,
                  backgroundColor: selectedReason ? colors.primaryMuted : colors.surface,
                }}
              >
                <Text style={{ color: selectedReason ? colors.primary : colors.textSecondary, fontFamily: fontFamily.medium, fontSize: fontSize.xs }}>
                  {r}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={{ marginTop: spacing.md }}>
          <Input label="Catatan tambahan (opsional)" placeholder="Detail kondisi barang, dsb." value={notes} onChangeText={setNotes} multiline />
        </View>

        <Card style={{ marginTop: spacing.lg }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: colors.textPrimary, fontFamily: fontFamily.semibold, fontSize: fontSize.base }}>Total Refund</Text>
            <PriceText amount={refundAmount} size="lg" weight="bold" color={colors.error} />
          </View>
        </Card>
      </ScrollView>

      <View style={{ padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.border }}>
        <Button label="Proses Refund" variant="destructive" onPress={onSubmit} disabled={selectedCount === 0} />
      </View>

      <ConfirmModal
        visible={confirmVisible}
        title="Konfirmasi Refund"
        message={`Refund sebesar ${refundAmount.toLocaleString("id-ID")} akan diproses untuk ${selectedCount} item.`}
        confirmLabel="Ya, Proses Refund"
        destructive
        icon="return-down-back-outline"
        onCancel={() => setConfirmVisible(false)}
        onConfirm={onConfirm}
      />
    </Screen>
  );
}
