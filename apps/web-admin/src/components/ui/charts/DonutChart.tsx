"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CHART_BG, CHART_VAR } from "./chart-colors";

export interface DonutSlice {
  label: string;
  value: number;
}

const SIZE = 168;
const STROKE = 22;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP_DEG = 2.5;

export function DonutChart({ data }: { data: DonutSlice[] }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const total = data.reduce((sum, d) => sum + d.value, 0);

  let cumulativeDeg = -90;
  const segments = data.map((d, i) => {
    const fraction = total > 0 ? d.value / total : 0;
    const sweep = fraction * 360;
    const startDeg = cumulativeDeg;
    cumulativeDeg += sweep;
    const dash = Math.max(0, (sweep - GAP_DEG) / 360) * CIRCUMFERENCE;
    const gap = CIRCUMFERENCE - dash;
    return { ...d, i, fraction, startDeg, dash, gap };
  });

  const hovered = hoverIndex !== null ? segments[hoverIndex] : null;

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
      <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" stroke="hsl(var(--border))" strokeWidth={STROKE} />
          {segments.map((s) => (
            <circle
              key={s.label}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke={CHART_VAR[s.i % CHART_VAR.length]}
              strokeWidth={hoverIndex === s.i ? STROKE + 2 : STROKE}
              strokeDasharray={`${s.dash} ${s.gap}`}
              strokeLinecap="round"
              transform={`rotate(${s.startDeg} ${SIZE / 2} ${SIZE / 2})`}
              onPointerEnter={() => setHoverIndex(s.i)}
              onPointerLeave={() => setHoverIndex(null)}
              className="cursor-pointer transition-[stroke-width]"
              style={{ transformOrigin: "center" }}
            />
          ))}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-semibold tabular-nums text-ink-primary">
            {hovered ? `${Math.round(hovered.fraction * 100)}%` : "100%"}
          </span>
          <span className="max-w-[80px] truncate text-[11px] text-ink-muted">{hovered ? hovered.label : "Total"}</span>
        </div>
      </div>

      <div className="w-full space-y-2">
        {segments.map((s) => (
          <div
            key={s.label}
            onPointerEnter={() => setHoverIndex(s.i)}
            onPointerLeave={() => setHoverIndex(null)}
            className={cn(
              "flex items-center justify-between rounded-md px-2 py-1.5 text-[13px] transition-colors",
              hoverIndex === s.i ? "bg-surface-raised" : ""
            )}
          >
            <span className="flex items-center gap-2 text-ink-secondary">
              <span className={cn("h-2 w-2 rounded-full", CHART_BG[s.i % CHART_BG.length])} />
              {s.label}
            </span>
            <span className="font-medium text-ink-primary tabular-nums">{Math.round(s.fraction * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
