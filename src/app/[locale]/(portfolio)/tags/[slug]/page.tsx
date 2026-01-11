import { ProjectTypes } from "@/_domain/projects/project.schema";
import { Navbar } from "@/components/navbar";
import { notFound } from "next/navigation";
import { Suspense, use } from "react";
import { ProjectCard } from "../../projects/project-card";
import { useTranslations } from "next-intl";

type tagProps = {
  params: Promise<{
    slug: string;
  }>;
};

const TagPage = ({ params }: tagProps) => {
  const tagPromise = params.then(async ({ slug }) => {
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/tags/${slug}`,
    );

    const response = await request.json();

    if (!response) {
      notFound();
    }

    return response;
  });

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="responsive-container spacing-responsive-lg">
        <div className="container mx-auto px-4">
          <section className="py-16 scroll-mt-24" id="works">
            <Suspense>
              <TagRender data={tagPromise} promiseSlug={params} />
            </Suspense>
          </section>
        </div>
      </section>
    </main>
  );
};

type tagPagePromise = {
  data: Promise<ProjectTypes[]>;
  promiseSlug: Promise<{
    slug: string;
  }>;
};

const TagRender = ({ data, promiseSlug }: tagPagePromise) => {
  const t = useTranslations("ProjectsSection");
  const tags = use(data);
  const { slug } = use(promiseSlug);

  const tag = tags[0].tags?.find((tag) => tag.value === slug);

  return (
    <>
      <div className="text-center mb-12">
        <h2 className="text-3xl mb-4 text-primary">
          {t("heading")} in {tag?.label}
        </h2>
      </div>

      <div className="grid-responsive-projects gap-4 sm:gap-6 px-4 sm:px-0">
        {tags &&
          tags.map((project) => (
            <div key={project.slug}>
              <ProjectCard {...project} />
            </div>
          ))}
      </div>
    </>
  );
};

export default TagPage;
