"use client";

import { Box } from "@mui/material";
import anime from "animejs";
import { useAnimeInView } from "@/hooks/useAnimeInView";
import { AreaGradient, Bar, CHART, HGrid, LegendChip, XAxis, YAxis, barLayout, plotPoints, smoothPath, toneColor } from "./chartPrimitives";

export type DoctrineDiagramMode = "position" | "model" | "boundary";

const VIEW_W = 560;
const VIEW_H = 230;
const BOX = { x: 44, y: 56, w: 480, h: 130 };

export function DoctrineDiagram({ mode }: { mode: DoctrineDiagramMode }) {
  const ref = useAnimeInView<HTMLDivElement>((node) => {
    anime({
      targets: node.querySelectorAll(".doc-fade"),
      opacity: [0, 1],
      translateY: [6, 0],
      delay: anime.stagger(28),
      duration: 520,
      easing: "easeOutQuad"
    });
    const bars = node.querySelectorAll<SVGRectElement>(".doc-bar");
    anime.set(bars, { transformOrigin: "center bottom" });
    anime({ targets: bars, scaleY: [0, 1], delay: anime.stagger(60, { start: 240 }), duration: 660, easing: "easeOutCubic" });

    const lines = node.querySelectorAll<SVGPathElement>(".doc-line");
    lines.forEach((p) => { const len = p.getTotalLength(); p.style.strokeDasharray = `${len}`; p.style.strokeDashoffset = `${len}`; });
    anime({ targets: lines, strokeDashoffset: 0, delay: anime.stagger(180, { start: 280 }), duration: 1200, easing: "easeInOutSine" });
  }, 0.6);

  return (
    <Box ref={ref} className="diagram-panel" sx={{ height: { xs: 230, md: 238 }, p: 1 }}>
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="Vexilian pieejas datu vizualizācija" style={{ width: "100%", height: "100%" }}>
        <rect x={6} y={6} width={VIEW_W - 12} height={VIEW_H - 12} rx={8} fill={CHART.bg} stroke={CHART.border} />
        {mode === "position" ? <PositionChart /> : null}
        {mode === "model" ? <ModelChart /> : null}
        {mode === "boundary" ? <BoundaryChart /> : null}
      </svg>
    </Box>
  );
}

// ─── Position: one chain, six stages ───────────────────────────────────────
// "Mēs paši uzbūvējam un sasienam vienā ķēdē..." → show six stages of the
// commercial chain as bars whose value = "fitness" of that link, with the
// chain connector as a continuous line on top.
function PositionChart() {
  const data = [
    { label: "WEB",     value: 92 },
    { label: "FORM",    value: 88 },
    { label: "CRM",     value: 90 },
    { label: "ATTRIB.", value: 84 },
    { label: "RECOV.",  value: 82 },
    { label: "PANEL",   value: 95 }
  ];
  const max = 100;
  const pts = plotPoints(data, BOX, max);
  return (
    <>
      <text x={20} y={26} className="svg-label doc-fade" fill={CHART.lime} fontSize="10.5" opacity={0}>POSITION · ONE CONNECTED COMMERCIAL CHAIN</text>
      <LegendChip x={350} y={26} label="LINK FITNESS" tone="lime" />
      <LegendChip x={460} y={26} label="CHAIN" tone="green" />
      <HGrid x={BOX.x} y={BOX.y} w={BOX.w} h={BOX.h} ticks={4} />
      <YAxis x={BOX.x - 6} y={BOX.y} h={BOX.h} max={max} ticks={4} />
      {barLayout(data, BOX, max, 0.55).map((b, i) => (
        <Bar key={i} {...b} tone="lime" opacity={0.85} />
      ))}
      <path className="doc-line" d={smoothPath(pts)} stroke={CHART.green} strokeWidth={2} fill="none" />
      {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={2.6} fill={CHART.green} className="doc-fade" opacity={0} />)}
      <XAxis x={BOX.x} y={BOX.y + BOX.h + 16} w={BOX.w} labels={data.map((d) => d.label)} />
      <text x={20} y={VIEW_H - 12} className="svg-label svg-label-muted doc-fade" fontSize="9" opacity={0}>website · content · form · CRM · attribution · recovery · dashboard — measured as one</text>
    </>
  );
}

// ─── Model: build → handover → read → calibrate ────────────────────────────
// Stacked-area showing four phases over time: build effort decays, handover
// pulse, ongoing read + monthly calibrate cycle.
function ModelChart() {
  const labels = ["W0", "W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];
  const series = {
    build:    [85, 78, 64, 42, 22, 10, 6,  4,  3],
    handover: [0,  0,  0,  10, 30, 60, 32, 14, 10],
    read:     [0,  0,  0,  0,  10, 30, 55, 70, 78],
    calibrate:[0,  0,  0,  0,  0,  0,  18, 26, 32]
  };
  const max = 100;
  const buildPts = plotPoints(labels.map((l, i) => ({ label: l, value: series.build[i] })), BOX, max);
  const handPts  = plotPoints(labels.map((l, i) => ({ label: l, value: series.handover[i] })), BOX, max);
  const readPts  = plotPoints(labels.map((l, i) => ({ label: l, value: series.read[i] })), BOX, max);
  const calibPts = plotPoints(labels.map((l, i) => ({ label: l, value: series.calibrate[i] })), BOX, max);
  const buildArea = `${smoothPath(buildPts)} L${BOX.x + BOX.w} ${BOX.y + BOX.h} L${BOX.x} ${BOX.y + BOX.h} Z`;
  return (
    <>
      <defs>
        <AreaGradient id="doc-build-grad" tone="amber" />
        <AreaGradient id="doc-read-grad" tone="lime" />
      </defs>
      <text x={20} y={26} className="svg-label doc-fade" fill={CHART.lime} fontSize="10.5" opacity={0}>MODEL · BUILD → HANDOVER → READ → CALIBRATE</text>
      <LegendChip x={310} y={26} label="BUILD" tone="amber" />
      <LegendChip x={368} y={26} label="HANDOVER" tone="muted" />
      <LegendChip x={448} y={26} label="READ" tone="lime" />
      <LegendChip x={500} y={26} label="CALIB." tone="green" />
      <HGrid x={BOX.x} y={BOX.y} w={BOX.w} h={BOX.h} ticks={4} />
      <YAxis x={BOX.x - 6} y={BOX.y} h={BOX.h} max={max} ticks={4} />
      <path d={buildArea} fill="url(#doc-build-grad)" opacity={0.7} />
      <path className="doc-line" d={smoothPath(buildPts)} stroke={CHART.amber} strokeWidth={1.7} fill="none" />
      <path className="doc-line" d={smoothPath(handPts)} stroke={CHART.muted} strokeWidth={1.5} strokeDasharray="4 4" fill="none" />
      <path className="doc-line" d={smoothPath(readPts)} stroke={CHART.lime} strokeWidth={2} fill="none" />
      <path className="doc-line" d={smoothPath(calibPts)} stroke={CHART.green} strokeWidth={1.7} fill="none" />
      <XAxis x={BOX.x} y={BOX.y + BOX.h + 16} w={BOX.w} labels={labels} />
      <text x={20} y={VIEW_H - 12} className="svg-label svg-label-muted doc-fade" fontSize="9" opacity={0}>build effort decays · system passes to client · monthly read + calibrate becomes the rhythm</text>
    </>
  );
}

// ─── Boundary: gate diagram — diverging bar (blocked vs open) ──────────────
function BoundaryChart() {
  const left = [
    { label: "NO GOAL",      value: 32 },
    { label: "LOW FLOW",     value: 41 },
    { label: "NO OWNER",     value: 17 },
    { label: "TOOL-ONLY",    value: 22 }
  ];
  const right = [
    { label: "QUALIFIED REQS",  value: 64 },
    { label: "RECOVERY SET",    value: 58 },
    { label: "REVENUE VIEW",    value: 72 },
    { label: "OWNER ASSIGNED",  value: 80 }
  ];
  const max = 100;
  const center = VIEW_W / 2;
  const half = (BOX.w / 2) - 30;
  const rowH = BOX.h / left.length;

  return (
    <>
      <text x={20} y={26} className="svg-label doc-fade" fill={CHART.lime} fontSize="10.5" opacity={0}>BOUNDARY · BLOCKED ENGAGEMENTS  ⟷  OPEN BUILD SCOPE</text>
      <LegendChip x={340} y={26} label="BLOCKED" tone="red" />
      <LegendChip x={420} y={26} label="OPEN" tone="green" />
      <HGrid x={BOX.x} y={BOX.y} w={BOX.w} h={BOX.h} ticks={4} />
      {/* Center axis */}
      <line x1={center} x2={center} y1={BOX.y} y2={BOX.y + BOX.h} stroke={CHART.gridStrong} />
      {left.map((row, i) => {
        const y = BOX.y + i * rowH + rowH / 2 - 6;
        const w = (row.value / max) * half;
        return (
          <g key={`l-${i}`}>
            <rect className="doc-bar" x={center - w} y={y} width={w} height={12} rx={2} fill={CHART.red} opacity={0.85} />
            <text x={center - w - 6} y={y + 9} textAnchor="end" className="svg-label" fill={CHART.axisStrong} fontSize="9">{row.label}</text>
          </g>
        );
      })}
      {right.map((row, i) => {
        const y = BOX.y + i * rowH + rowH / 2 - 6;
        const w = (row.value / max) * half;
        return (
          <g key={`r-${i}`}>
            <rect className="doc-bar" x={center} y={y} width={w} height={12} rx={2} fill={CHART.green} opacity={0.9} />
            <text x={center + w + 6} y={y + 9} className="svg-label" fill={CHART.axisStrong} fontSize="9">{row.label}</text>
          </g>
        );
      })}
      <text x={20} y={VIEW_H - 12} className="svg-label svg-label-muted doc-fade" fontSize="9" opacity={0}>commercial objective required · we work where systems can be measured against revenue</text>
    </>
  );
}
