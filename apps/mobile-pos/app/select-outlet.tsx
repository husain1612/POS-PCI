import React from "react";
import { FlatList, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Screen } from "@/components/Screen";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { useTheme } from "@/theme";
import { useAuth } from "@/store/AuthContext";
import { Outlet } from "@/types";

export default function SelectOutletScreen() {
  const { colors, spacing, radii, fontFamily, fontSize } = useTheme();
  const { cashier, outlets, selectOutlet } = useAuth();

  if (!cashier) return <Redirect href="/login" />;

  const onSelect = (outlet: Outlet) => {
    selectOutlet(outlet.id);
    router.replace("/(tabs)");
  };

  return (
    <Screen padded>
      <View style={{ marginBottom: spacing.lg, marginTop: spacing.sm }}>
        <Text style={{ color: colors.textPrimary, fontFamily: fontFamily.bold, fontSize: fontSize.xxl }}>
          Pilih Outlet
        </Text>
        <Text
          style={{
            color: colors.textSecondary,
            fontFamily: fontFamily.regular,
            fontSize: fontSize.sm,
            marginTop: spacing.xxs,
          }}
        >
          Halo, {cashier.name.split(" ")[0]}. Pilih outlet tempat kamu bertugas hari ini.
        </Text>
      </View>

      <FlatList
        data={outlets}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card onPress={() => onSelect(item)}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: radii.md,
                  backgroundColor: colors.primaryMuted,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: spacing.sm,
                }}
              >
                <Ionicons name="storefront-outline" size={22} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: colors.textPrimary, fontFamily: fontFamily.semibold, fontSize: fontSize.base }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontFamily: fontFamily.regular,
                    fontSize: fontSize.xs,
                    marginTop: 2,
                  }}
                >
                  {item.address}, {item.city}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: spacing.xxs, gap: 6 }}>
                  <Badge label={item.code} variant="neutral" />
                  {item.isActive ? <Badge label="Aktif" variant="success" /> : <Badge label="Nonaktif" variant="error" />}
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
            </View>
          </Card>
        )}
      />
    </Screen>
  );
}
