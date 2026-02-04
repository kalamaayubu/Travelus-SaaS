const TripDetailsPageSkeleton = () => {
  return (
    <div className="min-h-screen text-white pt-4 animate-pulse">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Skeleton */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="size-12 bg-white/5 rounded-lg border border-white/5" />
            <div className="space-y-2">
              <div className="h-8 w-48 bg-white/10 rounded" />
              <div className="h-3 w-32 bg-primary/10 rounded" />
            </div>
          </div>
          <div className="h-24 bg-white/5 border border-white/10 rounded-2xl w-full" />
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* SEAT MAP SKELETON */}
          <div className="lg:col-span-5 bg-soft-dark rounded-2xl border border-white/10 p-6">
            <div className="h-4 w-24 bg-white/10 rounded mb-8" />
            <div className="grid grid-cols-5 gap-3">
              {[...Array(40)].map((_, i) => (
                <div key={i} className="aspect-square bg-white/5 rounded-md" />
              ))}
            </div>
          </div>

          {/* STATS & MANIFEST SKELETON */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 bg-soft-dark border border-white/10 rounded-2xl"
                />
              ))}
            </div>

            <div className="bg-soft-dark rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/5 bg-white/2 h-16" />
              <div className="divide-y divide-white/5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-10 bg-white/5 rounded-lg" />
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-white/10 rounded" />
                        <div className="h-3 w-20 bg-white/5 rounded" />
                      </div>
                    </div>
                    <div className="size-10 bg-white/5 rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetailsPageSkeleton;
