"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  key: string;
  label: string;
  content: ReactNode;
  badge?: ReactNode;
}

export function Tabs({ items, defaultKey, className }: { items: TabItem[]; defaultKey?: string; className?: string }) {
  const [active, setActive] = useState(defaultKey ?? items[0]?.key);
  const activeItem = items.find((i) => i.key === active) ?? items[0];

  return (
    <div className={className}>
      <div className="flex items-center gap-1 border-b border-border overflow-x-auto">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => setActive(item.key)}
            className={cn(
              "relative flex items-center gap-2 whitespace-nowrap px-3.5 py-2.5 text-sm font-medium transition-colors",
              active === item.key ? "text-brand-600" : "text-ink-muted hover:text-ink"
            )}
          >
            {item.label}
            {item.badge}
            {active === item.key && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-brand-600" />
            )}
          </button>
        ))}
      </div>
      <div className="pt-4">{activeItem?.content}</div>
    </div>
  );
}
