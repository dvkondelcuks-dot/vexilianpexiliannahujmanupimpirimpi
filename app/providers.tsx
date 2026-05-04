"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ConfigProvider, theme as antdTheme } from "antd";
import type { ReactNode } from "react";
import { vexTheme } from "./theme";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={vexTheme}>
      <ConfigProvider
        theme={{
          algorithm: antdTheme.darkAlgorithm,
          token: {
            colorPrimary: "#B6FF3B",
            colorBgBase: "#07090B",
            colorBgContainer: "#101419",
            colorBorder: "rgba(255,255,255,0.10)",
            colorText: "#F4F7FA",
            colorTextSecondary: "#A7B0BA",
            colorWarning: "#E6A84A",
            colorSuccess: "#8FD18A",
            colorError: "#D96C5F",
            borderRadius: 8,
            fontFamily: "var(--font-geist-sans), Inter, Arial, sans-serif"
          }
        }}
      >
        <CssBaseline />
        {children}
      </ConfigProvider>
    </ThemeProvider>
  );
}