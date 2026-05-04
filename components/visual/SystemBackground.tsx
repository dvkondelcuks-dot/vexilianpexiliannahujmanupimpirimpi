import { Box } from "@mui/material";

export function SystemBackground() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        background:
          "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px), radial-gradient(circle at 72% 12%, rgba(182,255,59,0.1), transparent 32%), radial-gradient(circle at 18% 78%, rgba(143,209,138,0.05), transparent 28%), var(--bg)",
        backgroundSize: "42px 42px, 42px 42px, auto, auto, auto"
      }}
    />
  );
}