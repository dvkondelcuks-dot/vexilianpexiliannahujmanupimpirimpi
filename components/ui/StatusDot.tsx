import { Box } from "@mui/material";

type StatusDotTone = "blue" | "amber" | "green" | "red" | "muted";

const toneColor: Record<StatusDotTone, string> = {
  blue: "var(--signal-blue)",
  amber: "var(--signal-amber)",
  green: "var(--signal-green)",
  red: "var(--signal-red)",
  muted: "var(--text-3)"
};

export function StatusDot({ tone = "blue", label }: { tone?: StatusDotTone; label?: string }) {
  return (
    <Box
      component="span"
      aria-label={label}
      sx={{
        width: 7,
        height: 7,
        borderRadius: "50%",
        display: "inline-block",
        background: toneColor[tone],
        boxShadow: tone === "muted" ? "none" : `0 0 16px ${toneColor[tone]}`,
        flex: "0 0 auto"
      }}
    />
  );
}