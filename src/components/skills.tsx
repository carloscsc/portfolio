"use client";
import { useState, useEffect, useRef } from "react";
import { useResponsive, useReducedMotion } from "@/hooks/use-responsive";

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
        <span
          className={`font-medium text-foreground ${
            isMobile ? "text-sm" : "text-base"
          }`}
        >
          {name}
        </span>
      </div>

      <div
        className={`bg-muted rounded-full overflow-hidden ${
          isMobile ? "h-2" : "h-3"
        }`}
      >
        <div
          className="h-full rounded-full bg-linear-to-r from-primary to-primary/80 transition-all duration-1000 ease-out"
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

  const skills = [
    { name: "React", percentage: 95 },
    { name: "Next", percentage: 95 },
    { name: "TanStack", percentage: 60 },
    { name: "Vite", percentage: 90 },
    { name: "Hono", percentage: 75 },
    { name: "Node", percentage: 80 },
    { name: "Bun", percentage: 60 },
    { name: "TypeScript", percentage: 80 },
    { name: "JavaScript", percentage: 95 },
    { name: "PHP", percentage: 90 },
    { name: "Tailwind CSS", percentage: 70 },
    { name: "Shadcn", percentage: 70 },

    { name: "Mongo", percentage: 90 },
    { name: "PostgreSQL", percentage: 90 },
    { name: "MySQL", percentage: 99 },
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
      }
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
    <section ref={sectionRef} className="py-16 scroll-mt-24" id="skills">
      <div className="text-center mb-12">
        <h2 className="text-responsive-xl font-bold mb-4">
          Principais Habilidades
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-responsive-base leading-relaxed px-4">
          Desenvolvi minha expertise ao longo dos anos em desenvolvimento web.
          Aqui está uma visão geral das minhas competências técnicas e níveis de
          proficiência.
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

      {/* Mobile skills summary */}
      {isMobile && isVisible && (
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            {skills.filter((skill) => skill.percentage >= 90).length}{" "}
            habilidades avançadas •{" "}
            {
              skills.filter(
                (skill) => skill.percentage >= 75 && skill.percentage < 90
              ).length
            }{" "}
            intermediárias+
          </p>
        </div>
      )}
    </section>
  );
}
