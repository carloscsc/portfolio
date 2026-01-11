"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion, useResponsive } from "@/hooks/use-responsive";
import { cn } from "@/lib/utils";

interface StatProps {
  header: string;
  text: string;
  index: number;
  isVisible: boolean;
}

function StatItem({ header, text, index, isVisible }: StatProps) {
  const [animatedValue, setAnimatedValue] = useState("0");
  const { isMobile } = useResponsive();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isVisible) {
      const delay = prefersReducedMotion ? 0 : index * 200;
      const timer = setTimeout(() => {
        setAnimatedValue(header);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, header, index, prefersReducedMotion]);

  return (
    <div
      className={`text-center p-4 rounded bg-accent  transition-all duration-500  ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        transitionDelay: prefersReducedMotion ? "0ms" : `${index * 150}ms`,
      }}
    >
      <div
        className={`text-primary mb-2 transition-all duration-700 ${
          isMobile ? "text-2xl sm:text-3xl" : "text-3xl lg:text-4xl"
        }`}
      >
        {animatedValue}
      </div>
      <div
        className={`text-muted-foreground leading-tight ${
          isMobile ? "text-xs sm:text-sm" : "text-sm"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

export function Stats({
  itens,
  className = "",
}: {
  itens: Partial<StatProps>[];
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useResponsive();

  // Intersection Observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={cn(
        `grid gap-4 sm:gap-2 px-4 sm:px-0 ${
          isMobile ? "grid-cols-2" : "grid-cols-2 md:grid-cols-2"
        }`,
        className,
      )}
    >
      {itens.map((stat, index) => (
        <StatItem
          key={index}
          header={stat.header as string}
          text={stat.text as string}
          index={index}
          isVisible={isVisible}
        />
      ))}
    </div>
  );
}
