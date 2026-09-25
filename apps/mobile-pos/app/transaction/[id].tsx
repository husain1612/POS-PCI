import React, { useState } from "react";
import { Share, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { Card } from "@/components/Card";
import { PriceText } from "@/components/PriceText";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { StatusBadge } from "@/components/StatusBadge";
import { EmptyState } from "@/components/EmptyState";
import { ConfirmModal } from "@/components/ConfirmModal";
import { useTheme } from "@/theme";
import { useTransactions } from "@/store/TransactionsContext";
import { useToast } from "@/store/ToastContext";
import { formatDateTime } from "@/utils/date";
import { paymentLabel } from "@/utils/payment";

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, spacing, fontFamily, fontSize } = useTheme();
  const { getTransaction, voidTransaction } = useTransactions();
  const toast = useToast();
  const [voidVisible, setVoidVisible] = useState(false);

  const transaction = getTransaction(id as string);

  if (!transaction) {
    return (
      <Screen>
        <Header title="Detail Transaksi" onBack={() => router.back()} />
        <EmptyState icon="alert-circle-outline" title="Transaksi tidak ditemukan" />
      </Screen>
    );
  }

  const canRefund = transaction.status === "completed" || transaction.status === "partially_refunded";
  const canVoid = transaction.status === "completed";

  const onShare = async () => {
    const text = [
      transaction.outletName,
      transaction.transactionNumber,
      formatDateTime(transaction.createdAt),
      ...transaction.items.map((it) => `${it.quantity}x ${it.name} - Rp${it.lineTotal.toLocaleString("id-ID")}`),
      `Total: Rp${transaction.grandTotal.toLocaleString("id-ID")}`,
    ].join("\n");
    try {
      await Share.share({ message: text });
    } catch {
      toast.show("Gagal membagikan struk", "error");
    }
  };

  const onConfirmVoid = () => {
    voidTransaction(transaction.id, "Dibatalkan oleh kasir");
    setVoidVisible(false);
    toast.show("Transaksi berhasil di-void", "success");
  };

  return (
    <Screen edges={["top", "left", "right"]} scroll padded>
      <Header
        title={transaction.transactionNumber}
        subtitle={formatDateTime(transaction.createdAt)}
        onBack={() => router.back()}
        right={
          <Ionicons name="share-outline" size={20} color={colors.textPrimary} onPress={onShare} />
        }
      />

      <View style={{ marginTop: spacing.md, marginBottom: spacing.sm, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <StatusBadge status={transaction.status} />
        <Text style={{ color: colors.textSecondary, fontFamily: fontFamily.regular, fontSize: fontSize.xs }}>
          Kasir: {transaction.cashierName}
        </Text>
      </View>

      {(transaction.status === "void" && transaction.voidReason) ||
      ((transaction.status === "refunded" || transaction.status === "partially_refunded") && transaction.refundReason) ? (
        <Card
          style={{
            backgroundColor: transaction.status === "void" ? colors.errorMuted : colors.warningMuted,
            borderColor: "transparent",
            marginBottom: spacing.sm,
          }}
        >
          <Text style={{ color: transaction.status === "void" ? colors.error : colors.warning, fontFamily: fontFamily.medium, fontSize: fontSize.sm }}>
            {transaction.status === "void" ? `Alasan Void: ${transaction.voidReason}` : `Alasan Refund: ${transaction.refundReason}`}
          </Text>
          {transaction.refundAmount ? (
            <Text style={{ color: colors.warning, fontFamily: fontFamily.regular, fontSize: fontSize.xs, marginTop: 2 }}>
              Nominal refund: Rp{transaction.refundAmount.toLocaleString("id-ID")}
            </Text>
          ) : null}
        </Card>
      ) : null}

      <Card>
        <Text style={{ color: colors.textTertiary, fontFamily: fontFamily.medium, fontSize: fontSize.xs, marginBottom: spacing.xs, textTransform: "uppercase" }}>
          Outlet
        </Text>
        <Text style={{ color: colors.textPrimary, fontFamily: fontFamily.semibold, fontSize: fontSize.base }}>{transaction.outletName}</Text>
      </Card>

      <Card style={{ marginTop: spacing.sm }}>
        <Text style={{ color: colors.textTertiary, fontFamily: fontFamily.medium, fontSize: fontSize.xs, marginBottom: spacing.xs, textTransform: "uppercase" }}>
          Item ({transaction.items.length})
        </Text>
        {transaction.items.map((item, idx) => (
          <View key={`${item.productId}-${idx}`} style={{ marginBottom: idx === transaction.items.length - 1 ? 0 : spacing.sm }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ flex: 1, color: colors.textPrimary, fontFamily: fontFamily.medium, fontSize: fontSize.sm, marginRight: spacing.sm }}>
                {item.quantity}x {item.name}
              </Text>
              <PriceText amount={item.lineTotal} size="sm" />
            </View>
            {item.variantLabel || item.modifiersLabel ? (
              <Text style={{ color: colors.textTertiary, fontFamily: fontFamily.regular, fontSize: fontSize.xs, marginTop: 1 }}>
                {[item.variantLabel, item.modifiersLabel].filter(Boolean).join(" • ")}
              </Text>
            ) : null}
            {item.refundedQuantity > 0 ? (
              <Text style={{ color: colors.warning, fontFamily: fontFamily.medium, fontSize: fontSize.xs, marginTop: 1 }}>
                {item.refundedQuantity} unit direfund
              </Text>
            ) : null}
          </View>
        ))}
      </Card>

      <Card style={{ marginTop: spacing.sm }}>
        <SummaryRow label="Subtotal" amount={transaction.subtotal} />
        {transaction.itemDiscountTotal > 0 && <SummaryRow label="Diskon Item" amount={-transaction.itemDiscountTotal} />}
        {transaction.cartDiscountTotal > 0 && <SummaryRow label="Diskon Keseluruhan" amount={-transaction.cartDiscountTotal} />}
        {transaction.promoDiscountTotal > 0 && <SummaryRow label="Diskon Promo" amount={-transaction.promoDiscountTotal} />}
        <SummaryRow label="Pajak" amount={transaction.taxTotal} />
        <Divider style={{ marginVertical: spacing.xs }} />
        <SummaryRow label="Grand Total" amount={transaction.grandTotal} emphasize />
      </Card>

      <Card style={{ marginTop: spacing.sm, marginBottom: spacing.lg }}>
        <Text style={{ color: colors.textTertiary, fontFamily: fontFamily.medium, fontSize: fontSize.xs, marginBottom: spacing.xs, textTransform: "uppercase" }}>
          Pembayaran
        </Text>
        {transaction.payments.map((p, idx) => (
          <View key={idx} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
            <Text style={{ color: colors.textPrimary, fontFamily: fontFamily.regular, fontSize: fontSize.sm }}>{paymentLabel(p.method)}</Text>
            <PriceText amount={p.amount} size="sm" />
          </View>
        ))}
      </Card>

      {(canRefund || canVoid) && (
        <View style={{ flexDirection: "row", gap: spacing.xs, marginBottom: spacing.xl }}>
          {canRefund && (
            <Button
              label="Refund"
              variant="outline"
              onPress={() => router.push(`/refund/${transaction.id}`)}
              style={{ flex: 1 }}
            />
          )}
          {canVoid && (
            <Button label="Void" variant="destructive" onPress={() => setVoidVisible(true)} style={{ flex: 1 }} />
          )}
        </View>
      )}

      <ConfirmModal
        visible={voidVisible}
        title="Void transaksi ini?"
        message="Transaksi akan dibatalkan sepenuhnya dan tidak dapat dikembalikan."
        confirmLabel="Ya, Void"
        destructive
        icon="close-circle-outline"
        onCancel={() => setVoidVisible(false)}
        onConfirm={onConfirmVoid}
      />
    </Screen>
  );
}

function SummaryRow({ label, amount, emphasize }: { label: string; amount: number; emphasize?: boolean }) {
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
      <PriceText amount={amount} size={emphasize ? "lg" : "sm"} weight={emphasize ? "bold" : "medium"} />
    </View>
  );
}
