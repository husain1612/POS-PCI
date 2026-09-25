"use client";

import { useId, useMemo, useState } from "react";
import type { RevenuePoint } from "@/lib/types";
import { formatIDRCompact } from "@/lib/format";

const WIDTH = 640;
const HEIGHT = 220;
const PAD_LEFT = 8;
const PAD_RIGHT = 8;
const PAD_TOP = 16;
const PAD_BOTTOM = 28;

export function LineChart({ data }: { data: RevenuePoint[] }) {
  const gradientId = useId();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const { points, max, min } = useMemo(() => {
    const values = data.map((d) => d.value);
    const max = Math.max(...values);
    const min = Math.min(0, Math.min(...values));
    const innerWidth = WIDTH - PAD_LEFT - PAD_RIGHT;
    const innerHeight = HEIGHT - PAD_TOP - PAD_BOTTOM;
    const points = data.map((d, i) => {
      const x = PAD_LEFT + (data.length === 1 ? innerWidth / 2 : (i / (data.length - 1)) * innerWidth);
      const y = PAD_TOP + innerHeight - ((d.value - min) / (max - min || 1)) * innerHeight;
      return { x, y, ...d };
    });
    return { points, max, min };
  }, [data]);

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${HEIGHT - PAD_BOTTOM} L ${points[0].x.toFixed(1)} ${HEIGHT - PAD_BOTTOM} Z`;

  const gridTicks = 4;
  const hovered = hoverIndex !== null ? points[hoverIndex] : null;

  function handleMove(e: React.PointerEvent<SVGRectElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * WIDTH;
    let closest = 0;
    let closestDist = Infinity;
    points.forEach((p, i) => {
      const dist = Math.abs(p.x - relX);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setHoverIndex(closest);
  }

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" style={{ height: HEIGHT }} preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity="0.18" />
            <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* recessive gridlines */}
        {Array.from({ length: gridTicks + 1 }).map((_, i) => {
          const y = PAD_TOP + (i / gridTicks) * (HEIGHT - PAD_TOP - PAD_BOTTOM);
          const value = max - (i / gridTicks) * (max - min);
          return (
            <g key={i}>
              <line
                x1={PAD_LEFT}
                x2={WIDTH - PAD_RIGHT}
                y1={y}
                y2={y}
                stroke="hsl(var(--border))"
                strokeWidth={1}
              />
              <text x={0} y={y - 4} fontSize={10} fill="hsl(var(--ink-muted))">
                {formatIDRCompact(value)}
              </text>
            </g>
          );
        })}

        <path d={areaPath} fill={`url(#${gradientId})`} stroke="none" />
        <path
          d={linePath}
          fill="none"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {hovered && (
          <>
            <line
              x1={hovered.x}
              x2={hovered.x}
              y1={PAD_TOP}
              y2={HEIGHT - PAD_BOTTOM}
              stroke="hsl(var(--border-strong))"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <circle cx={hovered.x} cy={hovered.y} r={4} fill="hsl(var(--surface))" stroke="hsl(var(--chart-1))" strokeWidth={2} />
          </>
        )}

        {/* selective x labels: first, middle, last */}
        {[0, Math.floor((points.length - 1) / 2), points.length - 1].map((i) => (
          <text
            key={i}
            x={points[i].x}
            y={HEIGHT - 8}
            fontSize={10}
            fill="hsl(var(--ink-muted))"
            textAnchor={i === 0 ? "start" : i === points.length - 1 ? "end" : "middle"}
          >
            {points[i].label}
          </text>
        ))}

        <rect
          x={0}
          y={0}
          width={WIDTH}
          height={HEIGHT}
          fill="transparent"
          onPointerMove={handleMove}
          onPointerLeave={() => setHoverIndex(null)}
        />
      </svg>

      {hovered && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-md border border-border bg-surface-raised px-2.5 py-1.5 text-xs shadow-md"
          style={{
            left: `${(hovered.x / WIDTH) * 100}%`,
            top: `${(hovered.y / HEIGHT) * 100 - 4}%`,
          }}
        >
          <div className="font-medium text-ink-primary tabular-nums">{formatIDRCompact(hovered.value)}</div>
          <div className="text-ink-muted">{hovered.label}</div>
        </div>
      )}
    </div>
  );
}
