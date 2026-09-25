"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { BellIcon, ChevronDownIcon, MenuIcon, SearchIcon } from "@/components/icons";
import { CURRENT_USER, NOTIFICATIONS, OUTLET } from "@/lib/mock-data";

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const unread = NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-surface-raised/90 px-4 backdrop-blur supports-[backdrop-filter]:bg-surface-raised/70 lg:px-6">
      <button
        onClick={onMenuClick}
        className="flex h-9 w-9 items-center justify-center rounded-[10px] text-ink-muted hover:bg-surface-subtle lg:hidden"
        aria-label="Buka menu"
      >
        <MenuIcon width={18} height={18} />
      </button>

      <button className="hidden items-center gap-2 rounded-[10px] border border-border px-3 py-1.5 text-left hover:bg-surface-subtle sm:flex">
        <div className="leading-tight">
          <p className="text-xs font-semibold text-ink">{OUTLET.name}</p>
          <p className="text-[11px] text-ink-faint">Outlet Aktif</p>
        </div>
        <ChevronDownIcon width={14} height={14} className="text-ink-faint" />
      </button>

      <div className="relative ml-1 hidden max-w-xs flex-1 md:block">
        <SearchIcon width={15} height={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
        <input
          type="text"
          placeholder="Cari transaksi, produk, SKU..."
          className="h-9 w-full rounded-[10px] border border-border bg-surface-subtle pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint focus:border-brand-500 focus:bg-surface-raised focus:outline-none focus:ring-2 focus:ring-brand-500/40"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <Link
          href="/notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-[10px] border border-border text-ink-muted hover:bg-surface-subtle hover:text-ink"
          aria-label="Notifikasi"
        >
          <BellIcon width={16} height={16} />
          {unread > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-error-500 px-1 text-[10px] font-semibold text-white">
              {unread}
            </span>
          )}
        </Link>
        <div className="ml-1 flex items-center gap-2 rounded-[10px] border border-border py-1 pl-1 pr-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-brand-600 text-xs font-semibold text-white">
            {CURRENT_USER.initials}
          </div>
          <div className="hidden leading-tight sm:block">
            <p className="text-xs font-medium text-ink">{CURRENT_USER.name}</p>
            <p className="text-[11px] text-ink-faint">{CURRENT_USER.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
