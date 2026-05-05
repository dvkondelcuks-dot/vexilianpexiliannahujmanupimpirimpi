"use client";

import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { layers, signalStates } from "@/data/layers";
import { SignalChip } from "@/components/ui/SignalChip";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { CommercialTelemetryChart } from "./CommercialTelemetryChart";

export function SixLayerStack() {
  const [active, setActive] = useState(0);

  return (
    <Box className="diagram-panel" sx={{ p: { xs: 1.5, md: 2 }, minHeight: 760 }}>
      <Stack spacing={2} sx={{ position: "sticky", top: 88 }}>
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }} justifyContent="space-between" spacing={1.5} sx={{ p: 1.5, border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "rgba(7,9,11,0.72)" }}>
          <MetaLabel>Signāla transformācija</MetaLabel>
          <Typography sx={{ color: "var(--signal-blue)", fontFamily: "var(--mono)", fontSize: 13 }}>{signalStates[active + 1]}</Typography>
        </Stack>
        <Box sx={{ position: "relative", pl: { xs: 0, md: 3 } }}>
          <Box aria-hidden="true" sx={{ display: { xs: "none", md: "block" }, position: "absolute", left: 22, top: 18, bottom: 18, width: 1, background: "linear-gradient(180deg, rgba(59,255,124,0.25), rgba(143,209,138,0.48))" }} />
          {layers.map((layer, index) => {
            const isActive = active === index;
            const isComplete = index < active;
            return (
              <Box
                key={layer.number}
                className="industrial-card"
                component="button"
                type="button"
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                sx={{
                  width: "100%",
                  textAlign: "left",
                  color: "inherit",
                  border: "1px solid",
                  borderColor: isActive ? "rgba(59,255,124,0.58)" : isComplete ? "rgba(143,209,138,0.26)" : "var(--border)",
                  borderRadius: "var(--radius)",
                  background: isActive ? "linear-gradient(180deg, rgba(18,23,29,0.96), rgba(9,12,15,0.98))" : "rgba(16,20,25,0.72)",
                  minHeight: isActive ? { xs: 360, sm: 300, md: 260 } : { xs: 112, md: 92 },
                  px: { xs: 1.6, md: 2 },
                  py: 1.4,
                  mb: 1.1,
                  cursor: "pointer",
                  transition: "min-height 260ms ease, border-color 180ms ease, background 180ms ease",
                  overflow: "hidden"
                }}
              >
                <Stack direction="row" spacing={1.4} alignItems="flex-start">
                  <Box sx={{ width: 54, flex: "0 0 auto" }}>
                    <Typography sx={{ color: isComplete ? "var(--signal-green)" : isActive ? "var(--signal-blue)" : "var(--text-3)", fontFamily: "var(--mono)", fontSize: 12 }}>{layer.number}</Typography>
                  </Box>
                  <Stack spacing={1.1} sx={{ flex: 1, minWidth: 0 }}>
                    <Box>
                      <Typography component="h3" sx={{ fontSize: { xs: 18, md: 22 }, lineHeight: 1.15 }}>{layer.title}</Typography>
                      <Typography sx={{ color: "var(--text-2)", fontSize: 13.5, mt: 0.5 }}>{layer.subtitle}</Typography>
                    </Box>
                    {isActive ? (
                      <Stack spacing={1.4}>
                        <Typography sx={{ color: "var(--text-2)", fontSize: 14.5, lineHeight: 1.62 }}>{layer.text}</Typography>
                        <Stack direction="row" useFlexGap flexWrap="wrap" spacing={0.8}>
                          {layer.includes.map((item) => <SignalChip key={item} tone="blue">{item}</SignalChip>)}
                        </Stack>
                        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 0.9fr" }, gap: 1.2, alignItems: "stretch" }}>
                          <MiniLayerRoute items={layer.visual} />
                          <CommercialTelemetryChart mode="throughput" variant="line" height={82} />
                        </Box>
                      </Stack>
                    ) : null}
                  </Stack>
                </Stack>
              </Box>
            );
          })}
        </Box>
      </Stack>
    </Box>
  );
}

function MiniLayerRoute({ items }: { items: readonly string[] }) {
  return (
    <Stack direction="row" useFlexGap flexWrap="wrap" spacing={0.8} alignItems="center">
      {items.map((item, index) => (
        <Stack key={`${item}-${index}`} direction="row" spacing={0.8} alignItems="center">
          <SignalChip tone={index === items.length - 1 ? "green" : "muted"}>{item}</SignalChip>
          {index < items.length - 1 ? <Box sx={{ width: 18, height: 1, background: "rgba(59,255,124,0.42)" }} /> : null}
        </Stack>
      ))}
    </Stack>
  );
}