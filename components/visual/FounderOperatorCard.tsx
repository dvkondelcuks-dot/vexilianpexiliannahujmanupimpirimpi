import { Box, Stack, Typography } from "@mui/material";
import type { founders } from "@/data/founders";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { SignalChip } from "@/components/ui/SignalChip";
import { AreaGradient, Bar, CHART, HGrid, LegendChip, XAxis, YAxis, barLayout, plotPoints, smoothPath } from "./chartPrimitives";

type Founder = (typeof founders)[number];

export function FounderOperatorCard({ founder }: { founder: Founder }) {
  return (
    <Box
      className="industrial-card"
      sx={{
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        background: "linear-gradient(180deg, rgba(21,27,34,0.82), rgba(10,13,16,0.94))",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        minHeight: { xs: 540, md: 580, lg: 620 },
        transition: "border-color 180ms ease, transform 180ms ease",
        "&:hover": {
          borderColor: "rgba(59,255,124,0.32)",
          transform: "translateY(-2px)"
        }
      }}
    >
      <Stack spacing={1.5} sx={{ p: 2.2, borderBottom: "1px solid var(--border)" }}>
        <MetaLabel sx={{ color: "var(--signal-blue)" }}>{founder.operatorCode}</MetaLabel>
        <Box>
          <Typography component="h3" variant="h3">{founder.name}</Typography>
          <Typography sx={{ color: "var(--text-2)", fontFamily: "var(--mono)", fontSize: 12, textTransform: "uppercase", mt: 0.7 }}>{founder.role}</Typography>
        </Box>
      </Stack>
      <Box sx={{ height: 230, borderBottom: "1px solid var(--border)", background: "rgba(7,9,11,0.62)" }}>
        <OperatorChart founder={founder} />
      </Box>
      <Stack spacing={1.4} sx={{ p: 2.2, flex: 1 }}>
        {founder.text.map((paragraph) => (
          <Typography key={paragraph} sx={{ color: "var(--text-2)", fontSize: 14.5, lineHeight: 1.65 }}>{paragraph}</Typography>
        ))}
        <Box sx={{ pt: 1 }}>
          <MetaLabel>Fokuss</MetaLabel>
          <Typography sx={{ color: "var(--text)", fontSize: 14, mt: 0.6 }}>{founder.focus.join(" · ")}</Typography>
        </Box>
        <Box>
          <MetaLabel>Jautājums</MetaLabel>
          <Typography sx={{ color: "var(--signal-amber)", fontSize: 14, mt: 0.6 }}>{founder.question}</Typography>
        </Box>
      </Stack>
      <Stack direction="row" useFlexGap flexWrap="wrap" spacing={0.8} sx={{ p: 2.2, pt: 0 }}>
        {founder.tags.map((tag) => <SignalChip key={tag} tone="blue">{tag}</SignalChip>)}
      </Stack>
      <Stack direction="row" useFlexGap flexWrap="wrap" spacing={0.8} sx={{ p: 2.2, pt: 0 }}>
        {founder.layers.map((layer) => <SignalChip key={layer}>{layer}</SignalChip>)}
      </Stack>
    </Box>
  );
}

const VIEW_W = 420;
const VIEW_H = 230;
const BOX = { x: 44, y: 56, w: 348, h: 130 };

function OperatorChart({ founder }: { founder: Founder }) {
  return (
    <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label={`${founder.name} operatora telemetrijas panelis`} style={{ width: "100%", height: "100%" }}>
      <rect x={6} y={6} width={VIEW_W - 12} height={VIEW_H - 12} rx={8} fill={CHART.bg} stroke={CHART.border} />
      <text x={20} y={26} className="svg-label" fill={CHART.lime} fontSize="10">{founder.operatorCode}</text>
      <text x={VIEW_W - 14} y={26} textAnchor="end" className="svg-label svg-label-muted" fontSize="9">RANGE · 30D</text>
      {founder.visualMode === "architecture" ? <ArchitectureChart /> : null}
      {founder.visualMode === "analysis" ? <AnalysisChart /> : null}
      {founder.visualMode === "communication" ? <CommunicationChart /> : null}
    </svg>
  );
}

// Dāvids — Structure: stacked bar showing system component reliability across 7 layers
function ArchitectureChart() {
  const data = [
    { label: "WEB",   value: 96 },
    { label: "FORM",  value: 92 },
    { label: "BUS",   value: 88 },
    { label: "CRM",   value: 90 },
    { label: "ATTR.", value: 84 },
    { label: "RECOV", value: 86 },
    { label: "DASH",  value: 95 }
  ];
  const max = 100;
  const pts = plotPoints(data, BOX, max);
  return (
    <>
      <text x={20} y={42} className="svg-label svg-label-muted" fontSize="9">SYSTEM COMPONENT UPTIME · % healthy hours</text>
      <LegendChip x={250} y={42} label="UPTIME" tone="lime" />
      <LegendChip x={320} y={42} label="LINK" tone="green" />
      <HGrid x={BOX.x} y={BOX.y} w={BOX.w} h={BOX.h} ticks={4} />
      <YAxis x={BOX.x - 6} y={BOX.y} h={BOX.h} max={max} ticks={4} />
      {barLayout(data, BOX, max, 0.55).map((b, i) => <Bar key={i} {...b} tone="lime" opacity={0.85} />)}
      <path d={smoothPath(pts)} stroke={CHART.green} strokeWidth={1.7} fill="none" />
      <XAxis x={BOX.x} y={BOX.y + BOX.h + 16} w={BOX.w} labels={data.map((d) => d.label)} />
      <text x={20} y={VIEW_H - 14} className="svg-label svg-label-muted" fontSize="9">ports · schemas · fallback paths — single chain, single owner</text>
    </>
  );
}

// Miks — Analysis: line of TRAFFIC vs DECISION over 8 weeks, with WON / LOST bar split
function AnalysisChart() {
  const labels = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];
  const traffic = [42, 48, 55, 50, 62, 70, 74, 78];
  const decision = [10, 14, 18, 20, 28, 36, 42, 48];
  const lost = [22, 24, 26, 22, 20, 18, 16, 14];
  const max = 100;
  const tPts = plotPoints(labels.map((l, i) => ({ label: l, value: traffic[i] })), BOX, max);
  const dPts = plotPoints(labels.map((l, i) => ({ label: l, value: decision[i] })), BOX, max);
  const dArea = `${smoothPath(dPts)} L${BOX.x + BOX.w} ${BOX.y + BOX.h} L${BOX.x} ${BOX.y + BOX.h} Z`;
  return (
    <>
      <defs>
        <AreaGradient id="founder-decision" tone="lime" />
      </defs>
      <text x={20} y={42} className="svg-label svg-label-muted" fontSize="9">TRAFFIC → DECISION CONVERSION · weekly</text>
      <LegendChip x={250} y={42} label="TRAFFIC" tone="muted" />
      <LegendChip x={320} y={42} label="DECISION" tone="lime" />
      <HGrid x={BOX.x} y={BOX.y} w={BOX.w} h={BOX.h} ticks={4} />
      <YAxis x={BOX.x - 6} y={BOX.y} h={BOX.h} max={max} ticks={4} />
      {/* lost bars (light amber, behind) */}
      {barLayout(labels.map((l, i) => ({ label: l, value: lost[i] })), BOX, max, 0.4).map((b, i) => (
        <Bar key={i} {...b} tone="amber" opacity={0.5} />
      ))}
      <path d={dArea} fill="url(#founder-decision)" opacity={0.75} />
      <path d={smoothPath(dPts)} stroke={CHART.lime} strokeWidth={2} fill="none" />
      <path d={smoothPath(tPts)} stroke={CHART.muted} strokeWidth={1.4} strokeDasharray="3 4" fill="none" />
      <XAxis x={BOX.x} y={BOX.y + BOX.h + 16} w={BOX.w} labels={labels} />
      <text x={20} y={VIEW_H - 14} className="svg-label svg-label-muted" fontSize="9">attention · trust · source · next-action — measured per week</text>
    </>
  );
}

// Edvards — Growth & Comms: signal radar — message clarity / trust / action over time as area stack
function CommunicationChart() {
  const labels = ["M1", "M2", "M3", "M4", "M5", "M6"];
  const message = [42, 50, 58, 64, 70, 76];
  const trust   = [28, 36, 44, 52, 60, 68];
  const action  = [12, 18, 28, 38, 50, 62];
  const max = 100;
  const mPts = plotPoints(labels.map((l, i) => ({ label: l, value: message[i] })), BOX, max);
  const tPts = plotPoints(labels.map((l, i) => ({ label: l, value: trust[i] })), BOX, max);
  const aPts = plotPoints(labels.map((l, i) => ({ label: l, value: action[i] })), BOX, max);
  return (
    <>
      <text x={20} y={42} className="svg-label svg-label-muted" fontSize="9">MARKET RESPONSE INDEX · message · trust · action</text>
      <LegendChip x={216} y={42} label="MESSAGE" tone="lime" />
      <LegendChip x={284} y={42} label="TRUST" tone="green" />
      <LegendChip x={342} y={42} label="ACTION" tone="amber" />
      <HGrid x={BOX.x} y={BOX.y} w={BOX.w} h={BOX.h} ticks={4} />
      <YAxis x={BOX.x - 6} y={BOX.y} h={BOX.h} max={max} ticks={4} />
      <path d={smoothPath(mPts)} stroke={CHART.lime} strokeWidth={2} fill="none" />
      <path d={smoothPath(tPts)} stroke={CHART.green} strokeWidth={1.8} fill="none" />
      <path d={smoothPath(aPts)} stroke={CHART.amber} strokeWidth={1.8} fill="none" />
      {[mPts, tPts, aPts].flat().map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={2} fill={i < mPts.length ? CHART.lime : i < mPts.length + tPts.length ? CHART.green : CHART.amber} />)}
      <XAxis x={BOX.x} y={BOX.y + BOX.h + 16} w={BOX.w} labels={labels} />
      <text x={20} y={VIEW_H - 14} className="svg-label svg-label-muted" fontSize="9">market signal becomes language — language becomes a clear next action</text>
    </>
  );
}
