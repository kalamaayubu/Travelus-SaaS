export const TripCardSkeleton = () => (
  <div className="bg-soft-dark border border-white/5 py-6 px-3 md:px-5 lg:py-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 animate-pulse">
    <div className="flex items-center justify-between gap-6 sm:gap-8 w-full md:w-auto">
      <div className="size-16 md:size-20 rounded-xl bg-white/5" />
      <div className="space-y-3">
        <div className="h-6 w-48 bg-white/10 rounded" />
        <div className="flex gap-2">
          <div className="h-4 w-20 bg-white/5 rounded" />
          <div className="h-4 w-16 bg-white/5 rounded" />
        </div>
      </div>
    </div>
    <div className="flex items-center gap-12 w-full md:w-auto justify-between border-t md:border-t-0 border-white/5 pt-6 md:pt-0">
      <div className="space-y-2">
        <div className="h-3 w-12 bg-white/5 rounded mx-auto md:mx-0" />
        <div className="h-6 w-16 bg-white/10 rounded" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-20 bg-white/5 rounded mx-auto md:mx-0" />
        <div className="h-6 w-24 bg-white/10 rounded" />
      </div>
      <div className="h-12 w-28 bg-white/10 rounded-lg" />
    </div>
  </div>
);
