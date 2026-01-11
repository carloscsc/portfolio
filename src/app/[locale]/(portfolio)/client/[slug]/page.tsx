import { ProjectTypes } from "@/_domain/projects/project.schema";
import { ClientType } from "@/_domain/clients/clients.schema";
import { Navbar } from "@/components/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound } from "next/navigation";
import { Suspense, use } from "react";
import { ProjectCard } from "../../projects/project-card";
import Image from "next/image";
import { getBlobURL } from "@/lib/utils";
import { MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

type ClientPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const ClientPage = ({ params }: ClientPageProps) => {
  const clientPromise = params.then(async ({ slug }) => {
    const clientRequest = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/client/${slug}`,
    );
    const clientData = await clientRequest.json();

    const projectsRequest = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/client-projects/${slug}`,
    );
    const projectsData = await projectsRequest.json();

    if (!clientData || !projectsData) {
      notFound();
    }

    return {
      client: clientData as ClientType,
      projects: projectsData as ProjectTypes[],
    };
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
              <ClientRender data={clientPromise} />
            </Suspense>
          </section>
        </div>
      </section>
    </main>
  );
};

type ClientPageData = {
  data: Promise<{ client: ClientType; projects: ProjectTypes[] }>;
};

const ClientRender = ({ data }: ClientPageData) => {
  const t = useTranslations("ClientPage");
  const { client, projects } = use(data);

  return (
    <>
      <div className="max-w-3xl mx-auto mb-12">
        <div className="bg-accent rounded-lg p-8 space-y-6">
          <div className="flex items-start gap-6">
            <div className="relative w-20 h-20 shrink-0">
              <Image
                src={getBlobURL(client.client_logo)}
                alt={client.client_name}
                fill
                className="object-contain rounded-lg"
              />
            </div>

            <div className="flex-1 space-y-3">
              <h1 className="text-3xl md:text-4xl text-primary font-bold">
                {client.client_name}
              </h1>

              {client.client_location && (
                <p className="text-secondary flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {client.client_location}
                </p>
              )}

              {client.client_link && (
                <Button asChild className="mt-4">
                  <a
                    href={client.client_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink size={16} /> {t("visitWebsite")}
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl text-primary">
          {t("heading")} ({projects.length})
        </h2>
      </div>

      <div className="grid-responsive-projects gap-4 sm:gap-6 px-4 sm:px-0">
        {projects.map((project) => (
          <div key={project.slug}>
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ClientPage;
