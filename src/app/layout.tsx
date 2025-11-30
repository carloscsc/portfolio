import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { JetBrains_Mono, Open_Sans } from "next/font/google";
import Providers from "./providers";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "I'm Carlos S. Cantanzaro - Engenheiro de Software",
  description: "Personal portfolio",
  icons: {
    icon: "/favicon.png",
  },
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
  params: Promise<{ locale: string }>;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${jetbrainsMono.variable} ${openSans.variable} dark antialiased`}
    >
      <body className="bg-linear-to-r from-[#0b0b0b] to-[#1d1f20]">
        <NextIntlClientProvider>
          <Analytics />
          <Providers>{children}</Providers>
          <Toaster richColors />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
