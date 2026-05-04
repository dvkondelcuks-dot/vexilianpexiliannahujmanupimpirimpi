import type { ReactNode } from "react";

// Shared design tokens — kept consistent with /styles/tokens.css and the
// Recharts look used in CommercialTelemetryChart.tsx so all hand-built SVG
// illustrations read as part of the same enterprise telemetry surface.
export const CHART = {
  bg: "rgba(7,9,11,0.78)",
  border: "rgba(182,255,59,0.14)",
  grid: "rgba(255,255,255,0.055)",
  gridStrong: "rgba(255,255,255,0.09)",
  axis: "#6D7782",
  axisStrong: "#A7B0BA",
  text: "#F4F7FA",
  lime: "#B6FF3B",
  green: "#8FD18A",
  amber: "#E6A84A",
  red: "#D96C5F",
  muted: "rgba(255,255,255,0.22)"
} as const;

export type ToneKey = "lime" | "green" | "amber" | "red" | "muted";

export function toneColor(tone: ToneKey): string {
  return tone === "green" ? CHART.green : tone === "amber" ? CHART.amber : tone === "red" ? CHART.red : tone === "muted" ? CHART.muted : CHART.lime;
}

/** Outer rounded panel mimicking the Recharts container in `CommercialTelemetryChart`. */
export function Panel({ x = 0, y = 0, w, h, children, label, value }: { x?: number; y?: number; w: number; h: number; children?: ReactNode; label?: string; value?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={CHART.bg} stroke={CHART.border} />
      {label ? <text x={x + 14} y={y + 18} className="svg-label" fill={CHART.lime}>{label}</text> : null}
      {value ? <text x={x + w - 14} y={y + 18} textAnchor="end" className="svg-label svg-label-muted">{value}</text> : null}
      {children}
    </g>
  );
}

/** Horizontal gridlines (Recharts CartesianGrid vertical=false). */
export function HGrid({ x, y, w, h, ticks = 4 }: { x: number; y: number; w: number; h: number; ticks?: number }) {
  const lines = [];
  for (let i = 0; i <= ticks; i += 1) {
    const yy = y + (h * i) / ticks;
    lines.push(<line key={i} x1={x} x2={x + w} y1={yy} y2={yy} stroke={CHART.grid} />);
  }
  return <g aria-hidden="true">{lines}</g>;
}

/** Numeric Y-axis ticks rendered like Recharts. */
export function YAxis({ x, y, h, max, ticks = 4 }: { x: number; y: number; h: number; max: number; ticks?: number }) {
  const items = [];
  for (let i = 0; i <= ticks; i += 1) {
    const yy = y + (h * i) / ticks;
    const value = Math.round(max - (max * i) / ticks);
    items.push(
      <text key={i} x={x} y={yy + 3} textAnchor="end" className="svg-label" fill={CHART.axis} fontSize="9">{value}</text>
    );
  }
  return <g>{items}</g>;
}

/** Categorical X-axis labels rendered like Recharts. */
export function XAxis({ y, w, x, labels }: { y: number; w: number; x: number; labels: readonly string[] }) {
  const step = w / labels.length;
  return (
    <g>
      {labels.map((label, i) => (
        <text key={`${label}-${i}`} x={x + step * i + step / 2} y={y} textAnchor="middle" className="svg-label" fill={CHART.axis} fontSize="9">
          {label}
        </text>
      ))}
    </g>
  );
}

/** A single rounded bar (top corners). */
export function Bar({ x, y, w, h, tone = "lime", opacity = 1, className }: { x: number; y: number; w: number; h: number; tone?: ToneKey; opacity?: number; className?: string }) {
  const r = Math.min(3, w / 2);
  if (h <= 0) return null;
  const path = `M${x} ${y + r} Q${x} ${y} ${x + r} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + h} H${x} Z`;
  return <path className={className} d={path} fill={toneColor(tone)} opacity={opacity} />;
}

/** Linear gradient definition for area fills, identical hue ramp to Recharts use. */
export function AreaGradient({ id, tone }: { id: string; tone: ToneKey }) {
  const color = toneColor(tone);
  return (
    <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stopColor={color} stopOpacity={0.32} />
      <stop offset="100%" stopColor={color} stopOpacity={0.02} />
    </linearGradient>
  );
}

export type SeriesPoint = { label: string; value: number };

/** Build a smooth catmull-rom-style path through points, returns the d attribute. */
export function smoothPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M${points[0].x} ${points[0].y}`;
  let d = `M${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

/** Map values to chart-space points. */
export function plotPoints(data: SeriesPoint[], box: { x: number; y: number; w: number; h: number }, max: number): { x: number; y: number }[] {
  const step = box.w / Math.max(1, data.length - 1);
  return data.map((d, i) => ({ x: box.x + step * i, y: box.y + box.h - (d.value / max) * box.h }));
}

/** Map categorical bar positions. */
export function barLayout(data: SeriesPoint[], box: { x: number; y: number; w: number; h: number }, max: number, ratio = 0.62): { x: number; y: number; w: number; h: number; value: number; label: string }[] {
  const slot = box.w / data.length;
  const w = slot * ratio;
  return data.map((d, i) => {
    const h = (d.value / max) * box.h;
    return { x: box.x + slot * i + (slot - w) / 2, y: box.y + box.h - h, w, h, value: d.value, label: d.label };
  });
}

/** Soft inner panel used to host secondary KPI strips. */
export function SubPanel({ x, y, w, h, children, label }: { x: number; y: number; w: number; h: number; children?: ReactNode; label?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={6} fill="rgba(16,20,25,0.84)" stroke="rgba(255,255,255,0.09)" />
      {label ? <text x={x + 10} y={y + 14} className="svg-label svg-label-muted" fontSize="9">{label}</text> : null}
      {children}
    </g>
  );
}

/** Compact KPI cell showing a label / value pair. */
export function KpiCell({ x, y, w, h, label, value, tone = "lime" }: { x: number; y: number; w: number; h: number; label: string; value: string; tone?: ToneKey }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={6} fill="rgba(16,20,25,0.84)" stroke={`rgba(255,255,255,0.09)`} />
      <text x={x + 10} y={y + 14} className="svg-label svg-label-muted" fontSize="9">{label}</text>
      <text x={x + 10} y={y + h - 10} className="svg-label" fill={toneColor(tone)} fontSize="13">{value}</text>
    </g>
  );
}

/** Tick marker on the axis (square dot). */
export function TickDot({ x, y, tone = "lime" }: { x: number; y: number; tone?: ToneKey }) {
  return <circle cx={x} cy={y} r={2.4} fill={toneColor(tone)} />;
}

/** A reusable legend chip pair (color swatch + label). */
export function LegendChip({ x, y, label, tone = "lime" }: { x: number; y: number; label: string; tone?: ToneKey }) {
  return (
    <g>
      <rect x={x} y={y - 6} width={9} height={9} rx={2} fill={toneColor(tone)} />
      <text x={x + 14} y={y + 2} className="svg-label" fill={CHART.axisStrong} fontSize="9.5">{label}</text>
    </g>
  );
}
