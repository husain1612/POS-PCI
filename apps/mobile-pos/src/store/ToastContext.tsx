import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/theme";

export type ToastVariant = "default" | "success" | "error";

interface ToastState {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  show: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { colors, radii, spacing, fontFamily, fontSize, shadows } = useTheme();
  const insets = useSafeAreaInsets();

  const show = useCallback((message: string, variant: ToastVariant = "default") => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const id = Date.now();
    setToast({ id, message, variant });
    timerRef.current = setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 2200);
  }, []);

  const value = useMemo<ToastContextValue>(() => ({ show }), [show]);

  const iconName =
    toast?.variant === "success"
      ? "checkmark-circle"
      : toast?.variant === "error"
      ? "alert-circle"
      : "information-circle";

  const iconColor =
    toast?.variant === "success"
      ? colors.success
      : toast?.variant === "error"
      ? colors.error
      : colors.primary;

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast ? (
        <View
          pointerEvents="none"
          style={[styles.container, { top: insets.top + spacing.xs }]}
        >
          <View
            style={[
              styles.toast,
              shadows.md,
              {
                backgroundColor: colors.surfaceElevated,
                borderColor: colors.border,
                borderRadius: radii.md,
              },
            ]}
          >
            <Ionicons name={iconName} size={18} color={iconColor} />
            <Text
              style={{
                color: colors.textPrimary,
                fontFamily: fontFamily.medium,
                fontSize: fontSize.sm,
                marginLeft: spacing.xs,
                flexShrink: 1,
              }}
            >
              {toast.message}
            </Text>
          </View>
        </View>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1000,
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: StyleSheet.hairlineWidth,
    maxWidth: "90%",
  },
});
