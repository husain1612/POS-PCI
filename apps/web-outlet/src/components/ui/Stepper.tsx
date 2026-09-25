import { cn } from "@/lib/utils";
import { CheckIcon } from "@/components/icons";

export interface StepperStep {
  key: string;
  label: string;
  description?: string;
}

export function Stepper({ steps, activeIndex }: { steps: StepperStep[]; activeIndex: number }) {
  return (
    <ol className="flex w-full items-start">
      {steps.map((step, index) => {
        const state = index < activeIndex ? "done" : index === activeIndex ? "active" : "upcoming";
        const isLast = index === steps.length - 1;
        return (
          <li key={step.key} className="flex flex-1 items-start last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                  state === "done" && "border-brand-600 bg-brand-600 text-white",
                  state === "active" && "border-brand-600 bg-brand-50 text-brand-700",
                  state === "upcoming" && "border-border bg-surface-raised text-ink-faint"
                )}
              >
                {state === "done" ? <CheckIcon width={15} height={15} /> : index + 1}
              </div>
              <div className="mt-2 w-24 text-center">
                <p
                  className={cn(
                    "text-xs font-medium leading-tight",
                    state === "upcoming" ? "text-ink-faint" : "text-ink"
                  )}
                >
                  {step.label}
                </p>
              </div>
            </div>
            {!isLast && (
              <div
                className={cn(
                  "mt-4 h-px flex-1 mx-1.5 min-w-[16px]",
                  state === "done" ? "bg-brand-600" : "bg-border"
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
