"use client";

import { useState, useEffect, useRef } from "react";
import { posts } from "@/lib/blog-data";
import { useResponsive, useReducedMotion } from "@/hooks/use-responsive";
import { BlogCard } from "@/components/blog-card";
import { Button } from "./ui/button";
import { Link } from "@/i18n/navigation";

interface PostItemProps {
  post: any;
  index: number;
  isVisible: boolean;
}

function PostItem({ post, index, isVisible }: PostItemProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={`group transition-all duration-500 will-change-transform hover:-translate-y-1 hover:shadow-lg ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{
        transitionDelay: prefersReducedMotion ? "0ms" : `${index * 150}ms`,
      }}
    >
      <BlogCard post={post} />
    </div>
  );
}

export function FeaturedPosts({ count = 3 }: { count?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { isMobile } = useResponsive();
  const featured = posts.slice(0, count);

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
    <section
      ref={sectionRef}
      aria-labelledby="featured-posts-title"
      className="py-16 scroll-mt-24"
      id="blog"
    >
      <div className="text-center mb-12">
        <h2 className="text-responsive-xl font-bold mb-4">Posts em destaque</h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-responsive-base leading-relaxed px-4">
          Destaques do blog com artigos selecionados para compartilhar
          conhecimentos e práticas.
        </p>
      </div>

      <div
        className={`grid gap-6 px-4 sm:px-0 ${
          isMobile
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {featured.map((post, index) => (
          <PostItem
            key={post.slug}
            post={post}
            index={index}
            isVisible={isVisible}
          />
        ))}
      </div>

      {/* Mobile posts summary */}
      {isMobile && isVisible && (
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            {featured.length} posts em destaque • Última atualização:{" "}
            {new Date().toLocaleDateString("pt-BR")}
          </p>
        </div>
      )}

      <div className="mt-8 text-center">
        <Button asChild>
          <Link href="/blog">Ver todos os posts</Link>
        </Button>
      </div>
    </section>
  );
}
