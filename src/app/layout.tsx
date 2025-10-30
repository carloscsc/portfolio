import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { JetBrains_Mono, Open_Sans } from "next/font/google";
import Providers from "./providers";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "I'm Carlos S. Cantanzaro - Engenheiro de Software",
  description: "Personal portfolio",
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
    <html
      lang="pt-BR"
      className={`${jetbrainsMono.variable} ${openSans.variable} dark antialiased`}
    >
      <body className="bg-gradient-to-r from-[#0b0b0b] to-[#1d1f20]">
        <Analytics />
        <Providers>
          {children}

          <footer className="bg-card mt-20">
            <div className="container mx-auto px-4">
              <p className="mt-12 py-8 text-center text-gray-400 text-sm">
                C2 Media & Tech Lab © 2014 - {new Date().getFullYear()}. Todos
                os direitos reservados. <br />
                Consolação - São Paulo/SP
              </p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
