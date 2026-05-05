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
              {/* days counter */}
              <text x="232" y="17" textAnchor="end" fill={overdue ? "#E6A84A" : MUTED} fontSize="11" fontWeight="700">+{r.days}d</text>
              {/* compact "no owner" badge for our row */}
              {r.our ? (
                <g transform="translate(132,8)">
                  <rect width="74" height="10" rx="5" fill="rgba(38,18,8,0.7)" stroke="#E6A84A" strokeWidth="0.9" />
                  <text x="37" y="7.6" textAnchor="middle" fill="#E6A84A" fontSize="6.6" letterSpacing="0.18em" fontWeight="700">NAV ĪPAŠNIEKA</text>
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
        <text x="14" y="160" fill={MUTED} fontSize="9" letterSpacing="0.06em">PIEPRASĪJUMS KĻUVIS PAR</text>
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
  // Open-loop cycle metaphor — three nodes forming what SHOULD be a closed cycle,
  // but the return arc is missing. Centered. The story: contact → no answer →
  // marked lost → (no recovery loop back to re-engage) → permanent loss.
  const cx = 400;
  const cy = 168;
  const radius = 108;
  // node positions on the circle (top, bottom-right, bottom-left)
  const nodes = [
    { angle: -90, label: "KONTAKTS",   sub: "leads ienāk",     icon: "in"  },
    { angle:  30, label: "NEATBILDE",  sub: "klusums",         icon: "mute"},
    { angle: 150, label: "ZAUDĒTS",    sub: "marķēts par lost", icon: "out" }
  ];
  const pos = (a: number) => ({
    x: +(cx + Math.cos((a * Math.PI) / 180) * radius).toFixed(3),
    y: +(cy + Math.sin((a * Math.PI) / 180) * radius).toFixed(3)
  });

  // helper: arc from node a→b along the circle (short way clockwise)
  const arcPath = (a1: number, a2: number, color: string, dashed: boolean) => {
    const p1 = pos(a1);
    const p2 = pos(a2);
    return (
      <path
        d={`M${p1.x} ${p1.y} A${radius} ${radius} 0 0 1 ${p2.x} ${p2.y}`}
        stroke={color}
        strokeWidth="1.6"
        fill="none"
        strokeDasharray={dashed ? "5 5" : undefined}
        markerEnd={dashed ? undefined : "url(#arr-lime)"}
      />
    );
  };

  // node icon switch
  const NodeIcon = ({ kind }: { kind: string }) => {
    if (kind === "in") {
      return (
        <g fill="none" stroke={ACCENT} strokeWidth="1.5">
          <path d="M-12 0 L8 0" />
          <path d="M2 -6 L8 0 L2 6" />
          <circle cx="12" cy="0" r="4" fill={ACCENT} />
        </g>
      );
    }
    if (kind === "mute") {
      return (
        <g fill="none" stroke="#E6A84A" strokeWidth="1.5">
          {/* speaker silenced */}
          <path d="M-10 -5 L-4 -5 L2 -10 L2 10 L-4 5 L-10 5 Z" fill="rgba(230,168,74,0.18)" />
          <line x1="6" y1="-7" x2="14" y2="7" />
          <line x1="14" y1="-7" x2="6" y2="7" />
        </g>
      );
    }
    // out — gravestone-style flag
    return (
      <g fill="none" stroke="#E6A84A" strokeWidth="1.5">
        <line x1="-8" y1="-10" x2="-8" y2="10" />
        <path d="M-8 -10 L8 -10 L4 -6 L8 -2 L-8 -2 Z" fill="rgba(230,168,74,0.22)" />
      </g>
    );
  };

  return (
    <g>
      {/* eyebrow above */}
      <text x={cx} y="34" textAnchor="middle" fill={ACCENT} fontSize="10" letterSpacing="0.22em" fontWeight="700">ATGŪŠANAS CIKLS · ATVĒRTS</text>

      {/* faint full circle to suggest the intended cycle */}
      <circle cx={cx} cy={cy} r={radius} fill="none" stroke="rgba(59,255,124,0.08)" strokeWidth="1" strokeDasharray="2 6" />

      {/* TWO present arcs (KONTAKTS → NEATBILDE → ZAUDĒTS) — solid green */}
      {arcPath(-90, 30, ACCENT, false)}
      {arcPath(30, 150, ACCENT, false)}

      {/* MISSING return arc (ZAUDĒTS → KONTAKTS) — faint amber dashed with broken-link X */}
      {arcPath(150, 270, "#E6A84A", true)}

      {/* the broken-link badge that interrupts the missing arc */}
      <g transform={`translate(${cx - 132},${cy + 38})`}>
        <rect x="-46" y="-12" width="92" height="24" rx="12" fill="rgba(8,12,10,0.96)" stroke="#E6A84A" strokeWidth="1.2" />
        <g transform="translate(-32,0)" stroke="#E6A84A" strokeWidth="1.4" fill="none">
          {/* broken chain link icon */}
          <path d="M-6 -4 a4 4 0 0 1 4 -4 h2" />
          <path d="M6 4 a4 4 0 0 1 -4 4 h-2" />
          <line x1="-9" y1="-7" x2="9" y2="7" />
        </g>
        <text x="6" y="3.5" textAnchor="middle" fill="#E6A84A" fontSize="7.5" letterSpacing="0.18em" fontWeight="700">NAV CIKLA</text>
      </g>

      {/* nodes */}
      {nodes.map((n, i) => {
        const p = pos(n.angle);
        return (
          <g key={n.label} transform={`translate(${p.x},${p.y})`}>
            {/* outer halo */}
            <circle r="34" fill="url(#inc-glow)" />
            {/* node disc */}
            <circle r="26" fill="rgba(8,12,10,0.92)" stroke={i === 0 ? ACCENT : "#E6A84A"} strokeWidth="1.6" />
            {/* number */}
            <text x="0" y="-32" textAnchor="middle" fill={i === 0 ? ACCENT : "#E6A84A"} fontSize="8" letterSpacing="0.2em" fontWeight="700">0{i + 1}</text>
            {/* icon */}
            <NodeIcon kind={n.icon} />
            {/* label below node */}
            <text x="0" y="46" textAnchor="middle" fill={TEXT} fontSize="11" letterSpacing="0.16em" fontWeight="700">{n.label}</text>
            <text x="0" y="60" textAnchor="middle" fill={MUTED} fontSize="9" letterSpacing="0.06em">{n.sub}</text>
          </g>
        );
      })}

      {/* CENTER stamp — the diagnosis */}
      <g transform={`translate(${cx},${cy})`}>
        <circle r="46" fill="rgba(8,12,10,0.88)" stroke="rgba(230,168,74,0.55)" strokeWidth="1.1" strokeDasharray="3 4" />
        <text x="0" y="-6" textAnchor="middle" fill="#E6A84A" fontSize="9" letterSpacing="0.24em" fontWeight="700">ATGŪŠANA</text>
        <text x="0" y="10" textAnchor="middle" fill={TEXT} fontSize="13" letterSpacing="0.18em" fontWeight="700">TRŪKST</text>
        <text x="0" y="24" textAnchor="middle" fill={MUTED} fontSize="7" letterSpacing="0.16em">nav atgriešanas mehānisma</text>
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
