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

// Model: continuous loop — BUILD → HANDOVER → READ → CALIBRATE around a SYSTEM CORE
function Model() {
  const cx = W / 2;
  const cy = H / 2 + 6;
  const r = 92;
  const items = [
    { angle: -90, num: "01", label: "BUILD", sub: "WIRE LAYERS", icon: "wrench" },
    { angle: 0, num: "02", label: "HANDOVER", sub: "TEAM OWNS IT", icon: "shake" },
    { angle: 90, num: "03", label: "READ", sub: "WHAT BROKE / GREW", icon: "lens" },
    { angle: 180, num: "04", label: "CALIBRATE", sub: "NEXT TUNE", icon: "target" }
  ];
  const nodeR = 30;
  return (
    <g>
      <EyebrowTag x={28} y={28} label="DARBĪBAS MODELIS · NEPĀRTRAUKTS CIKLS" />
      {/* outer dashed ring */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={DIM} strokeWidth="1" strokeDasharray="4 4" />
      {/* arrowed arcs between nodes (4 quadrants) */}
      {items.map((it, i) => {
        const next = items[(i + 1) % items.length];
        const a1 = (it.angle * Math.PI) / 180;
        const a2 = (next.angle * Math.PI) / 180;
        const x1 = cx + Math.cos(a1) * r;
        const y1 = cy + Math.sin(a1) * r;
        const x2 = cx + Math.cos(a2) * r;
        const y2 = cy + Math.sin(a2) * r;
        return (
          <path key={`arc-${i}`} d={`M${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2}`} stroke={ACCENT} strokeWidth="1.4" fill="none" markerEnd="url(#dd-arr)" />
        );
      })}
      {/* central core */}
      <g transform={`translate(${cx},${cy})`}>
        <circle r="42" fill="rgba(8,12,10,0.9)" stroke={ACCENT} strokeWidth="1.4" />
        <circle r="30" fill="none" stroke={DIM} strokeWidth="1" strokeDasharray="3 3" />
        <text textAnchor="middle" y="-2" fill={ACCENT} fontSize="10" letterSpacing="0.18em" fontWeight="700">SYSTEM</text>
        <text textAnchor="middle" y="14" fill={ACCENT} fontSize="10" letterSpacing="0.18em" fontWeight="700">CORE</text>
      </g>
      {/* nodes */}
      {items.map((it) => {
        const a = (it.angle * Math.PI) / 180;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        const labelOffsetY = it.angle === -90 ? -nodeR - 18 : it.angle === 90 ? nodeR + 22 : 6;
        const labelOffsetX = it.angle === 0 ? nodeR + 12 : it.angle === 180 ? -nodeR - 12 : 0;
        const labelAnchor = it.angle === 0 ? "start" : it.angle === 180 ? "end" : "middle";
        return (
          <g key={it.label}>
            <circle cx={x} cy={y} r={nodeR} fill="rgba(8,12,10,0.9)" stroke={ACCENT} strokeWidth="1.5" />
            <text x={x - nodeR + 8} y={y - nodeR + 12} fill={ACCENT} fontSize="9" fontWeight="700">{it.num}</text>
            <ModelIcon icon={it.icon} cx={x} cy={y + 4} />
            <text x={x + labelOffsetX} y={y + labelOffsetY} textAnchor={labelAnchor} fill={TEXT} fontSize="11" letterSpacing="0.14em" fontWeight="700">{it.label}</text>
            <text x={x + labelOffsetX} y={y + labelOffsetY + 12} textAnchor={labelAnchor} fill={MUTED} fontSize="8.5" letterSpacing="0.12em">{it.sub}</text>
          </g>
        );
      })}
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

// Boundary: a quality gateway — reject filter on the left, accepted clients on the right
function Boundary() {
  const rejected = [
    { label: "NO COMMERCIAL GOAL", icon: "x" },
    { label: "LOW VOLUME FLOW", icon: "down" },
    { label: "NO INTERNAL OWNER", icon: "user" },
    { label: "WANT TOOLS, NOT SYSTEM", icon: "wrench" }
  ];
  const accepted = [
    { label: "QUALIFIED PIEPRASĪJUMI", icon: "user" },
    { label: "RECOVERY CYCLE LIVE", icon: "loop" },
    { label: "REVENUE VIEW READY", icon: "bars" },
    { label: "OWNERSHIP ASSIGNED", icon: "user" }
  ];
  const gateX = W / 2;
  return (
    <g>
      <EyebrowTag x={28} y={28} label="REJECTED" />
      <text x={W - 28} y={28} textAnchor="end" fill={ACCENT} fontSize="10" letterSpacing="0.18em" fontWeight="700">ACCEPTED</text>
      {/* reject pile (left) */}
      {rejected.map((it, i) => {
        const y = 56 + i * 40;
        return (
          <g key={it.label} transform={`translate(28,${y})`}>
            <rect width="230" height="28" rx="4" fill="rgba(38,18,8,0.55)" stroke={AMBER} strokeWidth="1.1" strokeDasharray="4 3" />
            <BoundaryIcon icon={it.icon} cx={18} cy={14} color={AMBER} />
            <text x="40" y="19" fill={TEXT} fontSize="10" letterSpacing="0.1em" fontWeight="600">{it.label}</text>
            {/* exit arrow back left */}
            <path d={`M-6 14 L-18 14 L-18 8 L-26 16 L-18 24 L-18 18 L-6 18 Z`} fill={AMBER} opacity="0.7" />
          </g>
        );
      })}
      {/* central gateway with prism + filter mesh */}
      <g transform={`translate(${gateX - 32},40)`}>
        <rect width="64" height="200" rx="6" fill="rgba(8,12,10,0.85)" stroke={ACCENT} strokeWidth="1.4" />
        <text x="32" y="22" textAnchor="middle" fill={ACCENT} fontSize="9" letterSpacing="0.2em" fontWeight="700">GATE</text>
        {/* filter slits */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line key={i} x1={10} y1={40 + i * 22} x2={54} y2={40 + i * 22} stroke={DIM} strokeWidth="1" />
        ))}
        {/* prism spike */}
        <path d="M32 32 L52 100 L32 168 L12 100 Z" fill="rgba(59,255,124,0.1)" stroke={ACCENT} strokeWidth="1.2" />
        <circle cx="32" cy="100" r="6" fill={ACCENT} />
        <text x="32" y="194" textAnchor="middle" fill={MUTED} fontSize="7" letterSpacing="0.18em">QUALIFY</text>
      </g>
      {/* incoming/outgoing particle dots */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <circle cx={gateX - 60 - i * 6} cy={70 + i * 22} r="2.2" fill={AMBER} opacity={0.8 - i * 0.1} />
          <circle cx={gateX + 50 + i * 6} cy={70 + i * 22} r="2.2" fill={ACCENT} opacity={1 - i * 0.15} />
        </g>
      ))}
      {/* accepted column (right) */}
      {accepted.map((it, i) => {
        const y = 56 + i * 40;
        return (
          <g key={it.label} transform={`translate(${W / 2 + 60},${y})`}>
            <rect width="262" height="28" rx="4" fill="rgba(8,30,15,0.65)" stroke={ACCENT} strokeWidth="1.2" />
            <BoundaryIcon icon={it.icon} cx={18} cy={14} color={ACCENT} />
            <text x="40" y="19" fill={TEXT} fontSize="10" letterSpacing="0.08em" fontWeight="600">{it.label}</text>
            <path d="M268 14 L280 14 L276 10 M280 14 L276 18" stroke={ACCENT} strokeWidth="1.1" fill="none" />
          </g>
        );
      })}
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
