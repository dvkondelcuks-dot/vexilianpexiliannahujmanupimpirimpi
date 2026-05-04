"use client";

import { Box, Stack, Typography } from "@mui/material";
import anime from "animejs";
import { processSteps } from "@/data/process";
import { useAnimeInView } from "@/hooks/useAnimeInView";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { AreaGradient, Bar, CHART, HGrid, XAxis, YAxis, barLayout, plotPoints, smoothPath } from "./chartPrimitives";

// 5-step engagement timeline. Top rail = a single SVG sparkline that grows
// fitness as you move along the stations. Per-station mini-chart is a
// Recharts-styled object showing the artefact produced at that step.

export function BuildMovementRail() {
  const ref = useAnimeInView<HTMLDivElement>((node) => {
    anime({ targets: node.querySelectorAll(".proc-station"), opacity: [0, 1], translateY: [12, 0], delay: anime.stagger(110), duration: 600, easing: "easeOutQuad" });

    const rail = node.querySelector<SVGPathElement>(".proc-rail-line");
    if (rail) {
      const len = rail.getTotalLength();
      rail.style.strokeDasharray = `${len}`;
      rail.style.strokeDashoffset = `${len}`;
      anime({ targets: rail, strokeDashoffset: 0, duration: 2200, easing: "easeInOutSine" });
      const motion = anime.path(rail);
      anime({ targets: node.querySelector(".proc-pulse"), translateX: motion("x"), translateY: motion("y"), opacity: [0, 1, 1, 0], duration: 4400, loop: true, easing: "easeInOutSine" });
    }

    const bars = node.querySelectorAll<SVGRectElement>(".proc-mini-bar");
    anime.set(bars, { transformOrigin: "center bottom" });
    anime({ targets: bars, scaleY: [0, 1], delay: anime.stagger(40, { start: 380 }), duration: 600, easing: "easeOutCubic" });

    const lines = node.querySelectorAll<SVGPathElement>(".proc-mini-line");
    lines.forEach((p) => { const len = p.getTotalLength(); p.style.strokeDasharray = `${len}`; p.style.strokeDashoffset = `${len}`; });
    anime({ targets: lines, strokeDashoffset: 0, delay: anime.stagger(120, { start: 420 }), duration: 1100, easing: "easeInOutSine" });
  });

  return (
    <Box ref={ref} sx={{ overflowX: { xs: "visible", lg: "auto" }, pb: 1 }}>
      <Box sx={{ minWidth: { xs: "100%", lg: 1060 }, position: "relative", pt: { xs: 0, lg: 7 } }}>
        {/* Recharts-style top rail: faint grid + lime line spanning all stations */}
        <Box sx={{ display: { xs: "none", lg: "block" } }}>
          <svg viewBox="0 0 1060 90" aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 90 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <line key={i} x1={20} x2={1040} y1={20 + i * 16} y2={20 + i * 16} stroke={CHART.grid} />
          ))}
          {/* fitness curve climbs from low to high across the rail */}
          <path className="proc-rail-line" d="M90 70 C260 64 320 56 466 48 C612 40 700 32 870 22" fill="none" stroke={CHART.lime} strokeWidth={1.8} />
          {[90, 290, 466, 666, 870].map((cx) => <circle key={cx} cx={cx} cy={70 - ((cx - 90) / 780) * 48} r={3} fill={CHART.lime} />)}
          <circle className="proc-pulse" r={5} fill={CHART.lime} opacity={0} />
          <text x={20} y={84} fontSize="9" fontFamily="var(--mono)" fill={CHART.axis}>SYSTEM FITNESS</text>
          <text x={1040} y={84} textAnchor="end" fontSize="9" fontFamily="var(--mono)" fill={CHART.axis}>+ over 5 stations</text>
        </svg>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(5, 1fr)" }, gap: 1.5 }}>
          {processSteps.map((step, index) => (
            <Box key={step.number} className="proc-station industrial-card" sx={{ opacity: 0, border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "rgba(16,20,25,0.82)", p: 2 }}>
              <Stack spacing={1.3}>
                <MetaLabel>{step.number} · {step.title}</MetaLabel>
                <ProcessChart index={index} />
                <Typography sx={{ color: "var(--text-2)", fontSize: 14, lineHeight: 1.55 }}>{step.text}</Typography>
                <Box>
                  <MetaLabel>Rezultāts</MetaLabel>
                  <Typography sx={{ color: "var(--signal-green)", fontFamily: "var(--mono)", fontSize: 12, mt: 0.5 }}>{step.result}</Typography>
                </Box>
              </Stack>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

const PCB = { x: 22, y: 24, w: 138, h: 64 };

function ProcessChart({ index }: { index: number }) {
  const data = STEP_DATA[index];
  return (
    <svg viewBox="0 0 170 110" role="img" aria-label="Step output telemetry" style={{ width: "100%", height: 110 }}>
      <rect x={4} y={4} width={162} height={102} rx={6} fill={CHART.bg} stroke={CHART.border} />
      <text x={10} y={16} fontSize="8.5" fontFamily="var(--mono)" fill={CHART.lime}>{data.title}</text>
      <HGrid x={PCB.x} y={PCB.y} w={PCB.w} h={PCB.h} ticks={3} />
      {data.kind === "bar" ? (
        barLayout(data.points, PCB, data.max, 0.55).map((b, i) => <Bar key={i} {...b} tone={data.tones?.[i] ?? "lime"} opacity={0.9} />)
      ) : (
        (() => {
          const pts = plotPoints(data.points, PCB, data.max);
          const area = `${smoothPath(pts)} L${PCB.x + PCB.w} ${PCB.y + PCB.h} L${PCB.x} ${PCB.y + PCB.h} Z`;
          return (
            <>
              <defs>
                <AreaGradient id={`proc-grad-${index}`} tone={data.tone ?? "lime"} />
              </defs>
              <path d={area} fill={`url(#proc-grad-${index})`} opacity={0.7} />
              <path className="proc-mini-line" d={smoothPath(pts)} stroke={data.tone === "amber" ? CHART.amber : data.tone === "green" ? CHART.green : CHART.lime} strokeWidth={1.7} fill="none" />
              {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={1.7} fill={data.tone === "amber" ? CHART.amber : data.tone === "green" ? CHART.green : CHART.lime} />)}
            </>
          );
        })()
      )}
      <XAxis x={PCB.x} y={PCB.y + PCB.h + 12} w={PCB.w} labels={data.points.map((p) => p.label)} />
    </svg>
  );
}

type StepData =
  | { kind: "line"; title: string; max: number; tone: "lime" | "amber" | "green"; points: { label: string; value: number }[] }
  | { kind: "bar"; title: string; max: number; tones?: Array<"lime" | "amber" | "green">; points: { label: string; value: number }[] };

const STEP_DATA: StepData[] = [
  // 01 — Audits: noisy line that ends with a clean readout
  { kind: "line", title: "RAW SIGNAL · WK1", tone: "amber", max: 100, points: [
    { label: "M", value: 38 }, { label: "T", value: 72 }, { label: "W", value: 24 },
    { label: "T", value: 86 }, { label: "F", value: 18 }, { label: "S", value: 64 }
  ] },
  // 02 — Arhitektūra: blueprint blocks (bars at consistent heights)
  { kind: "bar", title: "BLUEPRINT MODULES", max: 100, points: [
    { label: "WEB", value: 70 }, { label: "FORM", value: 80 },
    { label: "CRM", value: 90 }, { label: "ATTR", value: 75 }, { label: "DASH", value: 85 }
  ] },
  // 03 — Uzstādīšana: connected — rising curve toward green
  { kind: "line", title: "INTEGRATION READY", tone: "green", max: 100, points: [
    { label: "D1", value: 12 }, { label: "D5", value: 32 }, { label: "D10", value: 56 },
    { label: "D15", value: 78 }, { label: "D20", value: 92 }
  ] },
  // 04 — Nodošana: training pulses + dashboard
  { kind: "bar", title: "OWNER COVERAGE", max: 100, tones: ["lime", "lime", "lime", "green", "green"], points: [
    { label: "OPS", value: 55 }, { label: "SALES", value: 70 }, { label: "MGMT", value: 85 },
    { label: "DOCS", value: 95 }, { label: "REPORT", value: 90 }
  ] },
  // 05 — Optimizācija: closed loop, monthly improvement
  { kind: "line", title: "MONTHLY GAIN · %", tone: "green", max: 50, points: [
    { label: "M1", value: 8 }, { label: "M2", value: 14 }, { label: "M3", value: 20 },
    { label: "M4", value: 28 }, { label: "M5", value: 38 }, { label: "M6", value: 46 }
  ] }
];
