"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Globe,
  Palette,
  Award,
  Blocks,
  Bot,
  CodeXml,
  Rocket,
  Puzzle,
  Wrench,
} from "lucide-react";
import { CardWrapper } from "./ui/card-wrapper";
import { cn } from "@/lib/utils";

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function ServiceCard({ title, description, icon }: Service) {
  return (
    <CardWrapper className="h-full hover:border-primary/40 transition-colors">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </CardWrapper>
  );
}

export function Services() {
  const t = useTranslations("ServicesSection");

  const services: Service[] = [
    {
      icon: <Globe size={24} />,
      title: t("services.institutional.title"),
      description: t("services.institutional.description"),
    },
    {
      icon: <Palette size={24} />,
      title: t("services.landingPages.title"),
      description: t("services.landingPages.description"),
    },
    {
      icon: <Award size={24} />,
      title: t("services.promotionPlatforms.title"),
      description: t("services.promotionPlatforms.description"),
    },
    {
      icon: <Blocks size={24} />,
      title: t("services.crmErp.title"),
      description: t("services.crmErp.description"),
    },
    {
      icon: <Bot size={24} />,
      title: t("services.aiIntegration.title"),
      description: t("services.aiIntegration.description"),
    },
    {
      icon: <CodeXml size={24} />,
      title: t("services.tailormadeSystems.title"),
      description: t("services.tailormadeSystems.description"),
    },
    {
      icon: <Rocket size={24} />,
      title: t("services.marketingAutomation.title"),
      description: t("services.marketingAutomation.description"),
    },
    {
      icon: <Puzzle size={24} />,
      title: t("services.apiIntegration.title"),
      description: t("services.apiIntegration.description"),
    },
    {
      icon: <Wrench size={24} />,
      title: t("services.maintenance.title"),
      description: t("services.maintenance.description"),
    },
  ];

  // Estado reativo da Embla API
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Plugin memoizado (não recria a cada render)
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: 3500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        rootNode: (emblaRoot) => emblaRoot?.parentElement,
      }),
    []
  );

  const onSelect = useCallback((embla?: CarouselApi) => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;

    setScrollSnaps(api.scrollSnapList());
    onSelect(api);

    api.on("select", onSelect);
    api.on("reInit", () => {
      setScrollSnaps(api.scrollSnapList());
      onSelect(api);
    });

    // Reseta autoplay quando volta a aba (opcional)
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        if (autoplay.play) {
          autoplay.play();
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [api, onSelect, autoplay]);

  return (
    <section className="py-16 scroll-mt-24" id="services">
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl font-bold mb-4">
          {t("heading")}
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-balance">
          {t("description.intro")}{" "}
          <strong className="text-white">
            {t("description.highlight")}
          </strong>{" "}
          {t("description.outro")}
        </p>
      </div>

      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            duration: 28,
          }}
          plugins={[autoplay]}
          setApi={(embla) => setApi(embla)}
          className="px-2"
        >
          <CarouselContent>
            {services.map((service, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <ServiceCard {...service} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex gap-3 justify-center mt-8">
            <CarouselPrevious className="-left-2 md:-left-10" />
            <CarouselNext className="-right-2 md:-right-10" />
          </div>
        </Carousel>

        {/* Bullets */}
        {scrollSnaps.length > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {scrollSnaps.map((_, i) => {
              const isActive = i === selectedIndex;
              return (
                <button
                  key={i}
                  aria-label={t("carousel.goToSlide", { index: i + 1 })}
                  aria-current={isActive}
                  onClick={() => api?.scrollTo(i)}
                  className={cn(
                    "h-2.5 rounded-full transition-all",
                    isActive
                      ? "w-6 bg-primary"
                      : "w-2.5 bg-primary/30 hover:bg-primary/60"
                  )}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
