import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/theme";
import { Button } from "./Button";

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon = "file-tray-outline",
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const { colors, spacing, radii, fontFamily, fontSize } = useTheme();

  return (
    <View style={[styles.container, { padding: spacing.xl }]}>
      <View
        style={[
          styles.iconWrap,
          { backgroundColor: colors.surface, borderRadius: radii.xl },
        ]}
      >
        <Ionicons name={icon} size={32} color={colors.textTertiary} />
      </View>
      <Text
        style={{
          color: colors.textPrimary,
          fontFamily: fontFamily.semibold,
          fontSize: fontSize.md,
          marginTop: spacing.md,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
      {description ? (
        <Text
          style={{
            color: colors.textSecondary,
            fontFamily: fontFamily.regular,
            fontSize: fontSize.sm,
            marginTop: spacing.xxs,
            textAlign: "center",
          }}
        >
          {description}
        </Text>
      ) : null}
      {actionLabel && onAction ? (
        <Button
          label={actionLabel}
          onPress={onAction}
          variant="secondary"
          fullWidth={false}
          style={{ marginTop: spacing.lg, paddingHorizontal: spacing.lg }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrap: {
    width: 72,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
  },
});
