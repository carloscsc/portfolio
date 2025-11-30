"use client";

import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const t = useTranslations("Nav");

  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  const sectionIds = useMemo(
    () => ["home", "services", "works", "skills", "blog", "contact"],
    []
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

  const getNavLinkHref = (sectionId: string) => {
    if (isHome) {
      return `#${sectionId}`;
    } else {
      return `/#${sectionId}`;
    }
  };

  const navLinkClasses = (id: string) =>
    [
      "relative transition-colors duration-200",
      isHome && active === id ? "text-primary" : "text-white",
      "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-primary after:transition-all after:duration-300",
      isHome && active === id ? "after:w-full" : "after:w-0 hover:after:w-full",
    ].join(" ");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur supports-backdrop-filter:bg-black/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="shrink-0 text-2xl font-bold font-mono"
            aria-label="Inicio"
          >
            Carlos S. Cantanzaro
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href={getNavLinkHref("services")}
              className={navLinkClasses("services")}
              aria-current={
                isHome && active === "services" ? "location" : undefined
              }
            >
              {t("service")}
            </Link>
            <Link
              href={getNavLinkHref("works")}
              className={navLinkClasses("works")}
              aria-current={
                isHome && active === "works" ? "location" : undefined
              }
            >
              {t("projects")}
            </Link>

            <Link
              href={getNavLinkHref("skills")}
              className={navLinkClasses("skills")}
              aria-current={
                isHome && active === "skills" ? "location" : undefined
              }
              onClick={() => setIsOpen(false)}
            >
              {t("skills")}
            </Link>

            <Button asChild>
              <a href={getNavLinkHref("contact")}>{t("contact")}</a>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="flex flex-col space-y-4 px-2 pt-2 pb-4">
              <Link
                href={getNavLinkHref("services")}
                className={navLinkClasses("services")}
                aria-current={
                  isHome && active === "services" ? "location" : undefined
                }
                onClick={() => setIsOpen(false)}
              >
                {t("service")}
              </Link>
              <Link
                href={getNavLinkHref("works")}
                className={navLinkClasses("works")}
                aria-current={
                  isHome && active === "works" ? "location" : undefined
                }
                onClick={() => setIsOpen(false)}
              >
                {t("projects")}
              </Link>
              <Link
                href={getNavLinkHref("skills")}
                className={navLinkClasses("skills")}
                aria-current={
                  isHome && active === "skills" ? "location" : undefined
                }
                onClick={() => setIsOpen(false)}
              >
                {t("skills")}
              </Link>

              <Button
                className="w-full touch-target"
                asChild
                onClick={() => setIsOpen(false)}
              >
                <a href={getNavLinkHref("contact")}>{t("contact")}</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
