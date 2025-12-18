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

      {/* Hero Section */}
      <section id="home" className="responsive-container spacing-responsive-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
          {/* Image */}
          <div className="lg:col-span-5 bg-accent border-2 border-border rounded-2xl min-h-[360px] lg:min-h-[520px] lg:order-1 flex items-center justify-center animate-pulse">
            <div className="w-20 h-20 rounded-full bg-border/50" />
          </div>

          {/* Content */}
          <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
            {/* Title */}
            <div className="mb-4 space-y-2">
              <div className="h-10 lg:h-14 w-4/5 bg-accent border border-border rounded-md animate-pulse" />
              <div className="h-6 lg:h-8 w-3/5 bg-accent border border-border rounded-md animate-pulse" />
            </div>

            {/* Description */}
            <div className="mb-8 max-w-2xl space-y-2">
              <div className="h-4 w-full bg-accent border border-border rounded-md animate-pulse" />
              <div className="h-4 w-11/12 bg-accent border border-border rounded-md animate-pulse" />
              <div className="h-4 w-10/12 bg-accent border border-border rounded-md animate-pulse" />
            </div>

            {/* Contact Buttons */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="h-11 w-40 bg-accent border border-border rounded-md animate-pulse" />
              <div className="h-11 w-40 bg-accent border border-border rounded-md animate-pulse" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="text-center p-4 rounded bg-accent border border-border"
                >
                  <div className="h-10 w-16 mx-auto mb-2 bg-border/50 rounded animate-pulse" />
                  <div className="h-4 w-20 mx-auto bg-border/50 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Container */}
      <div className="container mx-auto px-4">
        {/* Services Section */}
        <section className="py-16 scroll-mt-24" id="services">
          <div className="text-center mb-12 space-y-2">
            <div className="h-10 w-48 mx-auto bg-accent border border-border rounded-md animate-pulse" />
            <div className="h-5 w-64 mx-auto bg-accent border border-border rounded-md animate-pulse" />
          </div>

          <div className="relative px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-accent border border-border rounded-lg p-6 space-y-3 h-full"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 bg-border/50 rounded animate-pulse" />
                    <div className="h-6 w-32 bg-border/50 rounded animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-border/50 rounded animate-pulse" />
                    <div className="h-4 w-11/12 bg-border/50 rounded animate-pulse" />
                    <div className="h-4 w-10/12 bg-border/50 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-16 scroll-mt-24" id="works">
          <div className="text-center mb-12">
            <div className="h-10 w-48 mx-auto bg-accent border border-border rounded-md animate-pulse" />
          </div>

          <div className="grid-responsive-projects gap-4 sm:gap-6 px-4 sm:px-0">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-accent border border-border rounded-lg overflow-hidden"
              >
                {/* Project Image */}
                <div className="relative h-48 bg-accent border-b border-border flex items-center justify-center">
                  <div className="w-16 h-16 rounded-lg bg-border/50 animate-pulse" />
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  <div className="h-6 w-3/4 bg-border/50 rounded animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-border/50 rounded animate-pulse" />
                    <div className="h-4 w-5/6 bg-border/50 rounded animate-pulse" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="h-6 w-16 bg-border/50 rounded-full animate-pulse" />
                    <div className="h-6 w-20 bg-border/50 rounded-full animate-pulse" />
                    <div className="h-6 w-14 bg-border/50 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-16 scroll-mt-24" id="skills">
          <div className="text-center mb-12">
            <div className="h-10 w-48 mx-auto bg-accent border border-border rounded-md animate-pulse" />
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between">
                  <div className="h-5 w-24 bg-accent border border-border rounded animate-pulse" />
                </div>
                <div className="bg-accent rounded-full h-3 overflow-hidden border border-border">
                  <div className="h-full w-4/5 rounded-full bg-secondary/30 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 scroll-mt-24" id="contact">
          <div className="text-center mb-12 space-y-2">
            <div className="h-10 w-48 mx-auto bg-accent border border-border rounded-md animate-pulse" />
            <div className="h-5 w-64 mx-auto bg-accent border border-border rounded-md animate-pulse" />
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
        </section>
      </div>
    </main>
  );
}
