import "antd/dist/reset.css";
import type { Metadata } from "next";
import { Michroma, Chakra_Petch } from "next/font/google";
import type { ReactNode } from "react";
import { Providers } from "./providers";
import "./globals.css";

const michroma = Michroma({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  display: "swap"
});

const chakra = Chakra_Petch({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
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
    <html lang="lv" className={`${michroma.variable} ${chakra.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}