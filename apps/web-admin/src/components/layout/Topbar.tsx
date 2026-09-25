"use client";

import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Avatar } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import { notifications } from "@/lib/mock-data";

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-surface/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-surface/60 sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="flex h-9 w-9 items-center justify-center rounded-md text-ink-secondary hover:bg-surface-raised lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-4.5 w-4.5" />
      </button>

      <div className="hidden min-w-0 items-center gap-1.5 text-sm text-ink-muted md:flex">
        <span className="font-medium text-ink-primary">Kopi Kenangan Group</span>
        <span>/</span>
        <span>Semua Outlet</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </div>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        <div className="hidden w-56 sm:block lg:w-72">
          <Input icon={<Search className="h-4 w-4" />} placeholder="Search anything…" />
        </div>

        <ThemeToggle />

        <Link
          href="/notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-md text-ink-secondary transition-colors hover:bg-surface-raised hover:text-ink-primary"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          {unread > 0 && (
            <span className="absolute right-1.5 top-1.5 flex h-2 w-2 items-center justify-center rounded-full bg-danger ring-2 ring-surface" />
          )}
        </Link>

        <div className="ml-1 flex items-center gap-2 rounded-md py-1 pl-1 pr-2 hover:bg-surface-raised">
          <Avatar name="Nadia Permata" color="chart-1" />
          <div className="hidden leading-tight md:block">
            <p className="text-[13px] font-medium text-ink-primary">Nadia Permata</p>
            <p className="text-[11px] text-ink-muted">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
