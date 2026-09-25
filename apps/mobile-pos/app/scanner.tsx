import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useTheme } from "@/theme";
import { useToast } from "@/store/ToastContext";
import { MOCK_PRODUCTS } from "@/data/mockData";

const SAMPLE_PRODUCTS = MOCK_PRODUCTS.slice(0, 3);

export default function ScannerScreen() {
  const { spacing, radii, fontFamily, fontSize } = useTheme();
  const insets = useSafeAreaInsets();
  const toast = useToast();

  const [manualCode, setManualCode] = useState("");
  const [torchOn, setTorchOn] = useState(false);
  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, { toValue: 1, duration: 1600, useNativeDriver: true }),
        Animated.timing(scanAnim, { toValue: 0, duration: 1600, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [scanAnim]);

  const translateY = scanAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 220] });

  const findAndOpen = (code: string) => {
    const product = MOCK_PRODUCTS.find((p) => p.barcode === code.trim());
    if (product) {
      router.replace(`/product/${product.id}`);
    } else {
      toast.show("Produk dengan barcode tersebut tidak ditemukan", "error");
    }
  };

  return (
    <View style={styles.root}>
      <View style={[styles.topBar, { paddingTop: insets.top + 8, paddingHorizontal: spacing.md }]}>
        <Pressable onPress={() => router.back()} style={styles.topButton} hitSlop={10}>
          <Ionicons name="close" size={22} color="#FFFFFF" />
        </Pressable>
        <Text style={{ color: "#FFFFFF", fontFamily: fontFamily.semibold, fontSize: fontSize.md }}>
          Pindai Barcode
        </Text>
        <Pressable onPress={() => setTorchOn((v) => !v)} style={styles.topButton} hitSlop={10}>
          <Ionicons name={torchOn ? "flash" : "flash-outline"} size={20} color="#FFFFFF" />
        </Pressable>
      </View>

      <View style={styles.viewfinderWrap}>
        <View style={styles.frame}>
          <View style={[styles.corner, styles.cornerTL]} />
          <View style={[styles.corner, styles.cornerTR]} />
          <View style={[styles.corner, styles.cornerBL]} />
          <View style={[styles.corner, styles.cornerBR]} />
          <Animated.View style={[styles.scanLine, { transform: [{ translateY }] }]} />
        </View>
        <Text style={styles.hint}>Arahkan kamera ke barcode produk</Text>
      </View>

      <View style={[styles.sheet, { borderTopLeftRadius: radii.xl, borderTopRightRadius: radii.xl, padding: spacing.md, paddingBottom: insets.bottom + spacing.md }]}>
        <Text style={{ color: "#FFFFFF", fontFamily: fontFamily.medium, fontSize: fontSize.sm, marginBottom: spacing.xs }}>
          Coba scan produk contoh
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: spacing.md }}>
          {SAMPLE_PRODUCTS.map((p) => (
            <Pressable
              key={p.id}
              onPress={() => findAndOpen(p.barcode)}
              style={[styles.sampleChip, { borderRadius: radii.pill }]}
            >
              <Text style={{ fontSize: 14, marginRight: 4 }}>{p.emoji}</Text>
              <Text style={{ color: "#FFFFFF", fontFamily: fontFamily.medium, fontSize: fontSize.xs }}>
                {p.name}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={{ color: "rgba(255,255,255,0.6)", fontFamily: fontFamily.regular, fontSize: fontSize.xs, marginBottom: spacing.xs }}>
          Atau masukkan kode barcode secara manual
        </Text>
        <View style={{ flexDirection: "row", gap: spacing.xs }}>
          <View style={{ flex: 1 }}>
            <Input
              placeholder="Contoh: 8991234500011"
              value={manualCode}
              onChangeText={setManualCode}
              keyboardType="number-pad"
              onSubmitEditing={() => findAndOpen(manualCode)}
            />
          </View>
          <Button label="Cari" fullWidth={false} onPress={() => findAndOpen(manualCode)} style={{ paddingHorizontal: spacing.md }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0B0C10",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 12,
  },
  topButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  viewfinderWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  frame: {
    width: 260,
    height: 220,
    overflow: "hidden",
  },
  corner: {
    position: "absolute",
    width: 32,
    height: 32,
    borderColor: "#7A79FF",
  },
  cornerTL: { top: 0, left: 0, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 8 },
  cornerTR: { top: 0, right: 0, borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 8 },
  cornerBL: { bottom: 0, left: 0, borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 8 },
  cornerBR: { bottom: 0, right: 0, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 8 },
  scanLine: {
    position: "absolute",
    left: 8,
    right: 8,
    top: 0,
    height: 2,
    backgroundColor: "#7A79FF",
  },
  hint: {
    color: "rgba(255,255,255,0.7)",
    marginTop: 20,
    fontSize: 13,
  },
  sheet: {
    backgroundColor: "#15161C",
  },
  sampleChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
});
