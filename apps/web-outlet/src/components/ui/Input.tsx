import { forwardRef } from "react";
import type { InputHTMLAttributes, LabelHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-9 w-full rounded-[10px] border border-border bg-surface-raised px-3 text-sm text-ink placeholder:text-ink-faint",
        "focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "h-9 w-full rounded-[10px] border border-border bg-surface-raised px-3 text-sm text-ink",
        "focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed appearance-none",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = "Select";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-[10px] border border-border bg-surface-raised px-3 py-2 text-sm text-ink placeholder:text-ink-faint",
        "focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("mb-1.5 block text-xs font-medium text-ink-muted", className)} {...props} />;
}
