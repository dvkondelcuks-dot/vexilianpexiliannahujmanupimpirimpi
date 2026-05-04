import { Box, Grid, Stack, Typography } from "@mui/material";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { IncidentMiniDiagram } from "@/components/visual/IncidentMiniDiagram";
import { CommercialTelemetryChart } from "@/components/visual/CommercialTelemetryChart";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { SignalChip } from "@/components/ui/SignalChip";
import { diagnosisEvents } from "@/data/diagnosis";
import { sectionCopy } from "@/data/pageCopy";

export function DiagnosisSection() {
  return (
    <SectionShell id="diagnosis" sx={{ background: "linear-gradient(180deg, rgba(11,14,17,0.42), rgba(7,9,11,0.2))" }}>
      <Grid container spacing={{ xs: 4, lg: 6 }}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Box sx={{ position: { lg: "sticky" }, top: { lg: 110 } }}>
            <SectionHeader {...sectionCopy.diagnosis} />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={1.4}>
            {diagnosisEvents.map((event, index) => (
              <Box
                key={event.number}
                className="industrial-card"
                sx={{
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  background: "linear-gradient(180deg, rgba(18,23,29,0.94), rgba(7,9,11,0.98))",
                  p: { xs: 1.6, md: 2 },
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                <Grid container spacing={2.4} alignItems="center">
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={1.1}>
                      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" alignItems="center">
                        <MetaLabel>INCIDENT {event.number}</MetaLabel>
                        <SignalChip tone="amber">LAYER: {event.layer}</SignalChip>
                        <SignalChip tone="amber">SEVERITY: {event.severity}</SignalChip>
                      </Stack>
                      <Typography component="h3" sx={{ fontSize: { xs: 18, md: 21 }, lineHeight: 1.25 }}>{event.title}</Typography>
                      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                        <SignalChip tone="amber">{event.status}</SignalChip>
                        <SignalChip>{event.lossType}</SignalChip>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box className="industrial-card" sx={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: "var(--radius)", background: "rgba(7,9,11,0.48)", p: 1 }}>
                      <IncidentMiniDiagram visual={event.visual} />
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 1.4, display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1 }}>
                  <CommercialTelemetryChart mode={index === 3 ? "recovery" : "leakage"} variant={index === 2 ? "bar" : "area"} height={74} />
                  <CommercialTelemetryChart mode={index === 2 ? "source" : "throughput"} variant={index === 4 ? "line" : "bar"} height={74} />
                </Box>
                <Stack direction="row" justifyContent="flex-end" sx={{ mt: 1 }}>
                  <MetaLabel sx={{ opacity: 0.55 }}>TS 04:2{index}:18</MetaLabel>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </SectionShell>
  );
}