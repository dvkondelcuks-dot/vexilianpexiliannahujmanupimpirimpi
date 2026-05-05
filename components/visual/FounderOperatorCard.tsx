import { Box, Stack, Typography } from "@mui/material";
import type { founders } from "@/data/founders";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { SignalChip } from "@/components/ui/SignalChip";

type Founder = (typeof founders)[number];

const ACCENT = "#3BFF7C";
const DIM = "rgba(59,255,124,0.45)";
const TEXT = "#F4F7FA";
const MUTED = "#A7B0BA";

export function FounderOperatorCard({ founder }: { founder: Founder }) {
  return (
    <Box
      className="industrial-card"
      sx={{
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        background: "linear-gradient(180deg, rgba(21,27,34,0.82), rgba(10,13,16,0.94))",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        transition: "border-color 180ms ease, transform 180ms ease",
        "&:hover": { borderColor: "rgba(59,255,124,0.32)", transform: "translateY(-2px)" }
      }}
    >
      <Stack spacing={1.2} sx={{ p: 2.2, borderBottom: "1px solid var(--border)" }}>
        <MetaLabel sx={{ color: "var(--signal-blue)" }}>{founder.operatorCode}</MetaLabel>
        <Box>
          <Typography component="h3" variant="h3">{founder.name}</Typography>
          <Typography sx={{ color: "var(--text-2)", fontFamily: "var(--mono)", fontSize: 12, textTransform: "uppercase", mt: 0.7 }}>{founder.role}</Typography>
        </Box>
      </Stack>
      <Box sx={{ borderBottom: "1px solid var(--border)", background: "rgba(7,9,11,0.62)" }}>
        <OperatorDiagram mode={founder.visualMode} />
      </Box>
      <Stack spacing={1.4} sx={{ p: 2.2, flex: 1 }}>
        {founder.text.map((p) => (
          <Typography key={p} sx={{ color: "var(--text-2)", fontSize: 14.5, lineHeight: 1.65 }}>{p}</Typography>
        ))}
        <Box sx={{ pt: 1 }}>
          <MetaLabel>Fokuss</MetaLabel>
          <Typography sx={{ color: "var(--text)", fontSize: 14, mt: 0.6 }}>{founder.focus.join(" · ")}</Typography>
        </Box>
        <Box>
          <MetaLabel>Jautājums</MetaLabel>
          <Typography sx={{ color: "var(--signal-amber)", fontSize: 14, mt: 0.6 }}>{founder.question}</Typography>
        </Box>
      </Stack>
      <Stack direction="row" useFlexGap flexWrap="wrap" spacing={0.8} sx={{ p: 2.2, pt: 0 }}>
        {founder.tags.map((t) => <SignalChip key={t} tone="blue">{t}</SignalChip>)}
      </Stack>
      <Stack direction="row" useFlexGap flexWrap="wrap" spacing={0.8} sx={{ p: 2.2, pt: 0 }}>
        {founder.layers.map((l) => <SignalChip key={l}>{l}</SignalChip>)}
      </Stack>
    </Box>
  );
}

function OperatorDiagram({ mode }: { mode: string }) {
  const W = 600;
  const H = 280;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <pattern id="op-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke="rgba(59,255,124,0.04)" strokeWidth="1" />
        </pattern>
        <marker id="op-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill={ACCENT} />
        </marker>
        <radialGradient id="op-glow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="rgba(59,255,124,0.25)" />
          <stop offset="100%" stopColor="rgba(59,255,124,0)" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width={W} height={H} fill="url(#op-grid)" />
      {mode === "architecture" && <Architecture />}
      {mode === "analysis" && <Analysis />}
      {mode === "communication" && <Communication />}
    </svg>
  );
}

function Pill({ x, y, label, icon }: { x: number; y: number; label: string; icon: string }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect width="160" height="28" rx="14" fill="rgba(8,12,10,0.7)" stroke={ACCENT} strokeWidth="1.2" />
      <text x="22" y="18" textAnchor="middle" fill={ACCENT} fontSize="11" fontWeight="700">{icon}</text>
      <line x1="38" y1="6" x2="38" y2="22" stroke="rgba(59,255,124,0.25)" />
      <text x="46" y="18" fill={TEXT} fontSize="9.5" letterSpacing="0.08em" fontWeight="600">{label}</text>
    </g>
  );
}

// Dāvids — system architecture cube + 7 component pills
function Architecture() {
  const cx = 300;
  const cy = 142;
  const left = [
    { y: 38, label: "MĀJASLAPA", icon: "⊕" },
    { y: 88, label: "FORMAS", icon: "≡" },
    { y: 138, label: "CRM", icon: "◉" }
  ];
  const right = [
    { y: 38, label: "DATU STRUKTŪRA", icon: "▤" },
    { y: 88, label: "INTEGRĀCIJAS", icon: "⇌" },
    { y: 138, label: "VADĪBAS PANELIS", icon: "▮" }
  ];
  return (
    <g>
      <text x="40" y="22" fill={ACCENT} fontSize="9" letterSpacing="0.2em" fontWeight="700">SISTĒMAS ARHITEKTŪRA</text>
      {left.map((it) => <Pill key={it.label} x={20} y={it.y} label={it.label} icon={it.icon} />)}
      {right.map((it) => <Pill key={it.label} x={420} y={it.y} label={it.label} icon={it.icon} />)}
      {/* central cube */}
      <g transform={`translate(${cx},${cy})`}>
        <circle r="58" fill="url(#op-glow)" />
        <path d="M-30 -22 L0 -36 L30 -22 L30 18 L0 32 L-30 18 Z" fill="rgba(8,12,10,0.85)" stroke={ACCENT} strokeWidth="1.4" />
        <path d="M-30 -22 L0 -8 L30 -22 M0 -8 L0 32" stroke={ACCENT} strokeWidth="1.2" fill="none" />
        <text x="0" y="-46" textAnchor="middle" fill={ACCENT} fontSize="9" letterSpacing="0.18em" fontWeight="700">SISTĒMAS KODOLS</text>
      </g>
      {/* connectors from pills to cube */}
      {[...left.map((it) => ({ x: 180, y: it.y + 14, dir: 1 })), ...right.map((it) => ({ x: 420, y: it.y + 14, dir: -1 }))].map((c, i) => (
        <line key={i} x1={c.x} y1={c.y} x2={cx + (c.dir < 0 ? 30 : -30)} y2={cy} stroke={DIM} strokeWidth="1" strokeDasharray="3 3" />
      ))}
      {/* system logic gear at bottom */}
      <g transform="translate(220,210)">
        <rect width="160" height="28" rx="14" fill="rgba(8,12,10,0.7)" stroke={ACCENT} strokeWidth="1.2" />
        <circle cx="20" cy="14" r="7" fill="none" stroke={ACCENT} strokeWidth="1.2" />
        <circle cx="20" cy="14" r="2.5" fill={ACCENT} />
        <text x="90" y="18" textAnchor="middle" fill={TEXT} fontSize="10" letterSpacing="0.1em" fontWeight="600">SISTĒMAS LOĠIKA</text>
      </g>
      <line x1="300" y1="184" x2="300" y2="210" stroke={DIM} strokeWidth="1" strokeDasharray="3 3" />
    </g>
  );
}

// Miks — interpretation hub with 4 inputs + 4 outputs
function Analysis() {
  const cx = 300;
  const cy = 142;
  const inputs = [
    { y: 38, label: "MEKLĒŠANAS TRENDI", icon: "↗" },
    { y: 88, label: "KONKURENTI", icon: "▲" },
    { y: 138, label: "NOZARES DATI", icon: "▮" },
    { y: 188, label: "SOCIĀLIE SIGNĀLI", icon: "◌" }
  ];
  const outputs = [
    { y: 38, label: "AUDITORIJAS IESKATI", icon: "◉" },
    { y: 88, label: "PIEDĀVĀJUMA ANALĪZE", icon: "≡" },
    { y: 138, label: "POZICIONĒŠANA", icon: "⊕" },
    { y: 188, label: "MĀRKETINGA FOKUSS", icon: "✦" }
  ];
  return (
    <g>
      <text x="20" y="22" fill={ACCENT} fontSize="9" letterSpacing="0.2em" fontWeight="700">TIRGUS SIGNĀLI</text>
      <text x="580" y="22" textAnchor="end" fill={ACCENT} fontSize="9" letterSpacing="0.2em" fontWeight="700">VIRZIENS</text>
      {inputs.map((it) => <Pill key={it.label} x={16} y={it.y} label={it.label} icon={it.icon} />)}
      {outputs.map((it) => <Pill key={it.label} x={424} y={it.y} label={it.label} icon={it.icon} />)}
      {/* hub hex */}
      <g transform={`translate(${cx},${cy})`}>
        <circle r="56" fill="url(#op-glow)" />
        <polygon points="0,-34 30,-17 30,17 0,34 -30,17 -30,-17" fill="rgba(8,12,10,0.85)" stroke={ACCENT} strokeWidth="1.4" />
        <polygon points="0,-20 18,-10 18,10 0,20 -18,10 -18,-10" fill="none" stroke={ACCENT} strokeWidth="1.2" />
        <circle r="6" fill={ACCENT} />
        <text x="0" y="-46" textAnchor="middle" fill={ACCENT} fontSize="9" letterSpacing="0.18em" fontWeight="700">INTERPRETĀCIJAS</text>
        <text x="0" y="50" textAnchor="middle" fill={ACCENT} fontSize="9" letterSpacing="0.18em" fontWeight="700">SLĀNIS</text>
      </g>
      {inputs.map((it, i) => (
        <line key={`in-${i}`} x1="176" y1={it.y + 14} x2={cx - 30} y2={cy} stroke={DIM} strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#op-arr)" />
      ))}
      {outputs.map((it, i) => (
        <line key={`out-${i}`} x1={cx + 30} y1={cy} x2="424" y2={it.y + 14} stroke={DIM} strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#op-arr)" />
      ))}
    </g>
  );
}

// Edvards — message → trust → relationship → growth wave-cone
function Communication() {
  const items = [
    { x: 70, label: "ZIŅOJUMS", sub: "SKAIDRĪBA", icon: "chat" },
    { x: 200, label: "VEIDOJOT", sub: "UZTICĒŠANOS", icon: "shield" },
    { x: 330, label: "STIPRAS", sub: "ATTIECĪBAS", icon: "users" },
    { x: 460, label: "VIRZA", sub: "IZAUGSMI", icon: "rise" }
  ];
  return (
    <g>
      <text x="28" y="22" fill={ACCENT} fontSize="9" letterSpacing="0.2em" fontWeight="700">SIGNĀLS → DARBĪBA</text>
      {items.map((it, i) => (
        <g key={i} transform={`translate(${it.x},${110})`}>
          <circle cx="36" cy="36" r="34" fill="url(#op-glow)" />
          <circle cx="36" cy="36" r="26" fill="rgba(8,12,10,0.85)" stroke={ACCENT} strokeWidth="1.4" />
          <CommIcon icon={it.icon} cx={36} cy={36} />
          <text x="36" y="92" textAnchor="middle" fill={TEXT} fontSize="10" letterSpacing="0.1em" fontWeight="700">{it.label}</text>
          <text x="36" y="106" textAnchor="middle" fill={MUTED} fontSize="9" letterSpacing="0.1em">{it.sub}</text>
          {i < items.length - 1 ? (
            <path d={`M70 36 Q${88} 30 110 36 Q${122} 42 130 36`} stroke={ACCENT} strokeWidth="1.4" fill="none" markerEnd="url(#op-arr)" />
          ) : null}
        </g>
      ))}
      {/* expanding waves under final node */}
      <g transform="translate(496,200)">
        {[14, 28, 42, 56].map((r, i) => (
          <path key={i} d={`M-${r} 0 a${r} ${r * 0.55} 0 0 1 ${r * 2} 0`} stroke={ACCENT} strokeWidth="1.1" strokeOpacity={1 - i * 0.2} fill="none" />
        ))}
      </g>
    </g>
  );
}

function CommIcon({ icon, cx, cy }: { icon: string; cx: number; cy: number }) {
  switch (icon) {
    case "chat":
      return (
        <g transform={`translate(${cx - 11},${cy - 10})`} fill="none" stroke={ACCENT} strokeWidth="1.4">
          <path d="M2 4 H22 V16 H10 L4 22 L6 16 H2 Z" />
          <line x1="6" y1="10" x2="18" y2="10" />
        </g>
      );
    case "shield":
      return (
        <g transform={`translate(${cx - 10},${cy - 11})`} fill="none" stroke={ACCENT} strokeWidth="1.4">
          <path d="M10 0 L20 4 V12 Q20 18 10 22 Q0 18 0 12 V4 Z" />
          <path d="M5 11 L9 15 L15 7" />
        </g>
      );
    case "users":
      return (
        <g transform={`translate(${cx - 12},${cy - 10})`} fill="none" stroke={ACCENT} strokeWidth="1.4">
          <circle cx="8" cy="6" r="4" />
          <circle cx="17" cy="6" r="4" />
          <path d="M0 20 Q8 12 16 20" />
          <path d="M9 20 Q17 12 24 20" />
        </g>
      );
    case "rise":
      return (
        <g transform={`translate(${cx - 11},${cy - 10})`} fill="none" stroke={ACCENT} strokeWidth="1.4">
          <path d="M0 18 L8 10 L13 14 L22 2" />
          <path d="M16 2 H22 V8" />
        </g>
      );
    default:
      return null;
  }
}
