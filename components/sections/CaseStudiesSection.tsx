import Image from "next/image";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { CaseSystemOverlay } from "@/components/visual/CaseSystemOverlay";
import { CommercialTelemetryChart } from "@/components/visual/CommercialTelemetryChart";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { SignalChip } from "@/components/ui/SignalChip";
import { cases } from "@/data/cases";
import { sectionCopy } from "@/data/pageCopy";

export function CaseStudiesSection() {
  return (
    <SectionShell id="cases">
      <Stack spacing={4}>
        <SectionHeader {...sectionCopy.cases} maxWidth={850} />
        <Stack spacing={2}>
          {cases.map((item) => (
            <Grid key={item.id} className="industrial-card" container sx={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden", background: "rgba(16,20,25,0.86)", "&:hover .case-photo": { filter: "brightness(0.56) saturate(0.72)" }, "&:hover .case-cta": { transform: "translateX(4px)", color: "var(--signal-blue)" } }}>
              <Grid size={{ xs: 12, lg: 7 }}>
                <Box sx={{ position: "relative", minHeight: { xs: 340, sm: 420, md: 520, lg: 560 }, overflow: "hidden" }}>
                  <Image className="case-photo" src={item.image} alt={item.imageAlt} fill sizes="(max-width: 900px) 100vw, 760px" style={{ objectFit: "cover", filter: "brightness(0.48) saturate(0.62)", transition: "filter 220ms ease" }} />
                  <CaseSystemOverlay item={item} />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, lg: 5 }}>
                <Stack spacing={2} sx={{ p: { xs: 2, md: 3 }, minHeight: "100%", justifyContent: "space-between" }}>
                  <Stack spacing={1.5}>
                    <MetaLabel>{item.industry} · {item.location}</MetaLabel>
                    <Typography component="h3" sx={{ fontSize: { xs: 26, md: 34 }, lineHeight: 1.06 }}>{item.name}</Typography>
                    <Typography sx={{ color: "var(--text)", fontSize: 19, lineHeight: 1.3 }}>{item.headline}</Typography>
                    <Typography sx={{ color: "var(--text-2)", lineHeight: 1.65 }}>{item.body}</Typography>
                    <Stack direction="row" useFlexGap flexWrap="wrap" spacing={0.8}>
                      {item.layers.map((layer) => <SignalChip key={layer} tone="blue">{layer}</SignalChip>)}
                    </Stack>
                    <CommercialTelemetryChart mode="case" variant="line" height={96} />
                  </Stack>
                  <Typography className="case-cta" component="a" href="#audits" sx={{ color: "var(--text)", fontFamily: "var(--mono)", fontSize: 13, textTransform: "uppercase", transition: "transform 180ms ease, color 180ms ease", display: "inline-flex" }}>{item.cta}</Typography>
                </Stack>
              </Grid>
            </Grid>
          ))}
        </Stack>
      </Stack>
    </SectionShell>
  );
}