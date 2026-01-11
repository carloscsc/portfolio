import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { getAndCacheProfile } from "@/_domain/profile/profile.actions";
import Projects from "@/app/[locale]/(portfolio)/projects/projects-list";
import Contact from "@/components/contact/contact";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Services } from "@/components/services";
import { Skills } from "@/components/skills";
import { getBlobURL, stripHtmlTags } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("HomePage");
  const locale = (await getLocale()) as "en" | "br";

  const data = await getAndCacheProfile();

  if (!data) {
    notFound();
  }

  const translate = data.translations[locale];
  const ogImageUrl = getBlobURL(data.cover);

  return {
    title: `${t("greetings")} ${data?.name} | ${translate.title}`,
    description: stripHtmlTags(translate.description),

    alternates: {
      canonical: "/",
      languages: {
        en: "/en",
        "pt-BR": "/br",
      },
    },

    ...(ogImageUrl && {
      openGraph: {
        title: translate.title,
        description: stripHtmlTags(translate.description),
        images: [
          { url: ogImageUrl, width: 1200, height: 630, alt: translate.title },
        ],
        locale: locale === "br" ? "pt_BR" : "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: translate.title,
        description: stripHtmlTags(translate.description),
        images: [ogImageUrl],
      },
    }),
  };
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Projects />

      <Contact />

      {/*  */}
      {/* <Services />
      
      <Skills />
    */}

      <Footer />
    </main>
  );
}
