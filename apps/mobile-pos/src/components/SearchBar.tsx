import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/theme";

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  editable?: boolean;
  autoFocus?: boolean;
  onPress?: () => void;
  onSubmitEditing?: () => void;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Cari produk...",
  editable = true,
  autoFocus = false,
  onPress,
  onSubmitEditing,
  rightIcon,
  onRightIconPress,
}: SearchBarProps) {
  const { colors, radii, spacing, fontFamily, fontSize } = useTheme();

  const body = (
    <View
      style={[
        styles.row,
        {
          borderRadius: radii.md,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          paddingHorizontal: spacing.sm,
        },
      ]}
    >
      <Ionicons name="search" size={18} color={colors.textTertiary} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        editable={editable}
        autoFocus={autoFocus}
        onSubmitEditing={onSubmitEditing}
        returnKeyType="search"
        style={[
          styles.input,
          { color: colors.textPrimary, fontFamily: fontFamily.regular, fontSize: fontSize.base },
        ]}
      />
      {value ? (
        <Pressable onPress={() => onChangeText?.("")} hitSlop={8}>
          <Ionicons name="close-circle" size={18} color={colors.textTertiary} />
        </Pressable>
      ) : null}
      {rightIcon ? (
        <Pressable onPress={onRightIconPress} hitSlop={8} style={{ marginLeft: spacing.xs }}>
          <Ionicons name={rightIcon} size={20} color={colors.primary} />
        </Pressable>
      ) : null}
    </View>
  );

  if (onPress && !editable) {
    return (
      <Pressable onPress={onPress}>
        <View pointerEvents="none">{body}</View>
      </Pressable>
    );
  }

  return body;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    height: 46,
    borderWidth: StyleSheet.hairlineWidth,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    height: "100%",
  },
});
