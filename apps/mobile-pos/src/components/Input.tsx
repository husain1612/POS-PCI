import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { useTheme } from "@/theme";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
}

export function Input({ label, error, leftAdornment, rightAdornment, style, onFocus, onBlur, ...rest }: InputProps) {
  const { colors, radii, spacing, fontFamily, fontSize } = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <View>
      {label ? (
        <Text
          style={{
            color: colors.textSecondary,
            fontFamily: fontFamily.medium,
            fontSize: fontSize.xs,
            marginBottom: spacing.xxs,
          }}
        >
          {label}
        </Text>
      ) : null}
      <View
        style={[
          styles.row,
          {
            borderRadius: radii.md,
            borderColor: error ? colors.error : focused ? colors.primary : colors.border,
            backgroundColor: colors.surface,
            paddingHorizontal: spacing.sm,
          },
        ]}
      >
        {leftAdornment}
        <TextInput
          placeholderTextColor={colors.textTertiary}
          style={[
            styles.input,
            {
              color: colors.textPrimary,
              fontFamily: fontFamily.regular,
              fontSize: fontSize.base,
            },
            style,
          ]}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        />
        {rightAdornment}
      </View>
      {error ? (
        <Text
          style={{
            color: colors.error,
            fontFamily: fontFamily.regular,
            fontSize: fontSize.xs,
            marginTop: spacing.xxs,
          }}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
  },
  input: {
    flex: 1,
    height: 48,
  },
});
