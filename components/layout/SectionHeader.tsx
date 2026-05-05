import { Box, Stack, Typography } from "@mui/material";
import { MetaLabel } from "@/components/ui/MetaLabel";

export function SectionHeader({ eyebrow, headline, body, maxWidth = 820, align = "left" }: { eyebrow: string; headline: string; body?: string; maxWidth?: number; align?: "left" | "center" }) {
  const parts = headline.split("|").map((p) => p.trim()).filter(Boolean);
  const head = parts[0] ?? headline;
  const accentLines = parts.slice(1);
  return (
    <Stack
      spacing={2}
      sx={{
        maxWidth,
        mx: align === "center" ? "auto" : 0,
        textAlign: align
      }}
    >
      <MetaLabel sx={{ color: "var(--signal-blue)" }}>{eyebrow}</MetaLabel>
      <Typography
        component="h2"
        variant="h2"
        sx={{
          fontSize: { xs: "2rem", md: "3rem" },
          maxWidth: 780,
          textTransform: "uppercase",
          letterSpacing: "-0.01em"
        }}
      >
        {head}
        {accentLines.map((line) => (
          <Box key={line} component="span" sx={{ color: "var(--signal-blue)", display: "block" }}>{line}</Box>
        ))}
      </Typography>
      {body ? (
        <Box sx={{ maxWidth: 700 }}>
          <Typography sx={{ color: "var(--text-2)", fontSize: { xs: 15.5, md: 17 }, lineHeight: 1.65 }}>{body}</Typography>
        </Box>
      ) : null}
    </Stack>
  );
}