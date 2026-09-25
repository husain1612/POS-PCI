"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/components/layout/nav-items";
import { CloseIcon } from "@/components/icons";
import { OUTLET } from "@/lib/mock-data";

const GROUP_LABELS: Record<string, string> = {
  main: "Operasional",
  inventory: "Gudang & Stok",
  system: "Sistem",
};

export function Sidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  const groups: Array<"main" | "inventory" | "system"> = ["main", "inventory", "system"];

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex h-14 shrink-0 items-center justify-between gap-2 px-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-brand-600 text-sm font-bold text-white">
            KN
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-ink">Web Outlet</p>
            <p className="text-[11px] text-ink-faint">{OUTLET.code}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-1.5 text-ink-muted hover:bg-surface-subtle lg:hidden"
          aria-label="Tutup menu"
        >
          <CloseIcon width={18} height={18} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {groups.map((group) => (
          <div key={group} className="mb-4">
            <p className="px-2.5 pb-1.5 pt-3 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
              {GROUP_LABELS[group]}
            </p>
            <div className="flex flex-col gap-0.5">
              {NAV_ITEMS.filter((item) => item.group === group).map((item) => {
                const active = pathname === item.href || pathname?.startsWith(item.href + "/");
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-2.5 rounded-[10px] px-2.5 py-2 text-sm font-medium transition-colors",
                      active
                        ? "bg-brand-50 text-brand-700 dark:text-brand-300"
                        : "text-ink-muted hover:bg-surface-subtle hover:text-ink"
                    )}
                  >
                    <Icon width={17} height={17} className={active ? "text-brand-600 dark:text-brand-400" : "text-ink-faint"} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-border-subtle p-3">
        <div className="rounded-[10px] bg-surface-subtle px-3 py-2.5">
          <p className="text-xs font-medium text-ink">Paket Professional</p>
          <p className="mt-0.5 text-[11px] text-ink-faint">Multi-outlet · Advanced analytics</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:shrink-0 lg:flex-col lg:border-r lg:border-border lg:bg-surface-raised">
        {content}
      </aside>

      {/* Mobile drawer */}
      <div className={cn("fixed inset-0 z-40 lg:hidden", mobileOpen ? "" : "pointer-events-none")}>
        <div
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={onClose}
        />
        <aside
          className={cn(
            "absolute inset-y-0 left-0 w-72 max-w-[80%] border-r border-border bg-surface-raised shadow-md transition-transform duration-200",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {content}
        </aside>
      </div>
    </>
  );
}
