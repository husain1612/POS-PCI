import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider, useTheme } from "@/theme";
import { ToastProvider } from "@/store/ToastContext";
import { AuthProvider } from "@/store/AuthContext";
import { CartProvider } from "@/store/CartContext";
import { TransactionsProvider } from "@/store/TransactionsContext";
import { OfflineProvider } from "@/store/OfflineContext";

SplashScreen.preventAutoHideAsync().catch(() => {
  /* noop: fine if there is no native splash module in this environment */
});

function RootStack() {
  const { colors, isDark } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="login" options={{ animation: "fade" }} />
        <Stack.Screen name="select-outlet" options={{ animation: "fade" }} />
        <Stack.Screen name="search" options={{ presentation: "modal" }} />
        <Stack.Screen name="scanner" options={{ presentation: "fullScreenModal" }} />
        <Stack.Screen name="product/[id]" />
        <Stack.Screen name="cart" />
        <Stack.Screen name="discount" options={{ presentation: "modal" }} />
        <Stack.Screen name="checkout" />
        <Stack.Screen name="split-payment" />
        <Stack.Screen name="payment-success" options={{ gestureEnabled: false }} />
        <Stack.Screen name="transaction/[id]" />
        <Stack.Screen name="refund/[id]" />
        <Stack.Screen name="offline-sync" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => {
        /* noop */
      });
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider>
              <TransactionsProvider>
                <OfflineProvider>
                  <CartProvider>
                    <RootStack />
                  </CartProvider>
                </OfflineProvider>
              </TransactionsProvider>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
