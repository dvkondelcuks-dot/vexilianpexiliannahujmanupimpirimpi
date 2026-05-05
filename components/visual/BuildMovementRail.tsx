"use client";

import { Box, Stack, Typography } from "@mui/material";
import { processSteps } from "@/data/process";
import { MetaLabel } from "@/components/ui/MetaLabel";

const ACCENT = "#3BFF7C";
const DIM = "rgba(59,255,124,0.45)";
const TEXT = "#F4F7FA";
const MUTED = "#A7B0BA";

export function BuildMovementRail() {
  return (
    <Box sx={{ position: "relative" }}>
      {/* vertical accent rail (desktop) */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "absolute",
          left: 64,
          top: 24,
          bottom: 24,
          width: "1px",
          background: `linear-gradient(180deg, transparent, ${DIM} 12%, ${DIM} 88%, transparent)`
        }}
      />
      <Stack spacing={2.4}>
        {processSteps.map((step, i) => (
          <Box
            key={step.number}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "120px 1fr 1fr" },
              gap: { xs: 1.6, md: 2.4 },
              alignItems: "stretch",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              background: "rgba(8,12,10,0.72)",
              p: { xs: 1.8, md: 2.2 },
              position: "relative"
            }}
          >
            {/* number cell */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "flex-start", md: "center" },
                justifyContent: "center",
                position: "relative"
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  border: `1.5px solid ${ACCENT}`,
                  background: "rgba(8,12,10,0.95)",
                  display: "grid",
                  placeItems: "center",
                  color: ACCENT,
                  fontFamily: "var(--mono)",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  letterSpacing: "0.04em",
                  boxShadow: `0 0 24px rgba(59,255,124,0.18)`
                }}
              >
                {step.number}
              </Box>
              <Typography sx={{ color: MUTED, fontSize: "0.7rem", letterSpacing: "0.22em", mt: 1, textTransform: "uppercase" }}>
                STEP
              </Typography>
            </Box>

            {/* illustration cell */}
            <Box
              sx={{
                border: "1px solid rgba(59,255,124,0.18)",
                borderRadius: 1,
                background: "rgba(6,9,7,0.6)",
                p: 1.4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 160
              }}
            >
              <StepIllustration index={i} />
            </Box>

            {/* description cell */}
            <Stack spacing={1.2} sx={{ justifyContent: "space-between" }}>
              <Box>
                <MetaLabel>{step.number} · POSMS</MetaLabel>
                <Typography
                  sx={{
                    color: TEXT,
                    fontWeight: 700,
                    fontSize: "1.15rem",
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                    mt: 0.5
                  }}
                >
                  {step.title}
                </Typography>
                <Typography sx={{ color: "var(--text-2)", lineHeight: 1.55, mt: 1, fontSize: "0.92rem" }}>
                  {step.text}
                </Typography>
              </Box>
              <Box
                sx={{
                  alignSelf: "flex-start",
                  border: `1px solid ${ACCENT}`,
                  background: "rgba(59,255,124,0.08)",
                  borderRadius: 1,
                  px: 1.4,
                  py: 0.7
                }}
              >
                <Typography sx={{ color: ACCENT, fontSize: "0.72rem", letterSpacing: "0.22em", fontWeight: 700 }}>
                  REZULTĀTS
                </Typography>
                <Typography sx={{ color: TEXT, fontSize: "0.9rem", mt: 0.3 }}>{step.result}</Typography>
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

function StepIllustration({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 360 160"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      <defs>
        <pattern id={`proc-grid-${index}`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="rgba(59,255,124,0.06)" strokeWidth="0.6" />
        </pattern>
        <marker id={`proc-arr-${index}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill={ACCENT} />
        </marker>
      </defs>
      <rect width="360" height="160" fill={`url(#proc-grid-${index})`} />
      {index === 0 && <AuditScene />}
      {index === 1 && <BlueprintScene />}
      {index === 2 && <BuildScene />}
      {index === 3 && <HandoverScene />}
      {index === 4 && <OptimizeScene />}
    </svg>
  );
}

// 01 — Audits: messy → highlighted gaps
function AuditScene() {
  return (
    <g>
      <text x="16" y="20" fill={ACCENT} fontSize="9" letterSpacing="0.2em" fontWeight="700">AUDIT MAP</text>
      {/* tangled paths */}
      <path d="M30 60 C70 40 110 90 150 70 S220 50 250 80 S320 60 340 90" fill="none" stroke={DIM} strokeWidth="1" />
      <path d="M30 100 C80 110 130 70 180 100 S260 120 340 100" fill="none" stroke={DIM} strokeWidth="1" strokeDasharray="3 2" />
      {/* nodes */}
      {[
        { x: 30, y: 60 }, { x: 90, y: 75 }, { x: 150, y: 70 }, { x: 210, y: 65 },
        { x: 270, y: 80 }, { x: 340, y: 90 }
      ].map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="rgba(8,12,10,0.95)" stroke={ACCENT} strokeWidth="1" />
      ))}
      {/* highlighted breakpoints with X */}
      {[{ x: 150, y: 70 }, { x: 270, y: 80 }].map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="9" fill="none" stroke="#E6A84A" strokeWidth="1.4" strokeDasharray="2 2" />
          <line x1={p.x - 5} y1={p.y - 5} x2={p.x + 5} y2={p.y + 5} stroke="#E6A84A" strokeWidth="1.4" />
          <line x1={p.x + 5} y1={p.y - 5} x2={p.x - 5} y2={p.y + 5} stroke="#E6A84A" strokeWidth="1.4" />
        </g>
      ))}
      <text x="16" y="140" fill={MUTED} fontSize="8" letterSpacing="0.22em">LŪZUMA PUNKTI · 2 / 6</text>
    </g>
  );
}

// 02 — Architecture: structured blueprint grid
function BlueprintScene() {
  return (
    <g>
      <text x="16" y="20" fill={ACCENT} fontSize="9" letterSpacing="0.2em" fontWeight="700">BLUEPRINT</text>
      {/* 3x2 module grid */}
      {[0, 1, 2].map((c) =>
        [0, 1].map((r) => (
          <g key={`${c}-${r}`}>
            <rect x={30 + c * 105} y={36 + r * 50} width="90" height="40" fill="rgba(8,12,10,0.7)" stroke={ACCENT} strokeWidth="1" />
            <line x1={30 + c * 105} y1={48 + r * 50} x2={120 + c * 105} y2={48 + r * 50} stroke={DIM} strokeWidth="0.6" />
            <circle cx={40 + c * 105} cy={42 + r * 50} r="2" fill={ACCENT} />
            <line x1={36 + c * 105} y1={58 + r * 50} x2={114 + c * 105} y2={58 + r * 50} stroke={DIM} strokeWidth="0.6" />
            <line x1={36 + c * 105} y1={66 + r * 50} x2={90 + c * 105} y2={66 + r * 50} stroke={DIM} strokeWidth="0.6" />
          </g>
        ))
      )}
      {/* connectors between rows */}
      <line x1="120" y1="56" x2="135" y2="56" stroke={ACCENT} strokeWidth="1" markerEnd={`url(#proc-arr-1)`} />
      <line x1="225" y1="56" x2="240" y2="56" stroke={ACCENT} strokeWidth="1" markerEnd={`url(#proc-arr-1)`} />
      <line x1="120" y1="106" x2="135" y2="106" stroke={ACCENT} strokeWidth="1" markerEnd={`url(#proc-arr-1)`} />
      <line x1="225" y1="106" x2="240" y2="106" stroke={ACCENT} strokeWidth="1" markerEnd={`url(#proc-arr-1)`} />
      <text x="16" y="148" fill={MUTED} fontSize="8" letterSpacing="0.22em">6 MODULES · WIRED</text>
    </g>
  );
}

// 03 — Setup: connected blocks merging into pipeline
function BuildScene() {
  const blocks = ["VIETNE", "FORMAS", "CRM", "ATRIBŪCIJA", "PANELIS"];
  return (
    <g>
      <text x="16" y="20" fill={ACCENT} fontSize="9" letterSpacing="0.2em" fontWeight="700">CONNECT</text>
      {blocks.map((b, i) => {
        const x = 20 + i * 66;
        return (
          <g key={b}>
            <rect x={x} y="60" width="58" height="36" fill="rgba(8,12,10,0.7)" stroke={ACCENT} strokeWidth="1" />
            <text x={x + 29} y="82" textAnchor="middle" fill={TEXT} fontSize="8" fontWeight="700" letterSpacing="0.1em">{b}</text>
            {i < blocks.length - 1 && (
              <line x1={x + 58} y1="78" x2={x + 66} y2="78" stroke={ACCENT} strokeWidth="1.2" markerEnd={`url(#proc-arr-2)`} />
            )}
            <circle cx={x + 29} cy="60" r="2" fill={ACCENT} />
          </g>
        );
      })}
      {/* pipeline below */}
      <rect x="20" y="116" width="320" height="10" fill="rgba(8,12,10,0.7)" stroke={DIM} strokeWidth="0.8" />
      <rect x="20" y="116" width="260" height="10" fill="rgba(59,255,124,0.22)" />
      <text x="20" y="148" fill={MUTED} fontSize="8" letterSpacing="0.22em">SAVIENOTA PLŪSMA · 81%</text>
    </g>
  );
}

// 04 — Handover: manual + people
function HandoverScene() {
  return (
    <g>
      <text x="16" y="20" fill={ACCENT} fontSize="9" letterSpacing="0.2em" fontWeight="700">HANDOVER</text>
      {/* manual */}
      <rect x="30" y="40" width="120" height="100" fill="rgba(8,12,10,0.7)" stroke={ACCENT} strokeWidth="1.2" />
      <line x1="30" y1="56" x2="150" y2="56" stroke={DIM} strokeWidth="0.8" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="42" y1={70 + i * 14} x2={i === 1 ? 124 : 138} y2={70 + i * 14} stroke={DIM} strokeWidth="0.8" />
      ))}
      <text x="38" y="50" fill={ACCENT} fontSize="8" letterSpacing="0.16em" fontWeight="700">SOP · DOCS</text>

      {/* arrow to team */}
      <line x1="160" y1="90" x2="200" y2="90" stroke={ACCENT} strokeWidth="1.4" markerEnd={`url(#proc-arr-3)`} />

      {/* team silhouettes */}
      {[0, 1, 2].map((i) => {
        const x = 220 + i * 40;
        return (
          <g key={i}>
            <circle cx={x} cy="74" r="9" fill="rgba(8,12,10,0.85)" stroke={ACCENT} strokeWidth="1.2" />
            <path d={`M${x - 13} 110 Q${x} 92 ${x + 13} 110 L${x + 13} 124 L${x - 13} 124 Z`} fill="rgba(8,12,10,0.85)" stroke={ACCENT} strokeWidth="1.2" />
          </g>
        );
      })}
      <text x="260" y="148" textAnchor="middle" fill={MUTED} fontSize="8" letterSpacing="0.22em">KOMANDA · GATAVA</text>
    </g>
  );
}

// 05 — Optimize: closed improvement loop
function OptimizeScene() {
  return (
    <g>
      <text x="16" y="20" fill={ACCENT} fontSize="9" letterSpacing="0.2em" fontWeight="700">MONTHLY LOOP</text>
      <g transform="translate(180,82)">
        {/* outer loop */}
        <circle r="56" fill="none" stroke={DIM} strokeWidth="1" strokeDasharray="3 3" />
        {/* 4 nodes */}
        {[
          { a: -90, label: "READ" },
          { a: 0, label: "TUNE" },
          { a: 90, label: "SHIP" },
          { a: 180, label: "MEASURE" }
        ].map((n) => {
          const r = 56;
          const x = Math.cos((n.a * Math.PI) / 180) * r;
          const y = Math.sin((n.a * Math.PI) / 180) * r;
          return (
            <g key={n.label} transform={`translate(${x},${y})`}>
              <circle r="14" fill="rgba(8,12,10,0.95)" stroke={ACCENT} strokeWidth="1.4" />
              <text textAnchor="middle" y="3" fill={ACCENT} fontSize="8" fontWeight="700" letterSpacing="0.1em">{n.label}</text>
            </g>
          );
        })}
        {/* arrows on the ring */}
        {[-45, 45, 135, -135].map((a, i) => {
          const r = 56;
          const x = Math.cos((a * Math.PI) / 180) * r;
          const y = Math.sin((a * Math.PI) / 180) * r;
          return <polygon key={i} points={`${x - 3},${y - 3} ${x + 4},${y} ${x - 3},${y + 3}`} fill={ACCENT} transform={`rotate(${a + 90} ${x} ${y})`} />;
        })}
        {/* center */}
        <circle r="6" fill={ACCENT} />
      </g>
      <text x="16" y="148" fill={MUTED} fontSize="8" letterSpacing="0.22em">SISTĒMA · KĻŪST PRECĪZĀKA</text>
    </g>
  );
}
