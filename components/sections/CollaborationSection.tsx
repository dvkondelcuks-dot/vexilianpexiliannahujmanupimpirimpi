import { Box, Stack } from "@mui/material";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { ScopeLockRail } from "@/components/visual/ScopeLockRail";
import { TelemetryValue } from "@/components/ui/TelemetryValue";
import { commercialStrip } from "@/data/phases";
import { sectionCopy } from "@/data/pageCopy";

export function CollaborationSection() {
  return (
    <SectionShell id="collaboration">
      <Stack spacing={4}>
        <SectionHeader {...sectionCopy.collaboration} maxWidth={1280} />
        <ScopeLockRail />
        <Box sx={{ border: "1px solid var(--border-strong)", borderRadius: "var(--radius)", background: "rgba(7,9,11,0.82)", p: 2.2, display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }, gap: 2 }}>
          {commercialStrip.map((item, index) => <TelemetryValue key={item.label} label={item.label} value={item.value} tone={index === 1 ? "green" : "blue"} />)}
        </Box>
      </Stack>
    </SectionShell>
  );
}