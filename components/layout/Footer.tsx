import { Box, Container, Stack, Typography } from "@mui/material";
import { footerCopy, navItems } from "@/data/pageCopy";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { StatusDot } from "@/components/ui/StatusDot";

const ACCENT = "#3BFF7C";

export function Footer() {
  return (
    <Box component="footer" sx={{ borderTop: "1px solid var(--border-strong)", background: "#06080a", position: "relative", overflow: "hidden" }}>
      {/* faint grid wash */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(59,255,124,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,255,124,0.04) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(circle at 50% 0%, rgba(0,0,0,0.7), transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 0%, rgba(0,0,0,0.7), transparent 70%)",
          pointerEvents: "none"
        }}
      />

      <Container maxWidth={false} sx={{ maxWidth: "var(--grid-max)", px: { xs: 2, md: 4 }, py: { xs: 6, md: 9 }, position: "relative" }}>
        {/* DISPLAY MARK */}
        <Box sx={{ py: { xs: 5, md: 7 }, textAlign: "center" }}>
          <Typography
            sx={{
              fontFamily: "var(--mono)",
              fontWeight: 700,
              fontSize: { xs: "3.4rem", sm: "5rem", md: "8rem", lg: "10rem" },
              lineHeight: 0.9,
              letterSpacing: { xs: "0.04em", md: "0.08em" },
              color: "var(--text)",
              textTransform: "uppercase",
              backgroundImage: "linear-gradient(180deg, var(--text) 0%, rgba(244,247,250,0.55) 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            VEXILLIAN
          </Typography>
          <Typography sx={{ mt: 2, fontFamily: "var(--mono)", fontSize: { xs: 11, md: 13 }, letterSpacing: "0.32em", color: "var(--text-3)", textTransform: "uppercase" }}>
            KOMERCIĀLĀ · DIAGNOSTIKAS · SISTĒMA
          </Typography>
        </Box>

        {/* link grid */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1.6fr 1fr 1fr" }, gap: { xs: 4, md: 5 }, pt: 5, borderTop: "1px solid var(--border)" }}>
          <Stack spacing={1.6}>
            <MetaLabel>Manifests</MetaLabel>
            <Typography sx={{ color: "var(--text-2)", maxWidth: 380, lineHeight: 1.6, fontSize: 14 }}>{footerCopy.body}</Typography>
          </Stack>

          <Stack spacing={1.4}>
            <MetaLabel>Kontakts</MetaLabel>
            <Typography component="a" href={`mailto:${footerCopy.contact}`} sx={{ color: "var(--text)", fontFamily: "var(--mono)", fontSize: 13, "&:hover": { color: ACCENT } }}>{footerCopy.contact}</Typography>
            <Typography sx={{ color: "var(--text-3)", fontFamily: "var(--mono)", fontSize: 12 }}>{footerCopy.location}</Typography>
          </Stack>

          <Stack spacing={1}>
            <MetaLabel>Navigācija</MetaLabel>
            {navItems.map((item) => (
              <Typography
                key={item.id}
                component="a"
                href={`#${item.id}`}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  color: "var(--text-3)",
                  fontFamily: "var(--mono)",
                  fontSize: 12,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  transition: "color 160ms ease",
                  "&:hover": { color: ACCENT }
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Stack>
        </Box>

        {/* bottom row */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ md: "center" }}
          sx={{ mt: 6, pt: 3, borderTop: "1px solid var(--border)", color: "var(--text-3)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}
        >
          {footerCopy.bottom.map((item) => (
            <Box key={item}>{item}</Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}