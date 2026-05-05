"use client";

import { Box } from "@mui/material";

const ACCENT = "#3BFF7C";
const DIM = "rgba(59,255,124,0.45)";
const TEXT = "#F4F7FA";
const MUTED = "#A7B0BA";
const AMBER = "#E6A84A";

const W = 1280;
const H = 700;

export function VexSystemDiagram() {
  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Box sx={{ minWidth: 980 }}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "auto", display: "block" }}>
          <defs>
            <pattern id="ds-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="rgba(59,255,124,0.04)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect x="0" y="0" width={W} height={H} fill="url(#ds-grid)" />

          {/* TOP ROW — 5 KPI cards */}
          <KpiCard x={20} y={20} label="TRAFIKA AVOTI">
            <BarsIcon x={20} y={170} accent />
            <SourceIcons x={20} y={258} />
          </KpiCard>

          <KpiCard x={272} y={20} label="KONTAKTA PUNKTI">
            <FunnelIcon x={272} y={70} />
          </KpiCard>

          <KpiCard x={524} y={20} label="SISTĒMAS VESELĪBA" labelAccent>
            <HealthGauge x={524 + 124} y={170} />
          </KpiCard>

          <KpiCard x={776} y={20} label="IZNĀKUMI">
            <UpwardChart x={776} y={70} />
            <OutcomeIcons x={776} y={290} />
          </KpiCard>

          <KpiCard x={1028} y={20} label="ATGŪŠANAS CIKLS">
            <RecoveryLoop x={1028 + 124} y={170} />
          </KpiCard>

          {/* BOTTOM ROW — 3 progress cards */}
          <ProgressCard x={20} y={400} label="AVOTA KVALITĀTE" sub="Kanāla ieguldījums" pct={82} icon="star" />
          <ProgressCard x={448} y={400} label="ATGŪŠANAS CIKLS" sub="Klusums kļūst par ieņēmumiem" pct={68} icon="loop" />
          <ProgressCard x={876} y={400} label="SLĀŅU VELOCITĀTE" sub="Signāls pārvēršas darbībā" pct={74} icon="bolt" />
        </svg>
      </Box>
    </Box>
  );
}

function KpiCard({ x, y, label, labelAccent, children }: { x: number; y: number; label: string; labelAccent?: boolean; children?: React.ReactNode }) {
  const w = 232;
  const h = 360;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill="rgba(8,12,10,0.78)" stroke={ACCENT} strokeWidth="1.4" />
      {/* corner brackets */}
      <path d={`M${x + 8} ${y + 18} V${y + 8} H${x + 18}`} stroke={ACCENT} strokeWidth="1.2" fill="none" />
      <path d={`M${x + w - 18} ${y + 8} H${x + w - 8} V${y + 18}`} stroke={ACCENT} strokeWidth="1.2" fill="none" />
      <text x={x + w / 2} y={y + 30} textAnchor="middle" fill={labelAccent ? ACCENT : TEXT} fontSize="13" letterSpacing="0.14em" fontWeight="700">{label}</text>
      {children}
    </g>
  );
}

function BarsIcon({ x, y, accent }: { x: number; y: number; accent?: boolean }) {
  const heights = [110, 70, 40, 60, 30];
  return (
    <g>
      {heights.map((h, i) => (
        <rect key={i} x={x + 30 + i * 36} y={y - h} width={26} height={h} rx={3} fill={ACCENT} opacity={accent ? 0.85 - i * 0.1 : 0.6} />
      ))}
    </g>
  );
}

function SourceIcons({ x, y }: { x: number; y: number }) {
  const icons = ["G", "M", "◉", "≡", "Q"];
  return (
    <g>
      {icons.map((ic, i) => (
        <g key={i} transform={`translate(${x + 26 + i * 36},${y})`}>
          <circle cx="14" cy="14" r="13" fill="none" stroke={ACCENT} strokeWidth="1.2" />
          <text x="14" y="18" textAnchor="middle" fill={ACCENT} fontSize="13" fontWeight="700">{ic}</text>
        </g>
      ))}
    </g>
  );
}

function FunnelIcon({ x, y }: { x: number; y: number }) {
  // 3 funnel layers + side icons
  return (
    <g transform={`translate(${x + 50},${y + 90})`}>
      {/* side icons */}
      <g transform="translate(-20,10)">
        <rect width="22" height="22" rx="3" fill="none" stroke={ACCENT} strokeWidth="1.2" />
        <line x1="4" y1="8" x2="18" y2="8" stroke={ACCENT} />
        <line x1="4" y1="13" x2="14" y2="13" stroke={ACCENT} />
      </g>
      <g transform="translate(-20,80)">
        <path d="M4 4 H22 V18 H10 L4 22 Z" fill="none" stroke={ACCENT} strokeWidth="1.2" />
      </g>
      <g transform="translate(-20,150)">
        <rect width="22" height="16" rx="2" fill="none" stroke={ACCENT} strokeWidth="1.2" />
        <path d="M0 4 L11 12 L22 4" fill="none" stroke={ACCENT} strokeWidth="1.2" />
      </g>
      {/* dotted lines */}
      <line x1="6" y1="20" x2="36" y2="20" stroke={DIM} strokeDasharray="3 3" />
      <line x1="6" y1="90" x2="60" y2="90" stroke={DIM} strokeDasharray="3 3" />
      <line x1="6" y1="158" x2="80" y2="158" stroke={DIM} strokeDasharray="3 3" />
      {/* funnel layers */}
      <path d="M40 4 L160 4 L150 36 L50 36 Z" fill={ACCENT} fillOpacity="0.85" />
      <path d="M52 44 L148 44 L138 78 L62 78 Z" fill={ACCENT} fillOpacity="0.7" />
      <path d="M64 86 L136 86 L122 124 L78 124 Z" fill={ACCENT} fillOpacity="0.5" />
      <path d="M80 132 L120 132 L106 170 L94 170 Z" fill={ACCENT} fillOpacity="0.35" />
    </g>
  );
}

function HealthGauge({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <circle cx="0" cy="0" r="68" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14" />
      <circle cx="0" cy="0" r="68" fill="none" stroke={ACCENT} strokeWidth="14" strokeDasharray="363 427" strokeDashoffset="0" transform="rotate(-90)" strokeLinecap="round" />
      {/* heartbeat line inside */}
      <path d="M-32 0 L-18 0 L-12 -16 L-6 14 L0 -8 L8 4 L18 -2 L32 -2" stroke={ACCENT} strokeWidth="2" fill="none" />
      {/* legend */}
      <g transform="translate(-66,108)">
        <circle cx="6" cy="6" r="5" fill={ACCENT} />
        <text x="18" y="10" fill={TEXT} fontSize="11">Veselīgi</text>
        <text x="120" y="10" textAnchor="end" fill={ACCENT} fontSize="12" fontWeight="700">85%</text>
      </g>
      <g transform="translate(-66,128)">
        <circle cx="6" cy="6" r="5" fill={AMBER} />
        <text x="18" y="10" fill={TEXT} fontSize="11">Kalibrēšanas režīmā</text>
        <text x="120" y="10" textAnchor="end" fill={AMBER} fontSize="12" fontWeight="700">15%</text>
      </g>
    </g>
  );
}

function UpwardChart({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x + 26},${y + 60})`}>
      <path d="M0 160 Q40 130 80 110 T160 50 L200 10" stroke={ACCENT} strokeWidth="2.4" fill="none" />
      <path d="M0 160 Q40 130 80 110 T160 50 L200 10 L200 160 Z" fill={ACCENT} fillOpacity="0.18" />
      {/* arrowhead */}
      <path d="M196 14 L208 6 L210 18" stroke={ACCENT} strokeWidth="2" fill="none" />
    </g>
  );
}

function OutcomeIcons({ x, y }: { x: number; y: number }) {
  const items = [
    { icon: "cart", label: "Pirkumi" },
    { icon: "cal", label: "Pieteikumi" },
    { icon: "phone", label: "Zvani" }
  ];
  return (
    <g>
      {items.map((it, i) => (
        <g key={i} transform={`translate(${x + 26 + i * 64},${y})`}>
          <rect width="44" height="44" rx="6" fill="none" stroke={ACCENT} strokeWidth="1.2" />
          <OutcomeIcon name={it.icon} />
          <text x="22" y="60" textAnchor="middle" fill={MUTED} fontSize="9.5">{it.label}</text>
        </g>
      ))}
    </g>
  );
}

function OutcomeIcon({ name }: { name: string }) {
  switch (name) {
    case "cart":
      return (
        <g transform="translate(8,10)" fill="none" stroke={ACCENT} strokeWidth="1.4">
          <path d="M0 2 H6 L10 18 H26 L30 8 H10" />
          <circle cx="12" cy="24" r="2" fill={ACCENT} />
          <circle cx="22" cy="24" r="2" fill={ACCENT} />
        </g>
      );
    case "cal":
      return (
        <g transform="translate(10,10)" fill="none" stroke={ACCENT} strokeWidth="1.4">
          <rect x="0" y="2" width="24" height="22" rx="2" />
          <line x1="0" y1="8" x2="24" y2="8" />
          <line x1="6" y1="0" x2="6" y2="6" />
          <line x1="18" y1="0" x2="18" y2="6" />
        </g>
      );
    case "phone":
      return (
        <g transform="translate(12,10)" fill="none" stroke={ACCENT} strokeWidth="1.4">
          <path d="M2 2 L8 2 L10 8 L7 11 Q12 18 18 22 L21 19 L26 21 L26 26 Q14 26 2 14 Z" />
        </g>
      );
    default:
      return null;
  }
}

function RecoveryLoop({ x, y }: { x: number; y: number }) {
  // 4 nodes in a circle: email, person, cart, euro
  const r = 60;
  const nodes = [
    { angle: -90, icon: "mail" },
    { angle: 0, icon: "user" },
    { angle: 90, icon: "cart" },
    { angle: 180, icon: "euro" }
  ];
  return (
    <g transform={`translate(${x},${y})`}>
      {nodes.map((n, i) => {
        const ang = (n.angle * Math.PI) / 180;
        const cx = Math.cos(ang) * r;
        const cy = Math.sin(ang) * r;
        const next = nodes[(i + 1) % nodes.length];
        const ang2 = (next.angle * Math.PI) / 180;
        const cx2 = Math.cos(ang2) * r;
        const cy2 = Math.sin(ang2) * r;
        // arc between nodes
        return (
          <g key={i}>
            <path d={`M${cx} ${cy} A${r} ${r} 0 0 1 ${cx2} ${cy2}`} stroke={DIM} strokeWidth="1.4" fill="none" />
            <circle cx={cx} cy={cy} r="22" fill="rgba(8,12,10,0.85)" stroke={ACCENT} strokeWidth="1.4" />
            <RecIcon name={n.icon} cx={cx} cy={cy} />
          </g>
        );
      })}
      {/* arrowheads on arcs */}
      <path d="M22 -52 L28 -56 L26 -48" fill={ACCENT} />
      <path d="M52 22 L56 28 L48 26" fill={ACCENT} />
      <path d="M-22 52 L-28 56 L-26 48" fill={ACCENT} />
      <path d="M-52 -22 L-56 -28 L-48 -26" fill={ACCENT} />
    </g>
  );
}

function RecIcon({ name, cx, cy }: { name: string; cx: number; cy: number }) {
  switch (name) {
    case "mail":
      return (
        <g transform={`translate(${cx - 9},${cy - 7})`} fill="none" stroke={ACCENT} strokeWidth="1.4">
          <rect x="0" y="0" width="18" height="14" rx="1.5" />
          <path d="M0 1 L9 9 L18 1" />
        </g>
      );
    case "user":
      return (
        <g transform={`translate(${cx - 8},${cy - 9})`} fill="none" stroke={ACCENT} strokeWidth="1.4">
          <circle cx="8" cy="6" r="4" />
          <path d="M0 18 Q8 10 16 18" />
        </g>
      );
    case "cart":
      return (
        <g transform={`translate(${cx - 11},${cy - 8})`} fill="none" stroke={ACCENT} strokeWidth="1.4">
          <path d="M0 1 H4 L7 14 H20 L23 6 H7" />
          <circle cx="9" cy="18" r="1.6" fill={ACCENT} />
          <circle cx="17" cy="18" r="1.6" fill={ACCENT} />
        </g>
      );
    case "euro":
      return (
        <text x={cx} y={cy + 6} textAnchor="middle" fill={ACCENT} fontSize="20" fontWeight="700">€</text>
      );
    default:
      return null;
  }
}

function ProgressCard({ x, y, label, sub, pct, icon }: { x: number; y: number; label: string; sub: string; pct: number; icon: string }) {
  const w = 380;
  const h = 130;
  const pctColor = pct >= 70 ? ACCENT : AMBER;
  const segs = 24;
  const filled = Math.round((pct / 100) * segs);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill="rgba(8,12,10,0.78)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      {/* icon circle */}
      <g transform={`translate(${x + 22},${y + h / 2 - 22})`}>
        <circle cx="22" cy="22" r="22" fill="rgba(59,255,124,0.12)" stroke={ACCENT} strokeWidth="1.2" />
        <ProgressIcon name={icon} />
      </g>
      <text x={x + 78} y={y + 38} fill={TEXT} fontSize="13" letterSpacing="0.14em" fontWeight="700">{label}</text>
      <text x={x + 78} y={y + 58} fill={MUTED} fontSize="11">{sub}</text>
      {/* segmented progress */}
      <g transform={`translate(${x + 78},${y + 80})`}>
        {Array.from({ length: segs }).map((_, i) => (
          <rect key={i} x={i * 11} y={0} width={8} height={14} rx={1.5} fill={i < filled ? pctColor : "rgba(255,255,255,0.08)"} />
        ))}
        <text x={segs * 11 + 16} y={12} fill={pctColor} fontSize="14" fontWeight="700">{pct}%</text>
      </g>
    </g>
  );
}

function ProgressIcon({ name }: { name: string }) {
  switch (name) {
    case "star":
      return <path d="M22 8 L25 18 L36 18 L27 25 L30 36 L22 29 L14 36 L17 25 L8 18 L19 18 Z" fill={ACCENT} />;
    case "loop":
      return (
        <g transform="translate(8,8)" fill="none" stroke={ACCENT} strokeWidth="1.6">
          <path d="M2 14 a12 12 0 0 1 24 0 a12 12 0 0 1 -22 8" />
          <path d="M0 16 L4 22 L8 16" />
        </g>
      );
    case "bolt":
      return <path d="M24 6 L14 26 L20 26 L18 38 L30 18 L24 18 Z" fill={ACCENT} />;
    default:
      return null;
  }
}
