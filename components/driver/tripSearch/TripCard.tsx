import { cn } from "@/lib/utils";
import { ArrowRight, Calendar, ChevronRight, Clock, Users } from "lucide-react";
import Link from "next/link";

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

export default function TripCard({ trip }: { trip: Trip }) {
  //   const availableSeats = trip.totalSeats - trip.bookedSeats;

  return (
    <Link href={`/driver/trips/${trip.id}`} className="block group">
      <div className="bg-soft-dark border border-white/10 rounded-2xl p-6 transition-all group-hover:border-primary/50 group-hover:bg-soft-dark/60 h-full">
        <div className="flex flex-col justify-between h-full gap-10">
          <div className="space-y-3">
            <div className="flex items-center gap-4 mb-4">
              <StatusBadge status={trip.status} />
              <span className="text-[10px] font-black text-gray5 uppercase tracking-widest">
                #{trip.displayId}
              </span>
            </div>

            <div className="text-md md:text-lg font-black uppercase tracking-wide flex items-center gap-3">
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
              text={`${trip.bookedSeats}/${trip.totalSeats} booked`}
            />
          </div>

          <div className="flex justify-between gap-2 border-t border-white/5 pt-4">
            <div>
              <p className="text-[8px] font-black text-gray4 uppercase tracking-[0.2em]">
                Estimated Revenue
              </p>
              <p className="text-xl font-black text-secondary tracking-tighter">
                KES {trip.revenue.toLocaleString()}
              </p>
            </div>
            <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center text-gray4 group-hover:bg-primary group-hover:text-black transition-all">
              <ChevronRight size={20} />
            </div>
          </div>
        </div>
      </div>
    </Link>
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

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    ACTIVE: "bg-primary text-black",
    SCHEDULED: "bg-white/10 text-white border border-white/10",
    COMPLETED: "bg-gray-800 text-gray-400",
  };

  return (
    <span
      className={cn(
        "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest",
        styles[status] || "bg-gray-800 text-gray-400",
      )}
    >
      {status}
    </span>
  );
}
