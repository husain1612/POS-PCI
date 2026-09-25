import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/theme";

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
}

export function Header({ title, subtitle, onBack, right }: HeaderProps) {
  const { colors, spacing, fontFamily, fontSize } = useTheme();

  return (
    <View
      style={[
        styles.row,
        {
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
          borderBottomWidth: StyleSheet.hairlineWidth,
        },
      ]}
    >
      {onBack ? (
        <Pressable
          onPress={onBack}
          hitSlop={12}
          style={[
            styles.iconButton,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Ionicons name="chevron-back" size={20} color={colors.textPrimary} />
        </Pressable>
      ) : (
        <View style={styles.iconButton} />
      )}

      <View style={styles.titleWrap}>
        <Text
          numberOfLines={1}
          style={{ color: colors.textPrimary, fontFamily: fontFamily.semibold, fontSize: fontSize.lg }}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            numberOfLines={1}
            style={{ color: colors.textSecondary, fontFamily: fontFamily.regular, fontSize: fontSize.xs }}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      <View style={styles.rightSlot}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
  },
  titleWrap: {
    flex: 1,
    marginHorizontal: 10,
  },
  rightSlot: {
    minWidth: 36,
    alignItems: "flex-end",
  },
});
