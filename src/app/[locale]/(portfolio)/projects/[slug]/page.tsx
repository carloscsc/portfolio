import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Clock,
  User,
  MapPin,
} from "lucide-react";
import { getBlobURL } from "@/lib/utils";
import WhatsappIcon from "@/components/whatsapp.icon";

import parse from "html-react-parser";
import { ProjectSchema } from "@/_domain/projects/project.schema";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  const request = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${slug}`
  );

  if (!request.ok) {
    notFound();
  }

  const data = await request.json();
  const p = ProjectSchema.parse(data);
  const t = await getTranslations("ProjectDetailPage");

  return (
    <main className="min-h-screen text-white">
      <Navbar />
      <article className="container mx-auto px-4 pt-28  max-w-4xl">
        <Link
          href="/#works"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("navigation.backToProjects")}
        </Link>

        {/* Header do Projeto */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{p.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{p.description}</p>

          <div className="flex flex-wrap gap-4 mb-6">
            {p.demo_link && (
              <Button asChild>
                <a
                  href={p.demo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink size={16} /> {t("buttons.viewProject")}
                </a>
              </Button>
            )}
            {p.repo_link && (
              <Button variant="outline" asChild>
                <a
                  href={p.repo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github size={16} /> {t("buttons.viewSourceCode")}
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Imagem Principal */}
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-card mb-8">
          <Image
            src={getBlobURL(p.cover) || "/placeholder.svg"}
            alt={p.title}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 768px, 100vw"
            priority
          />
        </div>

        {/* Informações do Projeto */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">{t("sections.aboutProject")}</h2>
            <div className="prose prose-invert max-w-none space-y-4">
              {parse(p.about_project)}
            </div>
          </div>

          <div className="space-y-6">
            {/* Informações do Cliente */}
            <div className="bg-card rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                {t("sections.client")}
              </h3>
              <div className="space-y-2">
                <div className="font-medium flex justify-start items-center gap-2">
                  <div className="relative w-8 h-8 border">
                    <Image
                      src={getBlobURL(p.client_logo)}
                      alt={p.client_name}
                      fill
                      className="object-fill object-center"
                    ></Image>
                  </div>
                  <p>{p.client_name}</p>
                </div>
                {p.client_description && (
                  <p className="text-sm text-muted-foreground">
                    {p.client_description}
                  </p>
                )}
                {p.client_location && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {p.client_location}
                  </p>
                )}

                {p.client_link && (
                  <Button className="w-full" asChild>
                    <a
                      href={p.demo_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink size={16} /> {t("buttons.access")}
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Detalhes do Projeto */}
            {(p.duration || Number(p.year) > 0) && (
              <div className="bg-card rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">{t("sections.details")}</h3>

                <div className="space-y-3">
                  {p.duration && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">{t("labels.duration")}</span>
                      <span>{p.duration}</span>
                    </div>
                  )}
                  {p.year && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">{t("labels.year")}</span>
                      <span>{p.year}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tecnologias */}
        {p.technologies && p.technologies.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">{t("sections.technologies")}</h2>
            <div className="flex flex-wrap gap-2">
              {p.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Funcionalidades */}
        {p.functionalities && p.functionalities.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">
              {t("sections.features")}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {p.functionalities.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Galeria */}
        {p.gallery && p.gallery.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">{t("sections.gallery")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {p.gallery.map((image, i) => (
                <div
                  key={i}
                  className="relative aspect-4/3 overflow-hidden rounded-lg bg-card"
                >
                  <Image
                    src={getBlobURL(image) || "/placeholder.svg"}
                    alt={`${p.title} - ${t("gallery.imageAlt", { index: i + 1 })}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                    sizes="(min-width: 1024px) 300px, (min-width: 768px) 350px, 100vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Desafios */}
        {p.challenges && p.challenges.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">{t("sections.challenges")}</h2>
            <ul className="space-y-3">
              {p.challenges.map((challenge, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 shrink-0" />
                  <span className="text-muted-foreground">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Resultados */}
        {p.results && p.results.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">{t("sections.results")}</h2>
            <ul className="space-y-3">
              {p.results.map((result, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0" />
                  <span className="text-muted-foreground">{result}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA Final */}
        <div className="bg-card rounded-lg p-8 text-center mt-8">
          <h3 className="text-xl font-bold mb-4">
            {t("cta.heading")}
          </h3>
          <p className="text-muted-foreground mb-6">
            {t("cta.description")}
          </p>
          <Button
            size="lg"
            className="bg-[#27d366] hover:bg-[#28a71a]  text-white"
            asChild
          >
            <a href="#contact" className="text-responsive-lg">
              <WhatsappIcon /> {t("cta.button")}
            </a>
          </Button>
        </div>
      </article>
    </main>
  );
}
