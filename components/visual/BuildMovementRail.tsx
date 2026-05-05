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
                POSMS
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
                minHeight: 220
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
  const W = 760;
  const H = 320;
  const PAD = 16;
  const BR = 14; // bracket size
  return (
    <svg
      viewBox={`${-PAD} 0 ${W + PAD * 2} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      <defs>
        <pattern id={`proc-grid-${index}`} width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="rgba(59,255,124,0.06)" strokeWidth="0.7" />
        </pattern>
        <marker id={`proc-arr-${index}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill={ACCENT} />
        </marker>
        <radialGradient id={`proc-glow-${index}`} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="rgba(59,255,124,0.18)" />
          <stop offset="100%" stopColor="rgba(8,12,10,0)" />
        </radialGradient>
      </defs>

      {/* full canvas grid */}
      <rect x={-PAD} y={0} width={W + PAD * 2} height={H} fill={`url(#proc-grid-${index})`} />

      {/* corner brackets */}
      <path d={`M0 ${BR} V0 H${BR}`} stroke={ACCENT} strokeWidth="1.4" fill="none" />
      <path d={`M${W - BR} 0 H${W} V${BR}`} stroke={ACCENT} strokeWidth="1.4" fill="none" />
      <path d={`M0 ${H - BR} V${H} H${BR}`} stroke={ACCENT} strokeWidth="1.4" fill="none" />
      <path d={`M${W - BR} ${H} H${W} V${H - BR}`} stroke={ACCENT} strokeWidth="1.4" fill="none" />

      {/* inner illustration scaled 2× from original 360×160 = 720×320, centered with 20px gutter */}
      <g transform="translate(20,0) scale(2,2)">
        {index === 0 && <AuditScene />}
        {index === 1 && <BlueprintScene />}
        {index === 2 && <BuildScene />}
        {index === 3 && <HandoverScene />}
        {index === 4 && <OptimizeScene />}
      </g>
    </svg>
  );
}

// 01 — Audits: scanner sweeps the existing stack and exposes leak points
function AuditScene() {
  const layers = [
    { label: "VIETNE",   leaks: [70, 230] },
    { label: "FORMAS",   leaks: [140] },
    { label: "CRM",      leaks: [50, 200] },
    { label: "ATGŪŠANA", leaks: [110, 260] }
  ];
  const lyH = 22;
  const left = 18;
  const right = 280;
  const top = 32;
  return (
    <g>
      <text x={left} y="20" fill={ACCENT} fontSize="9" letterSpacing="0.2em" fontWeight="700">SISTĒMAS SKENĒŠANA</text>
      {/* stack of layers */}
      {layers.map((ly, i) => {
        const yy = top + i * (lyH + 6);
        return (
          <g key={ly.label}>
            <rect x={left} y={yy} width={right - left} height={lyH} rx={3} fill="rgba(8,12,10,0.7)" stroke={DIM} strokeWidth="0.9" />
            <text x={left + 6} y={yy + 14} fill={MUTED} fontSize="8" letterSpacing="0.16em" fontWeight="700">{ly.label}</text>
            {/* low signal bars inside */}
            <line x1={left + 70} y1={yy + 11} x2={right - 8} y2={yy + 11} stroke={DIM} strokeWidth="0.7" strokeDasharray="2 4" />
            {/* leak markers */}
            {ly.leaks.map((lx, j) => (
              <g key={j} transform={`translate(${left + 70 + lx},${yy + 11})`}>
                <circle r="6" fill="rgba(38,18,8,0.6)" stroke="#E6A84A" strokeWidth="1.2" />
                <line x1="-2.4" y1="-2.4" x2="2.4" y2="2.4" stroke="#E6A84A" strokeWidth="1.2" />
                <line x1="2.4" y1="-2.4" x2="-2.4" y2="2.4" stroke="#E6A84A" strokeWidth="1.2" />
              </g>
            ))}
          </g>
        );
      })}
      {/* scanning beam — vertical sweep with gradient hint */}
      <line x1="170" y1={top - 4} x2="170" y2={top + 4 * (lyH + 6) - 2} stroke={ACCENT} strokeWidth="1.6" strokeDasharray="3 2" />
      <rect x="160" y={top - 4} width="20" height={4 * (lyH + 6) + 2} fill={ACCENT} fillOpacity="0.06" />
      {/* magnifier on the right shows audit findings */}
      <g transform="translate(296,28)">
        <circle cx="22" cy="22" r="22" fill="rgba(8,12,10,0.85)" stroke={ACCENT} strokeWidth="1.4" />
        <circle cx="22" cy="22" r="14" fill="none" stroke={ACCENT} strokeWidth="1" strokeDasharray="2 2" />
        <line x1="36" y1="36" x2="48" y2="48" stroke={ACCENT} strokeWidth="2.4" />
        <text x="22" y="26" textAnchor="middle" fill={ACCENT} fontSize="11" fontWeight="700">A</text>
      </g>
      {/* findings panel */}
      <g transform="translate(264,80)">
        <rect width="92" height="58" rx="3" fill="rgba(8,12,10,0.85)" stroke={DIM} strokeWidth="0.8" />
        <text x="6" y="12" fill={ACCENT} fontSize="7" letterSpacing="0.18em" fontWeight="700">ATKLĀJUMI</text>
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(6,${20 + i * 9})`}>
            <rect width="6" height="6" rx="1" fill={i === 1 || i === 3 ? "#E6A84A" : ACCENT} fillOpacity="0.8" />
            <line x1="12" y1="3" x2="80" y2="3" stroke={DIM} strokeWidth="0.8" />
          </g>
        ))}
      </g>
    </g>
  );
}

// 02 — Architecture: structured blueprint grid
function BlueprintScene() {
  return (
    <g>
      <text x="16" y="20" fill={ACCENT} fontSize="9" letterSpacing="0.2em" fontWeight="700">PLĀNS</text>
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

    </g>
  );
}

// 03 — Setup: connected blocks merging into pipeline
function BuildScene() {
  const blocks = ["VIETNE", "FORMAS", "CRM", "ATRIBŪCIJA", "PANELIS"];
  return (
    <g>
      <text x="16" y="20" fill={ACCENT} fontSize="9" letterSpacing="0.2em" fontWeight="700">SAVIENOT</text>
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

    </g>
  );
}

// 04 — Handover: Vexilian zone → key transfer → Klients zone (docs, training, access)
function HandoverScene() {
  return (
    <g>
      <text x="16" y="20" fill={ACCENT} fontSize="9" letterSpacing="0.2em" fontWeight="700">NODOŠANA · KOMANDAI</text>

      {/* LEFT zone — VEXILIAN */}
      <rect x="18" y="34" width="116" height="116" rx="6" fill="rgba(8,12,10,0.55)" stroke={DIM} strokeWidth="0.9" strokeDasharray="3 3" />
      <text x="76" y="48" textAnchor="middle" fill={ACCENT} fontSize="7.5" letterSpacing="0.22em" fontWeight="700">VEXILIAN</text>
      {/* stacked sealed package */}
      <g transform="translate(40,62)">
        <rect width="72" height="72" rx="4" fill="rgba(8,12,10,0.85)" stroke={ACCENT} strokeWidth="1.2" />
        <line x1="0" y1="24" x2="72" y2="24" stroke={ACCENT} strokeWidth="1" />
        <line x1="36" y1="0" x2="36" y2="72" stroke={ACCENT} strokeWidth="1" />
        {/* seal */}
        <circle cx="36" cy="36" r="9" fill="rgba(59,255,124,0.18)" stroke={ACCENT} strokeWidth="1.2" />
        <text x="36" y="40" textAnchor="middle" fill={ACCENT} fontSize="9" fontWeight="700">V</text>
      </g>

      {/* CENTER — key crossing the boundary */}
      <line x1="138" y1="92" x2="222" y2="92" stroke={ACCENT} strokeWidth="1.4" markerEnd={`url(#proc-arr-3)`} strokeDasharray="4 3" />
      <g transform="translate(160,76)">
        {/* key icon */}
        <circle cx="10" cy="16" r="8" fill="none" stroke={ACCENT} strokeWidth="1.4" />
        <line x1="18" y1="16" x2="44" y2="16" stroke={ACCENT} strokeWidth="1.4" />
        <line x1="34" y1="16" x2="34" y2="22" stroke={ACCENT} strokeWidth="1.4" />
        <line x1="40" y1="16" x2="40" y2="22" stroke={ACCENT} strokeWidth="1.4" />
        <text x="22" y="38" textAnchor="middle" fill={MUTED} fontSize="6.5" letterSpacing="0.14em">PIEKĻUVE</text>
      </g>

      {/* RIGHT zone — KLIENTS */}
      <rect x="226" y="34" width="116" height="116" rx="6" fill="rgba(8,12,10,0.7)" stroke={ACCENT} strokeWidth="1.2" />
      <text x="284" y="48" textAnchor="middle" fill={ACCENT} fontSize="7.5" letterSpacing="0.22em" fontWeight="700">KLIENTS</text>
      {/* 3 deliverable mini-cards */}
      {[
        { lab: "DOKS", glyph: "doc" },
        { lab: "MĀCĪBA", glyph: "play" },
        { lab: "ATSL.", glyph: "key" }
      ].map((d, i) => {
        const xx = 234 + i * 36;
        return (
          <g key={d.lab} transform={`translate(${xx},62)`}>
            <rect width="32" height="40" rx="3" fill="rgba(8,12,10,0.9)" stroke={ACCENT} strokeWidth="1" />
            {d.glyph === "doc" && (
              <g transform="translate(8,8)" fill="none" stroke={ACCENT} strokeWidth="1.1">
                <path d="M0 0 H10 L16 6 V20 H0 Z" />
                <line x1="3" y1="11" x2="13" y2="11" />
                <line x1="3" y1="15" x2="11" y2="15" />
              </g>
            )}
            {d.glyph === "play" && (
              <g transform="translate(8,9)" fill="none" stroke={ACCENT} strokeWidth="1.1">
                <circle cx="8" cy="8" r="8" />
                <path d="M6 4 L13 8 L6 12 Z" fill={ACCENT} />
              </g>
            )}
            {d.glyph === "key" && (
              <g transform="translate(7,11)" fill="none" stroke={ACCENT} strokeWidth="1.1">
                <circle cx="4" cy="4" r="3.5" />
                <line x1="7" y1="4" x2="18" y2="4" />
                <line x1="14" y1="4" x2="14" y2="7" />
              </g>
            )}
            <text x="16" y="56" textAnchor="middle" fill={MUTED} fontSize="6" letterSpacing="0.12em">{d.lab}</text>
          </g>
        );
      })}
      {/* team silhouettes inside klients zone */}
      <g transform="translate(238,118)">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${i * 36},0)`}>
            <circle cx="14" cy="10" r="6" fill="rgba(8,12,10,0.9)" stroke={ACCENT} strokeWidth="1" />
            <path d="M2 24 Q14 14 26 24" fill="none" stroke={ACCENT} strokeWidth="1" />
          </g>
        ))}
      </g>


    </g>
  );
}

// 05 — Optimize: monthly timeline shows metrics improving + dashboard mirror
function OptimizeScene() {
  // 6 months of bar pairs: signal in, output up
  const months = ["M1", "M2", "M3", "M4", "M5", "M6"];
  const out = [22, 30, 38, 50, 62, 78];
  const signal = [40, 50, 56, 64, 72, 84];
  const baseY = 116;
  const colW = 28;
  const colGap = 6;
  const startX = 18;
  return (
    <g>
      <text x="16" y="20" fill={ACCENT} fontSize="9" letterSpacing="0.2em" fontWeight="700">IKMĒNEŠA REGULĒŠANAS CIKLS</text>

      {/* baseline + grid */}
      <line x1={startX - 2} y1={baseY} x2={startX + months.length * (colW + colGap) - colGap + 2} y2={baseY} stroke={DIM} strokeWidth="0.9" />
      {[20, 40, 60, 80].map((g) => (
        <line key={g} x1={startX - 2} y1={baseY - g} x2={startX + months.length * (colW + colGap) - colGap + 2} y2={baseY - g} stroke={DIM} strokeWidth="0.4" strokeDasharray="2 4" />
      ))}

      {/* paired bars per month */}
      {months.map((m, i) => {
        const x = startX + i * (colW + colGap);
        const sH = signal[i];
        const oH = out[i];
        return (
          <g key={m}>
            {/* signal (faint) */}
            <rect x={x} y={baseY - sH} width={colW / 2 - 1} height={sH} fill={ACCENT} fillOpacity="0.22" />
            {/* output (solid) */}
            <rect x={x + colW / 2 + 1} y={baseY - oH} width={colW / 2 - 1} height={oH} fill={ACCENT} fillOpacity={0.55 + i * 0.06} />
            {/* tick label */}
            <text x={x + colW / 2} y={baseY + 12} textAnchor="middle" fill={MUTED} fontSize="7.5" letterSpacing="0.1em">{m}</text>
          </g>
        );
      })}
      {/* trend line tying tops of output bars */}
      <path
        d={out
          .map((h, i) => {
            const cx = startX + i * (colW + colGap) + colW / 2 + 1 + (colW / 2 - 1) / 2;
            const cy = baseY - h;
            return `${i === 0 ? "M" : "L"}${cx} ${cy}`;
          })
          .join(" ")}
        stroke={ACCENT}
        strokeWidth="1.4"
        fill="none"
        markerEnd={`url(#proc-arr-4)`}
      />

      {/* RIGHT — dashboard mirror */}
      <g transform="translate(232,30)">
        <rect width="120" height="120" rx="6" fill="rgba(8,12,10,0.78)" stroke={ACCENT} strokeWidth="1.2" />
        <text x="8" y="14" fill={ACCENT} fontSize="7.5" letterSpacing="0.18em" fontWeight="700">VADĪBAS SKATS</text>
        {/* 3 KPI rows that improve */}
        {[
          { lab: "ATBILDE", from: 32, to: 78 },
          { lab: "KVAL.",  from: 18, to: 64 },
          { lab: "ATGŪT.", from: 12, to: 52 }
        ].map((r, i) => {
          const yy = 30 + i * 26;
          return (
            <g key={r.lab} transform={`translate(8,${yy})`}>
              <text x="0" y="6" fill={MUTED} fontSize="7" letterSpacing="0.14em">{r.lab}</text>
              {/* base bar */}
              <rect x="0" y="10" width="100" height="6" rx="1" fill="rgba(255,255,255,0.07)" />
              <rect x="0" y="10" width={r.from} height="6" rx="1" fill={ACCENT} fillOpacity="0.35" />
              {/* improved tip */}
              <rect x={r.from} y="10" width={r.to - r.from} height="6" rx="1" fill={ACCENT} fillOpacity="0.85" />
              <text x="106" y="16" textAnchor="end" fill={ACCENT} fontSize="7" fontWeight="700">{r.to}%</text>
            </g>
          );
        })}
      </g>


    </g>
  );
}
