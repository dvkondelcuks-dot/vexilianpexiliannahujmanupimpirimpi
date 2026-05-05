import { Box, Stack, Typography } from "@mui/material";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { IncidentMiniDiagram } from "@/components/visual/IncidentMiniDiagram";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { SignalChip } from "@/components/ui/SignalChip";
import { diagnosisEvents } from "@/data/diagnosis";
import { sectionCopy } from "@/data/pageCopy";

export function DiagnosisSection() {
  return (
    <SectionShell id="diagnosis" sx={{ background: "linear-gradient(180deg, rgba(11,14,17,0.42), rgba(7,9,11,0.2))" }}>
      <Stack spacing={{ xs: 4, lg: 5 }}>
        <SectionHeader {...sectionCopy.diagnosis} maxWidth={1400} />
        <Stack spacing={2}>
          {diagnosisEvents.map((event, index) => (
            <Box
              key={event.number}
              className="industrial-card"
              sx={{
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                background: "linear-gradient(180deg, rgba(18,23,29,0.94), rgba(7,9,11,0.98))",
                p: { xs: 2, md: 2.4 },
                position: "relative",
                overflow: "hidden"
              }}
            >
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2} alignItems={{ sm: "center" }} justifyContent="space-between" sx={{ mb: 1.6 }}>
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" alignItems="center">
                  <MetaLabel sx={{ color: "var(--signal-blue)" }}>INCIDENTS {event.number}</MetaLabel>
                  <SignalChip tone="amber">SLĀNIS: {event.layer.toUpperCase()}</SignalChip>
                  <SignalChip tone="amber">SMAGUMS: {event.severity}</SignalChip>
                </Stack>
                <MetaLabel sx={{ opacity: 0.55 }}>TS 04:2{index}:18</MetaLabel>
              </Stack>
              <Typography component="h3" sx={{ fontSize: { xs: 16, md: 18 }, lineHeight: 1.4, mb: 1.4, maxWidth: 720 }}>{event.title}</Typography>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 2 }}>
                <SignalChip tone="amber">{event.status}</SignalChip>
                <SignalChip>{event.lossType}</SignalChip>
              </Stack>
              <Box sx={{ border: "1px solid rgba(59,255,124,0.18)", borderRadius: 2, background: "rgba(7,9,11,0.55)", overflow: "hidden" }}>
                <IncidentMiniDiagram visual={event.visual} />
              </Box>
            </Box>
          ))}
        </Stack>
      </Stack>
    </SectionShell>
  );
}
