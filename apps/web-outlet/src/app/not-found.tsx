import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/States";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-subtle px-6">
      <EmptyState
        title="Halaman tidak ditemukan"
        description="Halaman yang Anda cari tidak ada atau telah dipindahkan."
        action={
          <Link href="/dashboard">
            <Button size="sm">Kembali ke Dashboard</Button>
          </Link>
        }
      />
    </div>
  );
}
