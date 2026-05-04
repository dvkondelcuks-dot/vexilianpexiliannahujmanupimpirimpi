"use client";

import { Box, Stack, Typography } from "@mui/material";
import anime from "animejs";
import { collaborationPhases } from "@/data/phases";
import { useAnimeInView } from "@/hooks/useAnimeInView";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { SignalChip } from "@/components/ui/SignalChip";
import { AreaGradient, Bar, CHART, HGrid, LegendChip, XAxis, YAxis, barLayout, plotPoints, smoothPath } from "./chartPrimitives";

export function ScopeLockRail() {
  const ref = useAnimeInView<HTMLDivElement>((node) => {
    anime({ targets: node.querySelectorAll(".scope-module"), opacity: [0, 1], translateX: [16, 0], delay: anime.stagger(130), duration: 650, easing: "easeOutQuad" });
    anime({ targets: node.querySelectorAll(".acceptance"), scale: [0.75, 1], opacity: [0, 1], delay: anime.stagger(160, { start: 500 }), duration: 520, easing: "easeOutBack" });

    const bars = node.querySelectorAll<SVGRectElement>(".scope-bar");
    anime.set(bars, { transformOrigin: "center bottom" });
    anime({ targets: bars, scaleY: [0, 1], delay: anime.stagger(50, { start: 320 }), duration: 620, easing: "easeOutCubic" });

    const lines = node.querySelectorAll<SVGPathElement>(".scope-line");
    lines.forEach((p) => { const len = p.getTotalLength(); p.style.strokeDasharray = `${len}`; p.style.strokeDashoffset = `${len}`; });
    anime({ targets: lines, strokeDashoffset: 0, delay: anime.stagger(160, { start: 360 }), duration: 1300, easing: "easeInOutSine" });
  });

  return (
    <Box ref={ref} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "repeat(3, 1fr)" }, gap: 2 }}>
      {collaborationPhases.map((phase) => (
        <Box key={phase.number} className="scope-module industrial-card" sx={{ opacity: 0, border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "rgba(16,20,25,0.82)", p: 2.3 }}>
          <Stack spacing={1.6}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <MetaLabel>{phase.number} · {phase.title}</MetaLabel>
              <SignalChip tone="green" className="acceptance">{phase.acceptance}</SignalChip>
            </Stack>
            <Typography sx={{ color: "var(--text-2)", lineHeight: 1.6 }}>{phase.text}</Typography>
            <PhaseChart phaseNumber={phase.number} acceptance={phase.acceptance} />
            <Box>
              <MetaLabel>Result</MetaLabel>
              <Typography sx={{ color: "var(--text)", mt: 0.6 }}>{phase.output}</Typography>
            </Box>
          </Stack>
        </Box>
      ))}
    </Box>
  );
}

const VIEW_W = 420;
const VIEW_H = 210;
const BOX = { x: 44, y: 56, w: 348, h: 110 };

function PhaseChart({ phaseNumber, acceptance }: { phaseNumber: string; acceptance: string }) {
  return (
    <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label={`Faze ${phaseNumber} telemetrija`} style={{ width: "100%", height: 210 }}>
      <rect x={6} y={6} width={VIEW_W - 12} height={VIEW_H - 12} rx={8} fill={CHART.bg} stroke={CHART.border} />
      <text x={20} y={26} fontSize="10" fontFamily="var(--mono)" fill={CHART.lime}>PHASE {phaseNumber}</text>
      <text x={VIEW_W - 14} y={26} textAnchor="end" fontSize="9" fontFamily="var(--mono)" fill={CHART.axis}>{acceptance.toUpperCase()}</text>
      {phaseNumber === "01" ? <ArchitecturePhase /> : phaseNumber === "02" ? <InstallationPhase /> : <HandoverPhase />}
    </svg>
  );
}

// 01 — Arhitektūra: risk vs scope clarity. Two bar series rising/falling as the
// blueprint is locked. As clarity rises, risk drops.
function ArchitecturePhase() {
  const labels = ["D1", "D3", "D5", "D8", "D12", "D16"];
  const clarity = [22, 38, 56, 72, 86, 96];
  const risk    = [88, 72, 58, 42, 26, 12];
  const max = 100;
  const cPts = plotPoints(labels.map((l, i) => ({ label: l, value: clarity[i] })), BOX, max);
  const cArea = `${smoothPath(cPts)} L${BOX.x + BOX.w} ${BOX.y + BOX.h} L${BOX.x} ${BOX.y + BOX.h} Z`;
  return (
    <>
      <defs>
        <AreaGradient id="phase-clarity" tone="lime" />
      </defs>
      <text x={20} y={42} className="svg-label svg-label-muted" fontSize="9">SCOPE CLARITY ↑  ·  TECHNICAL RISK ↓</text>
      <LegendChip x={250} y={42} label="CLARITY" tone="lime" />
      <LegendChip x={326} y={42} label="RISK" tone="amber" />
      <HGrid x={BOX.x} y={BOX.y} w={BOX.w} h={BOX.h} ticks={4} />
      <YAxis x={BOX.x - 6} y={BOX.y} h={BOX.h} max={max} ticks={4} />
      <path d={cArea} fill="url(#phase-clarity)" opacity={0.8} />
      <path className="scope-line" d={smoothPath(cPts)} stroke={CHART.lime} strokeWidth={2} fill="none" />
      <path className="scope-line" d={smoothPath(plotPoints(labels.map((l, i) => ({ label: l, value: risk[i] })), BOX, max))} stroke={CHART.amber} strokeWidth={1.7} fill="none" strokeDasharray="4 4" />
      <XAxis x={BOX.x} y={BOX.y + BOX.h + 16} w={BOX.w} labels={labels} />
      <text x={20} y={VIEW_H - 14} className="svg-label svg-label-muted" fontSize="9">data model · CRM struct. · integrations · risk map → blueprint locked</text>
    </>
  );
}

// 02 — Uzstādīšana: 6 modules connected — bar chart of integration test pass rate
function InstallationPhase() {
  const data = [
    { label: "WEB",   value: 100 },
    { label: "FORM",  value: 100 },
    { label: "CRM",   value: 92 },
    { label: "ATTR.", value: 88 },
    { label: "RECOV", value: 96 },
    { label: "DASH",  value: 100 }
  ];
  const max = 100;
  return (
    <>
      <text x={20} y={42} className="svg-label svg-label-muted" fontSize="9">MODULE TEST PASS RATE · 6 connected systems</text>
      <LegendChip x={282} y={42} label="LIVE" tone="green" />
      <LegendChip x={344} y={42} label="GAP" tone="amber" />
      <HGrid x={BOX.x} y={BOX.y} w={BOX.w} h={BOX.h} ticks={4} />
      <YAxis x={BOX.x - 6} y={BOX.y} h={BOX.h} max={max} ticks={4} />
      {barLayout(data, BOX, max, 0.55).map((b, i) => <Bar key={i} {...b} tone={data[i].value >= 95 ? "green" : "lime"} opacity={0.9} />)}
      {/* gap markers at 100 line */}
      <line x1={BOX.x} x2={BOX.x + BOX.w} y1={BOX.y + 4} y2={BOX.y + 4} stroke={CHART.green} strokeOpacity={0.5} strokeDasharray="2 4" />
      <text x={BOX.x + BOX.w + 4} y={BOX.y + 6} fontSize="8" fontFamily="var(--mono)" fill={CHART.green}>100</text>
      <XAxis x={BOX.x} y={BOX.y + BOX.h + 16} w={BOX.w} labels={data.map((d) => d.label)} />
      <text x={20} y={VIEW_H - 14} className="svg-label svg-label-muted" fontSize="9">all six modules tested before workflow goes live · attribution layer = 88%, in calibration</text>
    </>
  );
}

// 03 — Nodošana + optimizācija: monthly cycle improvement
function HandoverPhase() {
  const labels = ["M1", "M2", "M3", "M4", "M5", "M6"];
  const usage  = [40, 56, 68, 78, 86, 94];
  const gain   = [4, 9, 16, 24, 33, 42];
  const max = 100;
  const uPts = plotPoints(labels.map((l, i) => ({ label: l, value: usage[i] })), BOX, max);
  const gPts = plotPoints(labels.map((l, i) => ({ label: l, value: gain[i] })), BOX, max);
  return (
    <>
      <text x={20} y={42} className="svg-label svg-label-muted" fontSize="9">TEAM USAGE  ·  CUMULATIVE GAIN — monthly</text>
      <LegendChip x={250} y={42} label="USAGE" tone="lime" />
      <LegendChip x={320} y={42} label="GAIN" tone="green" />
      <HGrid x={BOX.x} y={BOX.y} w={BOX.w} h={BOX.h} ticks={4} />
      <YAxis x={BOX.x - 6} y={BOX.y} h={BOX.h} max={max} ticks={4} />
      <path className="scope-line" d={smoothPath(uPts)} stroke={CHART.lime} strokeWidth={2} fill="none" />
      <path className="scope-line" d={smoothPath(gPts)} stroke={CHART.green} strokeWidth={2} fill="none" />
      {uPts.map((p, i) => <circle key={`u-${i}`} cx={p.x} cy={p.y} r={2.2} fill={CHART.lime} />)}
      {gPts.map((p, i) => <circle key={`g-${i}`} cx={p.x} cy={p.y} r={2.2} fill={CHART.green} />)}
      <XAxis x={BOX.x} y={BOX.y + BOX.h + 16} w={BOX.w} labels={labels} />
      <text x={20} y={VIEW_H - 14} className="svg-label svg-label-muted" fontSize="9">first report cycle starts the rhythm · system improves with use</text>
    </>
  );
}
