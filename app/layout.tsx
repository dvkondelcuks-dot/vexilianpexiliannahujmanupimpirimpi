import "antd/dist/reset.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap"
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Vexilian — Komerciālās sistēmas Latvijas MVU",
  description:
    "Vexilian uzbūvē komerciālo sistēmu Latvijas mazajiem un vidējiem uzņēmumiem: vietne, CRM, atribūcija, atgūšana un vadības skats vienā plūsmā.",
  openGraph: {
    title: "Kur pazūd tavi klienti?",
    description:
      "Tumša komerciālā diagnostikas karte Latvijas MVU: ienākošie klienti, noplūdes punkti un sistēma, kas padara plūsmu redzamu.",
    type: "website",
    locale: "lv_LV"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="lv" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}