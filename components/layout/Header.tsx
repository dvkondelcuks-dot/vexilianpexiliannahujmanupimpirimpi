"use client";

import { Box, Container, Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { navItems } from "@/data/pageCopy";
import { useScrollSectionState } from "@/hooks/useScrollSectionState";
import { VexButton } from "@/components/ui/VexButton";
import { StatusDot } from "@/components/ui/StatusDot";

const commandNav = [
  { id: "manifest", label: "Manifest" },
  { id: "diagnosis", label: "Leakage" },
  { id: "system", label: "System" },
  { id: "diagnostics", label: "Map" },
  { id: "cases", label: "Proof" }
];

export function Header() {
  const [solid, setSolid] = useState(false);
  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);
  const activeSection = useScrollSectionState(sectionIds);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        borderBottom: solid ? "1px solid var(--border)" : "1px solid transparent",
        background: solid ? "rgba(7,9,11,0.92)" : "rgba(7,9,11,0.62)",
        backdropFilter: "blur(14px)",
        transition: "background 180ms ease, border-color 180ms ease"
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: "var(--grid-max)", px: { xs: 2, md: 4 } }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} sx={{ minHeight: 74 }}>
          <Stack direction="row" spacing={1.25} alignItems="center" component="a" href="#manifest" aria-label="Vexilian sākums" sx={{ minWidth: { md: 230 } }}>
            <StatusDot tone="blue" />
            <Box>
              <Box sx={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--text)", textTransform: "uppercase" }}>Vexı́lian</Box>
              <Box sx={{ display: { xs: "none", sm: "block" }, color: "var(--text-3)", fontFamily: "var(--mono)", fontSize: 10, textTransform: "uppercase", mt: 0.35 }}>Commercial diagnostic system</Box>
            </Box>
          </Stack>
          <Stack
            component="nav"
            direction="row"
            spacing={0.75}
            aria-label="Galvenā navigācija"
            sx={{
              display: { xs: "none", md: "flex" },
              p: 0.5,
              border: "1px solid rgba(182,255,59,0.12)",
              borderRadius: "999px",
              background: "rgba(16,20,25,0.72)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)"
            }}
          >
            {commandNav.map((item) => (
              <Box
                key={item.id}
                component="a"
                href={`#${item.id}`}
                sx={{
                  px: 1.5,
                  py: 0.85,
                  borderRadius: "999px",
                  color: activeSection === item.id ? "var(--signal-blue)" : "var(--text-3)",
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  transition: "color 160ms ease, background 160ms ease",
                  background: activeSection === item.id ? "rgba(182,255,59,0.08)" : "transparent",
                  "&:hover": {
                    color: "var(--text)",
                    background: "rgba(182,255,59,0.075)"
                  }
                }}
              >
                {item.label}
              </Box>
            ))}
          </Stack>
          <Stack direction="row" spacing={1.2} alignItems="center">
            <Box sx={{ display: { xs: "none", lg: "block" }, border: "1px solid rgba(182,255,59,0.16)", borderRadius: "var(--radius)", px: 1.2, py: 0.8, color: "var(--signal-blue)", fontFamily: "var(--mono)", fontSize: 10, textTransform: "uppercase" }}>
              FLOW / LIVE
            </Box>
            <VexButton href="#audits" size="small">Pieteikt auditu</VexButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}