"use client";

import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type TelemetryMode = "leakage" | "source" | "recovery" | "throughput" | "case" | "audit";

type TelemetryPoint = {
  label: string;
  visible: number;
  lost?: number;
  recovered?: number;
  revenue?: number;
};

const chartData: Record<TelemetryMode, TelemetryPoint[]> = {
  leakage: [
    { label: "REKL.", visible: 91, lost: 4, recovered: 0 },
    { label: "LAPA", visible: 78, lost: 16, recovered: 0 },
    { label: "FORMA", visible: 52, lost: 31, recovered: 6 },
    { label: "CRM", visible: 36, lost: 44, recovered: 11 },
    { label: "SEKOŠANA", visible: 29, lost: 52, recovered: 19 },
    { label: "IZEJA", visible: 24, lost: 58, recovered: 27 }
  ],
  source: [
    { label: "GOOG", visible: 38, revenue: 24 },
    { label: "META", visible: 29, revenue: 18 },
    { label: "ORG", visible: 17, revenue: 13 },
    { label: "DIR", visible: 9, revenue: 8 },
    { label: "REF", visible: 7, revenue: 11 }
  ],
  recovery: [
    { label: "D0", visible: 34, recovered: 0, lost: 41 },
    { label: "D1", visible: 31, recovered: 5, lost: 36 },
    { label: "D3", visible: 28, recovered: 9, lost: 31 },
    { label: "D7", visible: 24, recovered: 14, lost: 26 },
    { label: "D14", visible: 19, recovered: 18, lost: 22 }
  ],
  throughput: [
    { label: "01", visible: 14, recovered: 1 },
    { label: "02", visible: 21, recovered: 3 },
    { label: "03", visible: 31, recovered: 7 },
    { label: "04", visible: 43, recovered: 12 },
    { label: "05", visible: 58, recovered: 17 },
    { label: "06", visible: 74, recovered: 23 }
  ],
  case: [
    { label: "W1", visible: 12, revenue: 4 },
    { label: "W2", visible: 16, revenue: 7 },
    { label: "W3", visible: 21, revenue: 13 },
    { label: "W4", visible: 26, revenue: 18 },
    { label: "W5", visible: 33, revenue: 25 }
  ],
  audit: [
    { label: "RAW", visible: 64, lost: 42 },
    { label: "MAP", visible: 76, lost: 31 },
    { label: "RISK", visible: 84, lost: 22 },
    { label: "SCOPE", visible: 91, lost: 14 }
  ]
};

const titles: Record<TelemetryMode, { eyebrow: string; title: string }> = {
  leakage: { eyebrow: "LIVE LOSS CURVE", title: "Where the signal decays" },
  source: { eyebrow: "SOURCE QUALITY", title: "Channel contribution" },
  recovery: { eyebrow: "RECOVERY LOOP", title: "Silence becomes recoverable" },
  throughput: { eyebrow: "LAYER VELOCITY", title: "Signal maturity" },
  case: { eyebrow: "CASE SIGNAL", title: "Proof fragments" },
  audit: { eyebrow: "AUDIT INPUT", title: "Broken flow structured" }
};

export function CommercialTelemetryChart({ mode, variant = "area", height = 152 }: { mode: TelemetryMode; variant?: "area" | "bar" | "line"; height?: number }) {
  const [armed, setArmed] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const data = chartData[mode];
  const title = titles[mode];

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => setArmed(true), reduced ? 0 : 260);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -22% 0px", threshold: 0.56 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <Box ref={rootRef} className="industrial-card" sx={{ border: "1px solid rgba(59,255,124,0.14)", borderRadius: "var(--radius)", background: "rgba(7,9,11,0.78)", p: 1.25, minHeight: height + 64 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: 0.75 }}>
        <MetaLabel sx={{ color: "var(--signal-blue)" }}>{title.eyebrow}</MetaLabel>
        <Typography sx={{ color: "var(--text-3)", fontFamily: "var(--mono)", fontSize: 10, textTransform: "uppercase" }}>{title.title}</Typography>
      </Stack>
      <Box sx={{ height }}>
        {armed ? (
          <ResponsiveContainer width="100%" height="100%">
            {variant === "bar" ? (
              <BarChart data={data} margin={{ top: 8, right: 6, bottom: 0, left: -24 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.055)" vertical={false} />
                <XAxis dataKey="label" tick={{ fill: "#6D7782", fontSize: 10, fontFamily: "var(--mono)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6D7782", fontSize: 10, fontFamily: "var(--mono)" }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "rgba(59,255,124,0.045)" }} contentStyle={{ background: "#101419", border: "1px solid rgba(59,255,124,0.2)", borderRadius: 6, color: "#F4F7FA", fontFamily: "var(--mono)", fontSize: 11 }} />
                <Bar dataKey="visible" fill="#3BFF7C" radius={[3, 3, 0, 0]} isAnimationActive={!reduced} animationDuration={900} />
                <Bar dataKey="revenue" fill="#8FD18A" radius={[3, 3, 0, 0]} isAnimationActive={!reduced} animationDuration={1100} />
              </BarChart>
            ) : variant === "line" ? (
              <LineChart data={data} margin={{ top: 8, right: 10, bottom: 0, left: -24 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.055)" vertical={false} />
                <XAxis dataKey="label" tick={{ fill: "#6D7782", fontSize: 10, fontFamily: "var(--mono)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6D7782", fontSize: 10, fontFamily: "var(--mono)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#101419", border: "1px solid rgba(59,255,124,0.2)", borderRadius: 6, color: "#F4F7FA", fontFamily: "var(--mono)", fontSize: 11 }} />
                <Line type="monotone" dataKey="visible" stroke="#3BFF7C" strokeWidth={2} dot={{ r: 2, fill: "#3BFF7C" }} isAnimationActive={!reduced} animationDuration={1000} />
                <Line type="monotone" dataKey="recovered" stroke="#8FD18A" strokeWidth={1.6} dot={{ r: 2, fill: "#8FD18A" }} isAnimationActive={!reduced} animationDuration={1200} />
              </LineChart>
            ) : (
              <AreaChart data={data} margin={{ top: 8, right: 10, bottom: 0, left: -24 }}>
                <defs>
                  <linearGradient id={`lime-area-${mode}`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3BFF7C" stopOpacity={0.32} />
                    <stop offset="100%" stopColor="#3BFF7C" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id={`amber-area-${mode}`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#E6A84A" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#E6A84A" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.055)" vertical={false} />
                <XAxis dataKey="label" tick={{ fill: "#6D7782", fontSize: 10, fontFamily: "var(--mono)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6D7782", fontSize: 10, fontFamily: "var(--mono)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#101419", border: "1px solid rgba(59,255,124,0.2)", borderRadius: 6, color: "#F4F7FA", fontFamily: "var(--mono)", fontSize: 11 }} />
                <Area type="monotone" dataKey="visible" stroke="#3BFF7C" fill={`url(#lime-area-${mode})`} strokeWidth={2} isAnimationActive={!reduced} animationDuration={1050} />
                <Area type="monotone" dataKey="lost" stroke="#E6A84A" fill={`url(#amber-area-${mode})`} strokeWidth={1.6} isAnimationActive={!reduced} animationDuration={1300} />
                <Area type="monotone" dataKey="recovered" stroke="#8FD18A" fill="rgba(143,209,138,0.08)" strokeWidth={1.6} isAnimationActive={!reduced} animationDuration={1450} />
              </AreaChart>
            )}
          </ResponsiveContainer>
        ) : (
          <Box sx={{ height: "100%", display: "grid", placeItems: "center", border: "1px dashed rgba(59,255,124,0.12)", borderRadius: "var(--radius)", color: "var(--text-3)", fontFamily: "var(--mono)", fontSize: 11, textTransform: "uppercase" }}>
            telemetry waiting for viewport
          </Box>
        )}
      </Box>
    </Box>
  );
}