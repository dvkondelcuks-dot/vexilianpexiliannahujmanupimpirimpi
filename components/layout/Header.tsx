"use client";

import { Box, Container, Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { navItems } from "@/data/pageCopy";
import { useScrollSectionState } from "@/hooks/useScrollSectionState";
import { VexButton } from "@/components/ui/VexButton";
import { StatusDot } from "@/components/ui/StatusDot";

const commandNav = [
  { id: "manifest", label: "Manifests" },
  { id: "diagnosis", label: "Noplūde" },
  { id: "system", label: "Sistēma" },
  { id: "diagnostics", label: "Karte" },
  { id: "cases", label: "Pierādījumi" }
];

export function Header() {
  const [solid, setSolid] = useState(false);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState("");
  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);
  const activeSection = useScrollSectionState(sectionIds);

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 24);
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Europe/Riga", hour12: false }).format(d);
      setTime(fmt);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        borderBottom: solid ? "1px solid var(--border)" : "1px solid transparent",
        background: solid ? "rgba(7,9,11,0.92)" : "rgba(7,9,11,0.55)",
        backdropFilter: "blur(16px)",
        transition: "background 180ms ease, border-color 180ms ease"
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: "var(--grid-max)", px: { xs: 2, md: 4 } }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} sx={{ minHeight: 80 }}>
          {/* BRAND — large mark + svg dot */}
          <Stack direction="row" spacing={1.4} alignItems="center" component="a" href="#manifest" aria-label="Vexilian sākums" sx={{ minWidth: { md: 240 } }}>
            <Box
              component="svg"
              viewBox="0 0 28 28"
              sx={{ width: 26, height: 26, color: "var(--signal-blue)" }}
            >
              <circle cx="14" cy="14" r="13" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="14" cy="14" r="5" fill="currentColor" />
              <path d="M14 1 V6 M14 22 V27 M1 14 H6 M22 14 H27" stroke="currentColor" strokeWidth="1.4" />
            </Box>
            <Box>
              <Box sx={{ fontFamily: "var(--mono)", fontSize: 16, color: "var(--text)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, lineHeight: 1 }}>VEXı́LIAN</Box>
              <Box sx={{ display: { xs: "none", sm: "block" }, color: "var(--text-3)", fontFamily: "var(--mono)", fontSize: 9.5, textTransform: "uppercase", mt: 0.4, letterSpacing: "0.22em" }}>KOMERCIĀLĀ · DIAGNOSTIKAS · SISTĒMA</Box>
            </Box>
          </Stack>

          {/* NAV — indexed pills */}
          <Stack
            component="nav"
            direction="row"
            spacing={0.4}
            aria-label="Galvenā navigācija"
            sx={{
              display: { xs: "none", md: "flex" },
              p: 0.5,
              border: "1px solid rgba(59,255,124,0.14)",
              borderRadius: "999px",
              background: "rgba(16,20,25,0.78)",
              backdropFilter: "blur(8px)"
            }}
          >
            {commandNav.map((item, i) => {
              const active = activeSection === item.id;
              return (
                <Box
                  key={item.id}
                  component="a"
                  href={`#${item.id}`}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.7,
                    px: 1.5,
                    py: 0.85,
                    borderRadius: "999px",
                    color: active ? "var(--signal-blue)" : "var(--text-3)",
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    whiteSpace: "nowrap",
                    transition: "color 160ms ease, background 160ms ease, transform 160ms ease",
                    background: active ? "rgba(59,255,124,0.1)" : "transparent",
                    "&:hover": {
                      color: "var(--text)",
                      background: "rgba(59,255,124,0.075)",
                      transform: "translateY(-1px)"
                    }
                  }}
                >
                  <Box component="span" sx={{ color: active ? "var(--signal-blue)" : "rgba(167,176,186,0.55)", fontSize: 9.5 }}>
                    {String(i).padStart(2, "0")}
                  </Box>
                  {item.label}
                </Box>
              );
            })}
          </Stack>

          {/* RIGHT — live time + CTA */}
          <Stack direction="row" spacing={1.2} alignItems="center">
            <Box sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center", gap: 0.8, border: "1px solid rgba(59,255,124,0.16)", borderRadius: "999px", px: 1.4, py: 0.7 }}>
              <StatusDot tone="green" />
              <Box sx={{ color: "var(--text-3)", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.2em" }}>RĪGA</Box>
              <Box sx={{ color: "var(--signal-blue)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", minWidth: 64, textAlign: "right" }}>{time || "--:--:--"}</Box>
            </Box>
            <VexButton href="#audits" size="small">Pieteikt auditu</VexButton>
          </Stack>
        </Stack>
      </Container>

      {/* scroll progress micro-bar */}
      <Box sx={{ height: 1.5, background: "transparent", position: "relative" }}>
        <Box sx={{ position: "absolute", left: 0, top: 0, height: "100%", background: "var(--signal-blue)", width: `${progress * 100}%`, transition: "width 80ms linear", boxShadow: "0 0 8px var(--signal-blue)" }} />
      </Box>
    </Box>
  );
}