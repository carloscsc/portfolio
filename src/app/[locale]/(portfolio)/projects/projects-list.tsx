import { useTranslations } from "next-intl";
import { Suspense, use } from "react";
import { getAllCachedProjects } from "@/_domain/projects/project.actions";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectCard } from "./project-card";

export default function Projects() {
  const projectsPromise = getAllCachedProjects();
  const t = useTranslations("ProjectsSection");

  return (
    <section
      className="container mx-auto pt-24 px-4 md:px-0 xl:px-4 animate-in fade-in duration-500"
      id="works"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl mb-4 text-primary">{t("heading")}</h2>
      </div>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <div key={index}>
                  <Skeleton className="w-full h-[450px]" />
                </div>
              ))}
          </div>
        }
      >
        <ProjectRender projectsPromise={projectsPromise} />
      </Suspense>
    </section>
  );
}

type ProjectRenderType = {
  projectsPromise: ReturnType<typeof getAllCachedProjects>;
};

const ProjectRender = ({ projectsPromise }: ProjectRenderType) => {
  const data = use(projectsPromise);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
      {data?.map((project) => (
        <div key={project.slug}>
          <ProjectCard {...project} />
        </div>
      ))}
    </div>
  );
};
