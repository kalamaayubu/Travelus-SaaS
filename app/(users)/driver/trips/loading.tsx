import { ArrowRight, ChevronRight } from "lucide-react";

export default function loading() {
  return (
    <div className="min-h-screen text-white">
      <header className="mb-10 animate-pulse">
        {/* Title Skeleton */}
        <div className="h-9 w-48 bg-white/10 rounded-lg mb-2" />
        {/* Subtitle Skeleton */}
        <div className="h-3 w-64 bg-white/5 rounded-md" />
      </header>

      <div className="grid auto-rows-fr gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-soft-dark border border-white/5 rounded-2xl p-6 opacity-60"
          >
            <div className="flex flex-col justify-between h-full gap-10">
              <div className="space-y-4">
                {/* Badge & ID Skeleton */}
                <div className="flex items-center gap-4">
                  <div className="h-5 w-16 bg-white/10 rounded" />
                  <div className="h-3 w-12 bg-white/5 rounded" />
                </div>

                {/* Route Skeleton */}
                <div className="flex items-center gap-3">
                  <div className="h-6 w-24 bg-white/10 rounded" />
                  <ArrowRight size={18} className="text-white/5" />
                  <div className="h-6 w-24 bg-white/10 rounded" />
                </div>

                {/* Info Items Skeletons */}
                <div className="space-y-3">
                  <div className="flex gap-6">
                    <div className="h-4 w-20 bg-white/5 rounded" />
                    <div className="h-4 w-20 bg-white/5 rounded" />
                  </div>
                  <div className="h-4 w-28 bg-white/5 rounded" />
                </div>
              </div>

              {/* Bottom Section Skeleton */}
              <div className="flex justify-between items-end border-t border-white/5 pt-4">
                <div className="space-y-2">
                  <div className="h-2 w-20 bg-white/5 rounded" />
                  <div className="h-6 w-24 bg-white/20 rounded" />
                </div>
                <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <ChevronRight size={20} className="text-white/10" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
