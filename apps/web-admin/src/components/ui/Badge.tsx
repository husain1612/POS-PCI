import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "neutral" | "brand" | "success" | "warning" | "danger";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  dot?: boolean;
}

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-surface-raised text-ink-secondary border-border",
  brand: "bg-brand-subtle text-brand border-transparent",
  success: "bg-success-subtle text-success border-transparent",
  warning: "bg-warning-subtle text-warning border-transparent",
  danger: "bg-danger-subtle text-danger border-transparent",
};

const dotClasses: Record<BadgeTone, string> = {
  neutral: "bg-ink-muted",
  brand: "bg-brand",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

export function Badge({ className, tone = "neutral", dot, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium",
        toneClasses[tone],
        className
      )}
      {...props}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", dotClasses[tone])} />}
      {children}
    </span>
  );
}

/** Maps a domain "status" string to a sensible Badge tone + label out of the box. */
export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { tone: BadgeTone; label: string }> = {
    active: { tone: "success", label: "Active" },
    healthy: { tone: "success", label: "Healthy" },
    completed: { tone: "success", label: "Completed" },
    inactive: { tone: "neutral", label: "Inactive" },
    suspended: { tone: "danger", label: "Suspended" },
    pending: { tone: "warning", label: "Pending" },
    scheduled: { tone: "brand", label: "Scheduled" },
    draft: { tone: "neutral", label: "Draft" },
    expired: { tone: "neutral", label: "Expired" },
    refunded: { tone: "warning", label: "Refunded" },
    voided: { tone: "danger", label: "Voided" },
    low: { tone: "warning", label: "Low Stock" },
    "low-stock": { tone: "warning", label: "Low Stock" },
    "out-of-stock": { tone: "danger", label: "Out of Stock" },
  };
  const entry = map[status] ?? { tone: "neutral" as BadgeTone, label: status };
  return (
    <Badge tone={entry.tone} dot>
      {entry.label}
    </Badge>
  );
}
