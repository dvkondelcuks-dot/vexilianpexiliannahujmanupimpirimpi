"use client";

import { Box } from "@mui/material";
import anime from "animejs";
import { useAnimeInView } from "@/hooks/useAnimeInView";
import { CommercialTelemetryChart } from "./CommercialTelemetryChart";
import { AreaGradient, Bar, CHART, HGrid, KpiCell, LegendChip, Panel, SubPanel, XAxis, YAxis, barLayout, plotPoints, smoothPath, toneColor } from "./chartPrimitives";

// Full system cockpit — five Recharts-styled panels arranged like a control
// room. Each panel reflects one zone of the Vexilian doctrine:
//   ┌─────────────┬─────────────┬─────────────┐
//   │ acquisition │  six-layer  │ outputs     │
//   │ sources     │  processor  │ + visibility│
//   └─────────────┴─────────────┴─────────────┘
// Below the SVG sits the same row of real Recharts kept from the previous
// build so the language is continuous.

const VIEW_W = 1280;
const VIEW_H = 760;

const sourceData = [
  { label: "GOOGLE", value: 38 },
  { label: "META",   value: 29 },
  { label: "ORG.",   value: 17 },
  { label: "DIRECT", value: 9 },
  { label: "REF.",   value: 7 }
] as const;

const touchpointData = [
  { label: "PAGE",  value: 82 },
  { label: "FORM",  value: 64 },
  { label: "DM",    value: 48 },
  { label: "CALL",  value: 32 },
  { label: "MAIL",  value: 24 }
] as const;

const layerThroughput = [
  { label: "01·FORM",   value: 92 },
  { label: "02·FLOW",   value: 88 },
  { label: "03·CRM",    value: 95 },
  { label: "04·ATTR.",  value: 78 },
  { label: "05·RECOV.", value: 64 },
  { label: "06·VIEW",   value: 96 }
] as const;

const outputSeries = {
  labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"],
  booking:  [12, 15, 19, 24, 31, 38, 45, 52],
  purchase: [4,  6,  10, 14, 19, 24, 30, 36],
  report:   [1,  1,  1,  2,  2,  3,  3,  4]
};

const visibilityRows = [
  { label: "OPEN LEADS",      value: "37",     tone: "lime" as const },
  { label: "SOURCE QUALITY",  value: "82%",    tone: "lime" as const },
  { label: "RECOVERY STATUS", value: "12 trig.", tone: "green" as const },
  { label: "REVENUE SIGNAL",  value: "€8 240", tone: "green" as const },
  { label: "NEXT ACTION",     value: "5 owners", tone: "lime" as const }
] as const;

export function VexSystemDiagram() {
  const ref = useAnimeInView<HTMLDivElement>((node) => {
    anime({ targets: node.querySelectorAll(".vex-fade"), opacity: [0, 1], translateY: [10, 0], delay: anime.stagger(28), duration: 540, easing: "easeOutQuad" });

    const bars = node.querySelectorAll<SVGRectElement>(".vex-bar");
    anime.set(bars, { transformOrigin: "center bottom" });
    anime({ targets: bars, scaleY: [0, 1], delay: anime.stagger(40, { start: 240 }), duration: 660, easing: "easeOutCubic" });

    const lines = node.querySelectorAll<SVGPathElement>(".vex-line");
    lines.forEach((p) => { const len = p.getTotalLength(); p.style.strokeDasharray = `${len}`; p.style.strokeDashoffset = `${len}`; });
    anime({ targets: lines, strokeDashoffset: 0, delay: anime.stagger(160, { start: 320 }), duration: 1450, easing: "easeInOutSine" });

    const flow = node.querySelector<SVGPathElement>(".vex-flow");
    if (flow) {
      const motion = anime.path(flow);
      anime({ targets: node.querySelectorAll(".vex-pulse"), translateX: motion("x"), translateY: motion("y"), opacity: [0, 1, 1, 0], duration: 4200, loop: true, easing: "easeInOutSine", delay: anime.stagger(900) });
    }
  }, 0.5);

  // Panel boxes
  const ACQ = { x: 36, y: 80, w: 320, h: 280 };
  const TCH = { x: 36, y: 380, w: 320, h: 260 };
  const PROC = { x: 380, y: 80, w: 520, h: 560 };
  const OUT = { x: 924, y: 80, w: 320, h: 280 };
  const VIS = { x: 924, y: 380, w: 320, h: 260 };

  // Plot for output series
  const outBox = { x: OUT.x + 30, y: OUT.y + 70, w: OUT.w - 60, h: OUT.h - 130 };
  const outMax = 60;
  const bookPts = plotPoints(outputSeries.labels.map((l, i) => ({ label: l, value: outputSeries.booking[i] })), outBox, outMax);
  const purPts  = plotPoints(outputSeries.labels.map((l, i) => ({ label: l, value: outputSeries.purchase[i] })), outBox, outMax);
  const repPts  = plotPoints(outputSeries.labels.map((l, i) => ({ label: l, value: outputSeries.report[i] })), outBox, outMax);
  const bookArea = `${smoothPath(bookPts)} L${outBox.x + outBox.w} ${outBox.y + outBox.h} L${outBox.x} ${outBox.y + outBox.h} Z`;

  // Processor: vertical bars for each layer (rotated chart)
  const procBox = { x: PROC.x + 50, y: PROC.y + 80, w: PROC.w - 80, h: PROC.h - 140 };

  return (
    <Box ref={ref} sx={{ width: "100%", overflowX: { xs: "auto", lg: "visible" }, pb: { xs: 1, lg: 0 } }}>
      <Box className="diagram-panel" sx={{ width: { xs: 1100, lg: "min(1280px, 96%)" }, mx: { xs: 0, lg: "auto" }, p: { xs: 1, md: 1.5 } }}>
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label="Vexilian sistēmas kokpits ar piecām telemetrijas paneļām" style={{ width: "100%", height: "auto", display: "block" }}>
        <defs>
          <AreaGradient id="vex-out-grad" tone="lime" />
          <AreaGradient id="vex-pur-grad" tone="green" />
        </defs>

        {/* Header */}
        <g className="vex-fade" opacity={0}>
          <text x={36} y={32} fontSize="12" fontFamily="var(--mono)" fill={CHART.text}>VEX / SYSTEM-COCKPIT · v1.0</text>
          <text x={1244} y={32} textAnchor="end" fontSize="11" fontFamily="var(--mono)" fill={CHART.lime}>● LIVE · 06 LAYERS · 5 IN · 3 OUT</text>
          <line x1={36} x2={1244} y1={42} y2={42} stroke={CHART.gridStrong} />
          <text x={36} y={62} fontSize="9.5" fontFamily="var(--mono)" fill={CHART.axis}>WINDOW · 30D ROLLING  ·  REFRESH · 5min  ·  SAMPLE n=423</text>
        </g>

        {/* ── Panel 1: Acquisition sources (top-left) ─────────────────────── */}
        <Panel x={ACQ.x} y={ACQ.y} w={ACQ.w} h={ACQ.h} label="01 · ACQUISITION SOURCES" value="inflow / 14d" />
        <g>
          <text x={ACQ.x + 14} y={ACQ.y + 38} fontSize="9.5" fontFamily="var(--mono)" fill={CHART.axis}>channel contribution · % of inflow</text>
          <HGrid x={ACQ.x + 30} y={ACQ.y + 60} w={ACQ.w - 60} h={ACQ.h - 130} ticks={4} />
          <YAxis x={ACQ.x + 26} y={ACQ.y + 60} h={ACQ.h - 130} max={40} ticks={4} />
          {barLayout(sourceData as unknown as { label: string; value: number }[], { x: ACQ.x + 30, y: ACQ.y + 60, w: ACQ.w - 60, h: ACQ.h - 130 }, 40, 0.55).map((b, i) => (
            <Bar key={i} className="vex-bar" {...b} tone="lime" opacity={0.9} />
          ))}
          <XAxis x={ACQ.x + 30} y={ACQ.y + ACQ.h - 50} w={ACQ.w - 60} labels={sourceData.map((d) => d.label)} />
          {/* footer KPIs */}
          <KpiCell x={ACQ.x + 14} y={ACQ.y + ACQ.h - 36} w={140} h={28} label="TOTAL IN" value="423 leads" tone="lime" />
          <KpiCell x={ACQ.x + 162} y={ACQ.y + ACQ.h - 36} w={140} h={28} label="QUALIFIED" value="68%" tone="green" />
        </g>

        {/* ── Panel 2: Contact points (bottom-left) ──────────────────────── */}
        <Panel x={TCH.x} y={TCH.y} w={TCH.w} h={TCH.h} label="02 · CONTACT POINTS" value="touch volume" />
        <g>
          <text x={TCH.x + 14} y={TCH.y + 38} fontSize="9.5" fontFamily="var(--mono)" fill={CHART.axis}>first owned action · count</text>
          <HGrid x={TCH.x + 30} y={TCH.y + 60} w={TCH.w - 60} h={TCH.h - 110} ticks={4} />
          <YAxis x={TCH.x + 26} y={TCH.y + 60} h={TCH.h - 110} max={100} ticks={4} />
          {barLayout(touchpointData as unknown as { label: string; value: number }[], { x: TCH.x + 30, y: TCH.y + 60, w: TCH.w - 60, h: TCH.h - 110 }, 100, 0.55).map((b, i) => (
            <Bar key={i} className="vex-bar" {...b} tone="lime" opacity={0.85} />
          ))}
          <XAxis x={TCH.x + 30} y={TCH.y + TCH.h - 30} w={TCH.w - 60} labels={touchpointData.map((d) => d.label)} />
        </g>

        {/* ── Panel 3: Six-layer processor (center, large) ──────────────── */}
        <Panel x={PROC.x} y={PROC.y} w={PROC.w} h={PROC.h} label="03 · SIX-LAYER COMMERCIAL PROCESSOR" value="health %" />
        <g>
          <text x={PROC.x + 14} y={PROC.y + 38} fontSize="9.5" fontFamily="var(--mono)" fill={CHART.axis}>per-layer throughput · % of nominal capacity</text>
          <LegendChip x={PROC.x + 320} y={PROC.y + 38} label="HEALTHY" tone="lime" />
          <LegendChip x={PROC.x + 410} y={PROC.y + 38} label="CALIBRATING" tone="amber" />
          <HGrid x={procBox.x} y={procBox.y} w={procBox.w} h={procBox.h} ticks={5} />
          <YAxis x={procBox.x - 6} y={procBox.y} h={procBox.h} max={100} ticks={5} />
          {barLayout(layerThroughput as unknown as { label: string; value: number }[], procBox, 100, 0.5).map((b, i) => (
            <Bar key={i} className="vex-bar" {...b} tone={layerThroughput[i].value < 80 ? "amber" : "lime"} opacity={0.92} />
          ))}
          {/* nominal line */}
          <line x1={procBox.x} x2={procBox.x + procBox.w} y1={procBox.y + procBox.h * 0.15} y2={procBox.y + procBox.h * 0.15} stroke={CHART.green} strokeOpacity={0.5} strokeDasharray="3 5" />
          <text x={procBox.x + procBox.w + 6} y={procBox.y + procBox.h * 0.15 + 4} fontSize="9" fontFamily="var(--mono)" fill={CHART.green}>85·target</text>
          <XAxis x={procBox.x} y={procBox.y + procBox.h + 16} w={procBox.w} labels={layerThroughput.map((l) => l.label)} />

          {/* normalized signal block at bottom */}
          <g className="vex-fade" opacity={0}>
            <rect x={PROC.x + 20} y={PROC.y + PROC.h - 60} width={PROC.w - 40} height={42} rx={6} fill="rgba(16,20,25,0.86)" stroke={CHART.border} />
            <text x={PROC.x + 36} y={PROC.y + PROC.h - 38} fontSize="10" fontFamily="var(--mono)" fill={CHART.lime}>NORMALIZED CLIENT SIGNAL</text>
            <text x={PROC.x + 36} y={PROC.y + PROC.h - 24} fontSize="9" fontFamily="var(--mono)" fill={CHART.axis}>all touchpoints become one record before any decision is made</text>
          </g>
        </g>

        {/* ── Panel 4: Outputs over time (top-right) ────────────────────── */}
        <Panel x={OUT.x} y={OUT.y} w={OUT.w} h={OUT.h} label="04 · OUTPUTS" value="weekly · 8w" />
        <g>
          <text x={OUT.x + 14} y={OUT.y + 38} fontSize="9.5" fontFamily="var(--mono)" fill={CHART.axis}>booking · purchase · report — count</text>
          <LegendChip x={OUT.x + 200} y={OUT.y + 38} label="BOOK" tone="lime" />
          <LegendChip x={OUT.x + 252} y={OUT.y + 38} label="PUR." tone="green" />
          <LegendChip x={OUT.x + 296} y={OUT.y + 38} label="REP." tone="muted" />
          <HGrid x={outBox.x} y={outBox.y} w={outBox.w} h={outBox.h} ticks={4} />
          <YAxis x={outBox.x - 6} y={outBox.y} h={outBox.h} max={outMax} ticks={4} />
          <path d={bookArea} fill="url(#vex-out-grad)" opacity={0.7} />
          <path className="vex-line" d={smoothPath(bookPts)} stroke={CHART.lime} strokeWidth={2} fill="none" />
          <path className="vex-line" d={smoothPath(purPts)} stroke={CHART.green} strokeWidth={1.8} fill="none" />
          <path className="vex-line" d={smoothPath(repPts)} stroke={CHART.muted} strokeWidth={1.4} strokeDasharray="3 4" fill="none" />
          <XAxis x={outBox.x} y={outBox.y + outBox.h + 16} w={outBox.w} labels={outputSeries.labels} />
        </g>

        {/* ── Panel 5: Owner visibility (bottom-right) ──────────────────── */}
        <Panel x={VIS.x} y={VIS.y} w={VIS.w} h={VIS.h} label="05 · OWNER VISIBILITY" value="live KPIs" />
        <g>
          {visibilityRows.map((row, i) => {
            const rowH = (VIS.h - 70) / visibilityRows.length;
            const ry = VIS.y + 50 + i * rowH;
            const barW = (parseInt(row.value, 10) || 60) / 100 * (VIS.w - 180);
            return (
              <g key={row.label}>
                <text x={VIS.x + 18} y={ry + 14} fontSize="10" fontFamily="var(--mono)" fill={CHART.axis}>{row.label}</text>
                <rect x={VIS.x + 130} y={ry + 6} width={VIS.w - 180} height={10} rx={2} fill="rgba(255,255,255,0.06)" />
                <rect className="vex-bar" x={VIS.x + 130} y={ry + 6} width={Math.max(40, barW)} height={10} rx={2} fill={toneColor(row.tone)} opacity={0.9} />
                <text x={VIS.x + VIS.w - 14} y={ry + 14} textAnchor="end" fontSize="11" fontFamily="var(--mono)" fill={toneColor(row.tone)}>{row.value}</text>
              </g>
            );
          })}
        </g>

        {/* ── Flow ribbons connecting panels (decorative dataflow) ──────── */}
        <g opacity={0.7}>
          <path className="vex-flow" d={`M${ACQ.x + ACQ.w} ${ACQ.y + ACQ.h / 2} C${PROC.x - 20} ${ACQ.y + ACQ.h / 2} ${PROC.x - 20} ${PROC.y + 100} ${PROC.x} ${PROC.y + 100}`} fill="none" stroke={CHART.lime} strokeOpacity={0.45} strokeWidth={1.4} />
          <path d={`M${TCH.x + TCH.w} ${TCH.y + TCH.h / 2} C${PROC.x - 20} ${TCH.y + TCH.h / 2} ${PROC.x - 20} ${PROC.y + 300} ${PROC.x} ${PROC.y + 300}`} fill="none" stroke={CHART.lime} strokeOpacity={0.4} strokeWidth={1.4} />
          <path d={`M${PROC.x + PROC.w} ${PROC.y + 200} C${OUT.x - 20} ${PROC.y + 200} ${OUT.x - 20} ${OUT.y + 100} ${OUT.x} ${OUT.y + 100}`} fill="none" stroke={CHART.green} strokeOpacity={0.5} strokeWidth={1.4} />
          <path d={`M${PROC.x + PROC.w} ${PROC.y + 380} C${VIS.x - 20} ${PROC.y + 380} ${VIS.x - 20} ${VIS.y + 130} ${VIS.x} ${VIS.y + 130}`} fill="none" stroke={CHART.green} strokeOpacity={0.5} strokeWidth={1.4} />
        </g>
        <circle className="vex-pulse" r={4} fill={CHART.lime} opacity={0} />
        <circle className="vex-pulse" r={4} fill={CHART.green} opacity={0} />

        {/* Legend strip footer */}
        <g className="vex-fade" opacity={0}>
          <text x={36} y={VIEW_H - 14} fontSize="9" fontFamily="var(--mono)" fill={CHART.axis}>— data flow   ─ ─ recovery circuit   ● live signal   ○ at-risk</text>
        </g>
      </svg>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 1.4, mt: 1.4, position: "relative", zIndex: 2 }}>
        <CommercialTelemetryChart mode="source" variant="bar" height={112} />
        <CommercialTelemetryChart mode="recovery" height={112} />
        <CommercialTelemetryChart mode="throughput" variant="line" height={112} />
      </Box>
      </Box>
    </Box>
  );
}
