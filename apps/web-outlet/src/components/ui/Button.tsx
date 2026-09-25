import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 border border-transparent shadow-xs disabled:opacity-50",
  secondary:
    "bg-surface-raised text-ink border border-border hover:bg-surface-subtle shadow-xs disabled:opacity-50",
  outline:
    "bg-transparent text-ink border border-border hover:bg-surface-subtle disabled:opacity-50",
  ghost:
    "bg-transparent text-ink-muted border border-transparent hover:bg-surface-subtle hover:text-ink disabled:opacity-50",
  destructive:
    "bg-error-500 text-white border border-transparent hover:bg-error-600 shadow-xs disabled:opacity-50",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px] gap-1.5 rounded-[8px]",
  md: "h-9 px-4 text-sm gap-2 rounded-[10px]",
  lg: "h-11 px-5 text-sm gap-2 rounded-[10px]",
  icon: "h-9 w-9 rounded-[10px] shrink-0",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors duration-150 whitespace-nowrap select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          "disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
