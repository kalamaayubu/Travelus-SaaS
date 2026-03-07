import { Search } from "lucide-react";
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
        <div className="flex gap-3 rounded-full border border-gray6 items-center pl-4 w-fit">
          <Search className="size-4 text-gray4" />
          <input
            type="text"
            placeholder="Search..."
            className="py-2 outline-none px-1 pr-2 "
          />
        </div>
      </header>

      <Suspense fallback={<TripListSkeleton />}>
        <TripsList />
      </Suspense>
    </div>
  );
}
