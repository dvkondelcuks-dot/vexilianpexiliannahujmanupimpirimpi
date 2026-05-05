import { Box, Stack, Typography } from "@mui/material";
import { SectionShell } from "@/components/layout/SectionShell";
import { HeroFlowRail } from "@/components/visual/HeroFlowRail";
import { VexButton } from "@/components/ui/VexButton";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { heroCopy } from "@/data/pageCopy";

export function HeroSection() {
  const [head, accent] = heroCopy.headline.includes("|") ? heroCopy.headline.split("|") : [heroCopy.headline, ""];
  return (
    <SectionShell id="manifest" sx={{ pt: { xs: "32px", md: "40px" }, pb: { xs: 5, md: 5 } }}>
      <Stack spacing={1.4} data-reveal-stagger sx={{ mb: { xs: 1.5, md: 2 }, alignItems: "center", textAlign: "center" }}>
        <Box
          data-reveal="up"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1.2,
            fontFamily: "var(--mono)",
            fontSize: { xs: 10.5, md: 11.5 },
            letterSpacing: "0.34em",
            color: "var(--signal-blue)",
            textTransform: "uppercase",
            border: "1px solid rgba(59,255,124,0.32)",
            background: "rgba(8,12,10,0.55)",
            px: 1.6,
            py: 0.6,
            borderRadius: 999
          }}
        >
          <Box component="span" sx={{ width: 6, height: 6, borderRadius: "50%", background: "var(--signal-blue)", boxShadow: "0 0 10px rgba(59,255,124,0.7)" }} />
          AR MUMS
          <Box component="span" sx={{ color: "var(--text-3)", letterSpacing: "0.28em" }}>·</Box>
          <Box component="span" sx={{ color: "var(--text-3)" }}>V / 2026</Box>
        </Box>
        <Typography
          component="h1"
          variant="h1"
          data-reveal="up"
          sx={{
            fontSize: { xs: "2.2rem", sm: "3.2rem", md: "4.2rem", lg: "5.2rem", xl: "6.4rem" },
            lineHeight: 1.08,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            maxWidth: "100%"
          }}
        >
          {head.trim()}
          {accent ? (
            <Box component="span" sx={{ color: "var(--signal-blue)", display: "block" }}>
              {accent.trim()}
            </Box>
          ) : null}
        </Typography>
      </Stack>

      <HeroFlowRail />

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 4, md: 6 }}
        data-reveal-stagger
        sx={{ mt: { xs: 5, md: 7 } }}
        alignItems="flex-start"
      >
        <Stack data-reveal="up" spacing={1.5} sx={{ flex: 1, maxWidth: 620 }}>
          <Typography sx={{ color: "var(--text-2)", lineHeight: 1.65, fontSize: { xs: 15.5, md: 17 } }}>
            {heroCopy.body[0]}
          </Typography>
        </Stack>
        <Box data-reveal="up" sx={{ borderLeft: "1px solid rgba(230,168,74,0.36)", pl: 2, maxWidth: 460 }}>
          {heroCopy.secondaryBody.map((line, index) => (
            <Typography
              key={line}
              sx={{
                color: index === heroCopy.secondaryBody.length - 1 ? "var(--text-2)" : "var(--text)",
                lineHeight: 1.65,
                fontSize: 14.5
              }}
            >
              {line}
            </Typography>
          ))}
        </Box>
        <Stack data-reveal="up" spacing={1.5} sx={{ minWidth: { md: 240 } }}>
          <VexButton href="#audits">Pieteikt auditu</VexButton>
          <VexButton href="#system" intent="secondary">Skatīt sistēmu</VexButton>
          <MetaLabel>{heroCopy.microcopy}</MetaLabel>
        </Stack>
      </Stack>
    </SectionShell>
  );
}
