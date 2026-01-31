import TripSearch from "@/components/trip/TripSearch";
import { Suspense } from "react";
import type { TripSearchApiResponse } from "@/types/trip.types";

export default async function PublicSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const origin = params.origin as string;
  const destination = params.destination as string;
  const date = params.date as string;

  let trips: TripSearchApiResponse["data"] = [];
  let meta: TripSearchApiResponse["meta"] = {
    count: 0,
    origin: origin || "",
    destination: destination || "",
    date: date || "",
  };

  // Fetch from API if we have all params
  if (origin && destination && date) {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL ||
        (process.env.NODE_ENV === "production"
          ? "https://travelus-saas.netlify.app"
          : "http://localhost:3000");

      const apiUrl = new URL(`${baseUrl}/api/trips/search`);
      apiUrl.searchParams.append("origin", origin);
      apiUrl.searchParams.append("destination", destination);
      apiUrl.searchParams.append("date", date);

      const response = await fetch(apiUrl.toString(), {
        cache: "no-store",
      });

      if (response.ok) {
        const result: TripSearchApiResponse = await response.json();
        trips = result.data;
        meta = result.meta;
      }
    } catch (error) {
      console.error("Failed to fetch trips:", error);
    }
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-dark flex items-center justify-center text-white/20 uppercase font-black tracking-widest">
          Loading...
        </div>
      }
    >
      <TripSearch initialTrips={trips} initialMeta={meta} />
    </Suspense>
  );
}
