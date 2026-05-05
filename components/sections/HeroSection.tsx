import { Box, Stack, Typography } from "@mui/material";
import { SectionShell } from "@/components/layout/SectionShell";
import { HeroFlowRail } from "@/components/visual/HeroFlowRail";
import { VexButton } from "@/components/ui/VexButton";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { heroCopy } from "@/data/pageCopy";

export function HeroSection() {
  const [head, accent] = heroCopy.headline.includes("|") ? heroCopy.headline.split("|") : [heroCopy.headline, ""];
  return (
    <SectionShell id="manifest" sx={{ py: 0, pt: { xs: "2px", md: "4px" }, pb: { xs: 4, md: 5 } }}>
      <Stack spacing={1.2} data-reveal-stagger sx={{ mb: { xs: 1.5, md: 2 } }}>
        <Typography
          data-reveal="up"
          component="span"
          sx={{
            fontFamily: "var(--mono)",
            fontSize: { xs: 11, md: 12 },
            letterSpacing: "0.32em",
            color: "var(--signal-blue)",
            textTransform: "uppercase"
          }}
        >
          AR MUMS
        </Typography>
        <Typography
          component="h1"
          variant="h1"
          data-reveal="up"
          sx={{
            fontSize: { xs: "2.2rem", sm: "3.2rem", md: "4.2rem", lg: "5.2rem", xl: "6.4rem" },
            lineHeight: 1.2,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            maxWidth: "120%"
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
