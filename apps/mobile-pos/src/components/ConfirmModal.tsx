import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/theme";
import { Button } from "./Button";

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  visible,
  title,
  message,
  confirmLabel = "Konfirmasi",
  cancelLabel = "Batal",
  destructive = false,
  icon = "help-circle",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const { colors, radii, spacing, fontFamily, fontSize, shadows } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={[styles.overlay, { backgroundColor: colors.overlay }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} />
        <View
          style={[
            styles.card,
            shadows.lg,
            { backgroundColor: colors.surfaceElevated, borderRadius: radii.xl, padding: spacing.lg },
          ]}
        >
          <View
            style={[
              styles.iconWrap,
              { backgroundColor: destructive ? colors.errorMuted : colors.primaryMuted },
            ]}
          >
            <Ionicons name={icon} size={26} color={destructive ? colors.error : colors.primary} />
          </View>
          <Text
            style={{
              color: colors.textPrimary,
              fontFamily: fontFamily.semibold,
              fontSize: fontSize.lg,
              marginTop: spacing.md,
              textAlign: "center",
            }}
          >
            {title}
          </Text>
          {message ? (
            <Text
              style={{
                color: colors.textSecondary,
                fontFamily: fontFamily.regular,
                fontSize: fontSize.sm,
                marginTop: spacing.xxs,
                textAlign: "center",
              }}
            >
              {message}
            </Text>
          ) : null}

          <View style={{ flexDirection: "row", marginTop: spacing.lg }}>
            <Button
              label={cancelLabel}
              variant="secondary"
              onPress={onCancel}
              style={{ flex: 1, marginRight: spacing.xs }}
            />
            <Button
              label={confirmLabel}
              variant={destructive ? "destructive" : "primary"}
              onPress={onConfirm}
              style={{ flex: 1, marginLeft: spacing.xs }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    alignItems: "center",
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});
