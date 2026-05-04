import { Box, type BoxProps } from "@mui/material";

type SignalChipTone = "blue" | "amber" | "green" | "muted" | "red";

const toneMap: Record<SignalChipTone, { color: string; border: string; background: string }> = {
  blue: { color: "var(--signal-blue)", border: "rgba(182,255,59,0.38)", background: "rgba(182,255,59,0.075)" },
  amber: { color: "var(--signal-amber)", border: "rgba(230,168,74,0.34)", background: "rgba(230,168,74,0.08)" },
  green: { color: "var(--signal-green)", border: "rgba(143,209,138,0.34)", background: "rgba(143,209,138,0.08)" },
  red: { color: "var(--signal-red)", border: "rgba(217,108,95,0.34)", background: "rgba(217,108,95,0.08)" },
  muted: { color: "var(--text-2)", border: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)" }
};

export function SignalChip({ tone = "muted", sx, children, ...props }: BoxProps & { tone?: SignalChipTone }) {
  const token = toneMap[tone];
  return (
    <Box
      component="span"
      {...props}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        minHeight: 24,
        border: `1px solid ${token.border}`,
        borderRadius: "999px",
        px: 1.1,
        color: token.color,
        background: token.background,
        fontFamily: "var(--mono)",
        fontSize: 11,
        letterSpacing: 0,
        lineHeight: 1,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        ...sx
      }}
    >
      {children}
    </Box>
  );
}