import { Box, Grid, Stack, Typography } from "@mui/material";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { FounderOperatorCard } from "@/components/visual/FounderOperatorCard";
import { founders } from "@/data/founders";
import { sectionCopy } from "@/data/pageCopy";

export function FounderSection() {
  return (
    <SectionShell id="founders" sx={{ background: "rgba(11,14,17,0.28)" }}>
      <Stack spacing={4}>
        <SectionHeader {...sectionCopy.founders} maxWidth={1280} />
        <Grid container spacing={2.4}>
          {founders.map((founder) => (
            <Grid key={founder.id} size={{ xs: 12, md: 6, lg: 4 }} sx={{ display: "flex" }}>
              <FounderOperatorCard founder={founder} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "rgba(16,20,25,0.7)", p: 2.2 }}>
          <Typography sx={{ color: "var(--text)", fontSize: { xs: 18, md: 22 }, lineHeight: 1.35 }}>{sectionCopy.founders.closing}</Typography>
        </Box>
      </Stack>
    </SectionShell>
  );
}