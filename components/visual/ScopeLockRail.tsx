"use client";

import { Box, Stack, Typography } from "@mui/material";
import { collaborationPhases } from "@/data/phases";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { SignalChip } from "@/components/ui/SignalChip";

const ACCENT = "#3BFF7C";
const DIM = "rgba(59,255,124,0.45)";
const TEXT = "#F4F7FA";
const MUTED = "#A7B0BA";
const AMBER = "#E6A84A";

export function ScopeLockRail() {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "repeat(3, 1fr)" }, gap: 2 }}>
      {collaborationPhases.map((phase, i) => (
        <Box
          key={phase.number}
          sx={{
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            background: "rgba(8,12,10,0.78)",
            p: 2.4,
            position: "relative"
          }}
        >
          {/* corner brackets */}
          <CornerBrackets />
          <Stack spacing={1.6}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <MetaLabel>PHASE {phase.number}</MetaLabel>
              <SignalChip tone="green">{phase.acceptance}</SignalChip>
            </Stack>
            <Typography
              sx={{
                color: TEXT,
                fontWeight: 700,
                letterSpacing: "0.02em",
                fontSize: "1.05rem",
                textTransform: "uppercase"
              }}
            >
              {phase.title}
            </Typography>
            <Typography sx={{ color: "var(--text-2)", lineHeight: 1.55, fontSize: "0.92rem" }}>
              {phase.text}
            </Typography>

            <Box
              sx={{
                mt: 1,
                border: "1px solid rgba(59,255,124,0.18)",
                borderRadius: 1,
                background: "rgba(6,9,7,0.6)",
                p: 1.4
              }}
            >
              <PhaseDiagram index={i} />
            </Box>

            <Box>
              <MetaLabel>Rezultāts</MetaLabel>
              <Typography sx={{ color: TEXT, mt: 0.5, fontSize: "0.92rem" }}>{phase.output}</Typography>
            </Box>
          </Stack>
        </Box>
      ))}
    </Box>
  );
}

function CornerBrackets() {
  const c = ACCENT;
  const s = { position: "absolute" as const, width: 12, height: 12, borderColor: c };
  return (
    <>
      <Box sx={{ ...s, top: 6, left: 6, borderTop: `1px solid ${c}`, borderLeft: `1px solid ${c}` }} />
      <Box sx={{ ...s, top: 6, right: 6, borderTop: `1px solid ${c}`, borderRight: `1px solid ${c}` }} />
      <Box sx={{ ...s, bottom: 6, left: 6, borderBottom: `1px solid ${c}`, borderLeft: `1px solid ${c}` }} />
      <Box sx={{ ...s, bottom: 6, right: 6, borderBottom: `1px solid ${c}`, borderRight: `1px solid ${c}` }} />
    </>
  );
}

function PhaseDiagram({ index }: { index: number }) {
  return (
    <svg viewBox="0 0 360 180" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <pattern id={`phase-grid-${index}`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="rgba(59,255,124,0.06)" strokeWidth="0.6" />
        </pattern>
        <marker id={`phase-arr-${index}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill={ACCENT} />
        </marker>
      </defs>
      <rect width="360" height="180" fill={`url(#phase-grid-${index})`} />
      {index === 0 && <ArchitectureScene />}
      {index === 1 && <SetupScene />}
      {index === 2 && <HandoverScene />}
    </svg>
  );
}

// Phase 01 — Discovery & Scoping: business inputs into a structured blueprint
function ArchitectureScene() {
  const inputs = [
    { label: "GOALS", icon: "target" },
    { label: "SOURCES", icon: "flow" },
    { label: "PEOPLE", icon: "user" },
    { label: "DATA", icon: "db" }
  ];
  return (
    <g>
      <text x="14" y="18" fill={ACCENT} fontSize="9" letterSpacing="0.2em" fontWeight="700">DISCOVERY → SCOPE</text>
      {/* left input pills */}
      {inputs.map((it, i) => {
        const y = 38 + i * 28;
        return (
          <g key={it.label} transform={`translate(14,${y})`}>
            <rect width="96" height="22" rx="4" fill="rgba(8,12,10,0.7)" stroke={ACCENT} strokeWidth="1" />
            <circle cx="12" cy="11" r="6" fill="none" stroke={ACCENT} strokeWidth="1.1" />
            {it.icon === "target" && <circle cx="12" cy="11" r="2" fill={ACCENT} />}
            {it.icon === "flow" && <path d="M9 11 H15 M12 8 V14" stroke={ACCENT} strokeWidth="1" />}
            {it.icon === "user" && <path d="M9 13 Q12 10 15 13" stroke={ACCENT} strokeWidth="1" fill="none" />}
            {it.icon === "db" && <line x1="8" y1="11" x2="16" y2="11" stroke={ACCENT} strokeWidth="1" />}
            <text x="24" y="15" fill={TEXT} fontSize="9" letterSpacing="0.14em" fontWeight="700">{it.label}</text>
            <line x1="96" y1="11" x2="148" y2="90" stroke={DIM} strokeWidth="0.8" strokeDasharray="2 2" />
          </g>
        );
      })}
      {/* central blueprint card */}
      <g transform="translate(148,38)">
        <rect width="118" height="118" rx="4" fill="rgba(8,12,10,0.85)" stroke={ACCENT} strokeWidth="1.2" />
        <text x="8" y="14" fill={ACCENT} fontSize="8" letterSpacing="0.18em" fontWeight="700">SCOPE.MAP</text>
        {/* mini node graph */}
        <circle cx="30" cy="38" r="6" fill="none" stroke={ACCENT} strokeWidth="1" />
        <circle cx="60" cy="30" r="6" fill={ACCENT} />
        <circle cx="90" cy="42" r="6" fill="none" stroke={ACCENT} strokeWidth="1" />
        <circle cx="40" cy="68" r="6" fill="none" stroke={ACCENT} strokeWidth="1" />
        <circle cx="82" cy="76" r="6" fill="none" stroke={ACCENT} strokeWidth="1" />
        <line x1="30" y1="38" x2="60" y2="30" stroke={DIM} />
        <line x1="60" y1="30" x2="90" y2="42" stroke={DIM} />
        <line x1="30" y1="38" x2="40" y2="68" stroke={DIM} />
        <line x1="40" y1="68" x2="82" y2="76" stroke={DIM} />
        <line x1="82" y1="76" x2="90" y2="42" stroke={DIM} />
        {/* annotation lines */}
        <line x1="8" y1="96" x2="110" y2="96" stroke={DIM} strokeWidth="0.8" />
        <line x1="8" y1="104" x2="86" y2="104" stroke={DIM} strokeWidth="0.8" />
      </g>
      {/* right outputs */}
      <g transform="translate(282,42)">
        <text x="0" y="0" fill={ACCENT} fontSize="8" letterSpacing="0.18em" fontWeight="700">DELIVERABLES</text>
        {["BLUEPRINT", "PHASES", "TIMELINE", "PRICE"].map((l, i) => (
          <g key={l} transform={`translate(0,${10 + i * 22})`}>
            <rect width="68" height="18" rx="3" fill="rgba(8,12,10,0.7)" stroke={ACCENT} strokeWidth="0.9" />
            <line x1="4" y1="9" x2="8" y2="9" stroke={ACCENT} strokeWidth="1.6" />
            <text x="14" y="12" fill={TEXT} fontSize="8" letterSpacing="0.12em" fontWeight="700">{l}</text>
          </g>
        ))}
        <line x1="-16" y1="50" x2="-2" y2="50" stroke={ACCENT} strokeWidth="1.2" markerEnd="url(#phase-arr-0)" />
      </g>
    </g>
  );
}

// Phase 02 — connected modules being built
function SetupScene() {
  const modules = [
    { label: "WEBSITE", w: 0.85 },
    { label: "CRM", w: 1 },
    { label: "AUTOMATION", w: 0.7 },
    { label: "DASHBOARD", w: 0.55 }
  ];
  return (
    <g>
      <text x="14" y="20" fill={ACCENT} fontSize="9" letterSpacing="0.2em" fontWeight="700">CONNECTED BUILD</text>
      {modules.map((m, i) => {
        const y = 36 + i * 30;
        const fullW = 240;
        const pctX = 20 + fullW + 14;
        return (
          <g key={m.label}>
            <rect x="20" y={y} width={fullW} height="20" fill="rgba(8,12,10,0.7)" stroke="rgba(59,255,124,0.25)" strokeWidth="0.8" />
            <rect x="20" y={y} width={fullW * m.w} height="20" fill="rgba(59,255,124,0.18)" />
            <rect x="20" y={y} width="3" height="20" fill={ACCENT} />
            <text x="30" y={y + 13} fill={TEXT} fontSize="9" letterSpacing="0.16em" fontWeight="700">{m.label}</text>
            <text x={pctX} y={y + 14} fill={ACCENT} fontSize="10" fontWeight="700">{Math.round(m.w * 100)}%</text>
          </g>
        );
      })}
      {/* connector ticks */}
      <line x1="12" y1="40" x2="12" y2="160" stroke={DIM} strokeWidth="1" strokeDasharray="2 3" />
      {[0, 1, 2, 3].map((i) => <circle key={i} cx="12" cy={46 + i * 30} r="2.5" fill={ACCENT} />)}
    </g>
  );
}

// Phase 03 — Handover & Cycle: training transfer + monthly optimization ring
function HandoverScene() {
  return (
    <g>
      <text x="14" y="18" fill={ACCENT} fontSize="9" letterSpacing="0.2em" fontWeight="700">HANDOVER + CYCLE</text>
      {/* left: VEX panel */}
      <g transform="translate(14,32)">
        <rect width="96" height="66" rx="4" fill="rgba(8,12,10,0.7)" stroke={ACCENT} strokeWidth="1.2" />
        <text x="48" y="22" textAnchor="middle" fill={ACCENT} fontSize="11" letterSpacing="0.18em" fontWeight="700">VEX</text>
        <text x="48" y="36" textAnchor="middle" fill={MUTED} fontSize="7" letterSpacing="0.2em">SYSTEM OWNERS</text>
        <line x1="14" y1="46" x2="82" y2="46" stroke={DIM} strokeWidth="0.8" />
        <line x1="14" y1="54" x2="68" y2="54" stroke={DIM} strokeWidth="0.8" />
      </g>
      {/* right: TEAM panel */}
      <g transform="translate(252,32)">
        <rect width="96" height="66" rx="4" fill="rgba(8,12,10,0.7)" stroke={ACCENT} strokeWidth="1.2" />
        <text x="48" y="22" textAnchor="middle" fill={ACCENT} fontSize="11" letterSpacing="0.16em" fontWeight="700">KOMANDA</text>
        <text x="48" y="36" textAnchor="middle" fill={MUTED} fontSize="7" letterSpacing="0.2em">DAILY OPERATORS</text>
        {/* people icons */}
        {[0, 1, 2].map((i) => {
          const cx = 22 + i * 26;
          return (
            <g key={i} transform={`translate(${cx},48)`}>
              <circle cx="0" cy="0" r="4" fill="none" stroke={ACCENT} strokeWidth="1" />
              <path d="M-6 12 Q0 4 6 12" stroke={ACCENT} strokeWidth="1" fill="none" />
            </g>
          );
        })}
      </g>
      {/* center: handshake + arrows */}
      <g transform="translate(110,42)">
        <line x1="6" y1="14" x2="136" y2="14" stroke={ACCENT} strokeWidth="1.2" markerEnd="url(#phase-arr-2)" />
        <text x="71" y="10" textAnchor="middle" fill={ACCENT} fontSize="7" fontWeight="700" letterSpacing="0.16em">DOCS · TRAINING</text>
        <circle cx="71" cy="30" r="14" fill="rgba(8,12,10,0.95)" stroke={ACCENT} strokeWidth="1.2" />
        <path d="M62 32 L68 26 L74 32 L80 26" stroke={ACCENT} strokeWidth="1.4" fill="none" />
        <line x1="136" y1="50" x2="6" y2="50" stroke={AMBER} strokeWidth="1.2" strokeDasharray="3 2" />
        <polygon points="6,50 12,47 12,53" fill={AMBER} />
        <text x="71" y="60" textAnchor="middle" fill={AMBER} fontSize="7" fontWeight="700" letterSpacing="0.16em">REPORTS · TUNE</text>
      </g>
      {/* monthly cycle ring at bottom */}
      <g transform="translate(180,140)">
        <circle r="20" fill="none" stroke={DIM} strokeWidth="1" strokeDasharray="3 2" />
        {["R", "T", "S", "M"].map((l, i) => {
          const a = (i * 90 - 90) * Math.PI / 180;
          return (
            <g key={l} transform={`translate(${Math.cos(a) * 20},${Math.sin(a) * 20})`}>
              <circle r="6" fill="rgba(8,12,10,0.95)" stroke={ACCENT} strokeWidth="1" />
              <text textAnchor="middle" y="3" fill={ACCENT} fontSize="7" fontWeight="700">{l}</text>
            </g>
          );
        })}
        <text x="40" y="4" fill={MUTED} fontSize="7" letterSpacing="0.18em">MONTHLY</text>
        <text x="40" y="14" fill={MUTED} fontSize="7" letterSpacing="0.18em">CYCLE</text>
      </g>
    </g>
  );
}
