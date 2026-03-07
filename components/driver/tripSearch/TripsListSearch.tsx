"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import TripCard from "./TripCard";

type Trip = {
  id: string;
  displayId: string;
  from: string;
  to: string;
  departureDate: string;
  departureTime: string;
  bookedSeats: number;
  totalSeats: number;
  revenue: number;
  status: string;
};

export default function TripListSearch({
  initialTrips,
}: {
  initialTrips: Trip[];
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTrips = useMemo(() => {
    if (!searchTerm.trim()) return initialTrips;

    const searchLower = searchTerm.toLowerCase();

    return initialTrips.filter((trip) => {
      return (
        trip.from.toLowerCase().includes(searchLower) ||
        trip.to.toLowerCase().includes(searchLower) ||
        trip.displayId.toLowerCase().includes(searchLower) ||
        trip.departureDate.toLowerCase().includes(searchLower) ||
        trip.revenue.toString().includes(searchLower) ||
        (trip.totalSeats - trip.bookedSeats).toString().includes(searchLower) ||
        trip.status.toLowerCase().includes(searchLower)
      );
    });
  }, [searchTerm, initialTrips]);

  return (
    <>
      <div className="mb-8">
        <div className="flex gap-3 rounded-full border border-gray6 items-center pl-4 w-full max-w-md">
          <Search className="size-4 text-gray4" />
          <input
            type="text"
            placeholder="Search trips here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-2 outline-none px-1 pr-2 bg-transparent w-full text-white placeholder:text-gray5"
          />
        </div>
      </div>

      {filteredTrips.length === 0 ? (
        <div className="text-center py-12 bg-soft-dark border border-white/10 rounded-2xl">
          <p className="text-gray4">No trips match your search criteria</p>
        </div>
      ) : (
        <div className="grid auto-rows-fr gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </>
  );
}
