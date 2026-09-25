import React from "react";
import { Redirect, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/theme";
import { useAuth } from "@/store/AuthContext";

export default function TabsLayout() {
  const { colors, fontFamily, fontSize } = useTheme();
  const { cashier, outlet } = useAuth();

  if (!cashier) return <Redirect href="/login" />;
  if (!outlet) return <Redirect href="/select-outlet" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          backgroundColor: colors.surfaceElevated,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: fontFamily.medium,
          fontSize: fontSize.xs,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Kasir",
          tabBarIcon: ({ color, size }) => <Ionicons name="storefront" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Riwayat",
          tabBarIcon: ({ color, size }) => <Ionicons name="receipt" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
