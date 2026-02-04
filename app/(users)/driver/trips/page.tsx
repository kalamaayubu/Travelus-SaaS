"use client";

import Link from "next/link";
import { ChevronRight, Clock, Users, Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { DriverTripsResponse } from "@/types/driver";

export default function TripsPage() {
  const {
    data: trips,
    isLoading,
    error,
  } = useQuery<DriverTripsResponse[]>({
    queryKey: ["driver-trips"],
    queryFn: async () => {
      const res = await fetch("/api/driver/trips");
      if (!res.ok) throw new Error("Failed to load trips");
      return res.json();
    },
  });

  if (isLoading) return <TripsSkeleton />;

  if (error)
    return (
      <div className="p-10 text-red-500 font-black uppercase tracking-tighter">
        Error loading journeys. Please check your connection.
      </div>
    );

  return (
    <div className="min-h-screen text-white">
      <header className="mb-10">
        <h1 className="text-3xl font-black uppercase tracking-tighter">
          My Trips
        </h1>
        <p className="text-xs text-gray4 font-bold uppercase tracking-widest mt-1">
          Manage your past and upcoming journeys
        </p>
      </header>

      <div className="grid auto-rows-fr gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {trips?.map((trip) => (
          <Link
            key={trip.id}
            href={`/driver/trips/${trip.id}`}
            className="block group"
          >
            <div className="bg-soft-dark border border-white/10 rounded-2xl p-6 transition-all group-hover:border-primary/50 group-hover:bg-soft-dark/60 h-full">
              <div className="flex flex-col justify-between h-full gap-10">
                <div className="space-y-3">
                  <div className="flex items-center gap-4 mb-4">
                    <StatusBadge status={trip.status} />
                    <span className="text-[10px] font-black text-gray5 uppercase tracking-widest">
                      #{trip.displayId}
                    </span>
                  </div>

                  <div className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-3">
                    {trip.from}
                    <ArrowRight size={18} className="text-primary" />
                    {trip.to}
                  </div>

                  <div className="flex flex-wrap gap-6">
                    <InfoItem
                      icon={<Calendar size={14} className="text-gray4" />}
                      text={trip.departureDate}
                    />
                    <InfoItem
                      icon={<Clock size={14} className="text-gray6" />}
                      text={trip.departureTime}
                    />
                  </div>
                  <InfoItem
                    icon={<Users size={14} className="text-white" />}
                    text={`${trip.bookedSeats}/${trip.totalSeats} Seats`}
                  />
                </div>

                <div className="flex justify-between gap-2 border-t border-white/5 pt-4">
                  <div>
                    <p className="text-[8px] font-black text-gray4 uppercase tracking-[0.2em]">
                      Estimated Revenue
                    </p>
                    <p className="text-xl font-black text-secondary tracking-tighter">
                      KES {trip.revenue}
                    </p>
                  </div>
                  <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center text-gray4 group-hover:bg-primary group-hover:text-black transition-all">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// --- SKELETON LOADER COMPONENT ---
function TripsSkeleton() {
  return (
    <div className="min-h-screen text-white animate-pulse">
      <header className="mb-10">
        <div className="h-9 w-48 bg-white/10 rounded-lg mb-2" />
        <div className="h-3 w-64 bg-white/5 rounded-md" />
      </header>
      <div className="grid auto-rows-fr gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="bg-soft-dark/50 border border-white/5 rounded-2xl p-6 h-[280px] flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="h-5 w-16 bg-white/10 rounded" />
                <div className="h-3 w-12 bg-white/5 rounded" />
              </div>
              <div className="h-7 w-40 bg-white/10 rounded" />
              <div className="flex gap-4">
                <div className="h-4 w-20 bg-white/5 rounded" />
                <div className="h-4 w-20 bg-white/5 rounded" />
              </div>
            </div>
            <div className="flex justify-between border-t border-white/5 pt-4">
              <div className="space-y-2">
                <div className="h-2 w-20 bg-white/5 rounded" />
                <div className="h-6 w-24 bg-white/10 rounded" />
              </div>
              <div className="size-10 bg-white/5 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---
function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    ACTIVE: "bg-primary text-black",
    SCHEDULED: "bg-white/10 text-white border border-white/10",
    COMPLETED: "bg-gray-800 text-gray-400",
  };
  return (
    <span
      className={cn(
        "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest",
        styles[status],
      )}
    >
      {status}
    </span>
  );
}

function InfoItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-gray2">
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-wider">
        {text}
      </span>
    </div>
  );
}
