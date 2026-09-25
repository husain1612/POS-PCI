import React, { useEffect } from "react";
import { FlatList, Switch, Text, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { Card } from "@/components/Card";
import { Badge, BadgeVariant } from "@/components/Badge";
import { PriceText } from "@/components/PriceText";
import { Button } from "@/components/Button";
import { EmptyState } from "@/components/EmptyState";
import { useTheme } from "@/theme";
import { useOffline } from "@/store/OfflineContext";
import { useTransactions } from "@/store/TransactionsContext";
import { formatDateTime } from "@/utils/date";
import { SyncQueueStatus } from "@/types";

const STATUS_CONFIG: Record<SyncQueueStatus, { label: string; variant: BadgeVariant; icon: keyof typeof Ionicons.glyphMap }> = {
  pending: { label: "Menunggu", variant: "info", icon: "time-outline" },
  syncing: { label: "Menyinkron...", variant: "primary", icon: "sync" },
  failed: { label: "Gagal", variant: "error", icon: "alert-circle-outline" },
  synced: { label: "Tersinkron", variant: "success", icon: "checkmark-circle-outline" },
};

export default function OfflineSyncScreen() {
  const { colors, spacing, radii, fontFamily, fontSize } = useTheme();
  const { isOnline, toggleOnline, queue, syncAll, retryOne, isSyncing, registerSyncedHandler } = useOffline();
  const { markSynced } = useTransactions();

  useEffect(() => {
    registerSyncedHandler((transactionId) => markSynced(transactionId));
  }, [registerSyncedHandler, markSynced]);

  const pendingCount = queue.filter((q) => q.status === "pending" || q.status === "failed").length;

  return (
    <Screen edges={["top", "left", "right"]}>
      <Header title="Mode Offline & Sinkronisasi" onBack={() => router.back()} />

      <View style={{ padding: spacing.md }}>
        <Card
          style={{
            backgroundColor: isOnline ? colors.successMuted : colors.warningMuted,
            borderColor: "transparent",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name={isOnline ? "cloud-done-outline" : "cloud-offline-outline"} size={28} color={isOnline ? colors.success : colors.warning} />
            <View style={{ flex: 1, marginLeft: spacing.sm }}>
              <Text style={{ color: isOnline ? colors.success : colors.warning, fontFamily: fontFamily.semibold, fontSize: fontSize.base }}>
                {isOnline ? "Perangkat Online" : "Perangkat Offline"}
              </Text>
              <Text style={{ color: colors.textSecondary, fontFamily: fontFamily.regular, fontSize: fontSize.xs, marginTop: 2 }}>
                {isOnline
                  ? "Transaksi baru langsung tersinkron ke server."
                  : "Transaksi baru disimpan lokal dan akan disinkron otomatis saat online."}
              </Text>
            </View>
          </View>
        </Card>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: colors.surface,
            borderRadius: radii.md,
            padding: spacing.sm,
            marginTop: spacing.sm,
          }}
        >
          <View>
            <Text style={{ color: colors.textPrimary, fontFamily: fontFamily.medium, fontSize: fontSize.sm }}>
              Simulasikan Mode Offline
            </Text>
            <Text style={{ color: colors.textTertiary, fontFamily: fontFamily.regular, fontSize: fontSize.xs }}>
              Untuk keperluan demo tanpa koneksi nyata
            </Text>
          </View>
          <Switch
            value={!isOnline}
            onValueChange={() => toggleOnline()}
            trackColor={{ false: colors.border, true: colors.warning }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: spacing.md, marginBottom: spacing.xs }}>
        <Text style={{ color: colors.textPrimary, fontFamily: fontFamily.semibold, fontSize: fontSize.base }}>
          Antrean Sinkronisasi ({queue.length})
        </Text>
        {pendingCount > 0 && isOnline ? (
          <Button label="Sinkronkan Semua" fullWidth={false} size="md" loading={isSyncing} onPress={syncAll} style={{ paddingHorizontal: spacing.sm, height: 32 }} />
        ) : null}
      </View>

      <FlatList
        data={queue}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.md, paddingTop: 0, gap: spacing.xs }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState icon="checkmark-done-circle-outline" title="Tidak ada antrean" description="Semua transaksi sudah tersinkron dengan server." />
        }
        renderItem={({ item }) => {
          const config = STATUS_CONFIG[item.status];
          return (
            <Card>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                <View style={{ flex: 1, marginRight: spacing.sm }}>
                  <Text style={{ color: colors.textPrimary, fontFamily: fontFamily.semibold, fontSize: fontSize.sm }}>
                    {item.transactionNumber}
                  </Text>
                  <Text style={{ color: colors.textTertiary, fontFamily: fontFamily.regular, fontSize: fontSize.xs, marginTop: 2 }}>
                    {formatDateTime(item.createdAt)}
                  </Text>
                </View>
                <Badge label={config.label} variant={config.variant} />
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: spacing.sm }}>
                <PriceText amount={item.amount} size="base" />
                {item.status === "failed" ? (
                  <Button label="Coba Lagi" fullWidth={false} size="md" variant="outline" onPress={() => retryOne(item.id)} style={{ paddingHorizontal: spacing.sm, height: 32 }} />
                ) : item.status === "syncing" ? (
                  <Text style={{ color: colors.textTertiary, fontFamily: fontFamily.regular, fontSize: fontSize.xs }}>Sedang diproses...</Text>
                ) : null}
              </View>
              {item.retryCount > 0 && item.status === "failed" ? (
                <Text style={{ color: colors.error, fontFamily: fontFamily.regular, fontSize: fontSize.xs, marginTop: 4 }}>
                  Sudah dicoba {item.retryCount}x
                </Text>
              ) : null}
            </Card>
          );
        }}
      />
    </Screen>
  );
}
