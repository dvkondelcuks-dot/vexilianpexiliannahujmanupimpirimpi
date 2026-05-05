import Image from "next/image";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { SignalChip } from "@/components/ui/SignalChip";
import { cases } from "@/data/cases";
import { sectionCopy } from "@/data/pageCopy";

export function CaseStudiesSection() {
  return (
    <SectionShell id="cases">
      <Stack spacing={5}>
        <SectionHeader {...sectionCopy.cases} maxWidth={1280} />
        <Stack spacing={3}>
          {cases.map((item, idx) => (
            <Grid
              key={item.id}
              className="industrial-card"
              container
              sx={{
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                overflow: "hidden",
                background: "rgba(16,20,25,0.86)",
                "&:hover .case-photo": { transform: "scale(1.04)" },
                "&:hover .case-cta": { transform: "translateX(6px)", color: "var(--signal-blue)" }
              }}
            >
              <Grid size={{ xs: 12, lg: 7 }}>
                <Box sx={{ position: "relative", minHeight: { xs: 320, sm: 400, md: 480, lg: 520 }, overflow: "hidden" }}>
                  <Image
                    className="case-photo"
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 900px) 100vw, 760px"
                    style={{ objectFit: "cover", filter: "brightness(0.62) saturate(0.78)", transition: "transform 600ms ease" }}
                  />
                  {/* gradient overlay for legibility */}
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, rgba(8,12,10,0.05) 0%, rgba(8,12,10,0.45) 60%, rgba(8,12,10,0.78) 100%)"
                    }}
                  />
                  {/* index badge */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      px: 1.4,
                      py: 0.6,
                      border: "1px solid rgba(59,255,124,0.5)",
                      background: "rgba(8,12,10,0.7)",
                      backdropFilter: "blur(6px)",
                      fontFamily: "var(--mono)",
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      color: "var(--signal-blue)"
                    }}
                  >
                    GADĪJUMS {String(idx + 1).padStart(2, "0")} / {String(cases.length).padStart(2, "0")}
                  </Box>
                  {/* corner brackets */}
                  {[
                    { top: 0, left: 0, borderTop: "1px solid", borderLeft: "1px solid" },
                    { top: 0, right: 0, borderTop: "1px solid", borderRight: "1px solid" },
                    { bottom: 0, left: 0, borderBottom: "1px solid", borderLeft: "1px solid" },
                    { bottom: 0, right: 0, borderBottom: "1px solid", borderRight: "1px solid" }
                  ].map((pos, i) => (
                    <Box key={i} sx={{ position: "absolute", width: 22, height: 22, borderColor: "rgba(59,255,124,0.55)", ...pos }} />
                  ))}
                  {/* meta strip on image */}
                  <Box sx={{ position: "absolute", left: 16, right: 16, bottom: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 2 }}>
                    <Box>
                      <Box sx={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.22em", color: "rgba(244,247,250,0.7)" }}>{item.industry}</Box>
                      <Box sx={{ color: "#F4F7FA", fontSize: { xs: 22, md: 28 }, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em", lineHeight: 1.1, mt: 0.4 }}>{item.name}</Box>
                    </Box>
                    <Box sx={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.22em", color: "rgba(244,247,250,0.7)", textAlign: "right" }}>{item.location}</Box>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, lg: 5 }}>
                <Stack spacing={2.4} sx={{ p: { xs: 2.5, md: 3.5 }, minHeight: "100%", justifyContent: "space-between" }}>
                  <Stack spacing={1.6}>
                    <MetaLabel>SIGNĀLA GADĪJUMS · {String(idx + 1).padStart(2, "0")}</MetaLabel>
                    <Typography sx={{ color: "var(--text)", fontSize: { xs: 19, md: 21 }, lineHeight: 1.32, fontWeight: 600 }}>{item.headline}</Typography>
                    <Typography sx={{ color: "var(--text-2)", lineHeight: 1.65, fontSize: 15 }}>{item.body}</Typography>

                    {/* layer chips */}
                    <Box>
                      <Box sx={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.22em", color: "var(--text-3)", mb: 0.8 }}>SLĀŅI · SAVIENOTI</Box>
                      <Stack direction="row" useFlexGap flexWrap="wrap" spacing={0.8}>
                        {item.layers.map((layer) => <SignalChip key={layer} tone="blue">{layer}</SignalChip>)}
                      </Stack>
                    </Box>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          ))}
        </Stack>
      </Stack>
    </SectionShell>
  );
}