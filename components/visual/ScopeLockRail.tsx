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

// Phase 01 — blueprint: scoping wireframe
function ArchitectureScene() {
  return (
    <g>
      <text x="14" y="20" fill={ACCENT} fontSize="9" letterSpacing="0.2em" fontWeight="700">BLUEPRINT</text>
      {/* document outline */}
      <rect x="20" y="32" width="200" height="130" fill="rgba(8,12,10,0.7)" stroke={ACCENT} strokeWidth="1.2" />
      <line x1="20" y1="50" x2="220" y2="50" stroke={DIM} strokeWidth="0.8" />
      {/* lines representing scope items */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="32" y={66 + i * 18} width="8" height="8" fill="none" stroke={ACCENT} strokeWidth="1" />
          <line x1="46" y1={70 + i * 18} x2={i === 1 || i === 3 ? 180 : 200} y2={70 + i * 18} stroke={DIM} strokeWidth="1" />
          {(i === 0 || i === 2 || i === 4) && (
            <line x1="34" y1={70 + i * 18} x2="38" y2={70 + i * 18} stroke={ACCENT} strokeWidth="1.6" />
          )}
        </g>
      ))}
      {/* node graph on right */}
      <g transform="translate(250,40)">
        <circle cx="40" cy="20" r="14" fill="rgba(8,12,10,0.85)" stroke={ACCENT} strokeWidth="1.2" />
        <text x="40" y="24" textAnchor="middle" fill={ACCENT} fontSize="9" fontWeight="700">A</text>
        <circle cx="14" cy="70" r="10" fill="rgba(8,12,10,0.85)" stroke={ACCENT} strokeWidth="1.2" />
        <circle cx="66" cy="70" r="10" fill="rgba(8,12,10,0.85)" stroke={ACCENT} strokeWidth="1.2" />
        <circle cx="40" cy="110" r="10" fill="rgba(8,12,10,0.85)" stroke={ACCENT} strokeWidth="1.2" />
        <line x1="40" y1="34" x2="14" y2="60" stroke={DIM} strokeWidth="1" strokeDasharray="2 2" />
        <line x1="40" y1="34" x2="66" y2="60" stroke={DIM} strokeWidth="1" strokeDasharray="2 2" />
        <line x1="14" y1="80" x2="40" y2="100" stroke={DIM} strokeWidth="1" strokeDasharray="2 2" />
        <line x1="66" y1="80" x2="40" y2="100" stroke={DIM} strokeWidth="1" strokeDasharray="2 2" />
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
        const fullW = 280;
        return (
          <g key={m.label}>
            <rect x="20" y={y} width={fullW} height="20" fill="rgba(8,12,10,0.7)" stroke="rgba(59,255,124,0.25)" strokeWidth="0.8" />
            <rect x="20" y={y} width={fullW * m.w} height="20" fill="rgba(59,255,124,0.18)" />
            <rect x="20" y={y} width="3" height="20" fill={ACCENT} />
            <text x="30" y={y + 13} fill={TEXT} fontSize="9" letterSpacing="0.16em" fontWeight="700">{m.label}</text>
            <text x={fullW + 12} y={y + 13} fill={ACCENT} fontSize="9" fontWeight="700">{Math.round(m.w * 100)}%</text>
          </g>
        );
      })}
      {/* connector ticks */}
      <line x1="12" y1="40" x2="12" y2="160" stroke={DIM} strokeWidth="1" strokeDasharray="2 3" />
      {[0, 1, 2, 3].map((i) => <circle key={i} cx="12" cy={46 + i * 30} r="2.5" fill={ACCENT} />)}
    </g>
  );
}

// Phase 03 — handover with bidirectional arrows
function HandoverScene() {
  return (
    <g>
      <text x="14" y="20" fill={ACCENT} fontSize="9" letterSpacing="0.2em" fontWeight="700">HANDOVER + TUNE</text>
      {/* left: VEX */}
      <rect x="20" y="50" width="100" height="80" fill="rgba(8,12,10,0.7)" stroke={ACCENT} strokeWidth="1.2" />
      <text x="70" y="80" textAnchor="middle" fill={ACCENT} fontSize="11" fontWeight="700" letterSpacing="0.12em">VEX</text>
      <text x="70" y="96" textAnchor="middle" fill={MUTED} fontSize="8" letterSpacing="0.18em">SYSTEM</text>
      <text x="70" y="116" textAnchor="middle" fill={MUTED} fontSize="8" letterSpacing="0.18em">OWNERS</text>

      {/* right: TEAM */}
      <rect x="240" y="50" width="100" height="80" fill="rgba(8,12,10,0.7)" stroke={ACCENT} strokeWidth="1.2" />
      <text x="290" y="80" textAnchor="middle" fill={ACCENT} fontSize="11" fontWeight="700" letterSpacing="0.12em">KOMANDA</text>
      <text x="290" y="96" textAnchor="middle" fill={MUTED} fontSize="8" letterSpacing="0.18em">DAILY</text>
      <text x="290" y="116" textAnchor="middle" fill={MUTED} fontSize="8" letterSpacing="0.18em">OPERATORS</text>

      {/* bidirectional arrows */}
      <line x1="124" y1="74" x2="236" y2="74" stroke={ACCENT} strokeWidth="1.4" markerEnd="url(#phase-arr-2)" />
      <text x="180" y="68" textAnchor="middle" fill={ACCENT} fontSize="8" fontWeight="700">DOCS · TRAINING</text>

      <line x1="236" y1="106" x2="124" y2="106" stroke={AMBER} strokeWidth="1.4" strokeDasharray="4 3" />
      <polygon points="124,106 130,103 130,109" fill={AMBER} />
      <text x="180" y="120" textAnchor="middle" fill={AMBER} fontSize="8" fontWeight="700">REPORTS · TUNE</text>

      {/* handshake icon between */}
      <circle cx="180" cy="90" r="12" fill="rgba(8,12,10,0.95)" stroke={ACCENT} strokeWidth="1.2" />
      <path d="M174 92 L178 88 L182 92 L186 88" fill="none" stroke={ACCENT} strokeWidth="1.4" strokeLinecap="round" />

      {/* bottom monthly cycle */}
      <text x="180" y="158" textAnchor="middle" fill={MUTED} fontSize="8" letterSpacing="0.22em">MONTHLY CYCLE</text>
      <line x1="40" y1="148" x2="320" y2="148" stroke={DIM} strokeWidth="0.8" strokeDasharray="2 3" />
      {[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} cx={40 + i * 56} cy="148" r="2.5" fill={ACCENT} />)}
    </g>
  );
}
