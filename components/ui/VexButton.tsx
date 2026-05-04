import { Button, type ButtonProps } from "@mui/material";

type VexButtonIntent = "primary" | "secondary";

export function VexButton({ intent = "primary", sx, children, ...props }: ButtonProps & { intent?: VexButtonIntent }) {
  const isPrimary = intent === "primary";

  return (
    <Button
      disableElevation
      variant={isPrimary ? "contained" : "outlined"}
      {...props}
      sx={{
        px: 2.2,
        borderColor: isPrimary ? "rgba(59,255,124,0.46)" : "rgba(255,255,255,0.14)",
        color: isPrimary ? "#071006" : "var(--text-2)",
        background: isPrimary ? "linear-gradient(180deg, rgba(59,255,124,0.95), rgba(29,178,90,0.92))" : "rgba(255,255,255,0.02)",
        boxShadow: isPrimary ? "inset 0 0 22px rgba(255,255,255,0.24), 0 0 26px rgba(59,255,124,0.12)" : "none",
        fontFamily: "var(--mono)",
        fontSize: 12,
        textTransform: "uppercase",
        letterSpacing: 0,
        "&:hover": {
          borderColor: isPrimary ? "rgba(124,255,168,0.76)" : "rgba(59,255,124,0.34)",
          background: isPrimary ? "linear-gradient(180deg, rgba(124,255,168,0.98), rgba(36,204,108,0.98))" : "rgba(59,255,124,0.06)"
        },
        ...sx
      }}
    >
      {children}
    </Button>
  );
}