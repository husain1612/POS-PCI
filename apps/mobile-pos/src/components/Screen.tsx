import React from "react";
import { ScrollView, StyleSheet, View, ViewStyle } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme";

interface ScreenProps {
  children: React.ReactNode;
  scroll?: boolean;
  edges?: Edge[];
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  padded?: boolean;
}

export function Screen({
  children,
  scroll = false,
  edges = ["top", "bottom", "left", "right"],
  style,
  contentContainerStyle,
  padded = false,
}: ScreenProps) {
  const { colors, spacing } = useTheme();

  const Content = scroll ? ScrollView : View;
  const contentProps = scroll
    ? {
        contentContainerStyle: [
          padded ? { padding: spacing.md } : null,
          { flexGrow: 1 },
          contentContainerStyle,
        ],
        keyboardShouldPersistTaps: "handled" as const,
        showsVerticalScrollIndicator: false,
      }
    : { style: [{ flex: 1 }, padded ? { padding: spacing.md } : null, contentContainerStyle] };

  return (
    <SafeAreaView
      edges={edges}
      style={[styles.root, { backgroundColor: colors.background }, style]}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Content {...(contentProps as any)}>{children}</Content>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
