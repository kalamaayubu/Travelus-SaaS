import { Suspense } from "react";
import TripsList from "@/components/driver/TripList";
import TripListSkeleton from "@/components/driver/skeletons/TripListSkeleton";

export default function TripsPage() {
  return (
    <div className="min-h-screen text-white">
      <header className="mb-10 flex gap-6 flex-col md:flex-row justify-between md:items-center">
        <div>
          <h1 className="text-3xl sm:text-3xl font-black">My Trips</h1>
          <p className=" text-gray3 font-bold mt-1">
            Manage your past and upcoming journeys
          </p>
        </div>
      </header>

      <Suspense fallback={<TripListSkeleton />}>
        <TripsList />
      </Suspense>
    </div>
  );
}
