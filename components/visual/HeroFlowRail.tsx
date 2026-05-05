"use client";

import { Box } from "@mui/material";

const STAGES = [
  { code: "01", title: ["IENĀKOŠĀ", "INTERESE"], bullets: ["META / GOOGLE / UGC", "SEO / ZIŅOJ / IETEIKUMI", "E-PASTS / KAMPAŅAS"], status: "IEEJA SISTĒMĀ" },
  { code: "02", title: ["MĀJASLAPA"], bullets: ["SKAIDRS PIEDĀVĀJUMS", "UZTICĒŠANĀS", "CTA VIRZIENA", "LOKĀLA SEO"], status: "UZTICĒŠANĀS UN DARBĪBA" },
  { code: "03", title: ["CRM"], bullets: ["PIEPELNI POSMI", "PIASNIĒTI", "LEAD STATUSI", "KLIENTU DATI"], status: "PĀRREDZAMĪBA" },
  { code: "04", title: ["AUTOMATIZĀCIJA"], bullets: ["LEAD CAPTURE", "MARŠRUTĒŠANA", "ATGĀDINĀJUMI", "FOLLOW-UP"], status: "TURPINA DARBĪBU" },
  { code: "05", title: ["KVALIFICĒTS", "LEADS"], bullets: ["FILTRĒTI PĒC NODOMĀ", "VĒRTĒTAS UN AVOTA", "KVALITĀTE > DAUDZUMS"], status: "GATAVI PĀRDOŠANAI" },
  { code: "06", title: ["PĀRDOŠANA /", "REZERVĀCIJA"], bullets: ["PIEDĀVĀJUMU", "SASTRĀDĀJUMI", "REZERVĀCIJAS", "IEŅĒMUMI"], status: "NOSLĒGTA DARBĪJUMĀ" },
  { code: "07", title: ["NOTURĒŠANA"], bullets: ["ATGĀDINĀJUMI", "AKTIVIZĒŠANA", "ATSAUKSMES", "IETEIKUMI"], status: "ILGTERMIŅA VĒRTĪBA" },
  { code: "08", title: ["VADĪBAS", "PANELIS"], bullets: ["PĀRRSKATI / KPI", "REZERVĀCIJAS", "ROI / AVOTI", "ATTĪSTĪBA"], status: "PĀRSKATĀMĪBA & KONTROLE" }
] as const;

const ACCENT = "#3BFF7C";

export function HeroFlowRail() {
  const W = 1600;
  const H = 360;
  const cardW = 178;
  const gap = 18;
  const totalW = STAGES.length * cardW + (STAGES.length - 1) * gap;
  const startX = (W - totalW) / 2;
  const cardY = 12;
  const cardH = 250;
  const railY = cardH + 60;

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Box sx={{ minWidth: 1100 }}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Astoņpakāpju komerciālā plūsma" style={{ width: "100%", height: "auto", display: "block", fontFamily: "var(--font-display, ui-sans-serif)" }}>
          <defs>
            <pattern id="hf-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M48 0H0V48" fill="none" stroke="rgba(59,255,124,0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect x="0" y="0" width={W} height={H} fill="url(#hf-grid)" />

          {STAGES.map((s, i) => {
            const x = startX + i * (cardW + gap);
            return (
              <g key={s.code}>
                {/* card */}
                <rect x={x} y={cardY} width={cardW} height={cardH} rx={6} fill="rgba(8,12,10,0.85)" stroke="rgba(59,255,124,0.55)" strokeWidth={1.2} />
                {/* corner brackets */}
                <path d={`M${x + 6} ${cardY + 14} V${cardY + 6} H${x + 14}`} stroke={ACCENT} strokeWidth={1.4} fill="none" />
                <path d={`M${x + cardW - 6} ${cardY + 14} V${cardY + 6} H${x + cardW - 14}`} stroke={ACCENT} strokeWidth={1.4} fill="none" />
                {/* code */}
                <text x={x + 14} y={cardY + 30} fill={ACCENT} fontSize="14" fontWeight="600" letterSpacing="0.04em">{s.code}</text>
                {/* dots ornament */}
                <text x={x + cardW - 14} y={cardY + 30} textAnchor="end" fill={ACCENT} fontSize="12" letterSpacing="0.18em">····</text>
                {/* title */}
                {s.title.map((t, ti) => (
                  <text key={ti} x={x + 14} y={cardY + 64 + ti * 18} fill="#F4F7FA" fontSize="14.5" fontWeight="700" letterSpacing="0.02em">{t}</text>
                ))}
                {/* divider */}
                <line x1={x + 14} x2={x + cardW - 14} y1={cardY + 64 + s.title.length * 18 + 8} y2={cardY + 64 + s.title.length * 18 + 8} stroke="rgba(59,255,124,0.18)" />
                {/* bullets */}
                {s.bullets.map((b, bi) => (
                  <text key={bi} x={x + 14} y={cardY + 64 + s.title.length * 18 + 28 + bi * 14} fill="#A7B0BA" fontSize="9.5" letterSpacing="0.06em">{b}</text>
                ))}
                {/* status pill at bottom */}
                <text x={x + cardW / 2} y={cardY + cardH + 22} textAnchor="middle" fill={ACCENT} fontSize="10" letterSpacing="0.08em" fontWeight="600">{s.status}</text>
                {/* connector arrow inside */}
                {i < STAGES.length - 1 ? (
                  <g>
                    <path d={`M${x + cardW - 18} ${cardY + 90} L${x + cardW - 8} ${cardY + 95} L${x + cardW - 18} ${cardY + 100}`} stroke={ACCENT} strokeWidth={1.2} fill="none" />
                  </g>
                ) : null}
                {/* rail node */}
                <circle cx={x + cardW / 2} cy={railY} r={5} fill={ACCENT} />
                <circle cx={x + cardW / 2} cy={railY} r={9} fill="none" stroke="rgba(59,255,124,0.35)" />
              </g>
            );
          })}

          {/* rail line connecting nodes */}
          <line
            x1={startX + cardW / 2}
            x2={startX + totalW - cardW / 2}
            y1={railY}
            y2={railY}
            stroke={ACCENT}
            strokeWidth={1.4}
          />
        </svg>
      </Box>
    </Box>
  );
}
