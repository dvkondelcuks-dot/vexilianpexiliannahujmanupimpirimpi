"use client";

import { Box } from "@mui/material";

const ACCENT = "#3BFF7C";
const DIM = "rgba(59,255,124,0.45)";
const TEXT = "#F4F7FA";
const MUTED = "#A7B0BA";
const AMBER = "#E6A84A";

const W = 1280;
const H = 560;

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
  const h = 340;
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
      <g transform="translate(-90,108)">
        <circle cx="6" cy="6" r="5" fill={ACCENT} />
        <text x="18" y="10" fill={TEXT} fontSize="11">Veselīgi</text>
        <text x="180" y="10" textAnchor="end" fill={ACCENT} fontSize="12" fontWeight="700">85%</text>
      </g>
      <g transform="translate(-90,128)">
        <circle cx="6" cy="6" r="5" fill={AMBER} />
        <text x="18" y="10" fill={TEXT} fontSize="11">Kalibrēšanā</text>
        <text x="180" y="10" textAnchor="end" fill={AMBER} fontSize="12" fontWeight="700">15%</text>
      </g>
    </g>
  );
}

function UpwardChart({ x, y }: { x: number; y: number }) {
  // Card inner area: width 232 - padding -> safe inner 196 wide x 200 tall
  // Coordinate frame: local (0,0) is bottom-left of plot area.
  const W2 = 184;
  const H2 = 196;
  const pts: Array<[number, number]> = [
    [0, 16],
    [28, 28],
    [56, 50],
    [84, 78],
    [112, 112],
    [140, 150],
    [168, 178]
  ];
  // map local (px, value) -> svg coord, value=0 at bottom
  const toSvg = (p: [number, number]): [number, number] => [p[0], H2 - p[1]];
  const path = pts.map(toSvg).reduce((acc, [px, py], i) => acc + (i === 0 ? `M${px} ${py}` : ` L${px} ${py}`), "");
  const area = `${path} L${pts[pts.length - 1][0]} ${H2} L0 ${H2} Z`;
  const last = toSvg(pts[pts.length - 1]);
  const prev = toSvg(pts[pts.length - 2]);
  // arrow heading vector (from prev -> last)
  const dx = last[0] - prev[0];
  const dy = last[1] - prev[1];
  const mag = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / mag;
  const uy = dy / mag;
  // arrowhead points a small triangle pointing in (ux,uy)
  const tip: [number, number] = [last[0] + ux * 8, last[1] + uy * 8];
  const baseL: [number, number] = [last[0] - uy * 6, last[1] + ux * 6];
  const baseR: [number, number] = [last[0] + uy * 6, last[1] - ux * 6];
  return (
    <g transform={`translate(${x + 24},${y + 60})`}>
      {/* y-axis ticks */}
      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
        <line key={i} x1="-4" y1={H2 - t * H2} x2={W2} y2={H2 - t * H2} stroke="rgba(59,255,124,0.06)" strokeWidth="0.8" />
      ))}
      {/* trend area */}
      <path d={area} fill={ACCENT} fillOpacity="0.16" />
      {/* trend line */}
      <path d={path} stroke={ACCENT} strokeWidth="2.2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      {/* dot markers */}
      {pts.slice(0, -1).map((p, i) => {
        const [sx, sy] = toSvg(p);
        return <circle key={i} cx={sx} cy={sy} r="2" fill={ACCENT} />;
      })}
      {/* arrowhead at tip — properly aligned to slope */}
      <polygon points={`${tip[0]},${tip[1]} ${baseL[0]},${baseL[1]} ${baseR[0]},${baseR[1]}`} fill={ACCENT} />
      {/* delta badge */}
      <g transform={`translate(${last[0] - 60},${last[1] - 14})`}>
        <rect x="0" y="-10" width="48" height="16" rx="3" fill="rgba(8,30,15,0.9)" stroke={ACCENT} strokeWidth="1" />
        <text x="24" y="2" textAnchor="middle" fill={ACCENT} fontSize="9" letterSpacing="0.12em" fontWeight="700">+38%</text>
      </g>
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
  // 4 nodes in a clean diamond layout, with curved connector arrows that
  // visibly close the cycle. Centered at (x,y).
  const r = 64;
  const nodes = [
    { angle: -90, icon: "mail", label: "PIESK\u0100R." },
    { angle:   0, icon: "user", label: "ATBILDE"  },
    { angle:  90, icon: "cart", label: "PIRKUMS"  },
    { angle: 180, icon: "euro", label: "ATG\u016aTS" }
  ];
  const pos = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return { cx: Math.cos(a) * r, cy: Math.sin(a) * r };
  };
  return (
    <g transform={`translate(${x},${y})`}>
      {/* faint backing ring */}
      <circle cx="0" cy="0" r={r} fill="none" stroke="rgba(59,255,124,0.10)" strokeWidth="1" strokeDasharray="2 4" />

      {/* connector arcs with arrowheads */}
      {nodes.map((n, i) => {
        const a = pos(n.angle);
        const next = nodes[(i + 1) % nodes.length];
        const b = pos(next.angle);
        // shorten endpoints so they don't overlap circles (radius 18)
        const v = { x: b.cx - a.cx, y: b.cy - a.cy };
        const m = Math.sqrt(v.x * v.x + v.y * v.y);
        const ux = v.x / m, uy = v.y / m;
        const ax = a.cx + ux * 20;
        const ay = a.cy + uy * 20;
        const bx = b.cx - ux * 22;
        const by = b.cy - uy * 22;
        // tangent at end -> arrowhead
        const tipX = bx;
        const tipY = by;
        const baseLx = bx - ux * 6 - uy * 4;
        const baseLy = by - uy * 6 + ux * 4;
        const baseRx = bx - ux * 6 + uy * 4;
        const baseRy = by - uy * 6 - ux * 4;
        return (
          <g key={i}>
            <path d={`M${ax} ${ay} A${r * 1.05} ${r * 1.05} 0 0 1 ${bx} ${by}`} stroke={ACCENT} strokeWidth="1.4" fill="none" />
            <polygon points={`${tipX},${tipY} ${baseLx},${baseLy} ${baseRx},${baseRy}`} fill={ACCENT} />
          </g>
        );
      })}

      {/* nodes */}
      {nodes.map((n, i) => {
        const a = pos(n.angle);
        return (
          <g key={`n-${i}`} transform={`translate(${a.cx},${a.cy})`}>
            <circle r="20" fill="rgba(8,12,10,0.92)" stroke={ACCENT} strokeWidth="1.4" />
            <RecIcon name={n.icon} cx={0} cy={0} />
            <text x="0" y="33" textAnchor="middle" fill={MUTED} fontSize="7.5" letterSpacing="0.18em" fontWeight="700">{n.label}</text>
          </g>
        );
      })}

      {/* center % */}
      <text x="0" y="-2" textAnchor="middle" fill={ACCENT} fontSize="14" fontWeight="700" letterSpacing="0.06em">68%</text>
      <text x="0" y="10" textAnchor="middle" fill={MUTED} fontSize="7" letterSpacing="0.2em">ATG\u016aTI</text>
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
  const segs = 22;
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
      {/* segmented progress + percent (percent reserved on the right) */}
      <g transform={`translate(${x + 78},${y + 80})`}>
        {Array.from({ length: segs }).map((_, i) => (
          <rect key={i} x={i * 11} y={0} width={8} height={14} rx={1.5} fill={i < filled ? pctColor : "rgba(255,255,255,0.08)"} />
        ))}
      </g>
      <text x={x + w - 16} y={y + 92} textAnchor="end" fill={pctColor} fontSize="15" fontWeight="700">{pct}%</text>
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
