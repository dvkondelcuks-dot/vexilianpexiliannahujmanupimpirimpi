import type { ReactNode } from "react";
import { Box } from "@mui/material";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SystemBackground } from "@/components/visual/SystemBackground";

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ minHeight: "100vh", background: "transparent" }}>
      <SystemBackground />
      <Header />
      <Box component="main">{children}</Box>
      <Footer />
    </Box>
  );
}