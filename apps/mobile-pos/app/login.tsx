import React, { useState } from "react";
import { Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Screen } from "@/components/Screen";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useTheme } from "@/theme";
import { useAuth } from "@/store/AuthContext";

export default function LoginScreen() {
  const { colors, spacing, radii, fontFamily, fontSize } = useTheme();
  const { cashier, outlet, isAuthenticating, login } = useAuth();

  const [email, setEmail] = useState("siti.aminah@kopinusantara.id");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (cashier && outlet) return <Redirect href="/(tabs)" />;
  if (cashier && !outlet) return <Redirect href="/select-outlet" />;

  const onSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Email dan kata sandi wajib diisi.");
      return;
    }
    setError(null);
    await login(email.trim(), password);
    router.replace("/select-outlet");
  };

  return (
    <Screen scroll padded contentContainerStyle={{ justifyContent: "center" }}>
      <View style={{ alignItems: "center", marginBottom: spacing.xxl }}>
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: radii.xl,
            backgroundColor: colors.primary,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: spacing.md,
          }}
        >
          <Ionicons name="storefront" size={30} color={colors.onPrimary} />
        </View>
        <Text style={{ color: colors.textPrimary, fontFamily: fontFamily.bold, fontSize: fontSize.xxl }}>
          Mobile POS
        </Text>
        <Text
          style={{
            color: colors.textSecondary,
            fontFamily: fontFamily.regular,
            fontSize: fontSize.sm,
            marginTop: spacing.xxs,
          }}
        >
          Masuk untuk mulai transaksi
        </Text>
      </View>

      <View style={{ gap: spacing.md }}>
        <Input
          label="Email"
          placeholder="nama@bisnis.id"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          leftAdornment={<Ionicons name="mail-outline" size={18} color={colors.textTertiary} style={{ marginRight: 8 }} />}
        />
        <Input
          label="Kata Sandi"
          placeholder="Masukkan kata sandi"
          secureTextEntry={secure}
          value={password}
          onChangeText={setPassword}
          leftAdornment={<Ionicons name="lock-closed-outline" size={18} color={colors.textTertiary} style={{ marginRight: 8 }} />}
          rightAdornment={
            <Ionicons
              name={secure ? "eye-outline" : "eye-off-outline"}
              size={18}
              color={colors.textTertiary}
              onPress={() => setSecure((v) => !v)}
            />
          }
          error={error ?? undefined}
        />

        <Button label="Masuk" onPress={onSubmit} loading={isAuthenticating} style={{ marginTop: spacing.xs }} />

        <Text
          style={{
            color: colors.textTertiary,
            fontFamily: fontFamily.regular,
            fontSize: fontSize.xs,
            textAlign: "center",
            marginTop: spacing.sm,
          }}
        >
          Demo build — masukkan kata sandi apa saja untuk masuk.
        </Text>
      </View>
    </Screen>
  );
}
