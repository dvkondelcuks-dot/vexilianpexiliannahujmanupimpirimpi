import { Box, Stack, Typography } from "@mui/material";
import { SectionShell } from "@/components/layout/SectionShell";
import { HeroFlowRail } from "@/components/visual/HeroFlowRail";
import { VexButton } from "@/components/ui/VexButton";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { heroCopy } from "@/data/pageCopy";

export function HeroSection() {
  const [head, accent] = heroCopy.headline.includes("|") ? heroCopy.headline.split("|") : [heroCopy.headline, ""];
  return (
    <SectionShell id="manifest" sx={{ pt: { xs: 1.5, md: 2 }, pb: { xs: 6, md: 6 } }}>
      <Stack spacing={3} sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography
          component="h1"
          variant="h1"
          sx={{
            fontSize: { xs: "2.75rem", sm: "4rem", md: "5.5rem", xl: "7rem" },
            lineHeight: 1.02,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            maxWidth: 1300
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
        sx={{ mt: { xs: 5, md: 7 } }}
        alignItems="flex-start"
      >
        <Stack spacing={1.5} sx={{ flex: 1, maxWidth: 620 }}>
          <Typography sx={{ color: "var(--text-2)", lineHeight: 1.65, fontSize: { xs: 15.5, md: 17 } }}>
            {heroCopy.body[0]}
          </Typography>
        </Stack>
        <Box sx={{ borderLeft: "1px solid rgba(230,168,74,0.36)", pl: 2, maxWidth: 460 }}>
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
        <Stack spacing={1.5} sx={{ minWidth: { md: 240 } }}>
          <VexButton href="#audits">Pieteikt auditu</VexButton>
          <VexButton href="#system" intent="secondary">Skatīt sistēmu</VexButton>
          <MetaLabel>{heroCopy.microcopy}</MetaLabel>
        </Stack>
      </Stack>
    </SectionShell>
  );
}
