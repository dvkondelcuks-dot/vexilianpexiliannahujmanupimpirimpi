"use client";

import { Box } from "@mui/material";
import anime from "animejs";
import { useAnimeInView } from "@/hooks/useAnimeInView";
import { AreaGradient, Bar, CHART, HGrid, LegendChip, XAxis, YAxis, barLayout, plotPoints, smoothPath } from "./chartPrimitives";

// Each diagnosis card renders one of these "incident telemetry" mini-panels.
// They follow the same visual grammar as Recharts (axes + grid + lime / amber
// series) so the diagnosis row feels like a cockpit of forensic readouts
// rather than five different cartoons.

type IncidentVisual = "postClickUnknown" | "leadSilence" | "attributionGap" | "noRecovery" | "pageBlindness";

const VIEW_W = 520;
const VIEW_H = 172;
const CHART_BOX = { x: 36, y: 38, w: 460, h: 96 };

export function IncidentMiniDiagram({ visual }: { visual: IncidentVisual }) {
  const ref = useAnimeInView<HTMLDivElement>((node) => {
    anime({
      targets: node.querySelectorAll(".inc-fade"),
      opacity: [0, 1],
      translateY: [6, 0],
      delay: anime.stagger(28),
      duration: 480,
      easing: "easeOutQuad"
    });

    const bars = node.querySelectorAll<SVGRectElement>(".inc-bar");
    anime.set(bars, { transformOrigin: "center bottom" });
    anime({
      targets: bars,
      scaleY: [0, 1],
      delay: anime.stagger(48, { start: 220 }),
      duration: 560,
      easing: "easeOutCubic"
    });

    const lines = node.querySelectorAll<SVGPathElement>(".inc-line");
    lines.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });
    anime({
      targets: lines,
      strokeDashoffset: 0,
      delay: anime.stagger(140, { start: 260 }),
      duration: 1100,
      easing: "easeInOutSine"
    });
  }, 0.6);

  const Visual = VISUALS[visual];

  return (
    <Box ref={ref} sx={{ width: "100%" }}>
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} aria-label={LABELS[visual]} role="img" style={{ width: "100%", height: VIEW_H }}>
        <rect x={6} y={6} width={VIEW_W - 12} height={VIEW_H - 12} rx={8} fill={CHART.bg} stroke={CHART.border} />
        <Visual />
      </svg>
    </Box>
  );
}

const LABELS: Record<IncidentVisual, string> = {
  postClickUnknown: "Post-klikšķa redzamības līkne uz lapas",
  leadSilence: "Lead atbildes laika sadalījums",
  attributionGap: "Avota izšķirtspējas matrica",
  noRecovery: "Atgūšanas mēģinājumu kavēkšanas profils",
  pageBlindness: "Sesiju notikumu blīvums lapā"
};

// ─── 01 · Post-click unknown ────────────────────────────────────────────────
// Visible signal collapses after page load: ad signal high, page signal mid,
// owner insight near zero. Stacked bar group + decay curve.
function PostClickUnknown() {
  const data = [
    { label: "AD",     value: 92, lost: 4 },
    { label: "CLICK",  value: 88, lost: 8 },
    { label: "LOAD",   value: 76, lost: 18 },
    { label: "VIEW",   value: 56, lost: 38 },
    { label: "SCROLL", value: 28, lost: 64 },
    { label: "CTA",    value: 12, lost: 80 },
    { label: "EXIT",   value: 4,  lost: 92 }
  ];
  const max = 100;
  const visiblePts = plotPoints(data.map((d) => ({ label: d.label, value: d.value })), CHART_BOX, max);
  return (
    <>
      <text x={20} y={22} className="svg-label inc-fade" fill={CHART.lime} fontSize="10" opacity={0}>POST-CLICK VISIBILITY · % retained</text>
      <LegendChip x={290} y={22} label="VISIBLE" tone="lime" />
      <LegendChip x={370} y={22} label="LOST" tone="amber" />
      <HGrid x={CHART_BOX.x} y={CHART_BOX.y} w={CHART_BOX.w} h={CHART_BOX.h} ticks={3} />
      <YAxis x={CHART_BOX.x - 6} y={CHART_BOX.y} h={CHART_BOX.h} max={max} ticks={3} />
      {barLayout(data.map((d) => ({ label: d.label, value: d.lost })), CHART_BOX, max, 0.5).map((b, i) => (
        <rect key={`l-${i}`} className="inc-bar" x={b.x} y={b.y} width={b.w} height={b.h} fill={CHART.amber} opacity={0.55} rx={1.5} />
      ))}
      <path className="inc-line" d={smoothPath(visiblePts)} stroke={CHART.lime} strokeWidth={2} fill="none" />
      {visiblePts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={2.4} fill={CHART.lime} className="inc-fade" opacity={0} />)}
      <XAxis x={CHART_BOX.x} y={CHART_BOX.y + CHART_BOX.h + 14} w={CHART_BOX.w} labels={data.map((d) => d.label)} />
      <text x={20} y={VIEW_H - 12} className="svg-label svg-label-muted inc-fade" fontSize="9" opacity={0}>OWNER INSIGHT · 4% — page consumes the click without reporting back</text>
    </>
  );
}

// ─── 02 · Lead silence — response-time histogram ────────────────────────────
function LeadSilence() {
  const data = [
    { label: "0-1m",   value: 32 },
    { label: "1-5m",   value: 14 },
    { label: "5-30m",  value: 9 },
    { label: "30m-2h", value: 6 },
    { label: "2-12h",  value: 4 },
    { label: "12-48h", value: 3 },
    { label: "48h+",   value: 0 }
  ];
  const max = 35;
  return (
    <>
      <text x={20} y={22} className="svg-label inc-fade" fill={CHART.lime} fontSize="10" opacity={0}>LEAD RESPONSE LATENCY · count</text>
      <LegendChip x={310} y={22} label="REPLIES" tone="lime" />
      <LegendChip x={400} y={22} label="SILENCE" tone="amber" />
      <HGrid x={CHART_BOX.x} y={CHART_BOX.y} w={CHART_BOX.w} h={CHART_BOX.h} ticks={3} />
      <YAxis x={CHART_BOX.x - 6} y={CHART_BOX.y} h={CHART_BOX.h} max={max} ticks={3} />
      {barLayout(data, CHART_BOX, max, 0.6).map((b, i) => (
        <Bar key={i} {...b} tone={i >= 4 ? "amber" : "lime"} opacity={i >= 4 ? 0.85 : 1} />
      ))}
      {/* SLA threshold */}
      <line x1={CHART_BOX.x + (CHART_BOX.w / data.length) * 2} x2={CHART_BOX.x + (CHART_BOX.w / data.length) * 2} y1={CHART_BOX.y} y2={CHART_BOX.y + CHART_BOX.h} stroke={CHART.amber} strokeDasharray="3 4" opacity={0.7} />
      <text x={CHART_BOX.x + (CHART_BOX.w / data.length) * 2 + 6} y={CHART_BOX.y + 14} className="svg-label" fill={CHART.amber} fontSize="9">SLA = 5m</text>
      <XAxis x={CHART_BOX.x} y={CHART_BOX.y + CHART_BOX.h + 14} w={CHART_BOX.w} labels={data.map((d) => d.label)} />
      <text x={20} y={VIEW_H - 12} className="svg-label svg-label-muted inc-fade" fontSize="9" opacity={0}>22 / 68 leads slipped past the SLA window — owner unassigned</text>
    </>
  );
}

// ─── 03 · Attribution gap — source resolution matrix ────────────────────────
function AttributionGap() {
  const channels = ["GOOGLE", "META", "ORG.", "DIRECT", "REF."] as const;
  const stages = ["UTM", "SESSION", "FORM", "CRM"] as const;
  // 1 = clean, 0.55 = partial, 0 = missing
  const matrix: number[][] = [
    [1.0, 0.7, 1.0, 0.4],
    [1.0, 0.6, 0.9, 0.3],
    [0.4, 0.3, 0.6, 0.2],
    [0.0, 0.0, 0.4, 0.1],
    [0.4, 0.2, 0.3, 0.0]
  ];
  const cellW = (CHART_BOX.w - 90) / channels.length;
  const cellH = CHART_BOX.h / stages.length;

  return (
    <>
      <text x={20} y={22} className="svg-label inc-fade" fill={CHART.lime} fontSize="10" opacity={0}>SOURCE RESOLUTION MATRIX · channel × stage</text>
      <LegendChip x={310} y={22} label="RESOLVED" tone="lime" />
      <LegendChip x={410} y={22} label="MISSING" tone="amber" />
      {/* stage labels (Y) */}
      {stages.map((s, i) => (
        <text key={s} x={CHART_BOX.x - 6} y={CHART_BOX.y + i * cellH + cellH / 2 + 3} textAnchor="end" className="svg-label" fill={CHART.axis} fontSize="9">{s}</text>
      ))}
      {/* matrix cells */}
      {matrix.map((row, ci) =>
        row.map((v, si) => {
          const x = CHART_BOX.x + ci * cellW + 4;
          const y = CHART_BOX.y + si * cellH + 4;
          const w = cellW - 8;
          const h = cellH - 8;
          const tone = v >= 0.85 ? CHART.lime : v >= 0.45 ? "rgba(182,255,59,0.45)" : v > 0 ? CHART.amber : "rgba(217,108,95,0.6)";
          const text = v >= 0.85 ? "OK" : v >= 0.45 ? "PARTIAL" : v > 0 ? "WEAK" : "MISS";
          return (
            <g key={`${ci}-${si}`} className="inc-fade" opacity={0}>
              <rect x={x} y={y} width={w} height={h} rx={3} fill="rgba(16,20,25,0.86)" stroke={tone} />
              <rect x={x + 2} y={y + 2} width={(w - 4) * Math.max(v, 0.08)} height={3} rx={1.5} fill={tone} />
              <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" className="svg-label" fill={tone} fontSize="9">{text}</text>
            </g>
          );
        })
      )}
      {/* X-axis labels under matrix */}
      <XAxis x={CHART_BOX.x} y={CHART_BOX.y + CHART_BOX.h + 14} w={CHART_BOX.w - 90} labels={channels} />
      <text x={20} y={VIEW_H - 12} className="svg-label svg-label-muted inc-fade" fontSize="9" opacity={0}>11 / 20 cells unresolved — UTM dropped at session boundary, CRM never receives source</text>
    </>
  );
}

// ─── 04 · No recovery — trigger gap timeline ────────────────────────────────
function NoRecovery() {
  // Days since silence vs. cumulative recoverable leads
  const data = [
    { label: "D0",  value: 24 },
    { label: "D1",  value: 41 },
    { label: "D2",  value: 56 },
    { label: "D3",  value: 67 },
    { label: "D5",  value: 78 },
    { label: "D7",  value: 86 },
    { label: "D14", value: 92 }
  ];
  const max = 100;
  const pts = plotPoints(data, CHART_BOX, max);
  const areaD = `${smoothPath(pts)} L${CHART_BOX.x + CHART_BOX.w} ${CHART_BOX.y + CHART_BOX.h} L${CHART_BOX.x} ${CHART_BOX.y + CHART_BOX.h} Z`;
  return (
    <>
      <defs>
        <AreaGradient id="inc-recover-grad" tone="amber" />
      </defs>
      <text x={20} y={22} className="svg-label inc-fade" fill={CHART.lime} fontSize="10" opacity={0}>RECOVERABLE LEADS LOST OVER TIME · cumulative %</text>
      <LegendChip x={290} y={22} label="UNRECOVERED" tone="amber" />
      <LegendChip x={420} y={22} label="TRIGGERS = 0" tone="red" />
      <HGrid x={CHART_BOX.x} y={CHART_BOX.y} w={CHART_BOX.w} h={CHART_BOX.h} ticks={4} />
      <YAxis x={CHART_BOX.x - 6} y={CHART_BOX.y} h={CHART_BOX.h} max={max} ticks={4} />
      <path className="inc-line" d={areaD} fill="url(#inc-recover-grad)" opacity={0.85} />
      <path className="inc-line" d={smoothPath(pts)} stroke={CHART.amber} strokeWidth={2} fill="none" />
      {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={2.5} fill={CHART.amber} className="inc-fade" opacity={0} />)}
      {/* Trigger markers (none fired) */}
      {pts.map((p, i) => (
        <g key={`t-${i}`} className="inc-fade" opacity={0}>
          <line x1={p.x} x2={p.x} y1={CHART_BOX.y + CHART_BOX.h} y2={CHART_BOX.y + CHART_BOX.h + 6} stroke={CHART.red} opacity={0.7} />
          <circle cx={p.x} cy={CHART_BOX.y + CHART_BOX.h + 9} r={1.6} fill={CHART.red} />
        </g>
      ))}
      <XAxis x={CHART_BOX.x} y={CHART_BOX.y + CHART_BOX.h + 24} w={CHART_BOX.w} labels={data.map((d) => d.label)} />
      <text x={20} y={VIEW_H - 12} className="svg-label svg-label-muted inc-fade" fontSize="9" opacity={0}>92% of silent leads stay silent — zero recovery triggers fired across 14 days</text>
    </>
  );
}

// ─── 05 · Page blindness — session events density ──────────────────────────
function PageBlindness() {
  const data = [
    { label: "00", value: 8 },
    { label: "10", value: 14 },
    { label: "20", value: 22 },
    { label: "30", value: 18 },
    { label: "40", value: 12 },
    { label: "50", value: 8 },
    { label: "60", value: 6 },
    { label: "70", value: 4 },
    { label: "80", value: 3 },
    { label: "90", value: 2 }
  ];
  const max = 25;
  const visiblePts = plotPoints(data, CHART_BOX, max);
  // "Blind" overlay: same data scaled to 0 — owner cannot see any of it
  return (
    <>
      <defs>
        <AreaGradient id="inc-page-grad" tone="lime" />
      </defs>
      <text x={20} y={22} className="svg-label inc-fade" fill={CHART.lime} fontSize="10" opacity={0}>SCROLL DEPTH DISTRIBUTION · session count by depth %</text>
      <LegendChip x={290} y={22} label="OBSERVED" tone="lime" />
      <LegendChip x={400} y={22} label="OWNER SEES" tone="muted" />
      <HGrid x={CHART_BOX.x} y={CHART_BOX.y} w={CHART_BOX.w} h={CHART_BOX.h} ticks={3} />
      <YAxis x={CHART_BOX.x - 6} y={CHART_BOX.y} h={CHART_BOX.h} max={max} ticks={3} />
      <path d={`${smoothPath(visiblePts)} L${CHART_BOX.x + CHART_BOX.w} ${CHART_BOX.y + CHART_BOX.h} L${CHART_BOX.x} ${CHART_BOX.y + CHART_BOX.h} Z`} fill="url(#inc-page-grad)" opacity={0.7} />
      <path className="inc-line" d={smoothPath(visiblePts)} stroke={CHART.lime} strokeWidth={2} fill="none" />
      {/* Owner-visibility line: flat along zero */}
      <line className="inc-line" x1={CHART_BOX.x} x2={CHART_BOX.x + CHART_BOX.w} y1={CHART_BOX.y + CHART_BOX.h - 2} y2={CHART_BOX.y + CHART_BOX.h - 2} stroke={CHART.muted} strokeDasharray="4 4" />
      {visiblePts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={2.2} fill={CHART.lime} className="inc-fade" opacity={0} />)}
      <XAxis x={CHART_BOX.x} y={CHART_BOX.y + CHART_BOX.h + 14} w={CHART_BOX.w} labels={data.map((d) => d.label)} />
      <text x={20} y={VIEW_H - 12} className="svg-label svg-label-muted inc-fade" fontSize="9" opacity={0}>97 sessions, 0 visible — scroll, exit and back-button events never reach the owner</text>
    </>
  );
}

const VISUALS: Record<IncidentVisual, () => JSX.Element> = {
  postClickUnknown: PostClickUnknown,
  leadSilence: LeadSilence,
  attributionGap: AttributionGap,
  noRecovery: NoRecovery,
  pageBlindness: PageBlindness
};
