"use client";

import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { layers } from "@/data/layers";
import { sectionCopy } from "@/data/pageCopy";

const ACCENT = "#3BFF7C";

export function SystemSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  // Arrange the 6 layers around a central core. Top of the ring = first layer.
  const count = layers.length;
  const ringSize = 560; // px on desktop
  const nodeSize = 180;
  const radius = ringSize / 2 - nodeSize / 2;

  return (
    <SectionShell id="system">
      <Stack spacing={{ xs: 5, md: 7 }} alignItems="center" sx={{ textAlign: "center" }}>
        <SectionHeader {...sectionCopy.system} align="center" maxWidth={780} />

        {/* MOBILE / TABLET — vertical stack (the ring is dense) */}
        <Box sx={{ display: { xs: "grid", md: "none" }, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1.6, width: "100%" }}>
          {layers.map((layer, i) => (
            <NodeCard key={layer.number} layer={layer} active={hovered === i} onEnter={() => setHovered(i)} onLeave={() => setHovered(null)} />
          ))}
        </Box>

        {/* DESKTOP — circular orbit */}
        <Box sx={{ display: { xs: "none", md: "block" }, position: "relative", width: ringSize, height: ringSize, mx: "auto" }}>
          {/* outer ring */}
          <Box sx={{ position: "absolute", inset: nodeSize / 2, border: "1px dashed rgba(59,255,124,0.22)", borderRadius: "50%" }} />
          <Box sx={{ position: "absolute", inset: nodeSize / 2 + 18, border: "1px solid rgba(59,255,124,0.08)", borderRadius: "50%" }} />

          {/* central core */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 168,
              height: 168,
              borderRadius: "50%",
              border: `1.5px solid ${ACCENT}`,
              background: "radial-gradient(circle at 50% 35%, rgba(59,255,124,0.18), rgba(8,12,10,0.95) 70%)",
              display: "grid",
              placeItems: "center",
              boxShadow: `0 0 60px rgba(59,255,124,0.18), inset 0 0 30px rgba(59,255,124,0.08)`
            }}
          >
            <Stack spacing={0.6} alignItems="center">
              <Box sx={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.24em", color: ACCENT }}>VEX</Box>
              <Box sx={{ fontFamily: "var(--mono)", fontSize: 18, letterSpacing: "0.18em", color: "var(--text)", fontWeight: 700 }}>KODOLS</Box>
              <Box sx={{ width: 36, height: 1, background: ACCENT, opacity: 0.6 }} />
              <Box sx={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.2em", color: "var(--text-3)" }}>{count} SLĀŅI</Box>
            </Stack>
          </Box>

          {/* nodes positioned around */}
          {layers.map((layer, i) => {
            const angle = (i / count) * Math.PI * 2 - Math.PI / 2; // start at top
            const x = ringSize / 2 + Math.cos(angle) * radius - nodeSize / 2;
            const y = ringSize / 2 + Math.sin(angle) * radius - nodeSize / 2;
            const isActive = hovered === i;
            return (
              <Box
                key={layer.number}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                sx={{
                  position: "absolute",
                  top: y,
                  left: x,
                  width: nodeSize,
                  height: nodeSize,
                  borderRadius: "50%",
                  border: `1.4px solid ${isActive ? ACCENT : "rgba(59,255,124,0.32)"}`,
                  background: isActive ? "radial-gradient(circle at 50% 30%, rgba(59,255,124,0.18), rgba(8,12,10,0.96) 80%)" : "rgba(8,12,10,0.92)",
                  display: "grid",
                  placeItems: "center",
                  cursor: "default",
                  transition: "transform 220ms ease, border-color 220ms ease, background 220ms ease, box-shadow 220ms ease",
                  transform: isActive ? "scale(1.06)" : "scale(1)",
                  boxShadow: isActive ? `0 0 32px rgba(59,255,124,0.28)` : "none",
                  textAlign: "center",
                  px: 2
                }}
              >
                <Stack spacing={0.5} alignItems="center">
                  <Box sx={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.2em", color: ACCENT }}>{layer.number}</Box>
                  <Box sx={{ color: "var(--text)", fontWeight: 700, fontSize: 13.5, lineHeight: 1.15, letterSpacing: "0.02em", textTransform: "uppercase" }}>{layer.title}</Box>
                  <Box sx={{ color: "var(--text-3)", fontSize: 10, lineHeight: 1.3, letterSpacing: "0.04em" }}>{layer.subtitle}</Box>
                </Stack>
              </Box>
            );
          })}

          {/* connecting lines from each node toward the core */}
          <Box component="svg" viewBox={`0 0 ${ringSize} ${ringSize}`} sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
            {layers.map((_, i) => {
              const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
              const x1 = ringSize / 2 + Math.cos(angle) * (radius - nodeSize / 2 + 4);
              const y1 = ringSize / 2 + Math.sin(angle) * (radius - nodeSize / 2 + 4);
              const x2 = ringSize / 2 + Math.cos(angle) * 92;
              const y2 = ringSize / 2 + Math.sin(angle) * 92;
              const active = hovered === i;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={active ? ACCENT : "rgba(59,255,124,0.22)"} strokeWidth={active ? 1.4 : 1} strokeDasharray={active ? undefined : "4 4"} />;
            })}
          </Box>
        </Box>

        {/* hovered detail strip (desktop only) */}
        <Box sx={{ display: { xs: "none", md: "block" }, minHeight: 84, maxWidth: 760, mx: "auto" }}>
          {hovered !== null ? (
            <Stack spacing={1} alignItems="center">
              <Typography sx={{ color: "var(--text-2)", lineHeight: 1.6 }}>{layers[hovered].text}</Typography>
              <Box sx={{ fontFamily: "var(--mono)", fontSize: 11, color: ACCENT, letterSpacing: "0.16em", textTransform: "uppercase" }}>
                {layers[hovered].includes.join(" · ")}
              </Box>
            </Stack>
          ) : (
            <Typography sx={{ color: "var(--text-3)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.2em" }}>PĀRBRAUC SLĀNI · LASĪT DETAĻAS</Typography>
          )}
        </Box>
      </Stack>
    </SectionShell>
  );
}

function NodeCard({ layer, active, onEnter, onLeave }: { layer: typeof layers[number]; active: boolean; onEnter: () => void; onLeave: () => void }) {
  return (
    <Box
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      sx={{
        border: `1px solid ${active ? ACCENT : "var(--border)"}`,
        borderRadius: "var(--radius)",
        background: "rgba(8,12,10,0.86)",
        p: 2,
        textAlign: "left",
        transition: "border-color 200ms ease"
      }}
    >
      <Box sx={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.2em", color: ACCENT, mb: 0.6 }}>{layer.number}</Box>
      <Box sx={{ color: "var(--text)", fontWeight: 700, fontSize: 16, textTransform: "uppercase", letterSpacing: "0.02em", lineHeight: 1.2 }}>{layer.title}</Box>
      <Box sx={{ color: "var(--text-3)", fontSize: 12, mt: 0.4 }}>{layer.subtitle}</Box>
    </Box>
  );
}