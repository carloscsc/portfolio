"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { BRFlag, USFlag } from "@/components/icons/flags";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  variant?: "desktop" | "mobile";
  className?: string;
}

export function LanguageSwitcher({
  variant = "desktop",
  className,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();
  const t = useTranslations("Nav");
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    if (!newLocale || newLocale === currentLocale) return;

    startTransition(() => {
      router.push(pathname, { locale: newLocale });
    });
  };

  return (
    <ToggleGroup
      type="single"
      value={currentLocale}
      onValueChange={handleLocaleChange}
      className={cn(
        "gap-0",
        variant === "desktop" && "h-9",
        variant === "mobile" && "w-full h-11",
        "ring-1 ring-border rounded-lg",
        className,
      )}
      aria-label={t("languageSwitcher")}
      disabled={isPending}
      variant="default"
      size={variant === "desktop" ? "sm" : "default"}
    >
      <ToggleGroupItem
        value="en"
        aria-label={t("switchToEnglish")}
        className={cn(
          "transition-colors duration-200 hover:bg-toggle data-[state=on]:bg-toggle data-[state=on]:text-primary",
          variant === "desktop" && "w-10 h-9 p-0 ",
          variant === "mobile" && "flex-1 h-11 justify-start px-4 ",
          "rounded-none rounded-bl-md rounded-tl-md",
        )}
      >
        <USFlag className="w-5 h-5" />
        {variant === "mobile" && <span className="ml-2">English</span>}
      </ToggleGroupItem>
      <ToggleGroupItem
        value="br"
        aria-label={t("switchToPortuguese")}
        className={cn(
          "transition-colors duration-200 hover:bg-toggle data-[state=on]:bg-toggle data-[state=on]:text-primary",
          variant === "desktop" && "w-10 h-9 p-0 ",
          variant === "mobile" && "flex-1 h-11 justify-start px-4 ",
          "rounded-none rounded-br-md rounded-tr-md",
        )}
      >
        <BRFlag className="w-5 h-5" />
        {variant === "mobile" && <span className="ml-2">Português</span>}
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
