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
            const x1 = +(18 + Math.cos(rad) * 11).toFixed(3);
            const y1 = +(18 + Math.sin(rad) * 11).toFixed(3);
            const x2 = +(18 + Math.cos(rad) * 16).toFixed(3);
            const y2 = +(18 + Math.sin(rad) * 16).toFixed(3);
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
      <line x1={stations[2].x + stationW / 2 + 4} y1={yMid} x2={W - 124} y2={yMid} stroke={ACCENT} strokeWidth="1.3" markerEnd="url(#dd-arr)" />
      <g transform={`translate(${W - 116},${yMid - 28})`}>
        <rect width="92" height="56" rx="4" fill="rgba(8,30,15,0.65)" stroke={ACCENT} strokeWidth="1.2" />
        <text x="46" y="22" textAnchor="middle" fill={ACCENT} fontSize="8.5" letterSpacing="0.18em" fontWeight="700">SISTĒMA</text>
        <text x="46" y="35" textAnchor="middle" fill={TEXT} fontSize="7.5" letterSpacing="0.12em">SAVIENOTA</text>
        <text x="46" y="47" textAnchor="middle" fill={TEXT} fontSize="7.5" letterSpacing="0.12em">REDZAMA · DZĪVA</text>
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

// Boundary: simplified single-lane filter.
// One inbound flow → three criteria gates in a row → branches into ACCEPTED / DECLINED.
function Boundary() {
  const yMid = 168;
  const inX = 56;
  const outX = W - 56;
  const gateW = 96;
  const gateH = 60;
  // three gates centered along the lane
  const gates = [
    { label: "MĒRĶIS",     sub: "komerciāls" },
    { label: "PLŪSMA",     sub: "≥ 2 kanāli"  },
    { label: "ĪPAŠNIEKS",  sub: "viens vadošs" }
  ];
  const totalGatesW = gateW * gates.length + 36 * (gates.length - 1);
  const startX = (W - totalGatesW) / 2;
  const gatePos = (i: number) => startX + i * (gateW + 36);
  const branchX = outX - 200;

  return (
    <g>
      <EyebrowTag x={36} y={36} label="ROBEŽAS · KVALIFIKĀCIJAS FILTRS" />

      {/* main horizontal lane (terminates at branch split) */}
      <line x1={inX} y1={yMid} x2={branchX} y2={yMid} stroke="rgba(59,255,124,0.18)" strokeWidth="20" strokeLinecap="round" />
      <line x1={inX} y1={yMid} x2={branchX} y2={yMid} stroke={ACCENT} strokeWidth="1.4" strokeDasharray="6 5" />

      {/* INPUT badge on left */}
      <g transform={`translate(${inX - 36},${yMid - 22})`}>
        <rect width="72" height="44" rx="6" fill="rgba(8,12,10,0.92)" stroke={ACCENT} strokeWidth="1.2" />
        <text x="36" y="17" textAnchor="middle" fill={ACCENT} fontSize="8" letterSpacing="0.18em" fontWeight="700">IENĀK</text>
        <text x="36" y="32" textAnchor="middle" fill={TEXT} fontSize="9" letterSpacing="0.12em" fontWeight="700">PIEPRASĪJUMS</text>
      </g>

      {/* GATES */}
      {gates.map((g, i) => {
        const gx = gatePos(i);
        return (
          <g key={g.label}>
            {/* number above gate */}
            <text x={gx + gateW / 2} y={yMid - gateH / 2 - 14} textAnchor="middle" fill={ACCENT} fontSize="9" letterSpacing="0.2em" fontWeight="700">0{i + 1}</text>
            {/* gate body */}
            <rect x={gx} y={yMid - gateH / 2} width={gateW} height={gateH} rx={6} fill="rgba(8,16,11,0.92)" stroke={ACCENT} strokeWidth="1.4" />
            {/* corner brackets */}
            <path d={`M${gx + 8} ${yMid - gateH / 2 + 14} V${yMid - gateH / 2 + 6} H${gx + 16}`} stroke={ACCENT} strokeWidth="1" fill="none" />
            <path d={`M${gx + gateW - 16} ${yMid - gateH / 2 + 6} H${gx + gateW - 8} V${yMid - gateH / 2 + 14}`} stroke={ACCENT} strokeWidth="1" fill="none" />
            {/* check icon */}
            <g transform={`translate(${gx + gateW / 2},${yMid - 6})`}>
              <circle r="9" fill="rgba(59,255,124,0.12)" stroke={ACCENT} strokeWidth="1.2" />
              <path d="M-4 0 L-1 3 L4 -3" stroke={ACCENT} strokeWidth="1.6" fill="none" />
            </g>
            {/* labels inside gate */}
            <text x={gx + gateW / 2} y={yMid + 16} textAnchor="middle" fill={TEXT} fontSize="10" letterSpacing="0.14em" fontWeight="700">{g.label}</text>
            <text x={gx + gateW / 2} y={yMid + 26} textAnchor="middle" fill={MUTED} fontSize="7.5" letterSpacing="0.08em">{g.sub}</text>
          </g>
        );
      })}

      {/* split at right end: ACCEPTED branch (up) and DECLINED branch (down) */}
      {(() => {
        const cardW = 132;
        const cardH = 38;
        const acceptY = yMid - 56;
        const declineY = yMid + 56;
        const cardX = branchX + 50;             // left edge of cards
        const arrowEndX = cardX + 14;           // arrow lands 14px inside card
        return (
          <g>
            {/* ACCEPTED branch — solid green line, terminates inside PIEŅEMTS card */}
            <path
              d={`M${branchX} ${yMid} C${branchX + 28} ${yMid}, ${branchX + 30} ${acceptY}, ${arrowEndX} ${acceptY}`}
              stroke={ACCENT}
              strokeWidth="1.5"
              fill="none"
              markerEnd="url(#dd-arr)"
            />
            {/* DECLINED branch — solid amber line, terminates inside card */}
            <path
              d={`M${branchX} ${yMid} C${branchX + 28} ${yMid}, ${branchX + 30} ${declineY}, ${arrowEndX} ${declineY}`}
              stroke={AMBER}
              strokeWidth="1.5"
              fill="none"
              markerEnd="url(#dd-arr-amber)"
            />

            {/* ACCEPTED card */}
            <g transform={`translate(${cardX},${acceptY - cardH / 2})`}>
              <rect width={cardW} height={cardH} rx="6" fill="rgba(8,30,15,0.85)" stroke={ACCENT} strokeWidth="1.4" />
              <circle cx="16" cy={cardH / 2} r="6.5" fill={ACCENT} />
              <path d="M13 19 L15.4 21.6 L19.4 17" stroke="#07090b" strokeWidth="1.7" fill="none" />
              <text x="30" y="16" fill={ACCENT} fontSize="8" letterSpacing="0.18em" fontWeight="700">PIEŅEMTS</text>
              <text x="30" y="28" fill={TEXT} fontSize="8" letterSpacing="0.08em">sistēma būvēta</text>
            </g>

            {/* DECLINED card */}
            <g transform={`translate(${cardX},${declineY - cardH / 2})`}>
              <rect width={cardW} height={cardH} rx="6" fill="rgba(38,22,10,0.7)" stroke={AMBER} strokeWidth="1.2" />
              <g transform={`translate(16,${cardH / 2})`} stroke={AMBER} strokeWidth="1.7" fill="none">
                <line x1="-4.5" y1="-4.5" x2="4.5" y2="4.5" />
                <line x1="4.5" y1="-4.5" x2="-4.5" y2="4.5" />
              </g>
              <text x="30" y="16" fill={AMBER} fontSize="8" letterSpacing="0.18em" fontWeight="700">NORAIDĪTS</text>
              <text x="30" y="28" fill={MUTED} fontSize="8" letterSpacing="0.08em">cita ekspertīze</text>
            </g>
          </g>
        );
      })()}

      {/* footer microcopy */}
      <text x={W / 2} y={H - 28} textAnchor="middle" fill={MUTED} fontSize="9" letterSpacing="0.22em" fontWeight="700">VEXILLIAN STRĀDĀ → SISTĒMA TIEK BŪVĒTA</text>
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
