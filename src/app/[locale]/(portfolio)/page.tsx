import { Button } from "@/components/ui/button";
import { Stats } from "@/components/stats";
import { Services } from "@/components/services";
import { Projects } from "@/app/[locale]/(portfolio)/projects/projects-list";

import Image from "next/image";
import { Navbar } from "@/components/navbar";

import Contact from "@/components/contact";
import { notFound } from "next/navigation";

import parse from "html-react-parser";
import { getBlobURL, stripHtmlTags } from "@/lib/utils";
import { Skills } from "@/components/skills";
import { ProfileSchema } from "@/_domain/profile/profile.schema";
import { getLocale, getTranslations } from "next-intl/server";
import { MessageSquareShare } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { getAndCacheProfile } from "@/_domain/profile/profile.actions";
import { Metadata } from "next";

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

export default async function Home() {
  const t = await getTranslations("HomePage");
  const locale = (await getLocale()) as "en" | "br";

  const data = await getAndCacheProfile();

  if (!data) {
    return notFound();
  }

  const profile = data ? ProfileSchema.parse(data) : null;
  const translation = profile?.translations?.[locale];

  return (
    <>
      <main className="min-h-screen">
        <Navbar />

        {/* Hero */}
        <section
          id="home"
          className="responsive-container spacing-responsive-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden min-h-[360px] lg:min-h-[520px]  lg:order-1">
              <Image
                src={getBlobURL(profile?.cover ?? "")}
                alt="Profile"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
              />
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
              <h1 className="text-responsive-xl mb-4 mobile-text">
                {t("greetings")} {data?.name}
                <span className="block text-secondary mt-2 text-responsive-sm">
                  {translation?.title}
                </span>
              </h1>
              <div className="text-responsive-md text-secondary mb-8 max-w-2xl">
                {parse(translation?.description || "")}
              </div>
              {/* CONTATO - Alterar para puxar via banco de dados */}
              <div className="flex flex-col md:flex-row gap-4 mb-8 relative">
                <Button
                  size="lg"
                  className="bg-highlight text-background rounded hover:bg-secondary"
                  asChild
                >
                  <a href={data.contato?.linkedin}>
                    <FaLinkedin />
                    Linkedin
                  </a>
                </Button>

                <Button
                  size="lg"
                  className="bg-highlight text-background rounded hover:bg-secondary"
                  asChild
                >
                  <a href={data.contato?.github}>
                    <FaGithub />
                    Github
                  </a>
                </Button>

                <Button
                  size="lg"
                  className="bg-highlight text-background rounded hover:bg-secondary"
                  asChild
                >
                  <a
                    href={`https://api.whatsapp.com/send?phone=55${translation?.phone}`}
                  >
                    <MessageSquareShare />
                    {t("cta.scheduleConsultation")}
                  </a>
                </Button>
              </div>
              <Stats itens={translation?.highlights || []} />
            </div>
          </div>
        </section>

        {/* Conteúdo */}
        <div className="container mx-auto px-4">
          <Services />
          <Projects />
          <Skills />
          <Contact phone={translation?.phone || ""} />
        </div>
      </main>
    </>
  );
}
