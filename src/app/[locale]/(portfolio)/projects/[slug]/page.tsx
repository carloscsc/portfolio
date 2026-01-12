import parse from "html-react-parser";
import { ArrowLeft, Calendar, Clock, ExternalLink } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { FaGithub } from "react-icons/fa";
import { getAndCacheProject } from "@/_domain/projects/project.actions";
import type { ProjectTypes } from "@/_domain/projects/project.schema";
import Contact from "@/components/contact/contact";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn, getBlobURL, stripHtmlTags } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentData = await parent;

  const { slug } = await params;
  const locale = (await getLocale()) as "en" | "br";

  const data = await getAndCacheProject(slug);

  if (!data) {
    notFound();
  }

  const translate = data.translations[locale];
  const ogImageUrl = getBlobURL(data.cover);

  return {
    title: `${translate.title} | ${parentData.title?.absolute}`,
    description: stripHtmlTags(translate.description),

    keywords: data.technologies,

    alternates: {
      canonical: `/projects/${slug}`,
      languages: {
        en: `/projects/${slug}`,
        "pt-BR": `/br/projects/${slug}`,
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

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const t = await getTranslations("ProjectDetailPage");
  const locale = (await getLocale()) as "en" | "br";

  const data = await getAndCacheProject(slug);

  if (!data) {
    notFound();
  }

  const translate = data.translations[locale];

  return (
    <main className="min-h-screen animate-in fade-in duration-500">
      <Navbar />
      <article className="container mx-auto px-4 pt-28  max-w-6xl">
        <Link
          href="/#works"
          className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("navigation.backToProjects")}
        </Link>

        {/* Header do Projeto */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl text-primary mb-4">
            {translate.title}
          </h1>

          <p className="text-lg text-secondary mb-6">{translate.description}</p>

          <div className="flex flex-wrap gap-4 mb-6">
            {data.demo_link && (
              <Button
                asChild
                className="rounded bg-highlight text-background hover:bg-secondary"
              >
                <a
                  href={data.demo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink size={16} /> {t("buttons.viewProject")}
                </a>
              </Button>
            )}
            {data.repo_link && (
              <Button
                variant="outline"
                asChild
                className="rounded bg-highlight text-background hover:bg-secondary"
              >
                <a
                  href={data.repo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <FaGithub size={16} /> {t("buttons.viewSourceCode")}
                </a>
              </Button>
            )}
          </div>

          {/* Imagem Principal */}
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-card mb-8">
            <Image
              src={getBlobURL(data.cover) || "/placeholder.svg"}
              alt={translate.title}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 768px, 100vw"
              priority
            />
          </div>
        </div>

        {/* Informações do Projeto */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl text-primary mb-4">
              {t("sections.aboutProject")}
            </h2>
            <div className="prose max-w-none space-y-4 text-secondary">
              {parse(translate.about_project)}
            </div>

            {/* Funcionalidades */}
            {translate.functionalities &&
              translate.functionalities.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl text-primary mb-4">
                    {t("sections.features")}
                  </h2>
                  <ul className="flex flex-col gap-3">
                    {translate.functionalities.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-secondary rounded-full mt-2 shrink-0" />
                        <span className="text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Desafios */}
            {translate.challenges && translate.challenges.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl text-primary mb-4">
                  {t("sections.challenges")}
                </h2>
                <ul className="flex flex-col gap-3">
                  {translate.challenges.map((challenge, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 shrink-0" />
                      <span className="text-secondary">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <ProjectSiderbar data={data} />
        </div>

        {/* Resultados */}
        {translate.results && translate.results.length > 0 && (
          <div className="mt-8 bg-accent p-6">
            <h2 className="text-2xl text-highlight mb-4">
              {t("sections.results")}
            </h2>
            <ul className="space-y-3">
              {translate.results.map((result, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-highlight rounded-full mt-2 shrink-0" />
                  <span className="text-secondary">{result}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <ProjectSiderbar data={data} mobile={true} />

        {/* Galeria */}
        {data.gallery && data.gallery.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl text-primary mb-4">
              {t("sections.gallery")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.gallery.map((image, i) => (
                <div
                  key={i}
                  className="relative aspect-4/3 overflow-hidden rounded-lg bg-card"
                >
                  <Image
                    src={getBlobURL(image) || "/placeholder.svg"}
                    alt={`${translate.title} - ${t("gallery.imageAlt", { index: i + 1 })}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                    sizes="(min-width: 1024px) 300px, (min-width: 768px) 350px, 100vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </article>

      <Contact id="contact" />
      <Footer />
    </main>
  );
}

const ProjectSiderbar = async ({
  data,
  mobile = false,
}: {
  data: ProjectTypes;
  mobile?: boolean;
}) => {
  const t = await getTranslations("ProjectDetailPage");
  const locale = (await getLocale()) as "en" | "br";
  const translate = data.translations[locale];

  return (
    <div
      className={cn("space-y-6", mobile ? "md:hidden mt-8" : "hidden md:block")}
    >
      {/* Agency & Client */}
      {(data._agency?.slug || data._client?.slug) && (
        <div className="bg-accent rounded p-6 space-y-4">
          {data._agency?.slug && (
            <>
              <div>
                <h3 className="text-sm text-muted-foreground mb-2">
                  {t("sections.agency")}
                </h3>
                <Link
                  href={`/client/${data._agency.slug}`}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <div className="relative w-8 h-8">
                    <Image
                      src={getBlobURL(data._agency.client_logo)}
                      alt={data._agency.client_name}
                      fill
                      className="object-fill object-center rounded"
                    />
                  </div>
                  <p className="text-primary font-medium hover:underline">
                    {data._agency.client_name}
                  </p>
                </Link>
              </div>
              {data._client?.slug && (
                <div className="border-t border-border pt-4" />
              )}
            </>
          )}

          {data._client?.slug && (
            <div>
              <h3 className="text-sm text-muted-foreground mb-2">
                {t("sections.client")}
              </h3>
              <Link
                href={`/client/${data._client.slug}`}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="relative w-8 h-8">
                  <Image
                    src={getBlobURL(data._client.client_logo)}
                    alt={data._client.client_name}
                    fill
                    className="object-fill object-center rounded"
                  />
                </div>
                <p className="text-primary font-medium hover:underline">
                  {data._client.client_name}
                </p>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Detalhes do Projeto */}
      {(translate.duration || Number(data.year) > 0) && (
        <div className="bg-accent rounded-lg p-6">
          <h3 className="text-lg text-primary mb-4">{t("sections.details")}</h3>

          <div className="space-y-3">
            {translate.duration && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-secondary" />
                <span className="text-secondary">{t("labels.duration")}</span>
                <span className="text-primary">{translate.duration}</span>
              </div>
            )}
            {data.year && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-secondary" />
                <span className="text-secondary">{t("labels.year")}</span>
                <span className="text-primary">{data.year}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Category */}
      {data?._category && data?._category?.length > 0 && (
        <div className="bg-accent rounded-lg p-6">
          <h2 className="text-2xl text-primary mb-4">
            {t("sections.category")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {data._category.map((tech) => (
              <Link
                key={tech.value}
                href={`/category/${tech.value}`}
                title={tech.label}
              >
                <Badge
                  variant="default"
                  className="bg-highlight text-background"
                >
                  {tech.label}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Tecnologias */}
      {data.tags && data.tags.length > 0 && (
        <div className="bg-accent rounded-lg p-6">
          <h2 className="text-2xl text-primary mb-4">
            {t("sections.technologies")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tech) => (
              <Link
                key={tech.value}
                href={`/tags/${tech.value}`}
                title={tech.label}
              >
                <Badge
                  variant="secondary"
                  className="bg-transparent text-highlight border-highlight hover:bg-highlight hover:text-background"
                >
                  {tech.label}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Collaborators */}
      {data.collaborators && data.collaborators.length > 0 && (
        <div className="bg-accent rounded p-6 space-y-4">
          <h3 className="text-lg text-primary mb-4">
            {t("sections.collaborators")}
          </h3>
          <div className="space-y-3">
            {data.collaborators.map((collab, index) => {
              const link = collab.website;
              return (
                <div
                  key={index}
                  className="space-y-1 pb-3 border-b border-border last:border-0 last:pb-0"
                >
                  {link ? (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {collab.name}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-primary">
                      {collab.name}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">{collab.role}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
