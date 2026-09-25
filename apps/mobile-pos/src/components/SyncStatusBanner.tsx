import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/theme";
import { useOffline } from "@/store/OfflineContext";

export function SyncStatusBanner() {
  const { colors, spacing, radii, fontFamily, fontSize } = useTheme();
  const { isOnline, queue } = useOffline();
  const pendingCount = queue.filter((q) => q.status === "pending" || q.status === "failed").length;

  if (isOnline && pendingCount === 0) return null;

  const tone = !isOnline ? "warning" : "info";
  const bg = tone === "warning" ? colors.warningMuted : colors.infoMuted;
  const fg = tone === "warning" ? colors.warning : colors.info;

  const message = !isOnline
    ? pendingCount > 0
      ? `Mode offline — ${pendingCount} transaksi menunggu sinkron`
      : "Mode offline — transaksi akan disimpan lokal"
    : `${pendingCount} transaksi menunggu sinkron`;

  return (
    <Pressable
      onPress={() => router.push("/offline-sync")}
      style={[
        styles.row,
        {
          backgroundColor: bg,
          borderRadius: radii.md,
          paddingHorizontal: spacing.sm,
          marginHorizontal: spacing.md,
          marginBottom: spacing.xs,
        },
      ]}
    >
      <Ionicons name={!isOnline ? "cloud-offline" : "sync"} size={16} color={fg} />
      <Text
        style={{
          color: fg,
          fontFamily: fontFamily.medium,
          fontSize: fontSize.xs,
          marginLeft: spacing.xxs,
          flex: 1,
        }}
        numberOfLines={1}
      >
        {message}
      </Text>
      <Ionicons name="chevron-forward" size={14} color={fg} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    height: 36,
  },
});
