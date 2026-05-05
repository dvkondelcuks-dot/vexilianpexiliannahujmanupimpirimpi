"use client";

import { Box } from "@mui/material";

// Five hand-built incident illustrations matching the diagnosis screenshots.

type IncidentVisual = "postClickUnknown" | "leadSilence" | "attributionGap" | "noRecovery" | "pageBlindness";

const ACCENT = "#3BFF7C";
const DIM = "rgba(59,255,124,0.45)";
const TEXT = "#F4F7FA";
const MUTED = "#A7B0BA";
const W = 800;
const H = 320;
const PAD_X = 16;

function Defs() {
  return (
    <defs>
      <pattern id="inc-grid" width="32" height="32" patternUnits="userSpaceOnUse">
        <path d="M32 0H0V32" fill="none" stroke="rgba(59,255,124,0.04)" strokeWidth="1" />
      </pattern>
      <radialGradient id="inc-glow" cx="50%" cy="50%">
        <stop offset="0%" stopColor="rgba(59,255,124,0.18)" />
        <stop offset="100%" stopColor="rgba(59,255,124,0)" />
      </radialGradient>
      <marker id="arr-lime" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
        <path d="M0 0 L10 5 L0 10 Z" fill={ACCENT} />
      </marker>
    </defs>
  );
}

function PostClickUnknown() {
  return (
    <g>
      <g transform="translate(40,90)">
        <rect width="140" height="140" rx="12" fill="rgba(8,12,10,0.7)" stroke={ACCENT} strokeWidth="1.5" />
        <text x="70" y="86" textAnchor="middle" fill={TEXT} fontSize="38" fontWeight="700" letterSpacing="0.06em">AD</text>
        <path d="M85 96 L100 110 L92 112 L96 122 L92 124 L88 114 L82 118 Z" fill={ACCENT} />
        <text x="70" y="178" textAnchor="middle" fill={MUTED} fontSize="11" letterSpacing="0.12em">KLIKS</text>
      </g>
      <path d="M195 160 L255 160" stroke={ACCENT} strokeWidth="1.5" markerEnd="url(#arr-lime)" />
      <g transform="translate(270,90)">
        <rect width="180" height="140" rx="10" fill="rgba(8,12,10,0.7)" stroke={ACCENT} strokeWidth="1.5" />
        <circle cx="20" cy="18" r="3" fill={DIM} />
        <circle cx="32" cy="18" r="3" fill={DIM} />
        <circle cx="44" cy="18" r="3" fill={DIM} />
        <rect x="14" y="34" width="60" height="50" rx="4" fill="none" stroke={ACCENT} strokeWidth="1.2" />
        <path d="M22 70 L34 56 L46 64 L66 50 L66 80 L22 80 Z" fill={ACCENT} opacity="0.25" />
        <circle cx="58" cy="46" r="4" fill={ACCENT} opacity="0.6" />
        <line x1="86" y1="40" x2="166" y2="40" stroke={ACCENT} strokeWidth="1.2" />
        <line x1="86" y1="52" x2="166" y2="52" stroke={DIM} strokeWidth="1" />
        <line x1="86" y1="62" x2="146" y2="62" stroke={DIM} strokeWidth="1" />
        <line x1="86" y1="72" x2="156" y2="72" stroke={DIM} strokeWidth="1" />
        <line x1="14" y1="100" x2="166" y2="100" stroke={DIM} strokeWidth="1" />
        <line x1="14" y1="112" x2="140" y2="112" stroke={DIM} strokeWidth="1" />
        <line x1="14" y1="124" x2="120" y2="124" stroke={DIM} strokeWidth="1" />
        <text x="90" y="178" textAnchor="middle" fill={MUTED} fontSize="11" letterSpacing="0.12em">LAPA ATVĒRTA</text>
      </g>
      <path d="M450 160 L612 160" stroke={ACCENT} strokeWidth="1.5" strokeDasharray="5 5" fill="none" markerEnd="url(#arr-lime)" />
      <g transform="translate(620,90)">
        <circle cx="60" cy="60" r="62" fill="url(#inc-glow)" />
        <circle cx="60" cy="60" r="50" fill="none" stroke={ACCENT} strokeWidth="1.5" strokeDasharray="6 5" />
        <text x="60" y="74" textAnchor="middle" fill={ACCENT} fontSize="48" fontWeight="700">?</text>
        <text x="60" y="160" textAnchor="middle" fill={MUTED} fontSize="10" letterSpacing="0.1em">NENOTEIKTĀ ZONA</text>
        <text x="60" y="174" textAnchor="middle" fill={MUTED} fontSize="10" letterSpacing="0.1em">NULLE REDZAMĪBAS</text>
      </g>
    </g>
  );
}

function LeadSilence() {
  const stages = ["JAUNS", "KONTAKTĪES", "PIEDĀVĀTS", "SAGAIDA", "SLĒGTS"];
  return (
    <g>
      <g transform="translate(34,100)">
        <rect width="170" height="120" rx="10" fill="rgba(8,12,10,0.7)" stroke={ACCENT} strokeWidth="1.5" />
        <circle cx="34" cy="34" r="14" fill="none" stroke={ACCENT} strokeWidth="1.4" />
        <circle cx="34" cy="30" r="5" fill={ACCENT} />
        <path d="M22 44 Q34 32 46 44" stroke={ACCENT} strokeWidth="1.4" fill="none" />
        <text x="58" y="30" fill={TEXT} fontSize="13" fontWeight="700" letterSpacing="0.06em">JAUNS LEADS</text>
        <text x="58" y="46" fill={MUTED} fontSize="10">info@piemers.lv</text>
        <g transform="translate(14,72)">
          {/* envelope icon */}
          <rect x="0" y="3" width="28" height="22" rx="3" fill="none" stroke={ACCENT} strokeWidth="1.3" />
          <path d="M0 6 L14 18 L28 6" stroke={ACCENT} strokeWidth="1.3" fill="none" />
          {/* phone icon */}
          <path d="M40 4 L48 4 L52 10 L48 14 Q52 22 60 26 L64 22 L70 26 L70 32 Q62 34 54 28 Q44 22 40 12 Z" fill="none" stroke={ACCENT} strokeWidth="1.3" />
          {/* clock icon */}
          <circle cx="86" cy="15" r="12" fill="none" stroke={ACCENT} strokeWidth="1.3" />
          <path d="M86 9 L86 15 L92 19" stroke={ACCENT} strokeWidth="1.3" fill="none" />
        </g>
      </g>
      <path d="M212 158 L240 158" stroke={ACCENT} strokeWidth="1.5" markerEnd="url(#arr-lime)" />
      <g transform="translate(248,90)">
        <rect width="380" height="120" rx="8" fill="rgba(8,12,10,0.5)" stroke="rgba(255,255,255,0.1)" />
        {stages.map((label, i) => {
          const x = 22 + i * 70;
          const active = i === 2;
          return (
            <g key={label}>
              <text x={x + 22} y="22" textAnchor="middle" fill={active ? ACCENT : MUTED} fontSize="10" letterSpacing="0.1em">{label}</text>
              {active ? <rect x={x - 2} y="38" width="48" height="48" rx="4" fill="none" stroke={ACCENT} strokeWidth="1.4" strokeDasharray="4 3" /> : null}
              <circle cx={x + 22} cy="62" r="14" fill="none" stroke={active ? ACCENT : DIM} strokeWidth="1.4" />
              {i < stages.length - 1 ? <line x1={x + 38} y1="62" x2={x + 76} y2="62" stroke={DIM} strokeWidth="1.2" /> : null}
            </g>
          );
        })}
        <text x="190" y="108" textAnchor="middle" fill={ACCENT} fontSize="9" letterSpacing="0.1em" fontWeight="700">NAV PĀRŅĒMĒJA</text>
      </g>
      <path d="M640 160 L670 160" stroke={ACCENT} strokeWidth="1.5" markerEnd="url(#arr-lime)" />
      <g transform="translate(672,118)">
        <path d="M16 28 V18 a16 16 0 0 1 32 0 V28" stroke={ACCENT} strokeWidth="1.5" fill="none" />
        <rect x="6" y="28" width="52" height="42" rx="6" fill="none" stroke={ACCENT} strokeWidth="1.5" />
        <circle cx="32" cy="46" r="4" fill={ACCENT} />
        <line x1="32" y1="50" x2="32" y2="60" stroke={ACCENT} strokeWidth="1.5" />
        <text x="32" y="100" textAnchor="middle" fill={MUTED} fontSize="10" letterSpacing="0.1em">NEATBILDĒTS</text>
        <text x="32" y="114" textAnchor="middle" fill={MUTED} fontSize="10" letterSpacing="0.1em">ZAUDĒTS POTENCIĀLS</text>
      </g>
    </g>
  );
}

function AttributionGap() {
  const sources = [
    { label: "META", icon: "M" },
    { label: "GOOGLE", icon: "G" },
    { label: "EMAIL", icon: "@" },
    { label: "REFERRAL", icon: "P" },
    { label: "ORGANIC", icon: "O" },
    { label: "CRM", icon: "C" },
    { label: "DIRECT", icon: "D" }
  ];
  const startY = 28;
  const stepY = 38;
  return (
    <g>
      {sources.map((s, i) => {
        const y = startY + i * stepY;
        return (
          <g key={s.label}>
            <g transform={`translate(40, ${y})`}>
              <rect width="170" height="28" rx="14" fill="rgba(8,12,10,0.65)" stroke={ACCENT} strokeWidth="1.2" />
              <circle cx="18" cy="14" r="9" fill="none" stroke={ACCENT} strokeWidth="1.2" />
              <text x="18" y="18" textAnchor="middle" fill={ACCENT} fontSize="11" fontWeight="700">{s.icon}</text>
              <text x="40" y="18" fill={TEXT} fontSize="11" letterSpacing="0.1em" fontWeight="600">{s.label}</text>
            </g>
            <path d={`M210 ${y + 14} Q 320 ${y + 14} 450 160`} stroke={DIM} strokeWidth="1" fill="none" strokeDasharray="3 3" />
          </g>
        );
      })}
      <g transform="translate(450,116)">
        <circle cx="50" cy="40" r="44" fill="url(#inc-glow)" />
        <circle cx="50" cy="40" r="36" fill="none" stroke={ACCENT} strokeWidth="1.4" />
        <circle cx="50" cy="32" r="10" fill={ACCENT} />
        <path d="M30 56 Q50 38 70 56" stroke={ACCENT} strokeWidth="1.5" fill={ACCENT} fillOpacity="0.4" />
        <text x="50" y="106" textAnchor="middle" fill={TEXT} fontSize="11" letterSpacing="0.12em" fontWeight="700">KLIENTS</text>
      </g>
      <path d="M560 156 L630 156" stroke={ACCENT} strokeWidth="1.4" strokeDasharray="5 4" markerEnd="url(#arr-lime)" />
      <g transform="translate(630,108)">
        <circle cx="50" cy="50" r="48" fill="url(#inc-glow)" />
        <circle cx="50" cy="50" r="38" fill="none" stroke={ACCENT} strokeWidth="1.4" strokeDasharray="6 4" />
        <text x="50" y="64" textAnchor="middle" fill={ACCENT} fontSize="40" fontWeight="700">?</text>
        <text x="50" y="124" textAnchor="middle" fill={MUTED} fontSize="10" letterSpacing="0.1em">AVOTS</text>
        <text x="50" y="138" textAnchor="middle" fill={MUTED} fontSize="10" letterSpacing="0.1em">NEZINĀMS</text>
      </g>
    </g>
  );
}

function NoRecovery() {
  return (
    <g>
      <g transform="translate(28,110)">
        <rect width="176" height="100" rx="10" fill="rgba(8,12,10,0.7)" stroke={ACCENT} strokeWidth="1.5" />
        {/* avatar */}
        <circle cx="30" cy="34" r="14" fill="none" stroke={ACCENT} strokeWidth="1.4" />
        <circle cx="30" cy="30" r="5" fill={ACCENT} />
        <path d="M18 44 Q30 32 42 44" stroke={ACCENT} strokeWidth="1.4" fill="none" />
        {/* name + email */}
        <text x="54" y="28" fill={TEXT} fontSize="12" fontWeight="700" letterSpacing="0.04em">JAUNS LEADS</text>
        <text x="54" y="42" fill={MUTED} fontSize="9.5">info@piemers.lv</text>
        {/* status badge top right */}
        <g transform="translate(118,18)">
          <rect width="50" height="16" rx="8" fill="rgba(59,255,124,0.12)" stroke={ACCENT} strokeWidth="0.8" />
          <circle cx="8" cy="8" r="3" fill={ACCENT} />
          <text x="16" y="11" fill={ACCENT} fontSize="8" letterSpacing="0.08em" fontWeight="700">JAUNS</text>
        </g>
        {/* contact action icons */}
        <g transform="translate(14,64)">
          <rect x="0" y="3" width="24" height="18" rx="3" fill="none" stroke={ACCENT} strokeWidth="1.2" />
          <path d="M0 6 L12 16 L24 6" stroke={ACCENT} strokeWidth="1.2" fill="none" />
          <path d="M36 4 L42 4 L46 10 L42 14 Q46 20 52 24 L56 20 L62 24 L62 30 Q56 32 50 28 Q42 22 38 14 Z" fill="none" stroke={ACCENT} strokeWidth="1.2" />
          <circle cx="82" cy="15" r="11" fill="none" stroke={ACCENT} strokeWidth="1.2" />
          <path d="M82 9 L82 15 L88 18" stroke={ACCENT} strokeWidth="1.2" fill="none" />
          <rect x="108" y="4" width="22" height="22" rx="3" fill="none" stroke={ACCENT} strokeWidth="1.2" />
          <path d="M114 14 L118 18 L126 10" stroke={ACCENT} strokeWidth="1.4" fill="none" />
        </g>
      </g>
      <path d="M204 160 L260 160" stroke={ACCENT} strokeWidth="1.5" fill="none" markerEnd="url(#arr-lime)" />
      {["SAZIŅA", "SEKOŠANA", "GAIDA"].map((label, i) => {
        const x = 260 + i * 90;
        return (
          <g key={i} transform={`translate(${x}, 110)`}>
            <rect width="74" height="74" rx="6" fill="rgba(8,12,10,0.7)" stroke={ACCENT} strokeWidth="1.3" />
            {i === 0 ? (
              <path d="M18 24 H56 V44 H38 L30 52 L32 44 H18 Z" stroke={ACCENT} strokeWidth="1.3" fill="none" />
            ) : i === 1 ? (
              <path d="M16 28 H58 V46 H22 L16 52 Z M22 34 H46 M22 40 H42" stroke={ACCENT} strokeWidth="1.3" fill="none" />
            ) : (
              <g>
                <circle cx="37" cy="36" r="14" fill="none" stroke={ACCENT} strokeWidth="1.3" />
                <path d="M37 28 V36 L44 40" stroke={ACCENT} strokeWidth="1.3" fill="none" />
              </g>
            )}
            <text x="37" y="92" textAnchor="middle" fill={MUTED} fontSize="9.5" letterSpacing="0.08em">{label}</text>
            {i === 2 ? <text x="37" y="104" textAnchor="middle" fill={MUTED} fontSize="9.5" letterSpacing="0.08em">ATBILDI</text> : null}
          </g>
        );
      })}
      <path d="M510 144 Q570 60 614 82" stroke={ACCENT} strokeWidth="1.4" fill="none" strokeDasharray="5 4" />
      <g transform="translate(614,82)">
        <circle r="10" fill="rgba(8,12,10,0.9)" stroke="#E6A84A" strokeWidth="1.5" />
        <path d="M-5 -5 L5 5 M-5 5 L5 -5" stroke="#E6A84A" strokeWidth="1.6" />
      </g>
      <path d="M624 96 Q650 130 670 160" stroke={ACCENT} strokeWidth="1.4" fill="none" strokeDasharray="5 4" />
      <g transform="translate(640,118)">
        <circle cx="40" cy="40" r="40" fill="url(#inc-glow)" />
        <circle cx="40" cy="32" r="10" fill="none" stroke={ACCENT} strokeWidth="1.4" />
        <path d="M22 60 Q40 42 58 60" stroke={ACCENT} strokeWidth="1.4" fill="none" />
        <text x="40" y="100" textAnchor="middle" fill={MUTED} fontSize="10" letterSpacing="0.1em">PAZAUDĒTS</text>
        <text x="40" y="114" textAnchor="middle" fill={MUTED} fontSize="10" letterSpacing="0.1em">UZ PALIKŠANU</text>
      </g>
    </g>
  );
}

function PageBlindness() {
  return (
    <g>
      <g transform="translate(40,40)">
        <rect width="440" height="240" rx="12" fill="rgba(8,12,10,0.7)" stroke={ACCENT} strokeWidth="1.5" />
        <circle cx="22" cy="22" r="11" fill="none" stroke={ACCENT} strokeWidth="1.2" />
        <path d="M26 18 L18 22 L26 26" stroke={ACCENT} strokeWidth="1.3" fill="none" />
        <circle cx="404" cy="22" r="2.5" fill={DIM} />
        <circle cx="414" cy="22" r="2.5" fill={DIM} />
        <circle cx="424" cy="22" r="2.5" fill={DIM} />
        <line x1="50" y1="50" x2="200" y2="50" stroke={DIM} strokeWidth="1.2" />
        <line x1="50" y1="62" x2="160" y2="62" stroke={DIM} strokeWidth="1.2" />
        <line x1="220" y1="50" x2="380" y2="50" stroke={DIM} strokeWidth="1.2" />
        <line x1="220" y1="62" x2="350" y2="62" stroke={DIM} strokeWidth="1.2" />
        <line x1="220" y1="74" x2="380" y2="74" stroke={DIM} strokeWidth="1.2" />
        <rect x="50" y="100" width="120" height="80" rx="4" fill="none" stroke={DIM} strokeWidth="1.2" />
        <path d="M58 168 L80 150 L100 162 L140 130 L160 174 L58 174 Z" fill={DIM} opacity="0.4" />
        <circle cx="148" cy="120" r="6" fill={DIM} opacity="0.7" />
        <rect x="220" y="100" width="120" height="32" rx="4" fill={ACCENT} opacity="0.55" />
        <rect x="220" y="100" width="120" height="32" rx="4" fill="none" stroke={ACCENT} strokeWidth="1.4" />
        <rect x="50" y="200" width="60" height="34" rx="3" fill="none" stroke={DIM} />
        <rect x="120" y="200" width="60" height="34" rx="3" fill="none" stroke={DIM} />
        <path d="M30 40 Q120 60 200 80 T280 116" stroke={ACCENT} strokeWidth="2" fill="none" />
        <circle cx="120" cy="60" r="9" fill="rgba(8,12,10,0.85)" stroke={ACCENT} strokeWidth="1.3" />
        <text x="120" y="64" textAnchor="middle" fill={ACCENT} fontSize="9" fontWeight="700">II</text>
        <circle cx="200" cy="80" r="9" fill="rgba(8,12,10,0.85)" stroke={ACCENT} strokeWidth="1.3" />
        <text x="200" y="84" textAnchor="middle" fill={ACCENT} fontSize="9" fontWeight="700">II</text>
        <path d="M280 116 Q220 180 160 160 T100 220" stroke={ACCENT} strokeWidth="2" fill="none" />
        <circle cx="160" cy="160" r="9" fill="rgba(8,12,10,0.85)" stroke={ACCENT} strokeWidth="1.3" />
        <text x="160" y="164" textAnchor="middle" fill={ACCENT} fontSize="9" fontWeight="700">II</text>
        <path d="M286 116 L300 130 L292 132 L296 142 L292 144 L288 134 L282 138 Z" fill={ACCENT} />
      </g>
      <path d="M490 120 L560 120" stroke={ACCENT} strokeWidth="1.4" strokeDasharray="5 4" markerEnd="url(#arr-lime)" />
      <g transform="translate(560,52)">
        <circle cx="60" cy="60" r="58" fill="url(#inc-glow)" />
        <circle cx="60" cy="60" r="46" fill="none" stroke={ACCENT} strokeWidth="1.4" strokeDasharray="6 4" />
        <text x="60" y="76" textAnchor="middle" fill={ACCENT} fontSize="44" fontWeight="700">?</text>
      </g>
      <g transform="translate(584,210)">
        <path d="M0 22 Q26 -6 52 22 Q26 50 0 22 Z" fill="none" stroke={MUTED} strokeWidth="1.3" />
        <circle cx="26" cy="22" r="8" fill="none" stroke={MUTED} strokeWidth="1.3" />
        <line x1="-4" y1="-4" x2="56" y2="48" stroke={MUTED} strokeWidth="1.5" />
        <text x="26" y="74" textAnchor="middle" fill={MUTED} fontSize="10" letterSpacing="0.1em">NEZINĀMS, KUR AIZIET.</text>
        <text x="26" y="88" textAnchor="middle" fill={MUTED} fontSize="10" letterSpacing="0.1em">NAV REDZAMĪBAS.</text>
      </g>
    </g>
  );
}

const VISUALS: Record<IncidentVisual, () => React.JSX.Element> = {
  postClickUnknown: PostClickUnknown,
  leadSilence: LeadSilence,
  attributionGap: AttributionGap,
  noRecovery: NoRecovery,
  pageBlindness: PageBlindness
};

export function IncidentMiniDiagram({ visual }: { visual: IncidentVisual }) {
  const Visual = VISUALS[visual];
  return (
    <Box sx={{ width: "100%" }}>
      <svg viewBox={`${-PAD_X} 0 ${W + PAD_X * 2} ${H}`} role="img" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "auto", display: "block" }}>
        <Defs />
        <rect x={-PAD_X} y="0" width={W + PAD_X * 2} height={H} fill="url(#inc-grid)" />
        <Visual />
      </svg>
    </Box>
  );
}
