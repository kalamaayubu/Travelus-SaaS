import { Bus, ShieldCheck } from "lucide-react";
import { TripSearchResponse } from "@/types/trip.types";

interface TripCardProps {
  trip: TripSearchResponse;
  onSelect: (trip: TripSearchResponse) => void;
}

export const TripCard = ({ trip, onSelect }: TripCardProps) => {
  const departureTime = new Date(trip.departure_time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="group bg-soft-dark border border-white/5 py-6 px-3 md:px-5 lg:py-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 hover:border-secondary/10 transition-all">
      <div className="flex  justify-between gap-6 sm:gap-8">
        <div className="size-16 md:size-20 rounded-xl  border-white/5 flex items-center justify-center text-primary/40 group-hover:text-primary transition-colors">
          <Bus className="size-16" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter group-hover:text-primary transition-colors">
            {trip.departure_location} → {trip.destination_location}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-gray3 font-bold uppercase text-[10px] tracking-widest">
              {trip.vehicle.type_name || "Standard Shuttle"}
            </p>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary/10 border border-secondary/20 text-[8px] font-black text-secondary uppercase tracking-widest">
              <ShieldCheck size={10} /> Verified
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Vehicle: {trip.vehicle.number_plate || "N/A"} •{" "}
            {trip.vehicle.capacity} seats
          </p>
        </div>
      </div>

      <div className="flex items-center gap-12 w-full md:w-auto justify-between border-t md:border-t-0 border-white/5 pt-6 md:pt-0">
        <div className="text-center md:text-left">
          <p className="text-[10px] font-black text-gray4 uppercase tracking-widest mb-1">
            Departure
          </p>
          <p className="text-xl font-black">{departureTime}</p>
        </div>
        <div className="text-center md:text-right">
          <p className="text-[10px] font-black text-gray4 uppercase tracking-widest mb-1">
            Fare per seat
          </p>
          <p className="text-xl md:text-2xl font-black text-white">
            KES {trip.price_per_seat}
          </p>
          <p className="text-[10px] text-gray-400 mt-1">
            {trip.available_seats} seats available
          </p>
        </div>
        <button
          onClick={() => onSelect(trip)}
          className="secondary-btn group-hover:animate-pulse whitespace-nowrap rounded-lg h-12 px-4 py-2 uppercase font-bold text-xs tracking-widest"
        >
          Select Seat
        </button>
      </div>
    </div>
  );
};
