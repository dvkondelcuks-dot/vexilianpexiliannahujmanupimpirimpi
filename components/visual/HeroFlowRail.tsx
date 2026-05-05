"use client";

import { Box } from "@mui/material";
import { useState } from "react";

const STAGES = [
  { code: "01", title: ["IENĀKOŠĀ", "INTERESE"], bullets: ["META / GOOGLE / UGC", "SEO / IETEIKUMI", "E-PASTS / KAMPAŅAS"], status: "IEEJA SISTĒMĀ" },
  { code: "02", title: ["MĀJASLAPA"], bullets: ["SKAIDRS PIEDĀVĀJUMS", "UZTICĒŠANĀS", "CTA VIRZIENS"], status: "UZTICĒŠANĀS" },
  { code: "03", title: ["CRM"], bullets: ["PIEPRASĪJUMU POSMI", "KLIENTA STATUSI", "KLIENTU DATI"], status: "PĀRREDZAMĪBA" },
  { code: "04", title: ["AUTOMATIZĀCIJA"], bullets: ["PIEPRASĪJUMU UZTVERŠANA", "MARŠRUTĒŠANA", "ATKĀRTOTS KONTAKTS"], status: "TURPINA DARBĪBU" },
  { code: "05", title: ["KVALIFICĒTS", "PIEPRASĪJUMS"], bullets: ["FILTRĒTS PĒC NODOMA", "AVOTA VĒRTĒŠANA", "KVALITĀTE > APJOMS"], status: "GATAVS PĀRDOŠANAI" },
  { code: "06", title: ["PĀRDOŠANA"], bullets: ["PIEDĀVĀJUMI", "REZERVĀCIJAS", "IEŅĒMUMI"], status: "DARĪJUMS NOSLĒGTS" },
  { code: "07", title: ["NOTURĒŠANA"], bullets: ["ATGĀDINĀJUMI", "AKTIVIZĀCIJA", "IETEIKUMI"], status: "ILGTERMIŅA VĒRTĪBA" },
  { code: "08", title: ["VADĪBAS", "PANELIS"], bullets: ["PĀRSKATI / KPI", "ROI / AVOTI", "ATTĪSTĪBA"], status: "KONTROLE" }
] as const;

const ACCENT = "#3BFF7C";
const DIM = "rgba(59,255,124,0.45)";

export function HeroFlowRail() {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)", md: "repeat(8, 1fr)" },
          gap: { xs: 1, md: 1.2 },
          position: "relative",
          py: 1
        }}
      >
        {STAGES.map((s, i) => (
          <FlowCard key={s.code} stage={s} index={i} isLast={i === STAGES.length - 1} />
        ))}
      </Box>
    </Box>
  );
}

function FlowCard({
  stage,
  index,
  isLast
}: {
  stage: (typeof STAGES)[number];
  index: number;
  isLast: boolean;
}) {
  const [hover, setHover] = useState(false);
  return (
    <Box
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        position: "relative",
        cursor: "pointer",
        transition: "border-color 220ms ease, background 220ms ease",
        background: hover ? "rgba(12,18,14,0.95)" : "rgba(8,12,10,0.85)",
        border: `1.2px solid ${hover ? ACCENT : "rgba(59,255,124,0.45)"}`,
        borderRadius: 1.2,
        height: { xs: 260, md: 300 },
        p: { xs: 1.2, md: 1.6 },
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
        boxSizing: "border-box"
      }}
    >
      {/* corner brackets */}
      <Brackets active={hover} />

      {/* code */}
      <Box
        sx={{
          color: ACCENT,
          fontFamily: "var(--mono)",
          fontWeight: 700,
          fontSize: { xs: 13, md: 14 },
          letterSpacing: "0.18em",
          mb: 1
        }}
      >
        {stage.code}
      </Box>

      {/* divider top */}
      <Box sx={{ width: 28, height: "1px", background: DIM, mb: 1.4 }} />

      {/* title */}
      <Box
        sx={{
          color: "#F4F7FA",
          fontWeight: 800,
          fontSize: { xs: "0.95rem", md: "1.05rem" },
          letterSpacing: "0.02em",
          textTransform: "uppercase",
          lineHeight: 1.15,
          mb: 1.4
        }}
      >
        {stage.title.map((t) => (
          <Box key={t} component="span" sx={{ display: "block" }}>
            {t}
          </Box>
        ))}
      </Box>

      {/* divider middle */}
      <Box sx={{ width: 18, height: "1px", background: "rgba(59,255,124,0.22)", mb: 1.4 }} />

      {/* bullets */}
      <Box
        sx={{
          color: "#A7B0BA",
          fontSize: { xs: 9.5, md: 10.5 },
          letterSpacing: "0.04em",
          lineHeight: 1.55,
          flex: 1,
          overflow: "hidden"
        }}
      >
        {stage.bullets.map((b) => (
          <Box key={b} component="div">
            {b}
          </Box>
        ))}
      </Box>

      {/* status pill at bottom */}
      <Box
        sx={{
          mt: 1.4,
          color: ACCENT,
          fontFamily: "var(--mono)",
          fontWeight: 700,
          fontSize: { xs: 10, md: 10.5 },
          letterSpacing: "0.16em",
          borderTop: "1px dashed rgba(59,255,124,0.25)",
          pt: 1,
          width: "100%"
        }}
      >
        {stage.status}
      </Box>

      {/* rail node under card */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          left: "50%",
          bottom: -8,
          transform: "translateX(-50%)",
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: hover ? ACCENT : "#0a0d0b",
          border: `1.2px solid ${ACCENT}`,
          transition: "background 220ms ease"
        }}
      />

      {/* internal arrow to next */}
      {!isLast && (
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            right: -8,
            top: "50%",
            transform: "translateY(-50%)",
            color: ACCENT,
            fontSize: 14,
            opacity: 0.7,
            display: { xs: "none", md: "block" }
          }}
        >
          ›
        </Box>
      )}

      {/* subtle index ornament */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: ACCENT,
          fontSize: 9,
          letterSpacing: "0.18em",
          opacity: hover ? 1 : 0.6,
          transition: "opacity 280ms ease"
        }}
      >
        {`0${index + 1}/08`}
      </Box>
    </Box>
  );
}

function Brackets({ active }: { active: boolean }) {
  const c = active ? ACCENT : "rgba(59,255,124,0.6)";
  const s = { position: "absolute" as const, width: 10, height: 10, transition: "border-color 280ms ease" };
  return (
    <>
      <Box sx={{ ...s, top: 4, left: 4, borderTop: `1.2px solid ${c}`, borderLeft: `1.2px solid ${c}` }} />
      <Box sx={{ ...s, top: 4, right: 4, borderTop: `1.2px solid ${c}`, borderRight: `1.2px solid ${c}` }} />
      <Box sx={{ ...s, bottom: 4, left: 4, borderBottom: `1.2px solid ${c}`, borderLeft: `1.2px solid ${c}` }} />
      <Box sx={{ ...s, bottom: 4, right: 4, borderBottom: `1.2px solid ${c}`, borderRight: `1.2px solid ${c}` }} />
    </>
  );
}
