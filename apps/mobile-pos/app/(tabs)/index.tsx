import React, { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Screen } from "@/components/Screen";
import { SearchBar } from "@/components/SearchBar";
import { CategoryChip } from "@/components/CategoryChip";
import { ProductCard } from "@/components/ProductCard";
import { PriceText } from "@/components/PriceText";
import { EmptyState } from "@/components/EmptyState";
import { SyncStatusBanner } from "@/components/SyncStatusBanner";
import { useTheme } from "@/theme";
import { useAuth } from "@/store/AuthContext";
import { useCart } from "@/store/CartContext";
import { useToast } from "@/store/ToastContext";
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "@/data/mockData";

export default function PosHomeScreen() {
  const { colors, spacing, radii, fontFamily, fontSize, shadows } = useTheme();
  const { cashier, outlet } = useAuth();
  const cart = useCart();
  const toast = useToast();
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const products = useMemo(() => {
    if (!categoryId) return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter((p) => p.categoryId === categoryId);
  }, [categoryId]);

  if (!cashier || !outlet) return null;

  return (
    <Screen edges={["top", "left", "right"]}>
      <View style={{ paddingHorizontal: spacing.md, paddingTop: spacing.sm }}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text
              numberOfLines={1}
              style={{ color: colors.textPrimary, fontFamily: fontFamily.bold, fontSize: fontSize.lg }}
            >
              {outlet.name}
            </Text>
            <Text
              style={{ color: colors.textSecondary, fontFamily: fontFamily.regular, fontSize: fontSize.xs }}
            >
              Kasir: {cashier.name}
            </Text>
          </View>
          <Pressable
            onPress={() => router.push("/offline-sync")}
            style={[styles.avatar, { backgroundColor: colors.primaryMuted }]}
          >
            <Text style={{ color: colors.primary, fontFamily: fontFamily.semibold, fontSize: fontSize.sm }}>
              {cashier.initials}
            </Text>
          </Pressable>
        </View>

        <View style={{ flexDirection: "row", marginTop: spacing.md, gap: spacing.xs }}>
          <View style={{ flex: 1 }}>
            <SearchBar
              placeholder="Cari produk atau scan barcode"
              editable={false}
              onPress={() => router.push("/search")}
            />
          </View>
          <Pressable
            onPress={() => router.push("/scanner")}
            style={[styles.scanButton, { backgroundColor: colors.primary, borderRadius: radii.md }]}
          >
            <Ionicons name="barcode-outline" size={22} color={colors.onPrimary} />
          </Pressable>
        </View>
      </View>

      <View style={{ marginTop: spacing.sm }}>
        <SyncStatusBanner />
      </View>

      <View style={{ marginTop: spacing.xxs }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={MOCK_CATEGORIES}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: spacing.md, gap: spacing.xs }}
          ListHeaderComponent={
            <CategoryChip label="Semua" selected={categoryId === null} onPress={() => setCategoryId(null)} />
          }
          ItemSeparatorComponent={() => <View style={{ width: spacing.xs }} />}
          renderItem={({ item }) => (
            <CategoryChip
              label={item.name}
              selected={categoryId === item.id}
              onPress={() => setCategoryId(item.id)}
            />
          )}
        />
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: spacing.sm }}
        contentContainerStyle={{
          padding: spacing.md,
          paddingBottom: cart.itemCount > 0 ? 96 : spacing.md,
          gap: spacing.sm,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState icon="fast-food-outline" title="Belum ada produk" description="Kategori ini masih kosong." />
        }
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => router.push(`/product/${item.id}`)}
            onQuickAdd={
              !item.variantGroups?.length && !item.modifierGroups?.length
                ? () => {
                    cart.addItem({ product: item, quantity: 1 });
                    toast.show(`${item.name} ditambahkan`, "success");
                  }
                : undefined
            }
          />
        )}
      />

      {cart.itemCount > 0 ? (
        <Pressable
          onPress={() => router.push("/cart")}
          style={[
            styles.cartBar,
            shadows.lg,
            { backgroundColor: colors.primary, borderRadius: radii.lg, bottom: spacing.md },
          ]}
        >
          <View style={[styles.cartBadge, { backgroundColor: colors.onPrimary }]}>
            <Text style={{ color: colors.primary, fontFamily: fontFamily.bold, fontSize: fontSize.sm }}>
              {cart.itemCount}
            </Text>
          </View>
          <Text
            style={{ color: colors.onPrimary, fontFamily: fontFamily.semibold, fontSize: fontSize.base, flex: 1, marginLeft: spacing.sm }}
          >
            Lihat Keranjang
          </Text>
          <PriceText amount={cart.grandTotal} color={colors.onPrimary} size="base" />
          <Ionicons name="chevron-forward" size={18} color={colors.onPrimary} style={{ marginLeft: 4 }} />
        </Pressable>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  scanButton: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  cartBar: {
    position: "absolute",
    left: 16,
    right: 16,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  cartBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
});
