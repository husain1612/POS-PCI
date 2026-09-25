import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-6 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-subtle text-brand">
        <LayoutGrid className="h-6 w-6" />
      </span>
      <div>
        <h1 className="text-lg font-semibold text-ink-primary">Page not found</h1>
        <p className="mt-1 text-sm text-ink-muted">The page you&apos;re looking for doesn&apos;t exist or may have been moved.</p>
      </div>
      <Button asChild>
        <Link href="/dashboard">Back to Dashboard</Link>
      </Button>
    </div>
  );
}
