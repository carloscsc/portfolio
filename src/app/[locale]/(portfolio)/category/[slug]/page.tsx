import { ProjectTypes } from "@/_domain/projects/project.schema";
import { Navbar } from "@/components/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound } from "next/navigation";
import { Suspense, use } from "react";
import { ProjectCard } from "../../projects/project-card";
// import { useTranslations } from "next-intl";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const CategoryPage = ({ params }: CategoryPageProps) => {
  const categoryPromise = params.then(async ({ slug }) => {
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/${slug}`,
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
            <Suspense
              fallback={
                <>
                  <div className="text-center mb-12">
                    <Skeleton className="w-[400px] h-10 mx-auto" />
                  </div>
                  <div className="grid-responsive-projects gap-4 sm:gap-6 px-4 sm:px-0 p-6">
                    {Array(9)
                      .fill(null)
                      .map((_, index) => (
                        <Skeleton key={index} className="w-[full] h-[400px]" />
                      ))}
                  </div>
                </>
              }
            >
              <CategoryPageRender data={categoryPromise} promiseSlug={params} />
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

const CategoryPageRender = ({ data, promiseSlug }: tagPagePromise) => {
  // const t = useTranslations("ProjectsSection");
  const posts = use(data);

  const { slug } = use(promiseSlug);

  const categName = posts[0]._category?.find((categ) => categ.value === slug);

  return (
    <>
      <div className="text-center mb-12">
        <h2 className="text-3xl mb-4 text-primary">{categName?.label}</h2>
      </div>

      <div className="grid-responsive-projects gap-4 sm:gap-6 px-4 sm:px-0">
        {posts &&
          posts.map((project) => (
            <div key={project.slug}>
              <ProjectCard {...project} />
            </div>
          ))}
      </div>
    </>
  );
};

export default CategoryPage;
