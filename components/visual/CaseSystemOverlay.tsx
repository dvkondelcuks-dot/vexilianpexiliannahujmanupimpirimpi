import { Box, Stack, Typography } from "@mui/material";
import type { cases } from "@/data/cases";
import { SignalChip } from "@/components/ui/SignalChip";
import { AreaGradient, CHART, HGrid, plotPoints, smoothPath } from "@/components/visual/chartPrimitives";

type CaseItem = (typeof cases)[number];

// Overlay shown on top of the case image. Renders as a Recharts-style growth
// chart with a route ribbon at the bottom — proof signal as data, not as a
// schematic.
export function CaseSystemOverlay({ item }: { item: CaseItem }) {
  // Fake but plausible weekly proof curve (reservation/sale signal lift)
  const weeks = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];
  const baseline = [10, 11, 13, 14, 13, 15, 14, 16];
  const after =    [10, 14, 21, 28, 36, 44, 53, 62];
  const max = 70;
  const BOX = { x: 60, y: 70, w: 600, h: 150 };
  const basePts = plotPoints(weeks.map((l, i) => ({ label: l, value: baseline[i] })), BOX, max);
  const afterPts = plotPoints(weeks.map((l, i) => ({ label: l, value: after[i] })), BOX, max);
  const afterArea = `${smoothPath(afterPts)} L${BOX.x + BOX.w} ${BOX.y + BOX.h} L${BOX.x} ${BOX.y + BOX.h} Z`;
  const gradId = `case-grad-${item.id}`;

  return (
    <Box sx={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", pointerEvents: "none" }}>
      <svg viewBox="0 0 720 360" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`${item.name} sistēmas pārklājums — pieprasījumu signāla pieaugums`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <AreaGradient id={gradId} tone="lime" />
        </defs>

        {/* dimming gradient over image so chart reads */}
        <linearGradient id={`case-dim-${item.id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(7,9,11,0.86)" />
          <stop offset="100%" stopColor="rgba(7,9,11,0.32)" />
        </linearGradient>
        <rect x={22} y={24} width={676} height={312} rx={8} fill={`url(#case-dim-${item.id})`} stroke={CHART.border} />

        {/* Header */}
        <text x={40} y={50} fontSize="11" fontFamily="var(--mono)" fill={CHART.lime}>SIGNĀLA PĒDAS · {item.name.toUpperCase()}</text>
        <text x={678} y={50} textAnchor="end" fontSize="10" fontFamily="var(--mono)" fill={CHART.axis}>WEEKLY · n=8</text>

        {/* Chart */}
        <HGrid x={BOX.x} y={BOX.y} w={BOX.w} h={BOX.h} ticks={4} />
        <path d={afterArea} fill={`url(#${gradId})`} opacity={0.7} />
        <path d={smoothPath(basePts)} stroke={CHART.muted} strokeWidth={1.4} strokeDasharray="4 4" fill="none" />
        <path d={smoothPath(afterPts)} stroke={CHART.lime} strokeWidth={2.2} fill="none" />
        {afterPts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={2.6} fill={CHART.lime} />)}

        {/* X-axis */}
        {weeks.map((w, i) => {
          const step = BOX.w / weeks.length;
          return (
            <text key={w} x={BOX.x + step * i + step / 2} y={BOX.y + BOX.h + 16} textAnchor="middle" fontSize="9" fontFamily="var(--mono)" fill={CHART.axis}>{w}</text>
          );
        })}

        {/* Route ribbon at bottom */}
        {item.route.map((label, index) => {
          const cellW = 660 / item.route.length;
          const x = 30 + index * cellW;
          const y = 296;
          const isLast = index === item.route.length - 1;
          return (
            <g key={label}>
              <rect x={x} y={y} width={cellW - 8} height={26} rx={5} fill="rgba(16,20,25,0.86)" stroke={isLast ? CHART.green : CHART.lime} opacity={0.9} />
              <text x={x + (cellW - 8) / 2} y={y + 17} textAnchor="middle" fontSize="9" fontFamily="var(--mono)" fill={isLast ? CHART.green : CHART.text}>{label}</text>
              {!isLast ? <line x1={x + cellW - 8} x2={x + cellW} y1={y + 13} y2={y + 13} stroke={CHART.lime} strokeOpacity={0.6} /> : null}
            </g>
          );
        })}
      </svg>

      {/* Modules as chips, top of card */}
      <Stack direction="row" useFlexGap flexWrap="wrap" spacing={0.8} sx={{ position: "relative", zIndex: 1, m: { xs: 1.5, md: 2 }, maxWidth: 520 }}>
        {item.modules.map((module) => <SignalChip key={module} tone="blue">{module}</SignalChip>)}
      </Stack>

      {/* Live panel, bottom right */}
      <Stack className="industrial-card" sx={{ position: "relative", zIndex: 1, alignSelf: "flex-end", width: { xs: 190, md: 240 }, m: { xs: 1.5, md: 2 }, mt: 0, border: "1px solid rgba(59,255,124,0.24)", borderRadius: "var(--radius)", background: "rgba(7,9,11,0.86)", p: 1.2 }} spacing={0.8}>
        {item.panel.map((signal, index) => (
          <Stack key={signal} direction="row" justifyContent="space-between" spacing={1}>
            <Typography sx={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--text-2)" }}>{signal}</Typography>
            <Typography sx={{ fontFamily: "var(--mono)", fontSize: 10.5, color: index === item.panel.length - 1 ? "var(--signal-green)" : "var(--signal-blue)" }}>{index === item.panel.length - 1 ? "ON" : "LIVE"}</Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
