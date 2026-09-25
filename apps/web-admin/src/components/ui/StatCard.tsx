import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPercent } from "@/lib/format";
import { Card } from "./Card";

export interface StatCardProps {
  label: string;
  value: string;
  delta?: number;
  deltaLabel?: string;
  icon: LucideIcon;
  accent?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | "chart-6" | "chart-7" | "chart-8";
}

const accentClasses: Record<NonNullable<StatCardProps["accent"]>, string> = {
  "chart-1": "bg-chart-1/10 text-chart-1",
  "chart-2": "bg-chart-2/10 text-chart-2",
  "chart-3": "bg-chart-3/10 text-chart-3",
  "chart-4": "bg-chart-4/10 text-chart-4",
  "chart-5": "bg-chart-5/10 text-chart-5",
  "chart-6": "bg-chart-6/10 text-chart-6",
  "chart-7": "bg-chart-7/10 text-chart-7",
  "chart-8": "bg-chart-8/10 text-chart-8",
};

export function StatCard({ label, value, delta, deltaLabel, icon: Icon, accent = "chart-1" }: StatCardProps) {
  const isPositive = (delta ?? 0) >= 0;
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <span className="text-[13px] font-medium text-ink-secondary">{label}</span>
        <span className={cn("flex h-8 w-8 items-center justify-center rounded-md", accentClasses[accent])}>
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight text-ink-primary tabular-nums">{value}</div>
      {typeof delta === "number" && (
        <div className="mt-2 flex items-center gap-1 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-medium",
              isPositive ? "text-success" : "text-danger"
            )}
          >
            {isPositive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {formatPercent(delta)}
          </span>
          {deltaLabel && <span className="text-ink-muted">{deltaLabel}</span>}
        </div>
      )}
    </Card>
  );
}
