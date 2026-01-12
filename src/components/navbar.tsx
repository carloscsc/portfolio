"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/custom/theme-toggle";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const t = useTranslations("Nav");

  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  const sectionIds = useMemo(
    () => ["home", "services", "works", "skills", "blog", "contact"],
    [],
  );
  const ticking = useRef(false);

  const computeActive = useCallback(() => {
    // Só detecta seções ativas se estivermos na home
    if (!isHome) {
      setActive("");
      return;
    }

    const viewportH = window.innerHeight;
    const viewportCenter = viewportH / 2;
    let bestId: string | null = null;
    let bestDist = Number.POSITIVE_INFINITY;

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const isVisible = rect.bottom > 80 && rect.top < viewportH - 80;
      if (!isVisible) continue;
      const sectionCenter = rect.top + rect.height / 2;
      const dist = Math.abs(sectionCenter - viewportCenter);
      if (dist < bestDist) {
        bestDist = dist;
        bestId = id;
      }
    }

    if (window.scrollY < 8) {
      setActive("");
      return;
    }
    if (bestId) setActive(bestId === "home" ? "" : bestId);
  }, [sectionIds, isHome]);

  useEffect(() => {
    setTimeout(() => computeActive(), 0);
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        computeActive();
        ticking.current = false;
      });
    };
    const onResize = () => computeActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [computeActive]);

  // Generic smooth scroll handler for all sections
  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();
    setIsOpen(false);

    const section = document.getElementById(sectionId);

    if (section) {
      // Section exists on current page - scroll to it smoothly
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      // Section doesn't exist - navigate to home with hash
      router.push(`/#${sectionId}`);
    }
  };

  const navLinkClasses = (id: string) =>
    [
      "relative transition-colors duration-200",
      "text-primary",
      "after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:bg-secondary after:transition-all after:duration-300",
      isHome && active === id ? "after:w-full" : "after:w-0 hover:after:w-full",
    ].join(" ");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-accent">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="shrink-0 text-2xl font-mono text-primary"
            aria-label="Inicio"
          >
            Carlos S. Cantanzaro
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <LanguageSwitcher variant="desktop" />
            {/* 
            <a
              href="#services"
              className={navLinkClasses("services")}
              aria-current={
                isHome && active === "services" ? "location" : undefined
              }
              onClick={(e) => handleSectionClick(e, "services")}
            >
              {t("service")}
            </a> */}

            <a
              href="#works"
              className={navLinkClasses("works")}
              aria-current={
                isHome && active === "works" ? "location" : undefined
              }
              onClick={(e) => handleSectionClick(e, "works")}
            >
              {t("projects")}
            </a>

            {/* <a
              href="#skills"
              className={navLinkClasses("skills")}
              aria-current={
                isHome && active === "skills" ? "location" : undefined
              }
              onClick={(e) => handleSectionClick(e, "skills")}
            >
              {t("skills")}
            </a> */}

            <Button
              asChild
              className="rounded bg-highlight text-background hover:bg-secondary"
            >
              <a
                href="#contact"
                onClick={(e) => handleSectionClick(e, "contact")}
              >
                {t("contact")}
              </a>
            </Button>
            <ModeToggle />
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="flex flex-col space-y-4 px-2 pt-2 pb-4 bg-accent">
              <LanguageSwitcher variant="mobile" className="mb-2" />

              {/* <a
                href="#services"
                className={navLinkClasses("services")}
                aria-current={
                  isHome && active === "services" ? "location" : undefined
                }
                onClick={(e) => handleSectionClick(e, "services")}
              >
                {t("service")}
              </a> */}

              <a
                href="#works"
                className={navLinkClasses("works")}
                aria-current={
                  isHome && active === "works" ? "location" : undefined
                }
                onClick={(e) => handleSectionClick(e, "works")}
              >
                {t("projects")}
              </a>

              {/* <a
                href="#skills"
                className={navLinkClasses("skills")}
                aria-current={
                  isHome && active === "skills" ? "location" : undefined
                }
                onClick={(e) => handleSectionClick(e, "skills")}
              >
                {t("skills")}
              </a> */}

              <Button
                className="w-full touch-target rounded bg-highlight text-background hover:bg-secondary"
                asChild
              >
                <a
                  href="#contact"
                  onClick={(e) => handleSectionClick(e, "contact")}
                >
                  {t("contact")}
                </a>
              </Button>

              <div className="mx-auto">
                <ModeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
