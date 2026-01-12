import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      <Navbar />
      <div className="container max-w-6xl min-h-screen mx-auto pt-28 px-4 md:px-0 xl:px-4 space-y-6">
        <Skeleton className="w-32 h-6" />
        <Skeleton className="w-[80%] h-12" />
        <Skeleton className="w-full h-6" />
        <div className="w-64 flex flex-row gap-2">
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
        </div>

        <Skeleton className="w-full h-[400px] md:h-[800px]" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Skeleton className="w-64 h-8" />
            <div className="space-y-3">
              <Skeleton className="w-[98%] h-4" />
              <Skeleton className="w-[95%] h-4" />
              <Skeleton className="w-[75%] h-4" />
            </div>
            <div className="space-y-3">
              <Skeleton className="w-[98%] h-4" />
              <Skeleton className="w-[95%] h-4" />
              <Skeleton className="w-[75%] h-4" />
            </div>
            <div className="space-y-3">
              <Skeleton className="w-[98%] h-4" />
              <Skeleton className="w-[95%] h-4" />
              <Skeleton className="w-[75%] h-4" />
            </div>
            <Skeleton className="w-86 h-8" />
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Skeleton className="w-2 h-2 bg-secondary rounded-full mt-2 shrink-0" />
                <Skeleton className="w-48 h-4" />
              </div>
              <div className="flex items-start gap-3">
                <Skeleton className="w-2 h-2 bg-secondary rounded-full mt-2 shrink-0" />
                <Skeleton className="w-86 h-4" />
              </div>
              <div className="flex items-start gap-3">
                <Skeleton className="w-2 h-2 bg-secondary rounded-full mt-2 shrink-0" />
                <Skeleton className="w-100 h-4" />
              </div>
              <div className="flex items-start gap-3">
                <Skeleton className="w-2 h-2 bg-secondary rounded-full mt-2 shrink-0" />
                <Skeleton className="w-34 h-4" />
              </div>
              <div className="flex items-start gap-3">
                <Skeleton className="w-2 h-2 bg-secondary rounded-full mt-2 shrink-0" />
                <Skeleton className="w-48 h-4" />
              </div>
            </div>
            <Skeleton className="w-86 h-8" />
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Skeleton className="w-2 h-2 bg-secondary rounded-full mt-2 shrink-0" />
                <Skeleton className="w-100 h-4" />
              </div>
              <div className="flex items-start gap-3">
                <Skeleton className="w-2 h-2 bg-secondary rounded-full mt-2 shrink-0" />
                <Skeleton className="w-36 h-4" />
              </div>
              <div className="flex items-start gap-3">
                <Skeleton className="w-2 h-2 bg-secondary rounded-full mt-2 shrink-0" />
                <Skeleton className="w-84 h-4" />
              </div>
              <div className="flex items-start gap-3">
                <Skeleton className="w-2 h-2 bg-secondary rounded-full mt-2 shrink-0" />
                <Skeleton className="w-58 h-4" />
              </div>
              <div className="flex items-start gap-3">
                <Skeleton className="w-2 h-2 bg-secondary rounded-full mt-2 shrink-0" />
                <Skeleton className="w-32 h-4" />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <Skeleton className="w-full h-48" />
            <Skeleton className="w-full h-32" />
            <Skeleton className="w-full h-38" />
            <Skeleton className="w-full h-38" />
            <Skeleton className="w-full h-48" />
          </div>
        </div>

        <Skeleton className="w-full h-64" />

        <div className={"py-16 scroll-mt-24"}>
          <div className="flex flex-col gap-4 w-full justify-center items-center">
            <Skeleton className="w-64 h-6" />
            <Skeleton className="w-86 h-6" />
          </div>

          <div className="flex flex-row gap-4 mt-8 w-[80%] md:w-[400px] mx-auto">
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
          </div>

          <Skeleton className="w-64 h-6 mx-auto mt-8" />

          <div className="space-y-8 mt-12 max-w-4xl mx-auto px-4 md:px-0">
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-48" />
            <Skeleton className="w-full h-12" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
