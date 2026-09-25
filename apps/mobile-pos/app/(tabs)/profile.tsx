import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Screen } from "@/components/Screen";
import { Card } from "@/components/Card";
import { Divider } from "@/components/Divider";
import { ConfirmModal } from "@/components/ConfirmModal";
import { useTheme, SchemePreference } from "@/theme";
import { useAuth } from "@/store/AuthContext";
import { useCart } from "@/store/CartContext";

const THEME_OPTIONS: { key: SchemePreference; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: "light", label: "Terang", icon: "sunny-outline" },
  { key: "dark", label: "Gelap", icon: "moon-outline" },
  { key: "system", label: "Sistem", icon: "phone-portrait-outline" },
];

export default function ProfileScreen() {
  const { colors, spacing, radii, fontFamily, fontSize, preference, setPreference } = useTheme();
  const { cashier, outlet, logout } = useAuth();
  const cart = useCart();
  const [logoutVisible, setLogoutVisible] = useState(false);

  if (!cashier || !outlet) return null;

  const onConfirmLogout = () => {
    setLogoutVisible(false);
    cart.clearCart();
    logout();
    router.replace("/login");
  };

  return (
    <Screen scroll padded edges={["top", "left", "right", "bottom"]}>
      <View style={{ alignItems: "center", marginTop: spacing.md, marginBottom: spacing.lg }}>
        <View
          style={[
            styles.avatar,
            { backgroundColor: colors.primaryMuted, borderRadius: radii.xl },
          ]}
        >
          <Text style={{ color: colors.primary, fontFamily: fontFamily.bold, fontSize: fontSize.xxl }}>
            {cashier.initials}
          </Text>
        </View>
        <Text style={{ color: colors.textPrimary, fontFamily: fontFamily.bold, fontSize: fontSize.xl, marginTop: spacing.sm }}>
          {cashier.name}
        </Text>
        <Text style={{ color: colors.textSecondary, fontFamily: fontFamily.regular, fontSize: fontSize.sm }}>
          {cashier.email}
        </Text>
        <View style={{ marginTop: spacing.xxs, backgroundColor: colors.primaryMuted, borderRadius: radii.pill, paddingHorizontal: spacing.sm, paddingVertical: 3 }}>
          <Text style={{ color: colors.primary, fontFamily: fontFamily.medium, fontSize: fontSize.xs }}>Kasir</Text>
        </View>
      </View>

      <Card padded={false}>
        <Row
          icon="storefront-outline"
          label="Outlet Aktif"
          value={outlet.name}
          onPress={() => router.push("/select-outlet")}
        />
        <Divider style={{ marginVertical: 0, marginHorizontal: spacing.md }} />
        <Row
          icon="receipt-outline"
          label="Riwayat Transaksi"
          onPress={() => router.push("/(tabs)/history")}
        />
        <Divider style={{ marginVertical: 0, marginHorizontal: spacing.md }} />
        <Row
          icon="cloud-offline-outline"
          label="Mode Offline & Sinkronisasi"
          onPress={() => router.push("/offline-sync")}
        />
      </Card>

      <Text
        style={{
          color: colors.textTertiary,
          fontFamily: fontFamily.medium,
          fontSize: fontSize.xs,
          marginTop: spacing.lg,
          marginBottom: spacing.xs,
          textTransform: "uppercase",
        }}
      >
        Tampilan
      </Text>
      <Card padded={false}>
        <View style={{ flexDirection: "row", padding: spacing.xs, gap: spacing.xs }}>
          {THEME_OPTIONS.map((opt) => {
            const selected = preference === opt.key;
            return (
              <Pressable
                key={opt.key}
                onPress={() => setPreference(opt.key)}
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingVertical: spacing.sm,
                  borderRadius: radii.md,
                  backgroundColor: selected ? colors.primaryMuted : "transparent",
                }}
              >
                <Ionicons name={opt.icon} size={18} color={selected ? colors.primary : colors.textSecondary} />
                <Text
                  style={{
                    marginTop: 4,
                    color: selected ? colors.primary : colors.textSecondary,
                    fontFamily: fontFamily.medium,
                    fontSize: fontSize.xs,
                  }}
                >
                  {opt.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </Card>

      <Text
        style={{
          color: colors.textTertiary,
          fontFamily: fontFamily.medium,
          fontSize: fontSize.xs,
          marginTop: spacing.lg,
          marginBottom: spacing.xs,
          textTransform: "uppercase",
        }}
      >
        Tentang
      </Text>
      <Card padded={false}>
        <Row icon="information-circle-outline" label="Versi Aplikasi" value="1.0.0" />
      </Card>

      <Pressable
        onPress={() => setLogoutVisible(true)}
        style={{
          marginTop: spacing.xl,
          marginBottom: spacing.xl,
          height: 48,
          borderRadius: radii.md,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: colors.errorMuted,
          backgroundColor: colors.errorMuted,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Ionicons name="log-out-outline" size={18} color={colors.error} />
        <Text style={{ color: colors.error, fontFamily: fontFamily.semibold, fontSize: fontSize.base, marginLeft: 8 }}>
          Keluar
        </Text>
      </Pressable>

      <ConfirmModal
        visible={logoutVisible}
        title="Keluar dari akun?"
        message="Kamu perlu masuk kembali untuk melanjutkan transaksi."
        confirmLabel="Keluar"
        destructive
        icon="log-out-outline"
        onCancel={() => setLogoutVisible(false)}
        onConfirm={onConfirmLogout}
      />
    </Screen>
  );
}

function Row({
  icon,
  label,
  value,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  onPress?: () => void;
}) {
  const { colors, spacing, fontFamily, fontSize } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
      }}
    >
      <Ionicons name={icon} size={18} color={colors.textSecondary} />
      <Text
        style={{
          flex: 1,
          marginLeft: spacing.sm,
          color: colors.textPrimary,
          fontFamily: fontFamily.medium,
          fontSize: fontSize.base,
        }}
        numberOfLines={1}
      >
        {label}
      </Text>
      {value ? (
        <Text
          numberOfLines={1}
          style={{ color: colors.textSecondary, fontFamily: fontFamily.regular, fontSize: fontSize.sm, marginRight: onPress ? 6 : 0, maxWidth: 140 }}
        >
          {value}
        </Text>
      ) : null}
      {onPress ? <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 84,
    height: 84,
    alignItems: "center",
    justifyContent: "center",
  },
});
