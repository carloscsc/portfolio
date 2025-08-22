import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Post } from "@/lib/blog-data"

export function BlogCard({ post }: { post: Post }) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <Link
        href={`/blog/${post.slug}`}
        aria-label={`Ler mais sobre ${post.title}`}
        className="block group/image"
      >
        <div className="relative h-48 w-full">
          <Image
            src={post.image || "/placeholder.svg?height=200&width=400&query=capa%20do%20post"}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 400px, 100vw"
            priority={false}
          />
        </div>
      </Link>
      <CardHeader>
        <CardTitle className="line-clamp-2">
          <Link
            href={`/blog/${post.slug}`}
            aria-label={`Ler mais sobre ${post.title}`}
            className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/40"
          >
            {post.title}
          </Link>
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
          </time>{" "}
          • {post.readTime}
        </div>
      </CardHeader>
      <CardContent className="text-muted-foreground">
        <p className="line-clamp-3">{post.excerpt}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <Badge key={t} variant="secondary" className="text-xs">
              {t}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button asChild className="ml-auto">
          <Link href={`/blog/${post.slug}`}>Ler mais</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
