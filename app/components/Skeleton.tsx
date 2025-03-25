import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200", className)}
      {...props}
    />
  )
}

export function HeroSkeleton() {
  return (
    <section className="relative bg-yellow-50 py-6 overflow-visible">
      <div className="container mx-auto px-4">
        <div className="relative max-w-6xl mx-auto">
          {/* Title and Subtitle Skeleton */}
          <div className="relative mb-6 md:mb-12">
            <div className="relative z-20">
              <div className="flex flex-wrap sm:flex-nowrap items-baseline justify-center sm:justify-start">
                <Skeleton className="h-8 w-32 sm:h-12 sm:w-40" />
                <Skeleton className="h-8 w-40 sm:h-12 sm:w-48 ml-2 sm:ml-3" />
              </div>
              <Skeleton className="h-6 w-48 mt-2 sm:mt-1" />
              <Skeleton className="h-6 w-full max-w-2xl mt-3 md:mt-6" />
            </div>
          </div>

          {/* Search Bar Skeleton */}
          <div className="relative" style={{ zIndex: 10 }}>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-gray-200 p-3 md:p-4">
                  <Skeleton className="h-5 w-5 mr-2 md:mr-3" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-gray-200 p-3 md:p-4">
                  <Skeleton className="h-5 w-5 mr-2 md:mr-3" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center p-3 md:p-4">
                  <Skeleton className="h-5 w-5 mr-2 md:mr-3" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="bg-gray-200 px-6 py-3 md:py-4 rounded-r-xl">
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SpecialistTabsSkeleton() {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <Skeleton className="h-8 w-64 mx-auto mb-2 sm:mb-4" />
          <Skeleton className="h-4 w-full max-w-2xl mx-auto" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-3 sm:p-4 md:p-6 rounded-xl bg-white border border-gray-100"
            >
              <Skeleton className="h-8 w-8 mb-2 sm:mb-3 rounded-full" />
              <Skeleton className="h-4 w-20 mb-1" />
              <Skeleton className="h-3 w-24 hidden sm:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function BenefitsSkeleton() {
  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <Skeleton className="h-8 w-64 mx-auto mb-2 sm:mb-4" />
          <Skeleton className="h-4 w-full max-w-2xl mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <Skeleton className="h-12 w-12 mb-4" />
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function JoinUsSkeleton() {
  return (
    <section id="join-us" className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <Skeleton className="h-8 w-64 mx-auto mb-2 sm:mb-4" />
          <Skeleton className="h-4 w-full max-w-2xl mx-auto" />
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </section>
  )
}

export { Skeleton } 