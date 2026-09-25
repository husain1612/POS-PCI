import React, { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Screen } from "@/components/Screen";
import { SearchBar } from "@/components/SearchBar";
import { PriceText } from "@/components/PriceText";
import { EmptyState } from "@/components/EmptyState";
import { IconButton } from "@/components/IconButton";
import { useTheme } from "@/theme";
import { useCart } from "@/store/CartContext";
import { useToast } from "@/store/ToastContext";
import { MOCK_PRODUCTS } from "@/data/mockData";
import { Product } from "@/types";

export default function SearchScreen() {
  const { colors, spacing, radii, fontFamily, fontSize } = useTheme();
  const [query, setQuery] = useState("");
  const cart = useCart();
  const toast = useToast();

  const results = useMemo<Product[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return MOCK_PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.barcode.includes(q)
    );
  }, [query]);

  const quickAdd = (product: Product) => {
    cart.addItem({ product, quantity: 1 });
    toast.show(`${product.name} ditambahkan`, "success");
  };

  return (
    <Screen edges={["top", "left", "right"]}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: spacing.md, gap: spacing.sm }}>
        <IconButton name="close" variant="ghost" onPress={() => router.back()} />
        <View style={{ flex: 1 }}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            placeholder="Cari nama produk atau SKU"
            autoFocus
          />
        </View>
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.md, paddingTop: 0, gap: spacing.xs }}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          query.trim().length === 0 ? (
            <EmptyState
              icon="search-outline"
              title="Cari produk"
              description="Ketik nama produk, SKU, atau barcode untuk mencari."
            />
          ) : (
            <EmptyState
              icon="sad-outline"
              title="Produk tidak ditemukan"
              description={`Tidak ada hasil untuk "${query}"`}
            />
          )
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/product/${item.id}`)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: colors.surfaceElevated,
              borderRadius: radii.lg,
              borderWidth: 1,
              borderColor: colors.border,
              padding: spacing.sm,
            }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: radii.md,
                backgroundColor: `${item.color}26`,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 22 }}>{item.emoji}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: spacing.sm }}>
              <Text numberOfLines={1} style={{ color: colors.textPrimary, fontFamily: fontFamily.medium, fontSize: fontSize.base }}>
                {item.name}
              </Text>
              <Text style={{ color: colors.textTertiary, fontFamily: fontFamily.regular, fontSize: fontSize.xs, marginTop: 2 }}>
                {item.sku} • Stok {item.stock}
              </Text>
              <PriceText amount={item.price} size="sm" style={{ marginTop: 2 }} />
            </View>
            {item.stock > 0 ? (
              <IconButton
                name={item.variantGroups?.length || item.modifierGroups?.length ? "options-outline" : "add"}
                variant="primary"
                size={18}
                onPress={() =>
                  item.variantGroups?.length || item.modifierGroups?.length
                    ? router.push(`/product/${item.id}`)
                    : quickAdd(item)
                }
              />
            ) : (
              <Ionicons name="close-circle-outline" size={20} color={colors.textTertiary} />
            )}
          </Pressable>
        )}
      />
    </Screen>
  );
}
