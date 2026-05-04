import { Box, Grid, Stack, Typography } from "@mui/material";
import { SectionShell } from "@/components/layout/SectionShell";
import { ClientDisappearanceMap } from "@/components/visual/ClientDisappearanceMap";
import { FounderOperatingStrip } from "@/components/visual/FounderOperatingStrip";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { VexButton } from "@/components/ui/VexButton";
import { heroCopy } from "@/data/pageCopy";

export function HeroSection() {
  return (
    <SectionShell id="manifest" sx={{ minHeight: { md: "92vh" }, display: "flex", alignItems: "center", pt: { xs: 7, md: 10 }, pb: { xs: 7, md: 6 } }}>
      <Grid container spacing={{ xs: 5, md: 5, lg: 6 }} alignItems="center">
        <Grid size={{ xs: 12, md: 6, lg: 5 }}>
          <Stack spacing={2.4}>
            <MetaLabel sx={{ color: "var(--signal-blue)" }}>{heroCopy.eyebrow}</MetaLabel>
            <Typography
              component="h1"
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", sm: "3.25rem", md: "3.45rem", xl: "4.5rem" },
                maxWidth: 720,
                textTransform: "uppercase",
                letterSpacing: "-0.01em"
              }}
            >
              {(() => {
                const [head, accent] = heroCopy.headline.includes("|") ? heroCopy.headline.split("|") : [heroCopy.headline, ""];
                return (
                  <>
                    {head.trim()}
                    {accent ? <Box component="span" sx={{ color: "var(--signal-blue)", display: "block" }}>{accent.trim()}</Box> : null}
                  </>
                );
              })()}
            </Typography>
            <Stack spacing={1.5} sx={{ maxWidth: 620 }}>
              {heroCopy.body.map((paragraph) => (
                <Typography key={paragraph} sx={{ color: "var(--text-2)", lineHeight: 1.65, fontSize: { xs: 15.5, md: 17 } }}>{paragraph}</Typography>
              ))}
            </Stack>
            <Box sx={{ borderLeft: "1px solid rgba(230,168,74,0.36)", pl: 2, maxWidth: 560 }}>
              {heroCopy.secondaryBody.map((line, index) => (
                <Typography key={line} sx={{ color: index === heroCopy.secondaryBody.length - 1 ? "var(--text-2)" : "var(--text)", lineHeight: 1.65, fontSize: 14.5 }}>{line}</Typography>
              ))}
            </Box>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.3} sx={{ pt: 1 }}>
              <VexButton href="#audits">Pieteikt auditu</VexButton>
              <VexButton href="#system" intent="secondary">Skatīt sistēmu</VexButton>
            </Stack>
            <MetaLabel>{heroCopy.microcopy}</MetaLabel>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 7 }}>
          <Box sx={{ width: "100%", minWidth: 0 }}>
            <ClientDisappearanceMap />
          </Box>
        </Grid>
      </Grid>
      <FounderOperatingStrip />
    </SectionShell>
  );
}