import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";

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
    <>
      {children}
      <footer className="bg-card mt-20">
        <div className="container mx-auto px-4">
          <p className="mt-12 py-8 text-center text-gray-400 text-sm">
            C2 Media & Tech Lab © 2014 - {new Date().getFullYear()}. Todos os
            direitos reservados. <br />
            Consolação - São Paulo/SP
          </p>
        </div>
      </footer>
    </>
  );
}
