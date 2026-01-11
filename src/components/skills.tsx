"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { useResponsive, useReducedMotion } from "@/hooks/use-responsive";
import { useTranslations } from "next-intl";

interface SkillProps {
  name: string;
  percentage: number;
  index: number;
  isVisible: boolean;
}

function SkillItem({ name, percentage, index, isVisible }: SkillProps) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const { isMobile } = useResponsive();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isVisible) {
      const delay = prefersReducedMotion ? 0 : index * 150;
      const timer = setTimeout(() => {
        setAnimatedPercentage(percentage);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, percentage, index, prefersReducedMotion]);

  return (
    <div
      className={`transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{
        transitionDelay: prefersReducedMotion ? "0ms" : `${index * 100}ms`,
      }}
    >
      <div className="flex justify-between mb-3">
        <span className={`text-primary ${isMobile ? "text-sm" : "text-base"}`}>
          {name}
        </span>
      </div>

      <div
        className={`bg-accent rounded-full overflow-hidden ${
          isMobile ? "h-2" : "h-3"
        }`}
      >
        <div
          className="h-full rounded-full bg-secondary transition-all duration-1000 ease-out"
          style={{
            width: `${animatedPercentage}%`,
            transitionDelay: prefersReducedMotion ? "0ms" : `${index * 150}ms`,
          }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { isMobile } = useResponsive();
  const t = useTranslations("SkillsSection");

  const skills = [
    { name: "React", percentage: 95 },
    { name: "Next.js", percentage: 95 },
    { name: "TanStack", percentage: 60 },
    { name: "Vite", percentage: 90 },
    { name: "Hono", percentage: 75 },
    { name: "Node", percentage: 80 },
    { name: "TypeScript", percentage: 80 },
    { name: "JavaScript", percentage: 95 },
    { name: "PHP", percentage: 90 },
    { name: "Tailwind CSS", percentage: 70 },
    { name: "Shadcn", percentage: 70 },
    { name: "MongoDB", percentage: 90 },
    { name: "PostgreSQL", percentage: 90 },
    { name: "MySQL", percentage: 99 },
    { name: "Redis", percentage: 80 },
  ];

  // Intersection Observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      },
    );

    const element = sectionRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <Suspense>
      <section ref={sectionRef} className="py-16 scroll-mt-24" id="skills">
        <div className="text-center mb-12">
          <h2 className="text-responsive-xl  mb-4">{t("heading")}</h2>
          <p className="text-primary max-w-2xl mx-auto text-responsive-base leading-relaxed px-4">
            {t("description")}
          </p>
        </div>

        {/* Enhanced responsive grid for skills */}
        <div
          className={`grid gap-6 px-4 sm:px-0 ${
            isMobile
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {skills.map((skill, index) => (
            <SkillItem
              key={skill.name}
              name={skill.name}
              percentage={skill.percentage}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </section>
    </Suspense>
  );
}
