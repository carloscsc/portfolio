export default function Loading() {
  return (
    <main className="min-h-screen">
      {/* Navbar Skeleton */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-border bg-background/80">
        <div className="responsive-container py-4">
          <div className="flex justify-between items-center">
            <div className="h-8 w-32 bg-accent border border-border rounded-md animate-pulse" />
            <div className="flex gap-4 items-center">
              <div className="h-8 w-24 bg-accent border border-border rounded-md animate-pulse" />
              <div className="h-8 w-24 bg-accent border border-border rounded-md animate-pulse" />
              <div className="h-9 w-9 bg-accent border border-border rounded-md animate-pulse" />
              <div className="h-9 w-9 bg-accent border border-border rounded-md animate-pulse" />
            </div>
          </div>
        </div>
      </nav>

      <article className="container mx-auto px-4 pt-28 max-w-4xl">
        {/* Back Button */}
        <div className="h-6 w-40 bg-accent border border-border rounded animate-pulse mb-6" />

        {/* Header */}
        <div className="mb-8">
          <div className="h-12 w-3/4 bg-accent border border-border rounded-md animate-pulse mb-4" />
          <div className="space-y-2 mb-6">
            <div className="h-6 w-full bg-accent border border-border rounded animate-pulse" />
            <div className="h-6 w-5/6 bg-accent border border-border rounded animate-pulse" />
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="h-10 w-36 bg-accent border border-border rounded animate-pulse" />
            <div className="h-10 w-44 bg-accent border border-border rounded animate-pulse" />
          </div>
        </div>

        {/* Main Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-accent border-2 border-border mb-8 flex items-center justify-center animate-pulse">
          <div className="w-20 h-20 rounded-lg bg-border/50" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* About Project */}
          <div className="lg:col-span-2 space-y-4">
            <div className="h-8 w-48 bg-accent border border-border rounded animate-pulse mb-4" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-accent border border-border rounded animate-pulse" />
              <div className="h-4 w-full bg-accent border border-border rounded animate-pulse" />
              <div className="h-4 w-11/12 bg-accent border border-border rounded animate-pulse" />
              <div className="h-4 w-full bg-accent border border-border rounded animate-pulse" />
              <div className="h-4 w-10/12 bg-accent border border-border rounded animate-pulse" />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Client Info */}
            <div className="bg-accent border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-5 w-5 bg-border/50 rounded animate-pulse" />
                <div className="h-6 w-24 bg-border/50 rounded animate-pulse" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-border/50 rounded animate-pulse" />
                <div className="h-5 w-32 bg-border/50 rounded animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-border/50 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-border/50 rounded animate-pulse" />
              </div>
              <div className="h-10 w-full bg-border/50 rounded animate-pulse" />
            </div>

            {/* Project Details */}
            <div className="bg-accent border border-border rounded-lg p-6 space-y-4">
              <div className="h-6 w-28 bg-border/50 rounded animate-pulse mb-4" />
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-border/50 rounded animate-pulse" />
                  <div className="h-4 w-20 bg-border/50 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-border/50 rounded animate-pulse" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-border/50 rounded animate-pulse" />
                  <div className="h-4 w-16 bg-border/50 rounded animate-pulse" />
                  <div className="h-4 w-20 bg-border/50 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="mt-8">
          <div className="h-8 w-40 bg-accent border border-border rounded animate-pulse mb-4" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-7 w-20 bg-accent border border-border rounded-full animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-8">
          <div className="h-8 w-44 bg-accent border border-border rounded animate-pulse mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-border/50 rounded-full mt-2 shrink-0" />
                <div className="h-4 w-full bg-accent border border-border rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-8">
          <div className="h-8 w-32 bg-accent border border-border rounded animate-pulse mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative aspect-video overflow-hidden rounded-lg bg-accent border border-border flex items-center justify-center animate-pulse"
              >
                <div className="w-12 h-12 rounded bg-border/50" />
              </div>
            ))}
          </div>
        </div>

        {/* Challenges */}
        <div className="mt-8">
          <div className="h-8 w-36 bg-accent border border-border rounded animate-pulse mb-4" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-border/50 rounded-full mt-2 shrink-0" />
                <div className="h-4 w-full bg-accent border border-border rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mt-8 bg-accent border border-border p-6 rounded-lg">
          <div className="h-8 w-36 bg-border/50 rounded animate-pulse mb-4" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-border/50 rounded-full mt-2 shrink-0" />
                <div className="h-4 w-full bg-border/50 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </article>

      {/* CTA Contact Section */}
      <section className="py-16 mt-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-2">
            <div className="h-10 w-64 mx-auto bg-accent border border-border rounded-md animate-pulse" />
            <div className="h-5 w-96 mx-auto bg-accent border border-border rounded-md animate-pulse" />
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="space-y-2">
              <div className="h-5 w-20 bg-accent border border-border rounded animate-pulse" />
              <div className="h-12 w-full bg-accent border border-border rounded-md animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-5 w-20 bg-accent border border-border rounded animate-pulse" />
              <div className="h-12 w-full bg-accent border border-border rounded-md animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-5 w-24 bg-accent border border-border rounded animate-pulse" />
              <div className="h-32 w-full bg-accent border border-border rounded-md animate-pulse" />
            </div>
            <div className="h-12 w-32 bg-accent border border-border rounded-md animate-pulse" />
          </div>
        </div>
      </section>
    </main>
  );
}
