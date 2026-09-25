import { cn } from "@/lib/utils";

export interface BarListItem {
  label: string;
  value: number;
  displayValue?: string;
  color?: string;
}

export function BarList({ items, className }: { items: BarListItem[]; className?: string }) {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <div className={cn("flex flex-col gap-3.5", className)}>
      {items.map((item) => (
        <div key={item.label}>
          <div className="mb-1.5 flex items-center justify-between gap-2 text-xs">
            <span className="font-medium text-ink">{item.label}</span>
            <span className="text-ink-muted">{item.displayValue ?? item.value}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-surface-subtle">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${Math.max((item.value / max) * 100, 3)}%`,
                backgroundColor: item.color ?? "var(--color-brand-500)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function RankedList({
  items,
}: {
  items: { rank: number; name: string; primary: string; secondary?: string }[];
}) {
  return (
    <div className="flex flex-col divide-y divide-border-subtle">
      {items.map((item) => (
        <div key={item.rank} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-surface-subtle text-xs font-semibold text-ink-muted">
              {item.rank}
            </span>
            <span className="truncate text-sm text-ink">{item.name}</span>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-sm font-medium text-ink">{item.primary}</p>
            {item.secondary && <p className="text-xs text-ink-faint">{item.secondary}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
