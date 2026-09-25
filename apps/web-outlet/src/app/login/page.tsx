import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Input";
import { OUTLET } from "@/lib/mock-data";

export const metadata = {
  title: "Masuk — Web Outlet",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-surface-subtle">
      <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-10 lg:w-[440px] lg:shrink-0 lg:px-12">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-brand-600 text-sm font-bold text-white">
              KN
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-ink">Web Outlet</p>
              <p className="text-[11px] text-ink-faint">Kopi Nusantara POS</p>
            </div>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-ink">Masuk ke akun Anda</h1>
          <p className="mt-1.5 text-sm text-ink-muted">
            Kelola operasional dan inventory outlet {OUTLET.name}.
          </p>

          <form className="mt-8 flex flex-col gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="nama@kopinusantara.id" defaultValue="dewi.anggraini@kopinusantara.id" />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-medium text-ink-muted">
                  Kata Sandi
                </label>
                <a href="#" className="text-xs font-medium text-brand-600 hover:text-brand-700">
                  Lupa kata sandi?
                </a>
              </div>
              <Input id="password" type="password" placeholder="••••••••" defaultValue="password123" />
            </div>

            <div>
              <Label htmlFor="outlet">Outlet</Label>
              <select
                id="outlet"
                defaultValue={OUTLET.code}
                className="h-9 w-full rounded-[10px] border border-border bg-surface-raised px-3 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              >
                <option value={OUTLET.code}>{OUTLET.name}</option>
                <option value="OUT-JKT-001">Kopi Nusantara - Senopati</option>
                <option value="OUT-BDG-002">Kopi Nusantara - Dago</option>
              </select>
            </div>

            <Link href="/dashboard" className="mt-2">
              <Button type="button" className="w-full" size="lg">
                Masuk
              </Button>
            </Link>
          </form>

          <p className="mt-8 text-center text-xs text-ink-faint">
            Login khusus staf outlet. Butuh bantuan? Hubungi Admin Pusat.
          </p>
        </div>
      </div>

      <div className="relative hidden flex-1 items-center justify-center overflow-hidden bg-brand-700 lg:flex">
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.14), transparent 45%)",
          }}
        />
        <div className="relative max-w-md px-10 text-white">
          <p className="text-sm font-medium uppercase tracking-wider text-brand-200">Paket Professional</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight">
            Pantau penjualan dan stok outlet Anda secara real-time.
          </h2>
          <p className="mt-4 text-sm text-brand-100">
            Dashboard analitik, manajemen inventory lengkap, stock opname, refund, dan notifikasi
            dalam satu tempat untuk {OUTLET.name}.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-2xl font-semibold">214</p>
              <p className="text-xs text-brand-100">Transaksi hari ini</p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-2xl font-semibold">Rp18,5 jt</p>
              <p className="text-xs text-brand-100">Revenue hari ini</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
