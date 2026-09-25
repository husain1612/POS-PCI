import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "brand" | "success" | "warning" | "error" | "neutral" | "info";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
  dot?: boolean;
}

const variantClasses: Record<Variant, string> = {
  brand: "bg-brand-50 text-brand-700 dark:text-brand-300",
  success: "bg-success-50 text-success-600 dark:text-success-500",
  warning: "bg-warning-50 text-warning-600 dark:text-warning-500",
  error: "bg-error-50 text-error-600 dark:text-error-500",
  neutral: "bg-surface-subtle text-ink-muted border border-border",
  info: "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
};

const dotClasses: Record<Variant, string> = {
  brand: "bg-brand-500",
  success: "bg-success-500",
  warning: "bg-warning-500",
  error: "bg-error-500",
  neutral: "bg-ink-faint",
  info: "bg-sky-500",
};

export function Badge({ className, variant = "neutral", dot, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium leading-none",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", dotClasses[variant])} />}
      {children}
    </span>
  );
}
