import { Box, Stack } from "@mui/material";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { VexSystemDiagram } from "@/components/visual/VexSystemDiagram";
import { sectionCopy } from "@/data/pageCopy";

export function DiagnosticsDiagramSection() {
  return (
    <SectionShell id="diagnostics" sx={{ py: { xs: 8, md: 12 }, background: "rgba(11,14,17,0.45)" }}>
      <Stack spacing={4}>
        <SectionHeader {...sectionCopy.diagnostics} maxWidth={1280} />
        <Box className="vex-illu" sx={{ border: "1px solid rgba(59,255,124,0.18)", borderRadius: "var(--radius)", background: "rgba(7,9,11,0.4)", overflow: "hidden", p: { xs: 1.2, md: 2 } }}>
          <VexSystemDiagram />
        </Box>
      </Stack>
    </SectionShell>
  );
}