"use client";

import { Box } from "@mui/material";
import anime from "animejs";
import { useAnimeInView } from "@/hooks/useAnimeInView";
import { CommercialTelemetryChart } from "./CommercialTelemetryChart";
import { AreaGradient, CHART, HGrid, KpiCell, LegendChip, Panel, SubPanel, XAxis, YAxis, barLayout, plotPoints, smoothPath, toneColor } from "./chartPrimitives";

// ─── Hero "Client disappearance" panel ──────────────────────────────────────
// A hand-built SVG cockpit that mirrors Recharts conventions: dark panel,
// faint horizontal grid, mono axis ticks, lime primary series with amber loss
// counter-series. Below the SVG sits the actual Recharts component pair —
// keeping the visual language continuous from custom SVG into real charts.

const funnelStages = [
  { label: "REKL.",  visible: 100, lost: 0,  recovered: 0 },
  { label: "LAPA",   visible: 78,  lost: 22, recovered: 0 },
  { label: "FORMA",  visible: 52,  lost: 48, recovered: 0 },
  { label: "CRM",    visible: 36,  lost: 56, recovered: 8 },
  { label: "SEKOŠANA", visible: 24,  lost: 60, recovered: 16 },
  { label: "IZEJA",  visible: 18,  lost: 60, recovered: 22 }
] as const;

const sourceLoss = [
  { label: "GOOGLE ADS", inflow: 38, lost: 22 },
  { label: "META · IG",  inflow: 29, lost: 19 },
  { label: "ORGĀNISKAIS",    inflow: 17, lost: 9 },
  { label: "TIEŠAIS",     inflow: 9,  lost: 4 },
  { label: "REKOMEND.",   inflow: 7,  lost: 3 }
] as const;

const visibilityLog = [
  { label: "ĪPAŠNIEKS", value: "nav noteikts", tone: "amber" as const },
  { label: "SLA",       value: "nav",          tone: "amber" as const },
  { label: "ATGŪŠANA",  value: "0 trig.",     tone: "amber" as const },
  { label: "ATRIBŪC.",  value: "daļuēja",      tone: "amber" as const },
  { label: "ATSKAITE",  value: "nedj. · stat.", tone: "amber" as const }
] as const;

const FUNNEL_BOX = { x: 78, y: 84, w: 540, h: 220 };
const SOURCE_BOX = { x: 660, y: 84, w: 220, h: 220 };
const MAX_FUNNEL = 100;
const MAX_SOURCE = 40;

const zoneHeaders = [
  { code: "01", label: "PIESAISTE", sub: "kur klienti ienāk", x: 38, w: 168 },
  { code: "02", label: "KONTAKTS", sub: "pirmā atbildība", x: 238, w: 178 },
  { code: "03", label: "NESTRUKTURĒTĀ OPERĀCIJA", sub: "kur īpašniecība lūzt", x: 456, w: 206 },
  { code: "04", label: "REZULTĀTU ŽURNĀLS", sub: "kādus rezultātus redz", x: 708, w: 154 }
] as const;

const sources = [
  { label: "GOOGLE ADS", x: 58, y: 122, value: "38 ien." },
  { label: "META · IG", x: 58, y: 202, value: "29 ien." },
  { label: "ORGĀNISKAIS", x: 58, y: 282, value: "17 ien." },
  { label: "TIEŠAIS", x: 58, y: 362, value: "09 ien." },
  { label: "REKOMEND.", x: 58, y: 442, value: "07 ien." }
] as const;

const touchpoints = [
  { label: "GALVENĀ LAPA", x: 254, y: 104, value: "cta 12%" },
  { label: "FORMA", x: 266, y: 188, value: "iesn. 6%" },
  { label: "INSTAGRAM DM", x: 248, y: 272, value: "dm 14" },
  { label: "ZVANS", x: 278, y: 356, value: "zvani 8" },
  { label: "E-PASTS", x: 272, y: 440, value: "vēst. 5" }
] as const;

const chaos = [
  { label: "EXCEL", x: 470, y: 94, value: "īpašn. ?", tone: "chaos" as const },
  { label: "WHATSAPP", x: 496, y: 178, value: "sašķelts", tone: "chaos" as const },
  { label: "ATMIŅA", x: 452, y: 266, value: "nav saglab.", tone: "lost" as const },
  { label: "BEZ ĪPAŠN.", x: 500, y: 350, value: "nav īpašn.", tone: "lost" as const },
  { label: "NAV SEKOŠANAS", x: 464, y: 432, value: "sla nav", tone: "lost" as const }
] as const;

const outcomes = [
  { label: "REZERVĀCIJA", x: 724, y: 106, value: "redzams", tone: "success" as const },
  { label: "PIRKUMS", x: 724, y: 186, value: "redzams", tone: "success" as const },
  { label: "NEZINĀMS", x: 724, y: 274, value: "nav izsekots", tone: "lost" as const },
  { label: "ZAUDĒTS", x: 724, y: 362, value: "nav atgūts", tone: "lost" as const },
  { label: "ATSKAITE", x: 724, y: 444, value: "nedj.", tone: "report" as const }
] as const;

export function ClientDisappearanceMap() {
  const ref = useAnimeInView<HTMLDivElement>((node) => {
    anime({
      targets: node.querySelectorAll(".cdm-fade"),
      opacity: [0, 1],
      translateY: [10, 0],
      delay: anime.stagger(28),
      duration: 540,
      easing: "easeOutQuad"
    });

    const lostBars = node.querySelectorAll<SVGRectElement>(".cdm-bar-clip rect");
    anime.set(lostBars, { transformOrigin: "center bottom" });
    anime({
      targets: lostBars,
      scaleY: [0, 1],
      delay: anime.stagger(60, { start: 220 }),
      duration: 720,
      easing: "easeOutCubic"
    });

    const visibleArea = node.querySelector<SVGPathElement>(".cdm-area-visible");
    const lostArea = node.querySelector<SVGPathElement>(".cdm-area-lost");
    if (visibleArea && lostArea) {
      [visibleArea, lostArea].forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      });
      anime({
        targets: [visibleArea, lostArea],
        strokeDashoffset: 0,
        delay: anime.stagger(180, { start: 320 }),
        duration: 1400,
        easing: "easeInOutSine"
      });
    }

    const sourceBars = node.querySelectorAll<SVGRectElement>(".cdm-source-bar");
    anime.set(sourceBars, { transformOrigin: "left center" });
    anime({
      targets: sourceBars,
      scaleX: [0, 1],
      delay: anime.stagger(70, { start: 380 }),
      duration: 680,
      easing: "easeOutQuad"
    });

    const tracker = node.querySelector(".cdm-tracker");
    if (tracker) {
      anime({
        targets: tracker,
        translateX: [0, FUNNEL_BOX.w],
        opacity: [0, 1, 1, 0.4],
        duration: 3200,
        delay: 900,
        easing: "easeInOutSine"
      });
    }
  }, 0.55);

  // Pre-compute geometry
  const visiblePoints = plotPoints(funnelStages.map((s) => ({ label: s.label, value: s.visible })), FUNNEL_BOX, MAX_FUNNEL);
  const lostPoints = plotPoints(funnelStages.map((s) => ({ label: s.label, value: s.lost })), FUNNEL_BOX, MAX_FUNNEL);
  const visibleLine = smoothPath(visiblePoints);
  const lostLine = smoothPath(lostPoints);
  const visibleArea = `${visibleLine} L${FUNNEL_BOX.x + FUNNEL_BOX.w} ${FUNNEL_BOX.y + FUNNEL_BOX.h} L${FUNNEL_BOX.x} ${FUNNEL_BOX.y + FUNNEL_BOX.h} Z`;
  const lostArea = `${lostLine} L${FUNNEL_BOX.x + FUNNEL_BOX.w} ${FUNNEL_BOX.y + FUNNEL_BOX.h} L${FUNNEL_BOX.x} ${FUNNEL_BOX.y + FUNNEL_BOX.h} Z`;

  // Source-loss horizontal bars
  const sourceRowHeight = SOURCE_BOX.h / sourceLoss.length;
  const sourceMax = Math.max(...sourceLoss.map((s) => s.inflow));

  return (
    <Box ref={ref} className="diagram-panel" sx={{ width: "100%", p: { xs: 1, md: 1.5 }, backgroundColor: "rgba(7,9,11,0.82)", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
      <svg viewBox="0 0 900 460" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Klientu plūsmas zudumu kokpits ar redzamības līkni un avotu zudumu sadalījumu" style={{ width: "100%", height: "auto", display: "block" }}>
        <defs>
          <AreaGradient id="cdm-grad-visible" tone="lime" />
          <AreaGradient id="cdm-grad-lost" tone="amber" />
        </defs>

        {/* Header */}
        <g className="cdm-fade" opacity={0}>
          <text x={20} y={22} className="svg-label" fill={CHART.lime} fontSize="11">VEX / CLIENT-DISAPPEARANCE · LIVE COCKPIT</text>
          <text x={880} y={22} textAnchor="end" className="svg-label svg-label-muted" fontSize="10">SAMPLE WINDOW · 14D · n=423</text>
          <line x1={20} x2={880} y1={32} y2={32} stroke={CHART.gridStrong} />
        </g>

        {/* Main funnel decay chart */}
        <g className="cdm-fade" opacity={0}>
          <text x={FUNNEL_BOX.x} y={FUNNEL_BOX.y - 20} className="svg-label svg-label-muted" fontSize="10">SESIJU SARUKUMS KOMERCIĀLAJĀ PLŪSMĀ · % no ieejas</text>
          <LegendChip x={FUNNEL_BOX.x + 320} y={FUNNEL_BOX.y - 16} label="VISIBLE" tone="lime" />
          <LegendChip x={FUNNEL_BOX.x + 400} y={FUNNEL_BOX.y - 16} label="LOST" tone="amber" />
        </g>

        <HGrid x={FUNNEL_BOX.x} y={FUNNEL_BOX.y} w={FUNNEL_BOX.w} h={FUNNEL_BOX.h} ticks={4} />
        <YAxis x={FUNNEL_BOX.x - 8} y={FUNNEL_BOX.y} h={FUNNEL_BOX.h} max={MAX_FUNNEL} ticks={4} />
        {/* Stage separators */}
        {funnelStages.slice(1).map((s, i) => (
          <line key={s.label} x1={FUNNEL_BOX.x + (FUNNEL_BOX.w / (funnelStages.length - 1)) * (i + 1)} x2={FUNNEL_BOX.x + (FUNNEL_BOX.w / (funnelStages.length - 1)) * (i + 1)} y1={FUNNEL_BOX.y} y2={FUNNEL_BOX.y + FUNNEL_BOX.h} stroke={CHART.grid} />
        ))}

        {/* Areas */}
        <path className="cdm-area-fill" d={visibleArea} fill="url(#cdm-grad-visible)" opacity={0.85} />
        <path className="cdm-area-fill" d={lostArea} fill="url(#cdm-grad-lost)" opacity={0.7} />
        {/* Lines on top */}
        <path className="cdm-area-visible" d={visibleLine} stroke={CHART.lime} strokeWidth={2.2} fill="none" />
        <path className="cdm-area-lost" d={lostLine} stroke={CHART.amber} strokeWidth={1.8} fill="none" />

        {/* Stage value tags */}
        {funnelStages.map((s, i) => (
          <g key={s.label} className="cdm-fade" opacity={0}>
            <circle cx={visiblePoints[i].x} cy={visiblePoints[i].y} r={3} fill={CHART.lime} />
            <circle cx={lostPoints[i].x} cy={lostPoints[i].y} r={3} fill={CHART.amber} />
            <text x={visiblePoints[i].x} y={visiblePoints[i].y - 8} textAnchor="middle" className="svg-label" fill={CHART.lime} fontSize="9.5">{s.visible}</text>
          </g>
        ))}

        {/* Animated tracker dot */}
        <g className="cdm-tracker" opacity={0}>
          <line x1={FUNNEL_BOX.x} x2={FUNNEL_BOX.x} y1={FUNNEL_BOX.y} y2={FUNNEL_BOX.y + FUNNEL_BOX.h} stroke={CHART.lime} strokeOpacity={0.35} strokeDasharray="2 4" />
        </g>

        {/* X-axis labels */}
        <XAxis x={FUNNEL_BOX.x} y={FUNNEL_BOX.y + FUNNEL_BOX.h + 16} w={FUNNEL_BOX.w} labels={funnelStages.map((s) => s.label)} />

        {/* Right-side source loss horizontal bar list */}
        <g className="cdm-fade" opacity={0}>
          <text x={SOURCE_BOX.x} y={SOURCE_BOX.y - 20} className="svg-label svg-label-muted" fontSize="10">LOSS BY ACQUISITION SOURCE · in / lost</text>
        </g>
        <Panel x={SOURCE_BOX.x - 6} y={SOURCE_BOX.y - 6} w={SOURCE_BOX.w + 12} h={SOURCE_BOX.h + 12} />
        {sourceLoss.map((row, i) => {
          const ry = SOURCE_BOX.y + i * sourceRowHeight + 8;
          const inflowW = (row.inflow / sourceMax) * (SOURCE_BOX.w - 90);
          const lostW = (row.lost / sourceMax) * (SOURCE_BOX.w - 90);
          return (
            <g key={row.label}>
              <text x={SOURCE_BOX.x + 6} y={ry + 8} className="svg-label" fill={CHART.axisStrong} fontSize="9.5">{row.label}</text>
              <rect className="cdm-source-bar" x={SOURCE_BOX.x + 6} y={ry + 14} width={inflowW} height={6} rx={1.5} fill={CHART.lime} opacity={0.85} />
              <rect className="cdm-source-bar" x={SOURCE_BOX.x + 6} y={ry + 22} width={lostW} height={6} rx={1.5} fill={CHART.amber} opacity={0.85} />
              <text x={SOURCE_BOX.x + SOURCE_BOX.w - 4} y={ry + 19} textAnchor="end" className="svg-label" fill={CHART.axis} fontSize="9">−{row.lost}</text>
            </g>
          );
        })}

        {/* KPI strip below */}
        <g className="cdm-fade" opacity={0}>
          <KpiCell x={78} y={344} w={156} h={48} label="IEEJA · 14D" value="423 pieprasījumi" tone="lime" />
          <KpiCell x={244} y={344} w={156} h={48} label="REDZAMI IZEJĀ" value="76 / 18%" tone="green" />
          <KpiCell x={410} y={344} w={156} h={48} label="PAZUDIS PLŪSMĀ" value="254 / 60%" tone="amber" />
          <KpiCell x={576} y={344} w={156} h={48} label="UNATTRIBUTED" value="93 / 22%" tone="amber" />
          <KpiCell x={742} y={344} w={138} h={48} label="RECOVERED" value="0" tone="red" />
        </g>

        {/* Owner-visibility log on right */}
        <g className="cdm-fade" opacity={0}>
          <text x={78} y={414} className="svg-label svg-label-muted" fontSize="10">OWNER VISIBILITY LOG</text>
          {visibilityLog.map((row, i) => (
            <g key={row.label} transform={`translate(${78 + i * 162} 422)`}>
              <rect width={150} height={24} rx={5} fill="rgba(16,20,25,0.84)" stroke={`${toneColor(row.tone)}55`} />
              <text x={10} y={16} className="svg-label" fill={CHART.axis} fontSize="9">{row.label}</text>
              <text x={140} y={16} textAnchor="end" className="svg-label" fill={toneColor(row.tone)} fontSize="9.5">{row.value}</text>
            </g>
          ))}
        </g>
      </svg>

      <Box sx={{ mt: 1.2, display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 0.92fr" }, gap: 1.2, pointerEvents: "auto" }}>
        <CommercialTelemetryChart mode="leakage" height={104} />
        <CommercialTelemetryChart mode="source" variant="bar" height={104} />
      </Box>
    </Box>
  );
}
