import { cn } from "@/lib/utils";
import { CHART_BG } from "./chart-colors";

export interface BarListItem {
  label: string;
  value: number;
}

/** Horizontal bar list — used for "revenue by outlet" / "revenue by category". */
export function BarListChart({
  data,
  formatValue,
}: {
  data: BarListItem[];
  formatValue: (value: number) => string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="space-y-3.5">
      {data.map((item, i) => {
        const pct = Math.max(4, Math.round((item.value / max) * 100));
        return (
          <div key={item.label} className="group">
            <div className="mb-1 flex items-center justify-between text-[13px]">
              <span className="flex items-center gap-2 text-ink-secondary">
                <span className={cn("h-2 w-2 rounded-full", CHART_BG[i % CHART_BG.length])} />
                {item.label}
              </span>
              <span className="font-medium text-ink-primary tabular-nums">{formatValue(item.value)}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-border/50">
              <div
                className={cn("h-full rounded-full transition-all", CHART_BG[i % CHART_BG.length])}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
