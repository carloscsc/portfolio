"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { USFlag, BRFlag } from "@/components/icons/flags";
import { useTransition } from "react";
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
        "gap-0.5",
        variant === "desktop" && "h-9",
        variant === "mobile" && "w-full gap-2 h-11",
        className
      )}
      aria-label={t("languageSwitcher")}
      disabled={isPending}
      variant="outline"
      size={variant === "desktop" ? "sm" : "default"}
    >
      <ToggleGroupItem
        value="en"
        aria-label={t("switchToEnglish")}
        className={cn(
          "transition-colors duration-200",
          variant === "desktop" &&
            "w-10 h-9 p-0 hover:bg-white/10 data-[state=on]:bg-white/20 data-[state=on]:text-primary",
          variant === "mobile" &&
            "flex-1 h-11 justify-start px-4 hover:bg-white/10 data-[state=on]:bg-white/20 data-[state=on]:text-primary"
        )}
      >
        <USFlag className="w-5 h-5" />
        {variant === "mobile" && <span className="ml-2">English</span>}
      </ToggleGroupItem>
      <ToggleGroupItem
        value="br"
        aria-label={t("switchToPortuguese")}
        className={cn(
          "transition-colors duration-200",
          variant === "desktop" &&
            "w-10 h-9 p-0 hover:bg-white/10 data-[state=on]:bg-white/20 data-[state=on]:text-primary",
          variant === "mobile" &&
            "flex-1 h-11 justify-start px-4 hover:bg-white/10 data-[state=on]:bg-white/20 data-[state=on]:text-primary"
        )}
      >
        <BRFlag className="w-5 h-5" />
        {variant === "mobile" && <span className="ml-2">Português</span>}
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
