import type { Metadata } from "next";
import Link from "next/link";
import { LayoutGrid, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Input";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-ink-primary p-10 text-bg lg:flex">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand text-brand-fg">
            <LayoutGrid className="h-4.5 w-4.5" />
          </span>
          <span className="text-sm font-semibold">Web Admin</span>
        </div>
        <div className="max-w-md">
          <p className="text-2xl font-semibold leading-snug">
            Centralized management for every outlet, every transaction, every decision.
          </p>
          <p className="mt-4 text-sm text-bg/60">
            Kelola organisasi, outlet, produk, promosi, dan laporan dari satu dashboard terpusat —
            dibangun untuk bisnis F&amp;B dan retail multi-outlet di Indonesia.
          </p>
        </div>
        <p className="text-xs text-bg/40">© 2026 POS Ecosystem. All rights reserved.</p>
      </div>

      {/* Form panel */}
      <div className="flex w-full flex-1 items-center justify-center bg-bg px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand text-brand-fg">
              <LayoutGrid className="h-4.5 w-4.5" />
            </span>
            <span className="text-sm font-semibold text-ink-primary">Web Admin</span>
          </div>

          <h1 className="text-xl font-semibold text-ink-primary">Welcome back</h1>
          <p className="mt-1.5 text-sm text-ink-muted">Sign in to manage your POS ecosystem.</p>

          <form className="mt-7 space-y-4">
            <Field label="Email" required>
              <Input
                type="email"
                name="email"
                placeholder="nadia.permata@kopikenangan.id"
                icon={<Mail className="h-4 w-4" />}
                defaultValue="nadia.permata@kopikenangan.id"
                autoComplete="email"
              />
            </Field>
            <Field label="Password" required>
              <Input
                type="password"
                name="password"
                placeholder="••••••••"
                icon={<Lock className="h-4 w-4" />}
                defaultValue="••••••••••"
                autoComplete="current-password"
              />
            </Field>

            <div className="flex items-center justify-between text-[13px]">
              <label className="flex items-center gap-2 text-ink-secondary">
                <input type="checkbox" className="h-3.5 w-3.5 rounded border-border accent-[hsl(var(--brand))]" defaultChecked />
                Remember me
              </label>
              <Link href="#" className="font-medium text-brand hover:text-brand-hover">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" size="lg" className="w-full">
              Sign in
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-ink-muted">
            Owner, Super Admin &amp; Administrator access only. Outlet staff should use{" "}
            <span className="font-medium text-ink-secondary">Web Outlet</span> or{" "}
            <span className="font-medium text-ink-secondary">Mobile POS</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
