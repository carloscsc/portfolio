import { Suspense, use } from "react";
import type { ProjectTypes } from "@/_domain/projects/project.schema";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectCard } from "../../projects/project-card";
import { getTranslations } from "next-intl/server";

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

    return response || [];
  });

  return (
    <>
      <Navbar />

      <main className="container min-h-screen mx-auto pt-24 px-4 md:px-0 xl:px-4 animate-in fade-in duration-500">
        <Suspense
          fallback={
            <>
              <Skeleton className="w-84 h-8 mx-auto mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
                {Array(9)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index}>
                      <Skeleton className="w-full h-[400px]" />
                    </div>
                  ))}
              </div>
            </>
          }
        >
          <TagRender data={tagPromise} promiseSlug={params} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

type tagPagePromise = {
  data: Promise<ProjectTypes[]>;
  promiseSlug: Promise<{
    slug: string;
  }>;
};

const EmptyState = async ({ slug }: { slug: string }) => {
  const t = await getTranslations("TagPage");

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-center mb-12">
        <h2 className="text-3xl mb-4 text-primary capitalize">{slug.replace(/-/g, " ")}</h2>
      </div>
      <h3 className="text-2xl font-semibold text-primary mb-4">
        {t("noProjects.heading")}
      </h3>
      <p className="text-muted-foreground max-w-md">
        {t("noProjects.description")}
      </p>
    </div>
  );
};

const TagRender = ({ data, promiseSlug }: tagPagePromise) => {
  const tags = use(data);
  const { slug } = use(promiseSlug);

  if (!tags || tags.length === 0) {
    return <EmptyState slug={slug} />;
  }

  const tag = tags[0].tags?.find((tag) => tag.value === slug);

  return (
    <>
      <div className="text-center mb-12">
        <h2 className="text-3xl mb-4 text-primary">{tag?.label}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
        {tags.map((project) => (
          <div key={project.slug}>
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </>
  );
};

export default TagPage;
