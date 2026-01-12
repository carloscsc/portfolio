"use client";
import { ExternalLink, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import type { ProjectTypes } from "@/_domain/projects/project.schema";

import { useResponsive } from "@/hooks/use-responsive";
import { Link } from "@/i18n/navigation";
import { getBlobURL } from "@/lib/utils";
import { Button } from "../../../../components/ui/button";
import { CardWrapper } from "../../../../components/ui/card-wrapper";

export function ProjectCard(data: ProjectTypes) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const { isMobile } = useResponsive();
  const t = useTranslations("ProjectsSection");
  const locale = useLocale() as "en" | "br";

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const translation = data.translations[locale];

  return (
    <CardWrapper className="bg-accent overflow-hidden group h-full flex flex-col hover:border-primary transition-all duration-300 hover:ring-2 hover:ring-highlight">
      {/* Enhanced image container with loading states and link to details */}
      <Link
        href={`/projects/${data.slug}`}
        aria-label={t("card.viewDetailsOf", { title: translation.title })}
        className="block group/image"
      >
        <div className="aspect-4/3 relative  mb-4 bg-muted/20 rounded overflow-hidden">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center animate-pulse">
              <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
            </div>
          )}

          {imageError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/10">
              <div className="text-center">
                <ImageIcon className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">
                  {t("card.imageUnavailable")}
                </p>
              </div>
            </div>
          ) : (
            <Image
              src={getBlobURL(data.cover) || "/placeholder.svg"}
              alt={translation.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`object-cover transition-all duration-300 ${
                imageLoading ? "opacity-0" : "opacity-100"
              } ${isMobile ? "hover:scale-105" : "group-hover:scale-110"}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority={false}
              loading="lazy"
            />
          )}
        </div>
      </Link>

      {/* Content container with flex-grow for equal height cards */}
      <div className="grow flex flex-col">
        {/* <div className="mb-2 flex gap-2">
          {categs?.map((categ) => (
            <Link
              key={categ.value}
              href={`/category/${categ.value}`}
              title={categ.label}
            >
              <Badge variant={"default"}>{categ.label}</Badge>
            </Link>
          ))}
        </div> */}
        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors mb-2 line-clamp-2">
          <Link
            href={`/projects/${data.slug}`}
            aria-label={t("card.viewDetailsOf", { title: translation.title })}
            className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-primary"
          >
            {translation.title}
          </Link>
        </h3>

        <p className="text-secondary text-sm mb-2 grow line-clamp-3 leading-relaxed">
          {translation.description}
        </p>

        {/* Enhanced button layout for mobile */}
        <div className="flex gap-2 flex-wrap mt-auto mx-auto w-full">
          <Button
            variant="outline"
            size={isMobile ? "sm" : "sm"}
            asChild
            className="text-background border-border  hover:bg-secondary bg-highlight touch-target-small w-full"
          >
            <Link
              href={`/projects/${data.slug}`}
              className="flex items-center justify-center gap-2 hover:text-background"
            >
              <ExternalLink size={14} />
              <span>{t("card.viewDetails")}</span>
            </Link>
          </Button>
        </div>
      </div>
    </CardWrapper>
  );
}
