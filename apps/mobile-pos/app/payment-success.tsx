import React from "react";
import { Linking, ScrollView, Share, Text, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Screen } from "@/components/Screen";
import { Card } from "@/components/Card";
import { PriceText } from "@/components/PriceText";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { EmptyState } from "@/components/EmptyState";
import { useTheme } from "@/theme";
import { useTransactions } from "@/store/TransactionsContext";
import { useToast } from "@/store/ToastContext";
import { formatDateTime } from "@/utils/date";
import { formatRupiah } from "@/utils/currency";
import { paymentLabel } from "@/utils/payment";
import { Transaction } from "@/types";

function buildReceiptText(transaction: Transaction): string {
  const lines = [
    transaction.outletName,
    transaction.transactionNumber,
    formatDateTime(transaction.createdAt),
    "--------------------------------",
    ...transaction.items.map(
      (it) => `${it.quantity}x ${it.name}${it.variantLabel ? ` (${it.variantLabel})` : ""} - ${formatRupiah(it.lineTotal)}`
    ),
    "--------------------------------",
    `Subtotal: ${formatRupiah(transaction.subtotal)}`,
    `Pajak: ${formatRupiah(transaction.taxTotal)}`,
    `Total: ${formatRupiah(transaction.grandTotal)}`,
    `Pembayaran: ${transaction.payments.map((p) => `${paymentLabel(p.method)} ${formatRupiah(p.amount)}`).join(", ")}`,
    "",
    "Terima kasih atas kunjungan Anda!",
  ];
  return lines.join("\n");
}

export default function PaymentSuccessScreen() {
  const { colors, spacing, radii, fontFamily, fontSize, shadows } = useTheme();
  const { transactions, lastTransactionId } = useTransactions();
  const toast = useToast();

  const transaction = transactions.find((t) => t.id === lastTransactionId);

  if (!transaction) {
    return (
      <Screen>
        <EmptyState
          icon="receipt-outline"
          title="Tidak ada transaksi terbaru"
          actionLabel="Kembali ke Kasir"
          onAction={() => router.replace("/(tabs)")}
        />
      </Screen>
    );
  }

  const receiptText = buildReceiptText(transaction);

  const onShare = async () => {
    try {
      await Share.share({ message: receiptText });
    } catch {
      toast.show("Gagal membagikan struk", "error");
    }
  };

  const onWhatsApp = async () => {
    const url = `whatsapp://send?text=${encodeURIComponent(receiptText)}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        toast.show("WhatsApp tidak terpasang di perangkat ini", "error");
      }
    } catch {
      toast.show("Gagal membuka WhatsApp", "error");
    }
  };

  const onPrint = () => {
    toast.show("Mengirim struk ke printer...", "success");
  };

  const onNewTransaction = () => {
    router.replace("/(tabs)");
  };

  return (
    <Screen edges={["top", "left", "right", "bottom"]} scroll padded>
      <View style={{ alignItems: "center", marginTop: spacing.lg, marginBottom: spacing.lg }}>
        <View
          style={[
            shadows.md,
            {
              width: 84,
              height: 84,
              borderRadius: 42,
              backgroundColor: colors.successMuted,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Ionicons name="checkmark-circle" size={56} color={colors.success} />
        </View>
        <Text style={{ color: colors.textPrimary, fontFamily: fontFamily.bold, fontSize: fontSize.xxl, marginTop: spacing.md }}>
          Pembayaran Berhasil
        </Text>
        <Text style={{ color: colors.textSecondary, fontFamily: fontFamily.regular, fontSize: fontSize.sm, marginTop: 2 }}>
          {transaction.transactionNumber}
        </Text>
        {transaction.status === "pending_sync" ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: colors.infoMuted,
              borderRadius: radii.pill,
              paddingHorizontal: spacing.sm,
              paddingVertical: 4,
              marginTop: spacing.xs,
            }}
          >
            <Ionicons name="cloud-offline-outline" size={14} color={colors.info} />
            <Text style={{ color: colors.info, fontFamily: fontFamily.medium, fontSize: fontSize.xs, marginLeft: 4 }}>
              Disimpan offline, menunggu sinkronisasi
            </Text>
          </View>
        ) : null}
      </View>

      <Card>
        <ScrollView style={{ maxHeight: 220 }} showsVerticalScrollIndicator={false}>
          {transaction.items.map((item, idx) => (
            <View key={`${item.productId}-${idx}`} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
              <Text style={{ flex: 1, color: colors.textPrimary, fontFamily: fontFamily.regular, fontSize: fontSize.sm }} numberOfLines={2}>
                {item.quantity}x {item.name}
                {item.variantLabel ? ` (${item.variantLabel})` : ""}
              </Text>
              <PriceText amount={item.lineTotal} size="sm" />
            </View>
          ))}
        </ScrollView>
        <Divider style={{ marginVertical: spacing.xs }} />
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
          <Text style={{ color: colors.textSecondary, fontFamily: fontFamily.regular, fontSize: fontSize.sm }}>Total Bayar</Text>
          <PriceText amount={transaction.grandTotal} size="lg" weight="bold" />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: colors.textSecondary, fontFamily: fontFamily.regular, fontSize: fontSize.sm }}>Metode Pembayaran</Text>
          <Text style={{ color: colors.textPrimary, fontFamily: fontFamily.medium, fontSize: fontSize.sm }}>
            {transaction.payments.map((p) => paymentLabel(p.method)).join(" + ")}
          </Text>
        </View>
      </Card>

      <View style={{ flexDirection: "row", gap: spacing.xs, marginTop: spacing.lg }}>
        <Button label="Cetak" variant="secondary" leftIcon={<Ionicons name="print-outline" size={16} color={colors.textPrimary} />} onPress={onPrint} style={{ flex: 1 }} />
        <Button label="Bagikan" variant="secondary" leftIcon={<Ionicons name="share-outline" size={16} color={colors.textPrimary} />} onPress={onShare} style={{ flex: 1 }} />
      </View>
      <Button
        label="Kirim via WhatsApp"
        variant="outline"
        leftIcon={<Ionicons name="logo-whatsapp" size={16} color={colors.textPrimary} />}
        onPress={onWhatsApp}
        style={{ marginTop: spacing.xs }}
      />
      <Button label="Transaksi Baru" onPress={onNewTransaction} style={{ marginTop: spacing.lg }} />
    </Screen>
  );
}
