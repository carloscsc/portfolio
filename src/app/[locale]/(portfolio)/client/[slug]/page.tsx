import { ProjectTypes } from "@/_domain/projects/project.schema";
import { ClientType } from "@/_domain/clients/clients.schema";
import { Navbar } from "@/components/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound } from "next/navigation";
import { Suspense, use } from "react";
import { ProjectCard } from "../../projects/project-card";
import Image from "next/image";
import { getBlobURL } from "@/lib/utils";
import { MapPin } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

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
  const locale = useLocale() as "en" | "br";
  const { client, projects } = use(data);

  const description =
    locale === "en" ? client.client_description : client.client_description_br;

  return (
    <>
      {/* Client Info - Top */}
      <div className="mb-12">
        <div className="bg-accent rounded-lg p-8">
          <div className="grid grid-cols-[auto_1fr] gap-6 items-start">
            {/* Left Column: Logo */}
            <div className="relative w-24 h-24">
              <Image
                src={getBlobURL(client.client_logo)}
                alt={client.client_name}
                fill
                className="object-contain rounded-lg"
              />
            </div>

            {/* Right Column: Title + Location + Description */}
            <div className="space-y-3">
              {client.client_link ? (
                <a
                  href={client.client_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl font-bold text-primary hover:underline inline-block"
                >
                  {client.client_name}
                </a>
              ) : (
                <h1 className="text-3xl font-bold text-primary">
                  {client.client_name}
                </h1>
              )}
              {client.client_location && (
                <p className="text-sm text-secondary flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {client.client_location}
                </p>
              )}
              {description && (
                <p className="text-sm text-secondary leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div>
        <h2 className="text-2xl text-primary mb-6">
          {t("heading")} ({projects.length})
        </h2>
        <div className="grid-responsive-projects gap-4 sm:gap-6">
          {projects.map((project) => (
            <div key={project.slug}>
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default ClientPage;
