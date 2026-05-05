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

// Model: 4 stages BUILD → HANDOVER → READ → CALIBRATE in a loop
function Model() {
  const items = [
    { label: "BUILD", icon: "wrench", num: "1" },
    { label: "HANDOVER", icon: "shake", num: "2" },
    { label: "READ", icon: "lens", num: "3" },
    { label: "CALIBRATE", icon: "target", num: "4" }
  ];
  const startX = 110;
  const stepX = 140;
  const y = 140;
  const r = 32;
  return (
    <g>
      <EyebrowTag x={36} y={42} label="DARBĪBAS MODELIS" />
      {/* outer loop arrows */}
      <path d={`M${startX} ${y - r - 14} H${startX + stepX * 3} L${startX + stepX * 3 + 12} ${y - r - 8}`} stroke={ACCENT} strokeWidth="1.4" fill="none" markerEnd="url(#dd-arr)" />
      <path d={`M${startX + stepX * 3} ${y + r + 14} H${startX} L${startX - 12} ${y + r + 8}`} stroke={ACCENT} strokeWidth="1.4" fill="none" markerEnd="url(#dd-arr)" />
      {items.map((it, i) => {
        const cx = startX + i * stepX;
        return (
          <g key={it.label}>
            <circle cx={cx} cy={y} r={r} fill="rgba(8,12,10,0.7)" stroke={ACCENT} strokeWidth="1.5" />
            <text x={cx - r + 6} y={y - r + 2} fill={ACCENT} fontSize="11" fontWeight="700">{it.num}</text>
            <ModelIcon icon={it.icon} cx={cx} cy={y + 4} />
            <text x={cx} y={y + r + 22} textAnchor="middle" fill={TEXT} fontSize="11" letterSpacing="0.12em" fontWeight="700">{it.label}</text>
            {i < items.length - 1 ? (
              <path d={`M${cx + r + 6} ${y} L${cx + stepX - r - 8} ${y}`} stroke={ACCENT} strokeWidth="1.2" strokeDasharray="3 3" />
            ) : null}
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

// Boundary: BLOCKED (amber) | divider/prism | OPEN (green)
function Boundary() {
  const blocked = [
    { label: "NO GOAL", icon: "x" },
    { label: "LOW FLOW", icon: "down" },
    { label: "NO OWNER", icon: "user" },
    { label: "TOOL-ONLY", icon: "wrench" }
  ];
  const open = [
    { label: "QUALIFIED PIEPRASĪJUMI", icon: "user" },
    { label: "RECOVERY SET", icon: "loop" },
    { label: "REVENUE VIEW", icon: "bars" },
    { label: "OWNER ASSIGNED", icon: "user" }
  ];
  return (
    <g>
      <EyebrowTag x={28} y={32} label="BLOCKED" />
      <text x={W - 28} y="32" textAnchor="end" fill={ACCENT} fontSize="10" letterSpacing="0.18em" fontWeight="700">OPEN</text>
      {blocked.map((it, i) => {
        const y = 60 + i * 46;
        return (
          <g key={it.label} transform={`translate(28,${y})`}>
            <rect width="270" height="34" rx="4" fill="rgba(8,12,10,0.6)" stroke={AMBER} strokeWidth="1.2" strokeDasharray="4 3" />
            <BoundaryIcon icon={it.icon} cx={20} cy={17} color={AMBER} />
            <text x="46" y="22" fill={TEXT} fontSize="11" letterSpacing="0.1em" fontWeight="600">{it.label}</text>
          </g>
        );
      })}
      {/* prism divider */}
      <g transform={`translate(${W / 2 - 20},60)`}>
        <path d="M20 0 L40 110 L20 200 L0 110 Z" fill="rgba(59,255,124,0.08)" stroke={ACCENT} strokeWidth="1.4" />
        <line x1="20" y1="10" x2="20" y2="190" stroke={ACCENT} strokeWidth="1" strokeDasharray="2 3" />
      </g>
      {/* dotted particles */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <circle cx={W / 2 - 80 + i * 4} cy={100 + i * 12} r="2" fill={AMBER} />
          <circle cx={W / 2 + 60 + i * 4} cy={100 + i * 12} r="2" fill={ACCENT} />
        </g>
      ))}
      {open.map((it, i) => {
        const y = 60 + i * 46;
        return (
          <g key={it.label} transform={`translate(${W / 2 + 60},${y})`}>
            <rect width="282" height="34" rx="4" fill="rgba(8,12,10,0.6)" stroke={ACCENT} strokeWidth="1.2" />
            <BoundaryIcon icon={it.icon} cx={20} cy={17} color={ACCENT} />
            <text x="46" y="22" fill={TEXT} fontSize="10.5" letterSpacing="0.08em" fontWeight="600">{it.label}</text>
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
