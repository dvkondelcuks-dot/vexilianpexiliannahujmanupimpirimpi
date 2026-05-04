import { Box, Container, Stack, Typography } from "@mui/material";
import { footerCopy, navItems } from "@/data/pageCopy";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { StatusDot } from "@/components/ui/StatusDot";

export function Footer() {
  return (
    <Box component="footer" sx={{ borderTop: "1px solid var(--border-strong)", background: "#06080a" }}>
      <Container maxWidth={false} sx={{ maxWidth: "var(--grid-max)", px: { xs: 2, md: 4 }, py: { xs: 5, md: 7 } }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.3fr 0.7fr 0.7fr 1fr" }, gap: 4 }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <StatusDot tone="green" />
              <Typography sx={{ fontFamily: "var(--mono)", textTransform: "uppercase", fontSize: 14 }}>{footerCopy.brand}</Typography>
            </Stack>
            <Typography sx={{ color: "var(--text-2)", maxWidth: 430, lineHeight: 1.6 }}>{footerCopy.body}</Typography>
          </Stack>
          <Stack spacing={2}>
            <MetaLabel>Kontakts</MetaLabel>
            <Typography component="a" href={`mailto:${footerCopy.contact}`} sx={{ color: "var(--text)", fontFamily: "var(--mono)", fontSize: 13 }}>{footerCopy.contact}</Typography>
            <MetaLabel>Atrašanās</MetaLabel>
            <Typography sx={{ color: "var(--text-2)", fontFamily: "var(--mono)", fontSize: 13 }}>{footerCopy.location}</Typography>
          </Stack>
          <Stack spacing={2}>
            <MetaLabel>Statuss</MetaLabel>
            <Typography sx={{ color: "var(--signal-blue)", fontFamily: "var(--mono)", fontSize: 13 }}>{footerCopy.status}</Typography>
          </Stack>
          <Stack spacing={1}>
            <MetaLabel>Navigācija</MetaLabel>
            {navItems.map((item) => (
              <Typography key={item.id} component="a" href={`#${item.id}`} sx={{ color: "var(--text-3)", fontFamily: "var(--mono)", fontSize: 12, "&:hover": { color: "var(--signal-blue)" } }}>
                {item.label}
              </Typography>
            ))}
          </Stack>
        </Box>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          justifyContent="space-between"
          sx={{ mt: 5, pt: 2.5, borderTop: "1px solid var(--border)", color: "var(--text-3)", fontFamily: "var(--mono)", fontSize: 11 }}
        >
          {footerCopy.bottom.map((item) => (
            <Box key={item}>{item}</Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}