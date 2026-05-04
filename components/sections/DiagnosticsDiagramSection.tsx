import { Stack } from "@mui/material";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { VexSystemDiagram } from "@/components/visual/VexSystemDiagram";
import { sectionCopy } from "@/data/pageCopy";

export function DiagnosticsDiagramSection() {
  return (
    <SectionShell id="diagnostics" fullBleed sx={{ py: { xs: 8, md: 12 }, background: "rgba(11,14,17,0.45)" }}>
      <Stack spacing={4}>
        <SectionShell id="diagnostics-copy" sx={{ py: 0, scrollMarginTop: 0 }}>
          <SectionHeader {...sectionCopy.diagnostics} maxWidth={900} />
        </SectionShell>
        <VexSystemDiagram />
      </Stack>
    </SectionShell>
  );
}