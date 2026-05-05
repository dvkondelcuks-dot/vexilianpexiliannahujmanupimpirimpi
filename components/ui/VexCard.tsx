import { Paper, type PaperProps } from "@mui/material";

export function VexCard({ sx, children, ...props }: PaperProps) {
  return (
    <Paper
      elevation={0}
      data-reveal="up"
      {...props}
      className={`industrial-card ${props.className ?? ""}`.trim()}
      sx={{
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(59,255,124,0.14)",
        borderRadius: "var(--radius)",
        background: "linear-gradient(180deg, rgba(21,27,34,0.92), rgba(8,11,14,0.96))",
        ...sx
      }}
    >
      {children}
    </Paper>
  );
}