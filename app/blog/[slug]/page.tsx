import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { posts } from "@/lib/blog-data"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"

type Props = {
  params: { slug: string }
}

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export default function BlogPostPage({ params }: Props) {
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) return notFound()

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <article className="container mx-auto px-4 pt-28 pb-20 max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>

        <h1 className="mt-4 text-3xl md:text-5xl font-bold">{post.title}</h1>
        <div className="mt-3 text-sm text-muted-foreground">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
          </time>{" "}
          • {post.readTime}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </div>

        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl bg-card">
          <Image
            src={post.image || "/placeholder.svg?height=420&width=840&query=imagem%20de%20capa%20do%20post"}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 768px, 100vw"
            priority
          />
        </div>

        <div className="prose prose-invert mt-8 max-w-none">
          {post.content.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>
    </main>
  )
}
