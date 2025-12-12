"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useLocale, useTranslations } from "next-intl";

export function ZodProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const t = useTranslations("validation");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadErrorMap = async () => {
      setIsLoaded(false);

      const localeError = locale === "br" ? z.locales.pt() : z.locales.en();

      const customError = (iss: any) => {
        console.log("🚨 ZOD ERROR:", JSON.stringify(iss, null, 2));

        switch (iss.code) {
          case "invalid_type":
            if (iss.received === "undefined") {
              return t("required");
            }
            return undefined;

          case "too_small":
            if (iss.origin === "string") {
              return t("too_small.string", { minimum: iss.minimum });
            }
            return undefined;

          case "too_big":
            if (iss.origin === "string") {
              return t("too_big.string", { maximum: iss.maximum });
            }
            return undefined;

          case "invalid_format":
            if (iss.format === "email") {
              return t("invalid_email");
            }
            return undefined;

          case "custom":
            // Detecta pelo params.format que passamos no schema
            if (iss.params?.format === "phone") {
              return t("invalid_phone");
            }

            if (iss.params?.format === "name") {
              return t("invalid_name");
            }
            return undefined;

          default:
            return undefined;
        }
      };

      z.config({
        localeError: localeError.localeError,
        customError: customError,
      });

      setIsLoaded(true);
    };

    loadErrorMap();
  }, [locale, t]);

  if (!isLoaded) {
    return null;
  }

  return children;
}
