import React, { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { PriceText } from "@/components/PriceText";
import { useTheme } from "@/theme";
import { useCart } from "@/store/CartContext";
import { useToast } from "@/store/ToastContext";
import { DiscountValue } from "@/types";

const PERCENT_PRESETS = [5, 10, 15, 20];
const FIXED_PRESETS = [5000, 10000, 20000, 50000];

export default function DiscountScreen() {
  const params = useLocalSearchParams<{ itemId?: string }>();
  const isCartLevel = !params.itemId || params.itemId === "cart";
  const { colors, spacing, radii, fontFamily, fontSize } = useTheme();
  const cart = useCart();
  const toast = useToast();

  const targetItem = isCartLevel ? undefined : cart.getItemById(params.itemId as string);
  const existing = isCartLevel ? cart.cartDiscount : targetItem?.discount;

  const [type, setType] = useState<DiscountValue["type"]>(existing?.type ?? "percentage");
  const [value, setValue] = useState(existing ? String(existing.value) : "");
  const [reason, setReason] = useState(existing?.reason ?? "");

  const baseAmount = isCartLevel
    ? Math.max(cart.subtotal - cart.itemDiscountTotal, 0)
    : targetItem
    ? cart.lineTotal(targetItem)
    : 0;

  const numericValue = Number(value.replace(/[^0-9]/g, "")) || 0;

  const discountAmount = useMemo(() => {
    if (numericValue <= 0) return 0;
    if (type === "percentage") return Math.round(baseAmount * (Math.min(numericValue, 100) / 100));
    return Math.min(numericValue, baseAmount);
  }, [type, numericValue, baseAmount]);

  const onSave = () => {
    if (numericValue <= 0) {
      toast.show("Masukkan nilai diskon terlebih dahulu", "error");
      return;
    }
    const discount: DiscountValue = { type, value: type === "percentage" ? Math.min(numericValue, 100) : numericValue, reason: reason.trim() || undefined };
    if (isCartLevel) {
      cart.setCartDiscount(discount);
    } else if (targetItem) {
      cart.setItemDiscount(targetItem.cartItemId, discount);
    }
    toast.show("Diskon diterapkan", "success");
    router.back();
  };

  const onRemove = () => {
    if (isCartLevel) {
      cart.setCartDiscount(null);
    } else if (targetItem) {
      cart.setItemDiscount(targetItem.cartItemId, null);
    }
    toast.show("Diskon dihapus", "success");
    router.back();
  };

  return (
    <Screen edges={["top", "left", "right", "bottom"]}>
      <Header
        title={isCartLevel ? "Diskon Keseluruhan" : "Diskon Item"}
        subtitle={isCartLevel ? undefined : targetItem?.name}
        onBack={() => router.back()}
      />

      <View style={{ padding: spacing.md, flex: 1 }}>
        <View style={{ flexDirection: "row", backgroundColor: colors.surface, borderRadius: radii.md, padding: 4 }}>
          {(["percentage", "fixed"] as const).map((t) => {
            const selected = type === t;
            return (
              <Pressable
                key={t}
                onPress={() => setType(t)}
                style={{
                  flex: 1,
                  paddingVertical: spacing.xs,
                  borderRadius: radii.sm,
                  alignItems: "center",
                  backgroundColor: selected ? colors.surfaceElevated : "transparent",
                }}
              >
                <Text style={{ color: selected ? colors.textPrimary : colors.textSecondary, fontFamily: fontFamily.semibold, fontSize: fontSize.sm }}>
                  {t === "percentage" ? "Persentase (%)" : "Nominal (Rp)"}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={{ marginTop: spacing.lg }}>
          <Input
            label={type === "percentage" ? "Persentase Diskon" : "Nominal Diskon"}
            placeholder={type === "percentage" ? "cth: 10" : "cth: 10000"}
            keyboardType="number-pad"
            value={value}
            onChangeText={setValue}
          />
        </View>

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: spacing.sm }}>
          {(type === "percentage" ? PERCENT_PRESETS : FIXED_PRESETS).map((preset) => (
            <Pressable
              key={preset}
              onPress={() => setValue(String(preset))}
              style={{
                paddingHorizontal: spacing.sm,
                paddingVertical: 6,
                borderRadius: radii.pill,
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text style={{ color: colors.textSecondary, fontFamily: fontFamily.medium, fontSize: fontSize.xs }}>
                {type === "percentage" ? `${preset}%` : `Rp${preset.toLocaleString("id-ID")}`}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={{ marginTop: spacing.lg }}>
          <Input label="Alasan (opsional)" placeholder="cth: Promo karyawan, pelanggan loyal" value={reason} onChangeText={setReason} />
        </View>

        <View
          style={{
            marginTop: spacing.lg,
            backgroundColor: colors.surface,
            borderRadius: radii.md,
            padding: spacing.sm,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
            <Text style={{ color: colors.textSecondary, fontFamily: fontFamily.regular, fontSize: fontSize.sm }}>Dasar Perhitungan</Text>
            <PriceText amount={baseAmount} size="sm" />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: colors.textSecondary, fontFamily: fontFamily.regular, fontSize: fontSize.sm }}>Potongan Diskon</Text>
            <PriceText amount={discountAmount} size="sm" color={colors.success} />
          </View>
        </View>
      </View>

      <View style={{ padding: spacing.md, gap: spacing.xs }}>
        {existing ? <Button label="Hapus Diskon" variant="outline" onPress={onRemove} /> : null}
        <Button label="Simpan Diskon" onPress={onSave} />
      </View>
    </Screen>
  );
}
