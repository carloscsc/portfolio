import { Download } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Suspense, use } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { getAndCacheProfile } from "@/_domain/profile/profile.actions";
import { cn, getBlobURL } from "@/lib/utils";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { CttForm } from "./ctt-form";

interface ContactProps extends React.HTMLAttributes<HTMLDivElement> {
  minimal?: boolean;
}

const Contact = async ({ minimal = false }: ContactProps) => {
  const t = getTranslations("ctt");
  const locale = getLocale();
  const data = getAndCacheProfile();

  return (
    <Suspense
      fallback={
        <div className={cn(!minimal && "py-16 scroll-mt-24")}>
          <div className="flex flex-col gap-4 w-full justify-center items-center">
            <Skeleton className="w-64 h-6" />
            <Skeleton className="w-86 h-6" />
          </div>

          <div className="flex flex-row gap-4 mt-8 w-[80%] md:w-[400px] mx-auto">
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
          </div>

          <Skeleton className="w-64 h-6 mx-auto mt-8" />

          {!minimal && (
            <div className="space-y-8 mt-12 max-w-4xl mx-auto px-4 md:px-0">
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-48" />
              <Skeleton className="w-full h-12" />
            </div>
          )}
        </div>
      }
    >
      <CttRender
        translatePromise={t}
        localePromise={locale}
        profilePromise={data}
        minimal={minimal}
      />
    </Suspense>
  );
};

type CttRenderProps = {
  translatePromise: ReturnType<typeof getTranslations>;
  localePromise: ReturnType<typeof getLocale>;
  profilePromise: ReturnType<typeof getAndCacheProfile>;
  minimal: boolean;
};

const CttRender = ({
  translatePromise,
  localePromise,
  profilePromise,
  minimal = false,
}: CttRenderProps) => {
  const t = use(translatePromise);
  const locale = use(localePromise) as "br" | "en";
  const profile = use(profilePromise);
  const translation = profile?.translations?.[locale];

  return (
    <section
      className={cn(
        "animate-in fade-in duration-500",
        !minimal &&
          "py-16 scroll-mt-24 container mx-auto pt-24 px-4 md:px-0 xl:px-4  ",
      )}
      id={!minimal ? "contact" : ""}
    >
      <div className="text-center space-y-6">
        {!minimal && (
          <h2 className="text-responsive-xl mb-4 text-primary">
            {t("heading")}
          </h2>
        )}
        {!minimal && (
          <p className="text-secondary max-w-2xl mx-auto text-responsive-md leading-relaxed px-4">
            {t("description")}
          </p>
        )}

        <div
          className={cn(
            "flex flex-col md:flex-row gap-4 relative items-center justify-center w-full",
            !minimal && "mb-8",
          )}
        >
          <div className="flex gap-2 flex-row relative">
            <Button
              size="lg"
              className="bg-highlight text-background rounded hover:bg-secondary w-full"
              asChild
            >
              <a href={profile?.contato?.linkedin}>
                <FaLinkedin />
                <span className="hidden md:inline">Linkedin</span>
              </a>
            </Button>

            <Button
              size="lg"
              className="bg-highlight text-background rounded hover:bg-secondary w-full"
              asChild
            >
              <a href={profile?.contato?.github}>
                <FaGithub />
                <span className="hidden md:inline">Github</span>
              </a>
            </Button>

            {translation?.cv && (
              <Button
                size="lg"
                className="bg-background text-highlight border-highlight border-2 rounded  w-full"
                variant="outline"
                asChild
              >
                <a href={getBlobURL(translation.cv)} target="_blank">
                  <Download />
                  {t("cv")}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      {!minimal && (
        <div>
          <h2 className="text-secondary max-w-2xl mx-auto text-responsive-md leading-relaxed px-4 text-center">
            {t("form_header")}
          </h2>
          <CttForm />
        </div>
      )}
    </section>
  );
};

export default Contact;
