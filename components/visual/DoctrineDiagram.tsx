"use client";

import { Box } from "@mui/material";

export type DoctrineDiagramMode = "position" | "model" | "boundary";

const ACCENT = "#3BFF7C";
const DIM = "rgba(59,255,124,0.45)";
const TEXT = "#F4F7FA";
const MUTED = "#A7B0BA";
const AMBER = "#E6A84A";

const W = 760;
const H = 280;

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

// Model: same row-of-boxes idiom as Position, with a curved return arc to show the loop
function Model() {
  const items = [
    { label: "BŪVĒT", icon: "wrench" },
    { label: "NODOT", icon: "shake" },
    { label: "LASĪT", icon: "lens" },
    { label: "KALIBRĒT", icon: "target" }
  ];
  const startX = 110;
  const stepX = 150;
  const y = 130;
  const r = 30;
  return (
    <g>
      <EyebrowTag x={36} y={48} label="DARBĪBAS MODELIS · NEPĀRTRAUKTS CIKLS" />
      {items.map((it, i) => {
        const cx = startX + i * stepX + r;
        return (
          <g key={it.label}>
            <rect x={cx - r} y={y - r} width={r * 2} height={r * 2} rx={6} fill="rgba(8,12,10,0.7)" stroke={ACCENT} strokeWidth="1.4" />
            <ModelIcon icon={it.icon} cx={cx} cy={y} />
            <text x={cx} y={y + r + 18} textAnchor="middle" fill={TEXT} fontSize="10" letterSpacing="0.12em" fontWeight="700">{it.label}</text>
            {i < items.length - 1 ? (
              <path d={`M${cx + r + 4} ${y} L${cx + stepX - r - 6} ${y}`} stroke={ACCENT} strokeWidth="1.3" markerEnd="url(#dd-arr)" />
            ) : null}
          </g>
        );
      })}
      {/* return arc from last to first showing continuous cycle */}
      {(() => {
        const lastCx = startX + (items.length - 1) * stepX + r;
        const firstCx = startX + r;
        return (
          <g>
            <path d={`M${lastCx} ${y - r - 4} C${lastCx} ${y - 70}, ${firstCx} ${y - 70}, ${firstCx} ${y - r - 4}`} stroke={ACCENT} strokeWidth="1.3" fill="none" strokeDasharray="5 4" markerEnd="url(#dd-arr)" />
            <text x={(lastCx + firstCx) / 2} y={y - 76} textAnchor="middle" fill={ACCENT} fontSize="9" letterSpacing="0.18em" fontWeight="700">IKMĒNEŠA CIKLS</text>
          </g>
        );
      })()}
    </g>
  );
}

function ModelIcon({ icon, cx, cy }: { icon: string; cx: number; cy: number }) {
  switch (icon) {
    case "wrench":
      return (
        <g transform={`translate(${cx - 10},${cy - 10})`} fill="none" stroke={ACCENT} strokeWidth="1.4">
          <path d="M3 17 L13 7 a4 4 0 1 1 -3 -3 L0 14" />
          <path d="M5 15 L13 7" />
        </g>
      );
    case "shake":
      return (
        <g transform={`translate(${cx - 12},${cy - 8})`} fill="none" stroke={ACCENT} strokeWidth="1.4">
          <path d="M4 12 L10 6 L14 10 L20 6" />
          <path d="M0 8 L4 12 M20 6 L24 10" />
        </g>
      );
    case "lens":
      return (
        <g transform={`translate(${cx - 10},${cy - 10})`} fill="none" stroke={ACCENT} strokeWidth="1.4">
          <circle cx="8" cy="8" r="6" />
          <line x1="13" y1="13" x2="20" y2="20" />
        </g>
      );
    case "target":
      return (
        <g transform={`translate(${cx - 10},${cy - 10})`} fill="none" stroke={ACCENT} strokeWidth="1.4">
          <circle cx="10" cy="10" r="9" />
          <circle cx="10" cy="10" r="4" />
          <line x1="10" y1="0" x2="10" y2="3" />
          <line x1="10" y1="17" x2="10" y2="20" />
          <line x1="0" y1="10" x2="3" y2="10" />
          <line x1="17" y1="10" x2="20" y2="10" />
        </g>
      );
    default:
      return null;
  }
}

// Boundary: row idiom — rejected items (left, amber) → GATE → accepted (right, green)
function Boundary() {
  const rejected = [
    { label: "NAV MĒRĶA", icon: "x" },
    { label: "ZEMA PLŪSMA", icon: "down" },
    { label: "NAV ĪPAŠNIEKA", icon: "user" }
  ];
  const accepted = [
    { label: "KVALIFICĒTS", icon: "user" },
    { label: "CIKLS LIVE", icon: "loop" },
    { label: "ĪPAŠNIEKS", icon: "bars" }
  ];
  const startXL = 28;
  const stepX = 90;
  const y = 130;
  const r = 26;
  const gateCx = startXL + rejected.length * stepX + r + 30;
  const startXR = gateCx + 50;
  return (
    <g>
      <EyebrowTag x={36} y={48} label="ROBEŽAS · KVALIFIKĀCIJAS VĀRTI" />
      {/* rejected row */}
      {rejected.map((it, i) => {
        const cx = startXL + i * stepX + r;
        return (
          <g key={it.label}>
            <rect x={cx - r} y={y - r} width={r * 2} height={r * 2} rx={6} fill="rgba(38,18,8,0.55)" stroke={AMBER} strokeWidth="1.4" strokeDasharray="4 3" />
            <BoundaryIcon icon={it.icon} cx={cx} cy={y} color={AMBER} />
            <text x={cx} y={y + r + 18} textAnchor="middle" fill={TEXT} fontSize="9" letterSpacing="0.1em" fontWeight="600">{it.label}</text>
            <path d={`M${cx + r + 4} ${y} L${gateCx - 30} ${y}`} stroke={AMBER} strokeWidth="1.1" strokeDasharray="3 3" markerEnd="url(#dd-arr-amber)" />
          </g>
        );
      })}
      <text x={(startXL + gateCx) / 2 - 30} y={y - 14} textAnchor="middle" fill={AMBER} fontSize="8" letterSpacing="0.18em" fontWeight="700">NORAIDĪTS</text>
      {/* gate */}
      <g transform={`translate(${gateCx - 32},${y - 50})`}>
        <rect width="64" height="100" rx="6" fill="rgba(8,12,10,0.85)" stroke={ACCENT} strokeWidth="1.4" />
        <text x="32" y="18" textAnchor="middle" fill={ACCENT} fontSize="9" letterSpacing="0.2em" fontWeight="700">VĀRTI</text>
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={10} y1={28 + i * 14} x2={54} y2={28 + i * 14} stroke={DIM} strokeWidth="1" />
        ))}
        <path d="M32 24 L52 50 L32 76 L12 50 Z" fill="rgba(59,255,124,0.1)" stroke={ACCENT} strokeWidth="1.2" />
        <circle cx="32" cy="50" r="5" fill={ACCENT} />
        <text x="32" y="94" textAnchor="middle" fill={MUTED} fontSize="7" letterSpacing="0.18em">KVALIFICĒT</text>
      </g>
      {/* accepted row */}
      {accepted.map((it, i) => {
        const cx = startXR + i * stepX + r;
        return (
          <g key={it.label}>
            <path d={`M${gateCx + 30} ${y} L${cx - r - 4} ${y}`} stroke={ACCENT} strokeWidth="1.3" markerEnd="url(#dd-arr)" />
            <rect x={cx - r} y={y - r} width={r * 2} height={r * 2} rx={6} fill="rgba(8,30,15,0.65)" stroke={ACCENT} strokeWidth="1.4" />
            <BoundaryIcon icon={it.icon} cx={cx} cy={y} color={ACCENT} />
            <text x={cx} y={y + r + 18} textAnchor="middle" fill={TEXT} fontSize="9" letterSpacing="0.1em" fontWeight="600">{it.label}</text>
          </g>
        );
      })}
      <text x={(gateCx + startXR + stepX * (accepted.length - 1) + r) / 2} y={y - 14} textAnchor="middle" fill={ACCENT} fontSize="8" letterSpacing="0.18em" fontWeight="700">PIEŅEMTS</text>
    </g>
  );
}

function BoundaryIcon({ icon, cx, cy, color }: { icon: string; cx: number; cy: number; color: string }) {
  const t = `translate(${cx - 8},${cy - 8})`;
  switch (icon) {
    case "x":
      return (
        <g transform={t} fill="none" stroke={color} strokeWidth="1.4">
          <circle cx="8" cy="8" r="7" />
          <path d="M4 4 L12 12 M4 12 L12 4" />
        </g>
      );
    case "down":
      return (
        <g transform={t} fill="none" stroke={color} strokeWidth="1.4">
          <circle cx="8" cy="8" r="7" />
          <path d="M5 7 L8 11 L11 7" />
        </g>
      );
    case "user":
      return (
        <g transform={t} fill="none" stroke={color} strokeWidth="1.4">
          <circle cx="8" cy="6" r="3.5" />
          <path d="M2 16 Q8 10 14 16" />
        </g>
      );
    case "wrench":
      return (
        <g transform={t} fill="none" stroke={color} strokeWidth="1.4">
          <path d="M2 14 L10 6 a3 3 0 1 1 -2 -2 L0 12" />
        </g>
      );
    case "loop":
      return (
        <g transform={t} fill="none" stroke={color} strokeWidth="1.4">
          <path d="M2 8 a6 6 0 0 1 12 0 a6 6 0 0 1 -10 4" />
          <path d="M1 9 L4 12 L7 9" />
        </g>
      );
    case "bars":
      return (
        <g transform={t} fill="none" stroke={color} strokeWidth="1.4">
          <line x1="2" y1="14" x2="2" y2="10" />
          <line x1="6" y1="14" x2="6" y2="6" />
          <line x1="10" y1="14" x2="10" y2="8" />
          <line x1="14" y1="14" x2="14" y2="3" />
        </g>
      );
    default:
      return null;
  }
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
