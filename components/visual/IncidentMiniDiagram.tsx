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
  // Rebuilt to match the PageBlindness composition: a single dashboard-style panel
  // on the left (attribution report mockup with channel rows whose source column is "?"),
  // an arrow to a question-mark bubble on the right, and a closing footer microcopy.
  const channels = [
    { label: "META",       spend: "€1 240", clicks: "412" },
    { label: "GOOGLE",     spend: "€  980", clicks: "287" },
    { label: "INSTAGRAM",  spend: "€  640", clicks: "194" },
    { label: "ORGĀNISKAIS",spend: "€    0", clicks: "121" },
    { label: "REKOMEND.",  spend: "€    0", clicks: " 56" },
    { label: "E-PASTS",    spend: "€  120", clicks: " 38" },
    { label: "TIEŠAIS",    spend: "€    0", clicks: " 22" }
  ];
  const rowH = 22;
  const rowsY = 64;
  return (
    <g>
      {/* dashboard panel */}
      <g transform="translate(40,40)">
        <rect width="500" height="240" rx="12" fill="rgba(8,12,10,0.7)" stroke={ACCENT} strokeWidth="1.5" />
        {/* window chrome */}
        <circle cx="22" cy="22" r="11" fill="none" stroke={ACCENT} strokeWidth="1.2" />
        <path d="M27 18 L19 22 L27 26" stroke={ACCENT} strokeWidth="1.3" fill="none" />
        <circle cx="464" cy="22" r="2.5" fill={DIM} />
        <circle cx="474" cy="22" r="2.5" fill={DIM} />
        <circle cx="484" cy="22" r="2.5" fill={DIM} />
        {/* report title */}
        <text x="46" y="26" fill={ACCENT} fontSize="10" letterSpacing="0.22em" fontWeight="700">ATRIBŪCIJAS ATSKAITE · 14D</text>
        {/* column headers */}
        <text x="22"  y="50" fill={MUTED} fontSize="8.5" letterSpacing="0.18em">KANĀLS</text>
        <text x="220" y="50" fill={MUTED} fontSize="8.5" letterSpacing="0.18em" textAnchor="end">IZMAKSAS</text>
        <text x="320" y="50" fill={MUTED} fontSize="8.5" letterSpacing="0.18em" textAnchor="end">KLIKI</text>
        <text x="478" y="50" fill={MUTED} fontSize="8.5" letterSpacing="0.18em" textAnchor="end">PIEŠĶIRTS AVOTS</text>
        <line x1="14" y1="56" x2="486" y2="56" stroke={DIM} strokeWidth="0.9" />
        {/* rows */}
        {channels.map((c, i) => {
          const y = rowsY + i * rowH;
          return (
            <g key={c.label}>
              <line x1="14" y1={y + rowH - 2} x2="486" y2={y + rowH - 2} stroke="rgba(59,255,124,0.08)" strokeWidth="0.8" />
              {/* channel dot */}
              <circle cx="22" cy={y + 8} r="3" fill={ACCENT} />
              <text x="32"  y={y + 11} fill={TEXT}  fontSize="10" letterSpacing="0.08em" fontWeight="600">{c.label}</text>
              <text x="220" y={y + 11} fill={TEXT}  fontSize="10" textAnchor="end" fontFamily="var(--mono)">{c.spend}</text>
              <text x="320" y={y + 11} fill={TEXT}  fontSize="10" textAnchor="end" fontFamily="var(--mono)">{c.clicks}</text>
              {/* assigned source — all "?" — the visual punchline */}
              <g transform={`translate(420,${y - 2})`}>
                <rect width="62" height="14" rx="3" fill="rgba(38,18,8,0.55)" stroke="#E6A84A" strokeWidth="0.9" strokeDasharray="3 2" />
                <text x="31" y="10.5" textAnchor="middle" fill="#E6A84A" fontSize="9" fontWeight="700">? ? ?</text>
              </g>
            </g>
          );
        })}
      </g>

      {/* arrow to "?" diagnostic bubble */}
      <path d="M550 120 L620 120" stroke={ACCENT} strokeWidth="1.4" strokeDasharray="5 4" markerEnd="url(#arr-lime)" />

      {/* big question bubble (matches PageBlindness composition) */}
      <g transform="translate(620,52)">
        <circle cx="60" cy="60" r="58" fill="url(#inc-glow)" />
        <circle cx="60" cy="60" r="46" fill="none" stroke={ACCENT} strokeWidth="1.4" strokeDasharray="6 4" />
        <text x="60" y="76" textAnchor="middle" fill={ACCENT} fontSize="44" fontWeight="700">?</text>
      </g>

      {/* footer microcopy with eye-with-slash */}
      <g transform="translate(644,210)">
        <path d="M0 22 Q26 -6 52 22 Q26 50 0 22 Z" fill="none" stroke={MUTED} strokeWidth="1.3" />
        <circle cx="26" cy="22" r="8" fill="none" stroke={MUTED} strokeWidth="1.3" />
        <line x1="-4" y1="-4" x2="56" y2="48" stroke={MUTED} strokeWidth="1.5" />
        <text x="26" y="74" textAnchor="middle" fill={MUTED} fontSize="10" letterSpacing="0.1em">NAV REDZAMS,</text>
        <text x="26" y="88" textAnchor="middle" fill={MUTED} fontSize="10" letterSpacing="0.1em">KAS ATVEDA KLIENTU.</text>
      </g>
    </g>
  );
}

function NoRecovery() {
  // Rebuilt to match the AttributionGap / PageBlindness composition:
  // a single dashboard-style panel on the left listing dropped-off contacts
  // whose "next touch" column is empty, an arrow to a diagnostic bubble showing
  // a broken-loop icon, and a closing footer microcopy.
  const drops = [
    { name: "ANNA B.",    last: "PIRMS 18D", next: "—" },
    { name: "K\u0100RLIS L.",  last: "PIRMS 22D", next: "—" },
    { name: "JANIS \u0132.",   last: "PIRMS 28D", next: "—" },
    { name: "LIENE M.",   last: "PIRMS 34D", next: "—" },
    { name: "ANDR\u0136S T.",  last: "PIRMS 41D", next: "—" },
    { name: "SANTA O.",   last: "PIRMS 47D", next: "—" },
    { name: "EDGARS V.",  last: "PIRMS 56D", next: "—" }
  ];
  const rowH = 22;
  const rowsY = 64;
  return (
    <g>
      {/* dashboard panel */}
      <g transform="translate(40,40)">
        <rect width="500" height="240" rx="12" fill="rgba(8,12,10,0.7)" stroke={ACCENT} strokeWidth="1.5" />
        {/* window chrome */}
        <circle cx="22" cy="22" r="11" fill="none" stroke={ACCENT} strokeWidth="1.2" />
        <path d="M27 18 L19 22 L27 26" stroke={ACCENT} strokeWidth="1.3" fill="none" />
        <circle cx="464" cy="22" r="2.5" fill={DIM} />
        <circle cx="474" cy="22" r="2.5" fill={DIM} />
        <circle cx="484" cy="22" r="2.5" fill={DIM} />
        {/* report title */}
        <text x="46" y="26" fill={ACCENT} fontSize="10" letterSpacing="0.22em" fontWeight="700">ZAUD\u0112TIE KONTAKTI \u00b7 60D</text>
        {/* column headers */}
        <text x="22"  y="50" fill={MUTED} fontSize="8.5" letterSpacing="0.18em">KONTAKTS</text>
        <text x="240" y="50" fill={MUTED} fontSize="8.5" letterSpacing="0.18em" textAnchor="end">P\u0112D\u0112JAIS PIESK\u0100RIENS</text>
        <text x="478" y="50" fill={MUTED} fontSize="8.5" letterSpacing="0.18em" textAnchor="end">N\u0100KAMAIS SOLIS</text>
        <line x1="14" y1="56" x2="486" y2="56" stroke={DIM} strokeWidth="0.9" />
        {/* rows */}
        {drops.map((d, i) => {
          const y = rowsY + i * rowH;
          return (
            <g key={d.name}>
              <line x1="14" y1={y + rowH - 2} x2="486" y2={y + rowH - 2} stroke="rgba(59,255,124,0.08)" strokeWidth="0.8" />
              {/* status dot — amber to signal abandonment */}
              <circle cx="22" cy={y + 8} r="3" fill="#E6A84A" />
              <text x="32"  y={y + 11} fill={TEXT}  fontSize="10" letterSpacing="0.08em" fontWeight="600">{d.name}</text>
              <text x="240" y={y + 11} fill={MUTED} fontSize="10" textAnchor="end" fontFamily="var(--mono)">{d.last}</text>
              {/* "next step" pill — amber dashed empty */}
              <g transform={`translate(420,${y - 2})`}>
                <rect width="62" height="14" rx="3" fill="rgba(38,18,8,0.55)" stroke="#E6A84A" strokeWidth="0.9" strokeDasharray="3 2" />
                <text x="31" y="10.5" textAnchor="middle" fill="#E6A84A" fontSize="9" fontWeight="700">{d.next}</text>
              </g>
            </g>
          );
        })}
      </g>

      {/* arrow to diagnostic bubble */}
      <path d="M550 120 L620 120" stroke={ACCENT} strokeWidth="1.4" strokeDasharray="5 4" markerEnd="url(#arr-lime)" />

      {/* big diagnostic bubble — broken-loop icon */}
      <g transform="translate(620,52)">
        <circle cx="60" cy="60" r="58" fill="url(#inc-glow)" />
        <circle cx="60" cy="60" r="46" fill="none" stroke={ACCENT} strokeWidth="1.4" strokeDasharray="6 4" />
        {/* broken cycle arrows */}
        <g transform="translate(60,60)" stroke={ACCENT} strokeWidth="2" fill="none" strokeLinecap="round">
          <path d="M-20 -8 a22 22 0 0 1 38 -6" />
          <path d="M14 -16 L20 -14 L18 -8" />
          <path d="M20 8 a22 22 0 0 1 -38 6" stroke="#E6A84A" strokeDasharray="3 3" />
        </g>
        <text x="60" y="84" textAnchor="middle" fill="#E6A84A" fontSize="9" letterSpacing="0.22em" fontWeight="700">CIKLS LAUSTS</text>
      </g>

      {/* footer microcopy with broken-link icon */}
      <g transform="translate(644,210)">
        <g transform="translate(0,18)" stroke={MUTED} strokeWidth="1.4" fill="none">
          <path d="M-4 0 a6 6 0 0 1 6 -6 h6" />
          <path d="M28 8 a6 6 0 0 1 -6 6 h-6" />
          <line x1="-2" y1="14" x2="30" y2="-6" />
        </g>
        <text x="26" y="74" textAnchor="middle" fill={MUTED} fontSize="10" letterSpacing="0.1em">NAV ATG\u016a\u0160ANAS,</text>
        <text x="26" y="88" textAnchor="middle" fill={MUTED} fontSize="10" letterSpacing="0.1em">KONTAKTS PALIEK ZAUD\u0112TS.</text>
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
