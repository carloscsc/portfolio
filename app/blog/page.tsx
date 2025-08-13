"use client"

import type React from "react"

import { useMemo, useState } from "react"
import { posts as allPosts } from "@/lib/blog-data"
import { Input } from "@/components/ui/input"
import { BlogCard } from "@/components/blog-card"
import { Navbar } from "@/components/navbar"
import { cn } from "@/lib/utils"
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll"

const allTags = Array.from(new Set(allPosts.flatMap((p) => p.tags)))

function Chip({
  active,
  children,
  onClick,
  className,
}: {
  active?: boolean
  children: React.ReactNode
  onClick?: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/40",
        active
          ? "bg-[#8B5CF6] text-white border-[#8B5CF6] shadow-[0_0_0_3px_rgba(139,92,246,0.25)]"
          : "bg-[#1A1A1A] text-white/90 border-white/10 hover:bg-white/10",
        className,
      )}
    >
      {children}
    </button>
  )
}

export default function BlogPage() {
  const [query, setQuery] = useState("")
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const posts = useMemo(() => {
    return allPosts.filter((p) => {
      const matchesQuery =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(query.toLowerCase())
      const matchesTag = !activeTag || p.tags.includes(activeTag)
      return matchesQuery && matchesTag
    })
  }, [query, activeTag])

  // Habilita navegação com mouse: roda e arraste
  const chipListRef = useHorizontalScroll({ wheel: true, drag: true })

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero do Blog */}
      <section className="container mx-auto px-4 pt-28 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold">Blog</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl">
          Artigos sobre desenvolvimento web, performance, acessibilidade e design de interfaces.
        </p>

        {/* Filtros */}
        <div className="mt-8 space-y-4">
          {/* Busca (sempre full width) */}
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por título ou resumo..."
            className="bg-card border-primary/20"
          />

          {/* Tags - Mobile (<md): seletor compacto */}
          <div className="md:hidden">
            <label htmlFor="tag-select" className="sr-only">
              Filtrar por categoria
            </label>
            <select
              id="tag-select"
              value={activeTag ?? ""}
              onChange={(e) => setActiveTag(e.target.value ? e.target.value : null)}
              className="w-full rounded-md border border-primary/20 bg-card px-3 py-2 text-sm focus:outline-none focus:border-primary"
            >
              <option value="">Todas as categorias</option>
              {allTags.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Tags - md+: barra de chips com rolagem horizontal, gradientes e navegação por mouse */}
          <div className="relative hidden md:block">
            {/* Gradientes laterais (não interferem no clique/scroll) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-black to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-black to-transparent"
            />
            <div
              ref={chipListRef}
              role="tablist"
              aria-label="Filtrar por categoria"
              className={cn(
                "flex gap-2 overflow-x-auto scroll-smooth py-1 px-1 -mx-1",
                "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
                "select-none cursor-grab active:cursor-grabbing",
              )}
            >
              <Chip active={activeTag === null} onClick={() => setActiveTag(null)}>
                Todas
              </Chip>
              {allTags.map((t) => (
                <Chip key={t} active={activeTag === t} onClick={() => setActiveTag(t)}>
                  {t}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lista de posts */}
      <section className="container mx-auto px-4 pb-20">
        {posts.length === 0 ? (
          <p className="text-muted-foreground">Nenhum post encontrado.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
