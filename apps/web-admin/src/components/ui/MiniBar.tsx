import { cn } from "@/lib/utils";

/** Horizontal bar meter used for at-a-glance comparisons (e.g. revenue by outlet). */
export function MiniBar({
  value,
  max,
  colorClassName = "bg-chart-1",
}: {
  value: number;
  max: number;
  colorClassName?: string;
}) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/60">
      <div className={cn("h-full rounded-full", colorClassName)} style={{ width: `${pct}%` }} />
    </div>
  );
}
