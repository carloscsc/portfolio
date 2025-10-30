import Image from "next/image";
import Link from "next/link";
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
import connect from "@/lib/db";
import { Project } from "@/_domain/projects/project.model";
import { getBlobURL } from "@/lib/utils";
import WhatsappIcon from "@/components/whatsapp.icon";

import parse from "html-react-parser";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  await connect();
  const projects = await Project.find().select("slug").lean();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  await connect();
  const p = await Project.findOne({ slug }).lean();
  if (!p) return notFound();

  return (
    <main className="min-h-screen text-white">
      <Navbar />
      <article className="container mx-auto px-4 pt-28  max-w-4xl">
        <Link
          href="/#works"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar aos Projetos
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
                  <ExternalLink size={16} /> Acessar o projeto
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
                  <Github size={16} /> Ver Código fonte
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Imagem Principal */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-card mb-8">
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
            <h2 className="text-2xl font-bold mb-4">Sobre o Projeto</h2>
            <div className="prose prose-invert max-w-none">
              {parse(p.about_project)}
            </div>
          </div>

          <div className="space-y-6">
            {/* Informações do Cliente */}
            <div className="bg-card rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Cliente
              </h3>
              <div className="space-y-2">
                <div className="font-medium flex justify-start items-center gap-2">
                  <div className="relative w-[32px] h-[32px] border">
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
                      <ExternalLink size={16} /> Acessar
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Detalhes do Projeto */}
            <div className="bg-card rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Detalhes</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Duração:</span>
                  <span>{p.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Ano:</span>
                  <span>{p.year}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tecnologias */}
        {p.technologies && p.technologies.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Tecnologias Utilizadas</h2>
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
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Principais Funcionalidades
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {p.functionalities.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Galeria */}
        {p.gallery && p.gallery.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Galeria</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {p.gallery.map((image, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg bg-card"
                >
                  <Image
                    src={getBlobURL(image) || "/placeholder.svg"}
                    alt={`${p.title} - Imagem ${i + 1}`}
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
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Desafios Enfrentados</h2>
            <ul className="space-y-3">
              {p.challenges.map((challenge, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Resultados */}

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Resultados Alcançados</h2>
          <ul className="space-y-3">
            {p.results.map((result, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">{result}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Final */}
        <div className="bg-card rounded-lg p-8 text-center">
          <h3 className="text-xl font-bold mb-4">
            Interessado em um projeto similar?
          </h3>
          <p className="text-muted-foreground mb-6">
            Entre em contato para discutirmos como posso ajudar a transformar
            sua ideia em realidade.
          </p>
          <Button
            size="lg"
            className="bg-[#27d366] hover:bg-[#28a71a]  text-white"
            asChild
          >
            <a href="#contact" className="text-responsive-lg">
              <WhatsappIcon /> Agende uma consultoria grátis!
            </a>
          </Button>
        </div>
      </article>
    </main>
  );
}
