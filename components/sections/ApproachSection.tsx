import { Grid, Stack, Typography } from "@mui/material";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { DoctrineDiagram, type DoctrineDiagramMode } from "@/components/visual/DoctrineDiagram";
import { sectionCopy } from "@/data/pageCopy";

const panels: Array<{ title: string; text: string[]; mode: DoctrineDiagramMode }> = [
  {
    title: "Pozīcija",
    mode: "position",
    text: [
      "Komerciālā sistēma ir viena plūsma no pirmā klikšķa līdz pēdējam rēķinam.",
      "Tajā ietilpst vietne, saturs, forma, CRM, atribūcija, atgūšana un vadības skats. Atsevišķi tie ir rīki. Kopā tie kļūst par sistēmu."
    ]
  },
  {
    title: "Modelis",
    mode: "model",
    text: [
      "Mēs uzbūvējam sistēmu, nododam to komandai un turpinām to optimizēt.",
      "Sistēma pēc nodošanas nepaliek statiska. Katru mēnesi to var lasīt, pielāgot un padarīt precīzāku."
    ]
  },
  {
    title: "Robežas",
    mode: "boundary",
    text: [
      "Mēs nestrādājam ar uzņēmumiem, kuriem nav komerciāla mērķa.",
      "Sistēma bez mērķa ir tikai infrastruktūra. Tai jāpalīdz iegūt vairāk kvalitatīvu pieprasījumu, pārvaldīt klientus, samazināt noplūdes vai skaidrāk redzēt ieņēmumus."
    ]
  }
];

export function ApproachSection() {
  return (
    <SectionShell id="approach">
      <Stack spacing={4}>
        <SectionHeader {...sectionCopy.approach} maxWidth={1280} />
        <Stack spacing={1.5}>
          {panels.map((panel) => (
            <Grid key={panel.title} className="industrial-card" container spacing={{ xs: 2, md: 3 }} alignItems="center" sx={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "rgba(16,20,25,0.66)", p: { xs: 1.6, md: 2.6 } }}>
              <Grid size={{ xs: 12, md: 7 }}>
                <DoctrineDiagram mode={panel.mode} />
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <Stack spacing={1.4}>
                  <Typography component="h3" variant="h3">{panel.title}</Typography>
                  {panel.text.map((line) => <Typography key={line} sx={{ color: "var(--text-2)", lineHeight: 1.7 }}>{line}</Typography>)}
                </Stack>
              </Grid>
            </Grid>
          ))}
        </Stack>
      </Stack>
    </SectionShell>
  );
}