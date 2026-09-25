"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { ErrorState } from "@/components/ui/States";

export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // In production this would report to an error tracking service.
    console.error(error);
  }, [error]);

  return (
    <Card>
      <ErrorState
        title="This page failed to load"
        description="An unexpected error occurred while rendering this view. Please try again."
        onRetry={reset}
      />
    </Card>
  );
}
