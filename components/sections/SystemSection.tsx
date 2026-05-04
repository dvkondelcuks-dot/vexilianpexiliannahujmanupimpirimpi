import { Box, Grid } from "@mui/material";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { SixLayerStack } from "@/components/visual/SixLayerStack";
import { sectionCopy } from "@/data/pageCopy";

export function SystemSection() {
  return (
    <SectionShell id="system">
      <Grid container spacing={{ xs: 4, lg: 6 }}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Box sx={{ position: { lg: "sticky" }, top: { lg: 110 } }}>
            <SectionHeader {...sectionCopy.system} />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, lg: 8 }}>
          <SixLayerStack />
        </Grid>
      </Grid>
    </SectionShell>
  );
}