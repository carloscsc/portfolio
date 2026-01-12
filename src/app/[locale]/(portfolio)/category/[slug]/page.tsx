import { notFound } from "next/navigation";
import { Suspense, use } from "react";
import type { ProjectTypes } from "@/_domain/projects/project.schema";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Skeleton } from "@/components/ui/skeleton";
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
          <CategoryPageRender data={categoryPromise} promiseSlug={params} />
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
        {posts?.map((project) => (
          <div key={project.slug}>
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryPage;
