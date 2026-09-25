import React from "react";
import { router } from "expo-router";
import { Screen } from "@/components/Screen";
import { EmptyState } from "@/components/EmptyState";

export default function NotFoundScreen() {
  return (
    <Screen>
      <EmptyState
        icon="alert-circle-outline"
        title="Halaman tidak ditemukan"
        description="Layar yang kamu tuju tidak tersedia."
        actionLabel="Kembali ke Beranda"
        onAction={() => router.replace("/")}
      />
    </Screen>
  );
}
