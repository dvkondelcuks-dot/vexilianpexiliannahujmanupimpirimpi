import { Box, Stack, Typography } from "@mui/material";
import { MetaLabel } from "@/components/ui/MetaLabel";

export function SectionHeader({ eyebrow, headline, body, maxWidth = 1280, align = "left" }: { eyebrow: string; headline: string; body?: string; maxWidth?: number; align?: "left" | "center" }) {
  const parts = headline.split("|").map((p) => p.trim()).filter(Boolean);
  const head = parts[0] ?? headline;
  const accentLines = parts.slice(1);
  const isCenter = align === "center";
  return (
    <Stack
      spacing={2}
      data-reveal-stagger
      sx={{
        maxWidth,
        mx: isCenter ? "auto" : 0,
        textAlign: align,
        width: "100%"
      }}
    >
      <MetaLabel data-reveal="up" sx={{ color: "var(--signal-blue)" }}>{eyebrow}</MetaLabel>
      <Typography
        component="h2"
        variant="h2"
        data-reveal="up"
        sx={{
          fontSize: { xs: "2rem", sm: "2.4rem", md: "2.8rem", lg: "3rem" },
          maxWidth: "100%",
          textTransform: "uppercase",
          letterSpacing: "-0.01em",
          mx: isCenter ? "auto" : 0
        }}
      >
        {head}
        {accentLines.map((line) => (
          <Box key={line} component="span" sx={{ color: "var(--signal-blue)", display: "block" }}>{line}</Box>
        ))}
      </Typography>
      {body ? (
        <Box data-reveal="up" sx={{ maxWidth: 760, mx: isCenter ? "auto" : 0, textAlign: align }}>
          <Typography sx={{ color: "var(--text-2)", fontSize: { xs: 15.5, md: 17 }, lineHeight: 1.65 }}>{body}</Typography>
        </Box>
      ) : null}
    </Stack>
  );
}