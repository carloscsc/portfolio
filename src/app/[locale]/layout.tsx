import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Providers from "../providers";
import { Toaster } from "sonner";
import { Metadata } from "next";
import { JetBrains_Mono, Open_Sans } from "next/font/google";

import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "I'm Carlos S. Cantanzaro - Full-Stack Developer",
  description:
    "I build the tools that help businesses scale fast: high-converting giveaway & promotion platforms, sharp landing pages, professional company websites, tailor-made CRMs, smart automations, seamless integrations… you name it. Whatever's holding your growth back, I turn it into your next advantage.",
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
      className={`${jetbrainsMono.variable} ${openSans.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <Analytics />
            <Providers>
              <div className="flex flex-col min-h-screen">
                <div className="flex-1">{children}</div>
                <footer className="bg-accent mt-20">
                  <div className="container mx-auto px-4">
                    <p className="mt-12 py-8 text-center text-secondary text-sm">
                      C2 Media & Tech Lab © 2014 - {new Date().getFullYear()}
                    </p>
                  </div>
                </footer>
              </div>
            </Providers>
            <Toaster richColors />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
