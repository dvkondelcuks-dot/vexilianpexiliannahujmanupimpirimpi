import { Box, Container, type BoxProps } from "@mui/material";
import type { ReactNode } from "react";

export function SectionShell({ id, children, sx, fullBleed = false }: { id: string; children: ReactNode; fullBleed?: boolean } & BoxProps) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        position: "relative",
        py: { xs: 8, md: 12, lg: 15 },
        scrollMarginTop: 92,
        ...sx
      }}
    >
      {fullBleed ? children : <Container maxWidth={false} sx={{ maxWidth: "var(--grid-max)", px: { xs: 2, sm: 3, md: 4 } }}>{children}</Container>}
    </Box>
  );
}