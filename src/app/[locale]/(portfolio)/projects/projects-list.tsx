"use client";

import { useResponsive } from "@/hooks/use-responsive";
import { useQuery } from "@tanstack/react-query";
import { ProjectTypes } from "@/_domain/projects/project.schema";
import { useTranslations } from "next-intl";
import { ProjectCard } from "./project-card";

export function Projects() {
  const { isMobile } = useResponsive();
  const t = useTranslations("ProjectsSection");

  const { data } = useQuery({
    queryKey: ["projetos"],
    queryFn: async () => {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/project`,
      );
      const data = await request.json();
      return data as ProjectTypes[];
    },
  });

  return (
    <section className="py-16 scroll-mt-24" id="works">
      <div className="text-center mb-12">
        <h2 className="text-3xl mb-4 text-primary">{t("heading")}</h2>
      </div>

      {/* Enhanced responsive grid with better spacing */}
      <div className="grid-responsive-projects gap-4 sm:gap-6 px-4 sm:px-0">
        {data &&
          data.map((project, index) => (
            <div
              key={project.slug}
              className={`${
                isMobile && index >= 3 ? "opacity-0 animate-fade-in" : ""
              }`}
              style={{
                animationDelay: isMobile ? `${index * 100}ms` : "0ms",
              }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
      </div>
    </section>
  );
}
