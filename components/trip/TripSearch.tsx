"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { CarFront } from "lucide-react";
import BookingDrawer from "@/components/shared/BookingDrawer";
import { useForm, FormProvider } from "react-hook-form";
import { SearchBar } from "./SearchBar";
import { TripCard } from "./TripCard";
import { useTypeWritter } from "@/hooks/useTypeWritter";
import { TripSearchParams, TripSearchResponse } from "@/types/trip.types";
import { useEffect, useTransition } from "react";
import { TripCardSkeleton } from "./TripCardSkeleton";
import { getLocationName } from "@/constants/location";
import { useItineraryStore } from "@/zustand/useItineraryStore";

interface TripSearchProps {
  initialTrips: TripSearchResponse[];
  initialMeta?: {
    count: number;
    origin: string;
    destination: string;
    date: string;
  };
}

/**
 * @component TripSearch
 * @description The primary client-side controller for the search interface.
 * Manages UI states including loading skeletons, empty results, and the booking drawer trigger.
 * @param {TripSearchProps} props
 * @param {TripSearchResponse[]} props.initialTrips - Pre-fetched trip data from the server.
 * @param {TripSearchMetaData} [props.initialMeta] - Metadata including total trips count and search context.
 */

const TripSearch = ({ initialTrips = [], initialMeta }: TripSearchProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const setItinerary = useItineraryStore((state) => state.setItinerary);

  const { text } = useTypeWritter();
  const [isPending, startTransition] = useTransition();

  // Get URL params to pre-fill form
  const urlOrigin = searchParams.get("origin") || "";
  const urlDestination = searchParams.get("destination") || "";
  const urlDate = searchParams.get("date") || "";

  // Form instance
  const methods = useForm<TripSearchParams>({
    defaultValues: {
      origin: urlOrigin,
      destination: urlDestination,
      date: urlDate,
    },
    mode: "onChange",
  });

  // Update form when URL changes
  useEffect(() => {
    methods.reset({
      origin: urlOrigin,
      destination: urlDestination,
      date: urlDate,
    });
  }, [urlOrigin, urlDestination, urlDate, methods]);

  const activeTripId = searchParams.get("trip");

  const trips = initialTrips;

  // DEBUGGING: Observe rerenders and fix them

  const activeTripData = trips.find((t) => t.id === activeTripId);

  const openTrip = (trip: TripSearchResponse) => {
    // Set global fare on the store
    setItinerary({
      tripId: trip.id,
      tripOrigin: trip.trip_origin,
      tripDestiny: trip.trip_destiny,
      originId: urlOrigin,
      departureTime: trip.departure_time,
      originName: trip.departure_location,
      destinationId: urlDestination,
      destinationName: trip.destination_location,
      segmentPrice: trip.price_per_seat,
    });

    const params = new URLSearchParams(searchParams.toString());
    params.set("trip", trip.id.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const closeDrawer = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("trip");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Determine what to show
  const hasSearchParams = urlOrigin && urlDestination && urlDate;
  const hasResults = trips.length > 0;

  return (
    <div className="min-h-screen bg-dark text-white font-sans">
      <div className="pt-20 pb-16 px-6 max-w-6xl mt-20 mx-auto">
        <div className="space-y-6 mb-12">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
            Book{" "}
            <span className="text-secondary inline-block min-w-75">
              {text}
              <span className="animate-pulse">|</span>
            </span>
            <br /> <span className="text-white/20 italic">Across Kenya</span>
          </h1>
          <p className="text-gray3 max-w-lg font-medium text-lg mx-auto md:mx-0">
            Enter your departure, destination and time below to book your trip
            now
          </p>
        </div>

        {/* Pass the form methods */}
        <FormProvider {...methods}>
          <SearchBar startTransition={startTransition} isPending={isPending} />
        </FormProvider>
      </div>

      <section id="available_trips" className="max-w-6xl p-4 mx-auto">
        {isPending ? (
          <div className="space-y-6 animate-in fade-in duration-500">
            <TripCardSkeleton />
            <TripCardSkeleton />
            <TripCardSkeleton />
            <TripCardSkeleton />
            <TripCardSkeleton />
            <TripCardSkeleton />
          </div>
        ) : hasSearchParams ? (
          hasResults ? (
            // Search results
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 mb-48">
              {initialMeta && (
                <div className="mb-6 text-white">
                  <h2 className="text-2xl font-semibold">
                    <span className="text-secondary">
                      Found {initialMeta.count}{" "}
                      {initialMeta.count > 1 ? "trips" : "trip"}
                    </span>{" "}
                    for {getLocationName(initialMeta.origin)} ➙{" "}
                    {getLocationName(initialMeta.destination)}
                  </h2>
                </div>
              )}
              <div className="grid gap-6">
                {trips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} onSelect={openTrip} />
                ))}
              </div>
            </div>
          ) : (
            // No results found
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-in fade-in zoom-in-95 duration-500">
              <h2 className="text-3xl font-bold text-white mb-2">
                No trips available
              </h2>
              <div className="bg-red-500/5 border border-white/10 rounded-xl p-4 mb-6 max-w-md">
                <p className=" text-gray2">
                  We couldn't find any trips for{" "}
                  <span className="text-white font-semibold">{urlOrigin}</span>{" "}
                  to{" "}
                  <span className="text-white font-semibold">
                    {urlDestination}
                  </span>{" "}
                  on <span className="text-white font-semibold">{urlDate}</span>
                  .
                </p>
              </div>
              <p className="text-gray4 text-sm">
                Tip: Try selecting a different date or nearby locations.
              </p>
            </div>
          )
        ) : (
          // Initial empty state (no search yet)
          <div className="flex flex-col items-center justify-center py-24 px-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="relative mb-8">
              {/* Decorative Glow */}
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <div className="relative size-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-500">
                <CarFront className="text-primary size-12" strokeWidth={1.5} />
              </div>
            </div>
            <div className="max-w-sm">
              <h2 className="text-2xl font-bold tracking-tight text-white mb-3">
                Your journey starts here
              </h2>
              <p className="text-gray3 leading-relaxed">
                Select your origin, destination, and preferred date above to
                discover the best available trips across Kenya.
              </p>
            </div>
          </div>
        )}
      </section>

      {activeTripData && (
        <BookingDrawer tripId={activeTripId} onClose={closeDrawer} />
      )}
    </div>
  );
};

export default TripSearch;
