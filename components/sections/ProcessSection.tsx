import { Stack } from "@mui/material";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { BuildMovementRail } from "@/components/visual/BuildMovementRail";
import { sectionCopy } from "@/data/pageCopy";

export function ProcessSection() {
  return (
    <SectionShell id="process" sx={{ background: "rgba(11,14,17,0.28)" }}>
      <Stack spacing={4}>
        <SectionHeader {...sectionCopy.process} maxWidth={850} />
        <BuildMovementRail />
      </Stack>
    </SectionShell>
  );
}