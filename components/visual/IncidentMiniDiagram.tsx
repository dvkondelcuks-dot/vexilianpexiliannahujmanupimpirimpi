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
  // New scene: incoming message thread (left) → silent inbox queue (middle, with day counter) → ghost cell in spreadsheet (right)
  // The story: a hot lead writes in, days pass with zero owner action, the lead becomes a forgotten row.
  return (
    <g>
      {/* LEFT — incoming lead message bubble */}
      <g transform="translate(36,68)">
        <rect width="200" height="184" rx="10" fill="rgba(8,12,10,0.78)" stroke={ACCENT} strokeWidth="1.5" />
        <text x="14" y="22" fill={ACCENT} fontSize="10" letterSpacing="0.18em" fontWeight="700">JAUNS LEAD</text>
        {/* avatar + name */}
        <g transform="translate(14,38)">
          <circle cx="14" cy="14" r="14" fill="none" stroke={ACCENT} strokeWidth="1.4" />
          <circle cx="14" cy="11" r="5" fill={ACCENT} />
          <path d="M2 24 Q14 14 26 24" fill="none" stroke={ACCENT} strokeWidth="1.4" />
          <text x="36" y="14" fill={TEXT} fontSize="12" fontWeight="700" letterSpacing="0.04em">A. KALNIŅŠ</text>
          <text x="36" y="26" fill={MUTED} fontSize="10">a.kalnins@piemers.lv</text>
        </g>
        {/* incoming bubble */}
        <g transform="translate(14,82)">
          <path d="M0 8 H170 a4 4 0 0 1 4 4 V44 a4 4 0 0 1 -4 4 H22 L12 60 L14 48 H0 Z" fill="rgba(59,255,124,0.12)" stroke={ACCENT} strokeWidth="1.2" />
          <line x1="10" y1="20" x2="160" y2="20" stroke={DIM} strokeWidth="0.9" />
          <line x1="10" y1="30" x2="148" y2="30" stroke={DIM} strokeWidth="0.9" />
          <line x1="10" y1="40" x2="120" y2="40" stroke={DIM} strokeWidth="0.9" />
        </g>
        {/* tag chips */}
        <g transform="translate(14,156)">
          <rect width="58" height="16" rx="8" fill="rgba(59,255,124,0.14)" stroke={ACCENT} strokeWidth="0.9" />
          <text x="29" y="11" textAnchor="middle" fill={ACCENT} fontSize="8" letterSpacing="0.14em" fontWeight="700">VĒRTĪGS</text>
          <g transform="translate(64,0)">
            <rect width="60" height="16" rx="8" fill="rgba(59,255,124,0.14)" stroke={ACCENT} strokeWidth="0.9" />
            <text x="30" y="11" textAnchor="middle" fill={ACCENT} fontSize="8" letterSpacing="0.14em" fontWeight="700">B2B · MVU</text>
          </g>
        </g>
      </g>

      {/* connecting arrow → */}
      <path d="M244 160 L292 160" stroke={ACCENT} strokeWidth="1.5" markerEnd="url(#arr-lime)" />

      {/* MIDDLE — silent inbox queue showing days since touch */}
      <g transform="translate(296,68)">
        <rect width="248" height="184" rx="10" fill="rgba(8,12,10,0.7)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <text x="14" y="22" fill={MUTED} fontSize="10" letterSpacing="0.18em" fontWeight="700">CRM · NEPIEŠĶIRTI</text>
        {/* day-since header */}
        <text x="234" y="22" textAnchor="end" fill={MUTED} fontSize="9" letterSpacing="0.16em">DIENAS</text>
        {/* queue rows: highlight first row as our lead */}
        {[
          { name: "A. KALNIŅŠ",   days: 7, our: true  },
          { name: "M. OZOLS",     days: 4, our: false },
          { name: "K. BĒRZIŅA",   days: 11, our: false },
          { name: "I. LIEPA",     days: 2, our: false }
        ].map((r, i) => {
          const yy = 38 + i * 32;
          const overdue = r.days >= 3;
          return (
            <g key={r.name} transform={`translate(0,${yy})`}>
              <rect x="6" y="0" width="236" height="26" rx="4" fill={r.our ? "rgba(230,168,74,0.08)" : "rgba(8,12,10,0.5)"} stroke={r.our ? "#E6A84A" : DIM} strokeWidth={r.our ? 1.2 : 0.7} strokeDasharray={r.our ? "4 3" : undefined} />
              {/* status dot */}
              <circle cx="18" cy="13" r="4" fill={r.our ? "#E6A84A" : DIM} />
              <text x="30" y="17" fill={r.our ? TEXT : MUTED} fontSize="10" letterSpacing="0.06em" fontWeight={r.our ? 700 : 500}>{r.name}</text>
              {/* tiny envelope */}
              <g transform="translate(132,7)" fill="none" stroke={r.our ? "#E6A84A" : DIM} strokeWidth="1">
                <rect x="0" y="2" width="14" height="10" rx="1.5" />
                <path d="M0 3 L7 9 L14 3" />
              </g>
              {/* days counter */}
              <text x="234" y="17" textAnchor="end" fill={overdue ? "#E6A84A" : MUTED} fontSize="11" fontWeight="700">+{r.days}d</text>
              {/* "no owner" badge for our row */}
              {r.our ? (
                <g transform="translate(154,7)">
                  <rect width="62" height="12" rx="6" fill="rgba(38,18,8,0.7)" stroke="#E6A84A" strokeWidth="0.9" />
                  <text x="31" y="9" textAnchor="middle" fill="#E6A84A" fontSize="7.5" letterSpacing="0.14em" fontWeight="700">NAV ĪPAŠN.</text>
                </g>
              ) : null}
            </g>
          );
        })}
        {/* footer notice */}
        <text x="14" y="174" fill="#E6A84A" fontSize="9" letterSpacing="0.18em" fontWeight="700">7 DIENAS · 0 ATBILDES</text>
      </g>

      {/* connecting arrow → */}
      <path d="M552 160 L596 160" stroke={ACCENT} strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#arr-lime)" />

      {/* RIGHT — spreadsheet ghost cell */}
      <g transform="translate(602,68)">
        <rect width="186" height="184" rx="10" fill="rgba(8,12,10,0.78)" stroke="rgba(255,255,255,0.12)" />
        <text x="14" y="22" fill={MUTED} fontSize="9.5" letterSpacing="0.18em" fontWeight="700">IZKLĀJLAPA · LEADI</text>
        {/* spreadsheet column headers */}
        {["VĀRDS", "DATUMS", "ST."].map((h, i) => (
          <g key={h} transform={`translate(${10 + i * 60},32)`}>
            <rect width="56" height="18" rx="2" fill="rgba(255,255,255,0.04)" stroke={DIM} strokeWidth="0.7" />
            <text x="28" y="12" textAnchor="middle" fill={MUTED} fontSize="8" letterSpacing="0.14em" fontWeight="700">{h}</text>
          </g>
        ))}
        {/* rows */}
        {[
          { a: "I. LIEPA",     d: "12-04", s: "OK" },
          { a: "A. KALNIŅŠ",   d: "05-04", s: "—", ghost: true },
          { a: "M. OZOLS",     d: "09-04", s: "OK" }
        ].map((r, i) => {
          const yy = 54 + i * 22;
          return (
            <g key={i} transform={`translate(0,${yy})`}>
              {[r.a, r.d, r.s].map((cell, j) => (
                <g key={j} transform={`translate(${10 + j * 60},0)`}>
                  <rect width="56" height="20" rx="2" fill={r.ghost ? "rgba(230,168,74,0.06)" : "rgba(8,12,10,0.4)"} stroke={r.ghost ? "#E6A84A" : DIM} strokeWidth={r.ghost ? 1.1 : 0.6} strokeDasharray={r.ghost ? "3 3" : undefined} />
                  <text x="28" y="13" textAnchor="middle" fill={r.ghost ? "#E6A84A" : TEXT} fontSize="9" opacity={r.ghost ? 0.65 : 1} fontWeight={r.ghost ? 700 : 500}>{cell}</text>
                </g>
              ))}
            </g>
          );
        })}
        {/* strike-through ghost row */}
        <line x1="10" y1="86" x2="186" y2="86" stroke="#E6A84A" strokeWidth="1" strokeDasharray="3 3" />
        {/* caption */}
        <text x="14" y="146" fill="#E6A84A" fontSize="9" letterSpacing="0.16em" fontWeight="700">TUKŠA ŠŪNA</text>
        <text x="14" y="160" fill={MUTED} fontSize="9" letterSpacing="0.06em">LEAD KĻUVIS PAR</text>
        <text x="14" y="172" fill={MUTED} fontSize="9" letterSpacing="0.06em">FONA TROKSNI.</text>
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
  // New scene: a 4-stage funnel with dropouts at every stage falling into a "PAZUDĪS" drain
  // and a faint dashed "MISSING RECOVERY LOOP" arc that should bring them back to stage 1 — but doesn't.
  const stages = [
    { label: "KONTAKTS",    pct: 100 },
    { label: "ATBILDE",     pct: 64  },
    { label: "PIEDĀVĀJUMS", pct: 38  },
    { label: "SLĒGTS",      pct: 18  }
  ];
  const startX = 36;
  const stageW = 132;
  const gap = 14;
  const topY = 70;
  const baseY = 200;
  const drainY = 280;

  return (
    <g>
      {/* funnel header */}
      <text x={startX} y="40" fill={ACCENT} fontSize="10" letterSpacing="0.18em" fontWeight="700">KLIENTA CEĻŠ · BEZ ATGŪŠANAS</text>

      {/* funnel stages with dropouts */}
      {stages.map((s, i) => {
        const xx = startX + i * (stageW + gap);
        // each stage: a vertical bar whose fill height represents pct,
        // top label = stage name, bottom label = % through.
        const barH = baseY - topY;
        const fillH = (s.pct / 100) * barH;
        const dropPct = i > 0 ? stages[i - 1].pct - s.pct : 0;
        return (
          <g key={s.label}>
            {/* outer bar */}
            <rect x={xx} y={topY} width={stageW} height={barH} rx={6} fill="rgba(8,12,10,0.5)" stroke={DIM} strokeWidth="1" strokeDasharray="3 3" />
            {/* filled portion (still in funnel) */}
            <rect x={xx} y={baseY - fillH} width={stageW} height={fillH} rx={6} fill={ACCENT} fillOpacity="0.18" stroke={ACCENT} strokeWidth="1.2" />
            {/* corner brackets */}
            <path d={`M${xx + 6} ${topY + 14} V${topY + 6} H${xx + 14}`} stroke={ACCENT} strokeWidth="1" fill="none" />
            <path d={`M${xx + stageW - 14} ${topY + 6} H${xx + stageW - 6} V${topY + 14}`} stroke={ACCENT} strokeWidth="1" fill="none" />
            {/* labels */}
            <text x={xx + stageW / 2} y={topY + 26} textAnchor="middle" fill={TEXT} fontSize="11" letterSpacing="0.12em" fontWeight="700">{s.label}</text>
            <text x={xx + stageW / 2} y={baseY - fillH - 8} textAnchor="middle" fill={ACCENT} fontSize="14" fontWeight="700">{s.pct}%</text>

            {/* dropout indicator — leak channel falling into drain */}
            {i > 0 ? (
              <g>
                <path d={`M${xx} ${baseY - fillH + 8} C${xx - 8} ${baseY - fillH + 16}, ${xx - 18} ${drainY - 32}, ${xx - 12} ${drainY - 6}`} stroke="#E6A84A" strokeWidth="1.2" strokeDasharray="3 3" fill="none" markerEnd="url(#arr-lime)" />
                <text x={xx - 14} y={baseY - fillH + 4} textAnchor="end" fill="#E6A84A" fontSize="9" fontWeight="700">−{dropPct}%</text>
              </g>
            ) : null}

            {/* connecting arrow to next stage */}
            {i < stages.length - 1 ? (
              <path d={`M${xx + stageW} ${topY + barH / 2} L${xx + stageW + gap - 2} ${topY + barH / 2}`} stroke={ACCENT} strokeWidth="1.2" markerEnd="url(#arr-lime)" />
            ) : null}
          </g>
        );
      })}

      {/* DRAIN — collected dropouts pool */}
      <g transform={`translate(${startX - 4},${drainY - 12})`}>
        <rect width={stageW * stages.length + gap * (stages.length - 1) + 8} height="36" rx="6" fill="rgba(38,18,8,0.45)" stroke="#E6A84A" strokeWidth="1.2" strokeDasharray="4 3" />
        <text x="14" y="14" fill="#E6A84A" fontSize="9" letterSpacing="0.18em" fontWeight="700">PAZUDU\u0160AIS POOLS</text>
        <text x="14" y="28" fill={MUTED} fontSize="9" letterSpacing="0.06em">82 % no s\u0101kotn\u0113ji ie\u0146\u0101kuma plūsmas \u2014 nekur neatgriežas</text>
        {/* small ghost icons */}
        {[0.45, 0.55, 0.65, 0.75, 0.85].map((p, i) => (
          <g key={i} transform={`translate(${(stageW * stages.length + gap * (stages.length - 1) + 8) * p},10)`}>
            <circle cx="0" cy="6" r="3.5" fill="rgba(230,168,74,0.5)" stroke="#E6A84A" strokeWidth="0.8" />
            <path d="M-3 14 Q0 9 3 14" stroke="#E6A84A" strokeWidth="0.9" fill="none" />
          </g>
        ))}
      </g>

      {/* MISSING RECOVERY ARC — drawn faint above with red X overlay */}
      {(() => {
        const x1 = startX + stageW * stages.length + gap * (stages.length - 1) - 20;
        const x2 = startX + 20;
        const arcMidY = topY - 38;
        return (
          <g>
            <path d={`M${x1} ${topY + 10} C${x1} ${arcMidY}, ${x2} ${arcMidY}, ${x2} ${topY + 10}`} stroke="#E6A84A" strokeWidth="1.3" strokeDasharray="4 4" fill="none" />
            <text x={(x1 + x2) / 2} y={arcMidY + 4} textAnchor="middle" fill="#E6A84A" fontSize="9" letterSpacing="0.2em" fontWeight="700">ATG\u016a\u0160ANAS LOOP \u00b7 TR\u016aKST</text>
            {/* big X at the top of the arc */}
            <g transform={`translate(${(x1 + x2) / 2},${arcMidY - 14})`}>
              <circle r="11" fill="rgba(8,12,10,0.95)" stroke="#E6A84A" strokeWidth="1.4" />
              <line x1="-5" y1="-5" x2="5" y2="5" stroke="#E6A84A" strokeWidth="1.6" />
              <line x1="5" y1="-5" x2="-5" y2="5" stroke="#E6A84A" strokeWidth="1.6" />
            </g>
          </g>
        );
      })()}
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
