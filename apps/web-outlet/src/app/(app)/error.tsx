"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ui/States";

export default function AppError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // In production this would report to an error tracking service.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <ErrorState
        title="Terjadi kesalahan"
        description="Halaman ini gagal dimuat. Silakan coba lagi atau hubungi tim support jika masalah berlanjut."
        onRetry={reset}
      />
    </div>
  );
}
