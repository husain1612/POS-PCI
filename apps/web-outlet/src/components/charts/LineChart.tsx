"use client";

import { useId } from "react";

export interface LineChartPoint {
  label: string;
  value: number;
}

/** Lightweight inline SVG area/line chart — no external chart library dependency. */
export function LineChart({ data, height = 220 }: { data: LineChartPoint[]; height?: number }) {
  const gradientId = useId();
  const width = 100; // viewBox units — scales responsively via preserveAspectRatio
  const padY = 12;
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value), 0);
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1 || 1)) * width;
    const y = padY + (1 - (d.value - min) / range) * (100 - padY * 2);
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaPath = `${linePath} L${points[points.length - 1]?.x ?? 0},100 L0,100 Z`;

  return (
    <div style={{ height }} className="relative w-full">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--color-brand-500)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1="0"
            x2="100"
            y1={padY + f * (100 - padY * 2)}
            y2={padY + f * (100 - padY * 2)}
            stroke="var(--color-border-subtle)"
            strokeWidth="0.4"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <path d={areaPath} fill={`url(#${gradientId})`} stroke="none" />
        <path
          d={linePath}
          fill="none"
          stroke="var(--color-brand-500)"
          strokeWidth="1.6"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="1.4"
            fill="var(--color-surface-raised)"
            stroke="var(--color-brand-500)"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <div className="mt-2 flex justify-between text-[11px] text-ink-faint">
        {data.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}
