import React, { useMemo, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Screen } from "@/components/Screen";
import { SearchBar } from "@/components/SearchBar";
import { CategoryChip } from "@/components/CategoryChip";
import { Card } from "@/components/Card";
import { PriceText } from "@/components/PriceText";
import { StatusBadge } from "@/components/StatusBadge";
import { EmptyState } from "@/components/EmptyState";
import { useTheme } from "@/theme";
import { useTransactions } from "@/store/TransactionsContext";
import { TransactionStatus } from "@/types";
import { formatDateTime } from "@/utils/date";
import { paymentLabel } from "@/utils/payment";

const FILTERS: { key: TransactionStatus | "all"; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "completed", label: "Selesai" },
  { key: "pending_sync", label: "Menunggu Sinkron" },
  { key: "refunded", label: "Refund" },
  { key: "partially_refunded", label: "Refund Sebagian" },
  { key: "void", label: "Void" },
];

export default function HistoryScreen() {
  const { colors, spacing, fontFamily, fontSize } = useTheme();
  const { transactions } = useTransactions();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<TransactionStatus | "all">("all");

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const matchesFilter = filter === "all" || t.status === filter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q.length === 0 ||
        t.transactionNumber.toLowerCase().includes(q) ||
        t.cashierName.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [transactions, filter, query]);

  return (
    <Screen edges={["top", "left", "right"]}>
      <View style={{ paddingHorizontal: spacing.md, paddingTop: spacing.sm }}>
        <Text style={{ color: colors.textPrimary, fontFamily: fontFamily.bold, fontSize: fontSize.xxl }}>
          Riwayat Transaksi
        </Text>
        <View style={{ marginTop: spacing.sm }}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            placeholder="Cari no. transaksi atau kasir"
          />
        </View>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={FILTERS}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ paddingHorizontal: spacing.md, paddingVertical: spacing.sm, gap: spacing.xs }}
        ItemSeparatorComponent={() => <View style={{ width: spacing.xs }} />}
        renderItem={({ item }) => (
          <CategoryChip label={item.label} selected={filter === item.key} onPress={() => setFilter(item.key)} />
        )}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.md, paddingTop: 0, gap: spacing.sm }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="receipt-outline"
            title="Tidak ada transaksi"
            description="Coba ubah kata kunci atau filter status."
          />
        }
        renderItem={({ item }) => (
          <Card onPress={() => router.push(`/transaction/${item.id}`)}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
              <View style={{ flex: 1, marginRight: spacing.sm }}>
                <Text style={{ color: colors.textPrimary, fontFamily: fontFamily.semibold, fontSize: fontSize.base }}>
                  {item.transactionNumber}
                </Text>
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontFamily: fontFamily.regular,
                    fontSize: fontSize.xs,
                    marginTop: 2,
                  }}
                >
                  {formatDateTime(item.createdAt)} • {item.items.length} item
                </Text>
              </View>
              <StatusBadge status={item.status} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: spacing.sm,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="card-outline" size={14} color={colors.textTertiary} />
                <Text
                  style={{
                    color: colors.textTertiary,
                    fontFamily: fontFamily.regular,
                    fontSize: fontSize.xs,
                    marginLeft: 4,
                  }}
                >
                  {item.payments.map((p) => paymentLabel(p.method)).join(" + ")}
                </Text>
              </View>
              <PriceText amount={item.grandTotal} size="base" />
            </View>
          </Card>
        )}
      />
    </Screen>
  );
}
