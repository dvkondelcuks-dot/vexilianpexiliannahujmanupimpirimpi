import { Box, Stack } from "@mui/material";
import { StatusDot } from "@/components/ui/StatusDot";

const stripItems = [
  ["KOMANDA", "3"],
  ["BĀZE", "RĪGA"],
  ["BŪVĒŠANA", "21–35D"],
  ["SLĀŅI", "6"],
  ["REĠIONS", "BALTIJA"],
  ["STATUSS", "4 AUDITI"]
] as const;

export function FounderOperatingStrip() {
  return (
    <Box
      sx={{
        mt: { xs: 4, md: 5 },
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        background: "rgba(11,14,17,0.72)",
        overflowX: "auto"
      }}
    >
      <Stack direction="row" sx={{ minWidth: { xs: 720, md: 0 } }}>
        {stripItems.map(([label, value], index) => (
          <Stack
            key={label}
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
              flex: 1,
              px: 2,
              py: 1.35,
              borderLeft: index === 0 ? 0 : "1px solid var(--border)",
              color: "var(--text-2)",
              fontFamily: "var(--mono)",
              fontSize: 11,
              textTransform: "uppercase",
              whiteSpace: "nowrap"
            }}
          >
            {label === "STATUSS" ? <StatusDot tone="blue" /> : null}
            <Box sx={{ color: "var(--text-3)" }}>{label} /</Box>
            <Box sx={{ color: label === "STATUSS" ? "var(--signal-blue)" : "var(--text)" }}>{value}</Box>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}