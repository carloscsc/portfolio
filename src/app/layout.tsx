import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { JetBrains_Mono, Open_Sans } from "next/font/google";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio",
  generator: "v0.dev",
};

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--open-sans",
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html
        lang="pt-BR"
        className={`${jetbrainsMono.variable} ${openSans.variable} dark antialiased`}
      >
        <body className="bg-gradient-to-r from-[#0b0b0b] to-[#1d1f20]">
          {children}
        </body>
      </html>
    </Providers>
  );
}
