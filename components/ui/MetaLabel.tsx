import { Typography, type TypographyProps } from "@mui/material";

export function MetaLabel({ children, sx, ...props }: TypographyProps) {
  return (
    <Typography
      component="p"
      {...props}
      sx={{
        color: "var(--text-3)",
        fontFamily: "var(--mono)",
        fontSize: 11,
        letterSpacing: 0,
        textTransform: "uppercase",
        ...sx
      }}
    >
      {children}
    </Typography>
  );
}