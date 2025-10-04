import { Button } from "@/components/ui/button";
import { Stats } from "@/components/stats";
import { Services } from "@/components/services";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";

import Image from "next/image";
import { Navbar } from "@/components/navbar";

import ProfilePicture from "@public/perfil.jpg";
import WhatsappIcon from "@/components/whatsapp.icon";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <main className="min-h-screen text-white">
      <Navbar />

      {/* Hero */}
      <section id="home" className="responsive-container spacing-responsive-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden min-h-[360px] lg:min-h-[520px]  lg:order-1">
            <Image
              src={ProfilePicture.src}
              alt="Profile"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
            />
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
            <h1 className="text-responsive-xl font-bold mb-4 mobile-text">
              Olá, eu sou Carlos
              <span className="block text-primary mt-2 text-responsive-md">
                Engenheiro de Software
              </span>
            </h1>
            <p className="text-responsive-md text-gray-400 mb-8 max-w-2xl">
              Desenvolvo sistemas que ajudam empresas a crescerem: plataformas
              de sorteios e promoções, landing pages, sites institucionais, CRMs
              personalizados, automações de atendimento e integrações com
              ferramentas de marketing digital....{" "}
              <strong className="text-white">
                Não importa o desafio, meu trabalho é encontrar a solução certa,
                no tamanho do seu bolso.
              </strong>
            </p>
            <div className="flex flex-col md:flex-row gap-4 mb-8 relative">
              <Button
                size="lg"
                className="bg-[#27d366] hover:bg-[#28a71a]  text-white"
                asChild
              >
                <a href="#contact">
                  <WhatsappIcon />
                  Agende uma consultoria grátis!
                </a>
              </Button>
              {/* <ResumeDownload /> */}
            </div>
            <Stats className="border-t border-white/10 pt-8" />
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <div className="container mx-auto px-4">
        <Services />
        <Projects />
        {/* <Skills /> */}
        <Contact />
      </div>

      <footer className="bg-card mt-20">
        <div className="container mx-auto px-4">
          <p className="mt-12 py-8 text-center text-gray-400 text-sm">
            C2 Media & Tech Lab © 2014 - {new Date().getFullYear()}. Todos os
            direitos reservados. <br />
            Consolação - São Paulo/SP
          </p>
        </div>
      </footer>
    </main>
  );
}
