import { Stack, Typography } from "@mui/material";
import { MetaLabel } from "./MetaLabel";

export function TelemetryValue({ label, value, tone = "blue" }: { label: string; value: string; tone?: "blue" | "amber" | "green" | "muted" }) {
  const color = tone === "amber" ? "var(--signal-amber)" : tone === "green" ? "var(--signal-green)" : tone === "muted" ? "var(--text-2)" : "var(--signal-blue)";

  return (
    <Stack spacing={0.35} className="telemetry-flicker">
      <MetaLabel sx={{ fontSize: 10 }}>{label}</MetaLabel>
      <Typography sx={{ color, fontFamily: "var(--mono)", fontSize: 14, lineHeight: 1.1 }}>{value}</Typography>
    </Stack>
  );
}