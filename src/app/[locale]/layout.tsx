import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Providers from "../providers";
import { Toaster } from "sonner";
import { Metadata } from "next";
import { JetBrains_Mono, Open_Sans } from "next/font/google";

import "../globals.css";

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

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

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
        <footer className="bg-card mt-20">
          <div className="container mx-auto px-4">
            <p className="mt-12 py-8 text-center text-gray-400 text-sm">
              C2 Media & Tech Lab © 2014 - {new Date().getFullYear()}. Todos os
              direitos reservados. <br />
              Consolação - São Paulo/SP
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
