import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowDownRightIcon, ArrowUpRightIcon } from "@/components/icons";

export interface StatCardProps {
  label: string;
  value: string;
  delta?: number;
  deltaLabel?: string;
  icon?: ReactNode;
  tone?: "default" | "warning";
  className?: string;
}

export function StatCard({ label, value, delta, deltaLabel, icon, tone = "default", className }: StatCardProps) {
  const isPositive = typeof delta === "number" && delta >= 0;
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface-raised p-5 shadow-xs",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-ink-muted">{label}</span>
        {icon && (
          <span
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-[10px]",
              tone === "warning" ? "bg-warning-50 text-warning-600" : "bg-brand-50 text-brand-600"
            )}
          >
            {icon}
          </span>
        )}
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight text-ink">{value}</div>
      {typeof delta === "number" && (
        <div className="mt-2 flex items-center gap-1 text-xs font-medium">
          <span className={cn("flex items-center gap-0.5", isPositive ? "text-success-600" : "text-error-600")}>
            {isPositive ? <ArrowUpRightIcon width={13} height={13} /> : <ArrowDownRightIcon width={13} height={13} />}
            {isPositive ? "+" : ""}
            {delta.toFixed(1)}%
          </span>
          {deltaLabel && <span className="text-ink-faint">{deltaLabel}</span>}
        </div>
      )}
    </div>
  );
}
