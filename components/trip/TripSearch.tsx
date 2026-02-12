"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { CarFront, X } from "lucide-react";
import BookingDrawer from "@/components/shared/BookingDrawer";
import { useForm, FormProvider } from "react-hook-form";
import { SearchBar } from "./SearchBar";
import { TripCard } from "./TripCard";
import { useTypeWritter } from "@/hooks/useTypeWritter";
import { TripSearchParams, TripSearchResponse } from "@/types/trip.types";
import { useEffect, useTransition } from "react";
import { TripCardSkeleton } from "./TripCardSkeleton";
import { setItinerary } from "@/redux/slices/itinerarySlice";

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
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
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
    dispatch(
      setItinerary({
        tripId: activeTripId,
        tripOrigin: trip.trip_origin,
        tripDestiny: trip.trip_destiny,
        originId: urlOrigin,
        departureTime: trip.departure_time,
        originName: trip.departure_location,
        destinationId: urlDestination,
        destinationName: trip.destination_location,
        segmentPrice: trip.price_per_seat,
      }),
    );

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
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
            Book{" "}
            <span className="text-secondary inline-block min-w-75">
              {text}
              <span className="animate-pulse">|</span>
            </span>
            <br /> <span className="text-white/20 italic">Across Kenya</span>
          </h1>
          <p className="text-gray3 max-w-lg font-medium text-lg italic mx-auto md:mx-0">
            Enter your departure, destination and time below to book your trip
            now
          </p>
        </div>

        {/* Pass the form methods */}
        <FormProvider {...methods}>
          <SearchBar startTransition={startTransition} isPending={isPending} />
        </FormProvider>
      </div>

      <main className="max-w-6xl p-4 mx-auto">
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
            // Show search results
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
            <div className="text-center pb-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="flex justify-center">
                <div className="size-36 rounded-full bg-secondary/5 flex items-center justify-center border border-secondary/10">
                  <X className="text-secondary size-20" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black uppercase tracking-widest text-white/80">
                  No trips found
                </h2>
                <p className="text-gray4 max-w-xs mx-auto font-medium">
                  No trips available for {urlOrigin} to {urlDestination} on{" "}
                  {urlDate}
                </p>
                <p>Try a different search</p>
              </div>
            </div>
          )
        ) : (
          // Initial empty state (no search yet)
          <div className="text-center py-20 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="flex justify-center">
              <div className="size-24 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10">
                <CarFront className="text-primary size-10 opacity-40" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black uppercase tracking-widest text-white/80">
                Ready to move?
              </h2>
              <p className="text-gray4 max-w-xs mx-auto font-medium">
                Enter your departure and destination above to see available
                trips.
              </p>
            </div>
          </div>
        )}
      </main>

      {activeTripData && (
        <BookingDrawer tripId={activeTripId} onClose={closeDrawer} />
      )}
    </div>
  );
};

export default TripSearch;
