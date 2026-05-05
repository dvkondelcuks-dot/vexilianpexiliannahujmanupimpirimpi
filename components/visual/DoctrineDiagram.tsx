"use client";

import { Box } from "@mui/material";

export type DoctrineDiagramMode = "position" | "model" | "boundary";

const ACCENT = "#3BFF7C";
const DIM = "rgba(59,255,124,0.45)";
const TEXT = "#F4F7FA";
const MUTED = "#A7B0BA";
const AMBER = "#E6A84A";

const W = 760;
const H = 320;

function Defs() {
  return (
    <defs>
      <pattern id="dd-grid" width="32" height="32" patternUnits="userSpaceOnUse">
        <path d="M32 0H0V32" fill="none" stroke="rgba(59,255,124,0.04)" strokeWidth="1" />
      </pattern>
      <marker id="dd-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
        <path d="M0 0 L10 5 L0 10 Z" fill={ACCENT} />
      </marker>
      <marker id="dd-arr-amber" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
        <path d="M0 0 L10 5 L0 10 Z" fill={AMBER} />
      </marker>
    </defs>
  );
}

// label tag
function EyebrowTag({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <text x={x} y={y} fill={ACCENT} fontSize="10" letterSpacing="0.18em" fontWeight="700">{label}</text>
  );
}

// Position: 7 icons in a row connected by arrows
function Position() {
  const items = [
    { label: "VIETNE", icon: "globe" },
    { label: "SATURS", icon: "doc" },
    { label: "FORMA", icon: "form" },
    { label: "CRM", icon: "user" },
    { label: "ATRIBŪCIJA", icon: "target" },
    { label: "ATGŪŠANA", icon: "loop" },
    { label: "PANELIS", icon: "bars" }
  ];
  const startX = 50;
  const stepX = 100;
  const y = 120;
  const r = 26;
  return (
    <g>
      <EyebrowTag x={36} y={48} label="VIENA SAVIENOTA KOMERCIĀLĀ PLŪSMA" />
      {items.map((it, i) => {
        const cx = startX + i * stepX + r;
        return (
          <g key={it.label}>
            <rect x={cx - r} y={y - r} width={r * 2} height={r * 2} rx={6} fill="rgba(8,12,10,0.7)" stroke={ACCENT} strokeWidth="1.4" />
            <IconSwitch icon={it.icon} cx={cx} cy={y} />
            <text x={cx} y={y + r + 18} textAnchor="middle" fill={TEXT} fontSize="10" letterSpacing="0.1em" fontWeight="600">{it.label}</text>
            {i < items.length - 1 ? (
              <path d={`M${cx + r + 4} ${y} L${cx + stepX - r - 6} ${y}`} stroke={ACCENT} strokeWidth="1.3" markerEnd="url(#dd-arr)" />
            ) : null}
          </g>
        );
      })}
    </g>
  );
}

function IconSwitch({ icon, cx, cy }: { icon: string; cx: number; cy: number }) {
  switch (icon) {
    case "globe":
      return (
        <g transform={`translate(${cx - 12},${cy - 12})`} fill="none" stroke={ACCENT} strokeWidth="1.4">
          <circle cx="12" cy="12" r="11" />
          <ellipse cx="12" cy="12" rx="5" ry="11" />
          <line x1="1" y1="12" x2="23" y2="12" />
        </g>
      );
    case "doc":
      return (
        <g transform={`translate(${cx - 10},${cy - 12})`} fill="none" stroke={ACCENT} strokeWidth="1.4">
          <path d="M2 2 H14 L20 8 V22 H2 Z" />
          <path d="M14 2 V8 H20" />
          <line x1="6" y1="13" x2="16" y2="13" />
          <line x1="6" y1="17" x2="14" y2="17" />
        </g>
      );
    case "form":
      return (
        <g transform={`translate(${cx - 11},${cy - 11})`} fill="none" stroke={ACCENT} strokeWidth="1.4">
          <rect x="1" y="1" width="20" height="22" rx="2" />
          <line x1="5" y1="7" x2="17" y2="7" />
          <line x1="5" y1="12" x2="13" y2="12" />
          <rect x="5" y="16" width="8" height="4" rx="1" fill={ACCENT} fillOpacity="0.4" />
        </g>
      );
    case "user":
      return (
        <g transform={`translate(${cx - 10},${cy - 11})`} fill="none" stroke={ACCENT} strokeWidth="1.4">
          <circle cx="10" cy="7" r="5" />
          <path d="M0 22 Q10 12 20 22" />
        </g>
      );
    case "target":
      return (
        <g transform={`translate(${cx - 12},${cy - 12})`} fill="none" stroke={ACCENT} strokeWidth="1.4">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill={ACCENT} />
        </g>
      );
    case "loop":
      return (
        <g transform={`translate(${cx - 12},${cy - 12})`} fill="none" stroke={ACCENT} strokeWidth="1.4">
          <path d="M4 12 a8 8 0 0 1 16 0 a8 8 0 0 1 -14 5" />
          <path d="M3 13 L6 17 L9 13" />
        </g>
      );
    case "bars":
      return (
        <g transform={`translate(${cx - 12},${cy - 12})`} fill="none" stroke={ACCENT} strokeWidth="1.4">
          <line x1="4" y1="20" x2="4" y2="14" />
          <line x1="10" y1="20" x2="10" y2="8" />
          <line x1="16" y1="20" x2="16" y2="11" />
          <line x1="20" y1="20" x2="20" y2="5" />
        </g>
      );
    default:
      return null;
  }
}

// Model: assembly-line metaphor — three stations BŪVĒT → NODOT → KALIBRĒT,
// raw input feeds in from the left, finished system flows out to the right,
// and a continuous IKMĒNEŠA CIKLS arc carries learnings back to BŪVĒT.
function Model() {
  const stations = [
    {
      label: "BŪVĒT",
      sub: "ARHITEKTŪRA",
      x: 170,
      icon: (cx: number, cy: number) => (
        <g transform={`translate(${cx - 18},${cy - 18})`} fill="none" stroke={ACCENT} strokeWidth="1.6">
          {/* gear */}
          <circle cx="18" cy="18" r="9" />
          <circle cx="18" cy="18" r="3" fill={ACCENT} />
          {[0, 60, 120, 180, 240, 300].map((a) => {
            const rad = (a * Math.PI) / 180;
            const x1 = 18 + Math.cos(rad) * 11;
            const y1 = 18 + Math.sin(rad) * 11;
            const x2 = 18 + Math.cos(rad) * 16;
            const y2 = 18 + Math.sin(rad) * 16;
            return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>
      )
    },
    {
      label: "NODOT",
      sub: "KOMANDAI",
      x: 380,
      icon: (cx: number, cy: number) => (
        <g transform={`translate(${cx - 18},${cy - 18})`} fill="none" stroke={ACCENT} strokeWidth="1.6">
          {/* package + key */}
          <rect x="2" y="6" width="22" height="22" rx="2" />
          <line x1="2" y1="14" x2="24" y2="14" />
          <line x1="13" y1="6" x2="13" y2="28" />
          {/* key */}
          <circle cx="28" cy="20" r="3" />
          <line x1="31" y1="20" x2="36" y2="20" />
        </g>
      )
    },
    {
      label: "KALIBRĒT",
      sub: "IKMĒNESI",
      x: 590,
      icon: (cx: number, cy: number) => (
        <g transform={`translate(${cx - 18},${cy - 18})`} fill="none" stroke={ACCENT} strokeWidth="1.6">
          {/* slider controls */}
          <line x1="4" y1="8"  x2="32" y2="8" />
          <line x1="4" y1="18" x2="32" y2="18" />
          <line x1="4" y1="28" x2="32" y2="28" />
          <circle cx="22" cy="8"  r="3" fill={ACCENT} />
          <circle cx="12" cy="18" r="3" fill={ACCENT} />
          <circle cx="26" cy="28" r="3" fill={ACCENT} />
        </g>
      )
    }
  ];
  const yMid = 150;
  const stationW = 110;
  const stationH = 110;

  return (
    <g>
      <EyebrowTag x={36} y={36} label="DARBĪBAS MODELIS · MONTĀŽAS LĪNIJA" />

      {/* conveyor belt baseline */}
      <line x1="36" y1={yMid + stationH / 2 + 6} x2={W - 36} y2={yMid + stationH / 2 + 6} stroke={DIM} strokeWidth="1" />
      <line x1="36" y1={yMid + stationH / 2 + 12} x2={W - 36} y2={yMid + stationH / 2 + 12} stroke={DIM} strokeWidth="0.7" strokeDasharray="3 4" />
      {/* belt rollers */}
      {[58, 130, 220, 290, 380, 450, 540, 610, 700].map((bx) => (
        <circle key={bx} cx={bx} cy={yMid + stationH / 2 + 9} r="3" fill="rgba(8,12,10,0.9)" stroke={DIM} strokeWidth="0.8" />
      ))}

      {/* RAW input on far left */}
      <g transform={`translate(36,${yMid - 28})`}>
        <rect width="60" height="56" rx="4" fill="rgba(8,12,10,0.7)" stroke={DIM} strokeWidth="1" strokeDasharray="3 3" />
        <text x="30" y="22" textAnchor="middle" fill={MUTED} fontSize="8" letterSpacing="0.16em" fontWeight="700">IZEJVIELA</text>
        <text x="30" y="36" textAnchor="middle" fill={MUTED} fontSize="7" letterSpacing="0.12em">FRAGMENTI</text>
        <text x="30" y="48" textAnchor="middle" fill={MUTED} fontSize="7" letterSpacing="0.12em">RĪKI · DATI</text>
      </g>
      <line x1="98" y1={yMid} x2={170 - stationW / 2 - 4} y2={yMid} stroke={ACCENT} strokeWidth="1.3" markerEnd="url(#dd-arr)" />

      {/* 3 stations */}
      {stations.map((s, i) => {
        const cx = s.x;
        return (
          <g key={s.label}>
            {/* station bay */}
            <rect x={cx - stationW / 2} y={yMid - stationH / 2} width={stationW} height={stationH} rx={8} fill="rgba(8,14,10,0.78)" stroke={ACCENT} strokeWidth="1.4" />
            {/* corner brackets inside bay */}
            <path d={`M${cx - stationW / 2 + 6} ${yMid - stationH / 2 + 14} V${yMid - stationH / 2 + 6} H${cx - stationW / 2 + 14}`} stroke={ACCENT} strokeWidth="1" fill="none" />
            <path d={`M${cx + stationW / 2 - 14} ${yMid - stationH / 2 + 6} H${cx + stationW / 2 - 6} V${yMid - stationH / 2 + 14}`} stroke={ACCENT} strokeWidth="1" fill="none" />
            {/* station number */}
            <text x={cx - stationW / 2 + 8} y={yMid - stationH / 2 + 22} fill={ACCENT} fontSize="9" letterSpacing="0.18em" fontWeight="700">0{i + 1}</text>
            {/* icon */}
            <g>{s.icon(cx, yMid - 4)}</g>
            {/* label */}
            <text x={cx} y={yMid + stationH / 2 - 22} textAnchor="middle" fill={TEXT} fontSize="13" letterSpacing="0.14em" fontWeight="700">{s.label}</text>
            <text x={cx} y={yMid + stationH / 2 - 8} textAnchor="middle" fill={MUTED} fontSize="9" letterSpacing="0.18em">{s.sub}</text>
            {/* connector arrow to next */}
            {i < stations.length - 1 ? (
              <path d={`M${cx + stationW / 2 + 4} ${yMid} L${stations[i + 1].x - stationW / 2 - 6} ${yMid}`} stroke={ACCENT} strokeWidth="1.3" markerEnd="url(#dd-arr)" />
            ) : null}
          </g>
        );
      })}

      {/* OUTPUT on far right */}
      <line x1={stations[2].x + stationW / 2 + 4} y1={yMid} x2={W - 110} y2={yMid} stroke={ACCENT} strokeWidth="1.3" markerEnd="url(#dd-arr)" />
      <g transform={`translate(${W - 100},${yMid - 28})`}>
        <rect width="64" height="56" rx="4" fill="rgba(8,30,15,0.65)" stroke={ACCENT} strokeWidth="1.2" />
        <text x="32" y="22" textAnchor="middle" fill={ACCENT} fontSize="8" letterSpacing="0.16em" fontWeight="700">SISTĒMA</text>
        <text x="32" y="36" textAnchor="middle" fill={TEXT} fontSize="7" letterSpacing="0.1em">SAVIENOTA</text>
        <text x="32" y="48" textAnchor="middle" fill={TEXT} fontSize="7" letterSpacing="0.1em">REDZAMA · DZĪVA</text>
      </g>

      {/* CONTINUOUS LOOP arc — output back to BŪVĒT */}
      <path
        d={`M${W - 70} ${yMid - 28} C${W - 70} 70, 200 70, ${stations[0].x} ${yMid - stationH / 2 - 4}`}
        stroke={ACCENT}
        strokeWidth="1.4"
        fill="none"
        strokeDasharray="6 4"
        markerEnd="url(#dd-arr)"
      />
      <text x={W / 2 + 30} y={66} textAnchor="middle" fill={ACCENT} fontSize="10" letterSpacing="0.2em" fontWeight="700">IKMĒNEŠA CIKLS · LASĪT → REGULĒT</text>
    </g>
  );
}

// Boundary: a vertical filter / sieve metaphor.
// Mixed inquiries fall in from the top, the filter membrane checks 3 criteria,
// rejected types deflect aside (amber), qualified ones drop through to the bottom (green).
function Boundary() {
  const yTop = 70;
  const yMembrane = 150;
  const yBottom = 230;
  const cxFunnel = W / 2;
  const halfWidth = 240;
  // incoming pellets — labels above the funnel
  const incoming = [
    { x: cxFunnel - 200, label: "BEZ MĒRĶA",   ok: false },
    { x: cxFunnel - 100, label: "ZEMA PLŪSMA", ok: false },
    { x: cxFunnel +   0, label: "AR ĪPAŠNIEKU", ok: true  },
    { x: cxFunnel + 100, label: "AR MĒRĶI",    ok: true  },
    { x: cxFunnel + 200, label: "BEZ ĪPAŠNIEKA", ok: false }
  ];
  // criteria checked at the membrane
  const criteria = [
    { x: cxFunnel - 140, label: "MĒRĶIS"    },
    { x: cxFunnel,        label: "PLŪSMA"   },
    { x: cxFunnel + 140, label: "ĪPAŠNIEKS" }
  ];
  return (
    <g>
      <EyebrowTag x={36} y={36} label="ROBEŽAS · KVALIFIKĀCIJAS FILTRS" />

      {/* Top zone: incoming pool */}
      <text x={cxFunnel - halfWidth} y={yTop - 12} fill={MUTED} fontSize="9" letterSpacing="0.2em" fontWeight="700">IENĀKOŠAIS · JAUKTI PIEPRASĪJUMI</text>
      <rect x={cxFunnel - halfWidth} y={yTop - 6} width={halfWidth * 2} height={26} rx={4} fill="rgba(8,12,10,0.5)" stroke={DIM} strokeWidth="0.9" strokeDasharray="3 3" />

      {/* incoming pellets */}
      {incoming.map((p) => (
        <g key={p.label}>
          <circle cx={p.x} cy={yTop + 7} r="6" fill={p.ok ? "rgba(59,255,124,0.35)" : "rgba(230,168,74,0.35)"} stroke={p.ok ? ACCENT : AMBER} strokeWidth="1.1" />
          {p.ok ? (
            <path d={`M${p.x - 2.4} ${yTop + 7} L${p.x - 0.5} ${yTop + 9.4} L${p.x + 3} ${yTop + 4}`} stroke={ACCENT} strokeWidth="1.4" fill="none" />
          ) : (
            <g>
              <line x1={p.x - 2.5} y1={yTop + 4.5} x2={p.x + 2.5} y2={yTop + 9.5} stroke={AMBER} strokeWidth="1.4" />
              <line x1={p.x + 2.5} y1={yTop + 4.5} x2={p.x - 2.5} y2={yTop + 9.5} stroke={AMBER} strokeWidth="1.4" />
            </g>
          )}
          <text x={p.x} y={yTop - 14} textAnchor="middle" fill={p.ok ? ACCENT : AMBER} fontSize="7.5" letterSpacing="0.1em" fontWeight="700">{p.label}</text>
        </g>
      ))}

      {/* funnel walls — converging from full width to membrane width */}
      <path d={`M${cxFunnel - halfWidth} ${yTop + 22} L${cxFunnel - 90} ${yMembrane - 6}`} stroke={ACCENT} strokeWidth="1.3" fill="none" />
      <path d={`M${cxFunnel + halfWidth} ${yTop + 22} L${cxFunnel + 90} ${yMembrane - 6}`} stroke={ACCENT} strokeWidth="1.3" fill="none" />
      {/* faint inner walls to suggest depth */}
      <path d={`M${cxFunnel - halfWidth + 14} ${yTop + 22} L${cxFunnel - 84} ${yMembrane - 6}`} stroke={DIM} strokeWidth="0.7" fill="none" strokeDasharray="2 4" />
      <path d={`M${cxFunnel + halfWidth - 14} ${yTop + 22} L${cxFunnel + 84} ${yMembrane - 6}`} stroke={DIM} strokeWidth="0.7" fill="none" strokeDasharray="2 4" />

      {/* MEMBRANE (filter row) */}
      <rect x={cxFunnel - 200} y={yMembrane} width={400} height={20} rx={3} fill="rgba(8,14,10,0.85)" stroke={ACCENT} strokeWidth="1.4" />
      {/* slits */}
      {Array.from({ length: 13 }).map((_, i) => (
        <line key={i} x1={cxFunnel - 188 + i * 32} y1={yMembrane + 3} x2={cxFunnel - 188 + i * 32} y2={yMembrane + 17} stroke={ACCENT} strokeWidth="1" opacity="0.55" />
      ))}
      {/* criteria badges sit on the membrane */}
      {criteria.map((c) => (
        <g key={c.label} transform={`translate(${c.x - 38},${yMembrane - 28})`}>
          <rect width="76" height="22" rx="11" fill="rgba(8,12,10,0.95)" stroke={ACCENT} strokeWidth="1.1" />
          <circle cx="12" cy="11" r="4" fill={ACCENT} />
          <path d="M9.5 11 L11.5 13.5 L15 9.5" stroke="#07090b" strokeWidth="1.4" fill="none" />
          <text x="42" y="14" textAnchor="middle" fill={TEXT} fontSize="8.5" letterSpacing="0.14em" fontWeight="700">{c.label}</text>
        </g>
      ))}

      {/* deflected paths off membrane — rejected items shoot out left + right */}
      <path d={`M${cxFunnel - 90} ${yMembrane} C${cxFunnel - 160} ${yMembrane + 4}, ${cxFunnel - 230} ${yBottom - 30}, ${cxFunnel - 250} ${yBottom + 0}`} stroke={AMBER} strokeWidth="1.2" strokeDasharray="4 3" fill="none" markerEnd="url(#dd-arr-amber)" />
      <path d={`M${cxFunnel + 90} ${yMembrane} C${cxFunnel + 160} ${yMembrane + 4}, ${cxFunnel + 230} ${yBottom - 30}, ${cxFunnel + 250} ${yBottom + 0}`} stroke={AMBER} strokeWidth="1.2" strokeDasharray="4 3" fill="none" markerEnd="url(#dd-arr-amber)" />
      {/* rejected end-caps */}
      <g transform={`translate(${cxFunnel - 296},${yBottom - 12})`}>
        <rect width="64" height="26" rx="4" fill="rgba(38,18,8,0.55)" stroke={AMBER} strokeWidth="1.1" strokeDasharray="3 3" />
        <text x="32" y="11" textAnchor="middle" fill={AMBER} fontSize="7" letterSpacing="0.16em" fontWeight="700">NORAIDĪTS</text>
        <text x="32" y="20" textAnchor="middle" fill={MUTED} fontSize="6.5">cita ekspertīze</text>
      </g>
      <g transform={`translate(${cxFunnel + 232},${yBottom - 12})`}>
        <rect width="64" height="26" rx="4" fill="rgba(38,18,8,0.55)" stroke={AMBER} strokeWidth="1.1" strokeDasharray="3 3" />
        <text x="32" y="11" textAnchor="middle" fill={AMBER} fontSize="7" letterSpacing="0.16em" fontWeight="700">NORAIDĪTS</text>
        <text x="32" y="20" textAnchor="middle" fill={MUTED} fontSize="6.5">nav komerciāla mērķa</text>
      </g>

      {/* qualified pellets that pass through and drop into the catch tray */}
      {[cxFunnel - 22, cxFunnel + 16, cxFunnel - 2].map((px, i) => (
        <g key={i}>
          <line x1={px} y1={yMembrane + 22} x2={px} y2={yBottom - 10} stroke={ACCENT} strokeWidth="1.1" strokeDasharray="2 3" />
          <circle cx={px} cy={yBottom - 6} r="4" fill={ACCENT} fillOpacity="0.85" />
        </g>
      ))}
      {/* qualified catch tray */}
      <rect x={cxFunnel - 110} y={yBottom + 4} width={220} height={32} rx={4} fill="rgba(8,30,15,0.65)" stroke={ACCENT} strokeWidth="1.4" />
      <text x={cxFunnel - 100} y={yBottom + 18} fill={ACCENT} fontSize="9" letterSpacing="0.2em" fontWeight="700">PIEŅEMTS · KVALIFICĒTS</text>
      <text x={cxFunnel - 100} y={yBottom + 30} fill={MUTED} fontSize="7.5" letterSpacing="0.14em">VEXILIAN STRĀDĀ \u2192 SISTĒMA TIEK B\u016aV\u0112TA</text>
    </g>
  );
}

const MODES: Record<DoctrineDiagramMode, () => React.JSX.Element> = {
  position: Position,
  model: Model,
  boundary: Boundary
};

export function DoctrineDiagram({ mode }: { mode: DoctrineDiagramMode }) {
  const Visual = MODES[mode];
  return (
    <Box sx={{ width: "100%", border: "1px solid rgba(59,255,124,0.18)", borderRadius: 2, background: "rgba(7,9,11,0.55)", overflow: "hidden" }}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "auto", display: "block" }}>
        <Defs />
        <rect x="0" y="0" width={W} height={H} fill="url(#dd-grid)" />
        {/* corner brackets */}
        <path d={`M8 18 V8 H18`} stroke={ACCENT} strokeWidth="1.2" fill="none" />
        <path d={`M${W - 18} 8 H${W - 8} V18`} stroke={ACCENT} strokeWidth="1.2" fill="none" />
        <path d={`M8 ${H - 18} V${H - 8} H18`} stroke={ACCENT} strokeWidth="1.2" fill="none" />
        <path d={`M${W - 18} ${H - 8} H${W - 8} V${H - 18}`} stroke={ACCENT} strokeWidth="1.2" fill="none" />
        <Visual />
      </svg>
    </Box>
  );
}
