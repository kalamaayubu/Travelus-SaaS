import { Bus, ShieldCheck, Users, Clock } from "lucide-react";
import { TripSearchResponse } from "@/types/trip.types";
import dayjs from "dayjs";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility for classes

interface TripCardProps {
  trip: TripSearchResponse;
  onSelect: (trip: TripSearchResponse) => void;
}

export const TripCard = ({ trip, onSelect }: TripCardProps) => {
  const departureTime = dayjs(trip.departure_time).format("hh:mm A");

  return (
    <div className="group relative bg-soft-dark border border-white/10 rounded-2xl p-5 md:p-6 transition-all duration-300 hover:border-primary/40 overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-6 lg:items-center">
        {/* Section 1: Vehicle & Route Info */}
        <div className="flex flex-1 gap-5">
          <div className="hidden sm:flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/5 text-primary/60 group-hover:scale-105 transition-transform">
            <Bus size={28} strokeWidth={1.5} />
            <span className="text-[10px] mt-2 font-bold opacity-60 uppercase">
              {trip.vehicle.type_name}
            </span>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 border border-emerald-500/20 text-[10px] font-bold text-primary uppercase tracking-tight">
                <ShieldCheck size={12} /> Verified Operator
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-1">
                <div className="size-2 rounded-full bg-primary" />
                <div className="w-0.5 h-4 bg-white/20" />
                <div className="size-2 rounded-full border border-primary" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-white leading-none">
                  {trip.trip_origin}
                  <span className="mx-2 text-white/30 font-light">to</span>
                  {trip.trip_destiny}
                </h3>
                <p className="text-sm text-gray-400 font-medium">
                  {trip.vehicle.number_plate} • {trip.vehicle.capacity} Total
                  Seats
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Time & Availability */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:flex items-center gap-6 lg:gap-10 py-4 lg:py-0 border-y lg:border-none border-white/5">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-gray4">
              <Clock size={14} />
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Departure
              </span>
            </div>
            <p className="text-xl font-bold text-white">{departureTime}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-gray4">
              <Users size={14} />
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Availability
              </span>
            </div>
            <p
              className={cn(
                "text-lg font-bold",
                trip.available_seats < 5 ? "text-orange-400" : "text-white",
              )}
            >
              {trip.available_seats}{" "}
              <span className="text-xs font-medium text-gray4">Seats left</span>
            </p>
          </div>

          {/* Pricing & CTA */}
          <div className="col-span-2 md:col-span-1 flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-1">
            <div className="text-left lg:text-right">
              <span className="block text-sm font-bold uppercase tracking-wide">
                Per Seat
              </span>
              <p className="text-xl tracking-widest font-black  text-secondary ">
                KES: {trip.price_per_seat.toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => onSelect(trip)}
              className={cn(
                "h-12 px-8 whitespace-nowrap rounded-lg font-bold text-sm uppercase tracking-widest transition-all active:scale-95 bg-primary text-black hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]",
              )}
            >
              Select seat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
