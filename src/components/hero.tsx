import parse from "html-react-parser";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Suspense, use } from "react";
import { getAndCacheProfile } from "@/_domain/profile/profile.actions";
import { getBlobURL } from "@/lib/utils";
import Contact from "./contact/contact";
import { Stats } from "./stats";
import { Skeleton } from "./ui/skeleton";

export const Hero = () => {
  const t = getTranslations("HomePage");
  const locale = getLocale();
  const profileData = getAndCacheProfile();

  return (
    <Suspense
      fallback={
        <div className="container max-w-7xl mx-auto pt-24 px-4 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden min-h-[360px] lg:min-h-[520px] lg:order-1">
              <Skeleton className="w-full h-[360px] lg:h-[520px] aspect-square rounded" />
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
              <div className="flex gap-2 flex-col">
                <Skeleton className="w-[60%] h-8" />
                <Skeleton className="w-[40%] h-6" />
              </div>

              <div className="flex gap-2 flex-col mt-8 ">
                <Skeleton className="w-[90%] h-5" />
                <Skeleton className="w-[85%] h-5" />
                <Skeleton className="w-[95%] h-5" />
                <Skeleton className="w-[90%] h-5" />
                <Skeleton className="w-[82%] h-5" />
                <Skeleton className="w-[70%] h-5" />
              </div>

              <div className="flex flex-row gap-4 mt-8 w-[60%] mx-auto md:mx-0">
                <Skeleton className="w-full h-12" />
                <Skeleton className="w-full h-12" />
                <Skeleton className="w-full h-12" />
              </div>

              <div className="flex flex-row gap-4 mt-8 ">
                <Skeleton className="w-full h-28" />
                <Skeleton className="w-full h-28" />
              </div>
            </div>
          </div>
        </div>
      }
    >
      <HeroRender
        translatePromise={t}
        localePromise={locale}
        profilePromise={profileData}
      />
    </Suspense>
  );
};

type HeroRenderProps = {
  translatePromise: ReturnType<typeof getTranslations>;
  localePromise: ReturnType<typeof getLocale>;
  profilePromise: ReturnType<typeof getAndCacheProfile>;
};

const HeroRender = ({
  translatePromise,
  localePromise,
  profilePromise,
}: HeroRenderProps) => {
  const t = use(translatePromise);
  const locale = use(localePromise) as "br" | "en";
  const profile = use(profilePromise);
  const translation = profile?.translations?.[locale];

  return (
    <section
      id="home"
      className="container max-w-7xl mx-auto pt-24 px-4 animate-in fade-in duration-500"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden min-h-[360px] lg:min-h-[520px]  lg:order-1">
          <Image
            src={getBlobURL(profile?.cover ?? "")}
            alt="Profile"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
          />
        </div>

        <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
          <h1 className="text-3xl mb-4 text-primary">
            {t("greetings")} {profile?.name}
            <span className="block text-secondary mt-2 text-xl">
              {translation?.title}
            </span>
          </h1>
          <div className="text-responsive-md text-secondary mb-8 max-w-2xl">
            {parse(translation?.description || "")}
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8 relative">
            <Contact minimal={true} />
          </div>
          <Stats itens={translation?.highlights || []} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
