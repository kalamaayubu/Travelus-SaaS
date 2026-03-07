import { fetchDriverTrips } from "@/lib/services/driver/trips";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { ArrowRight, Calendar, ChevronRight, Clock, Users } from "lucide-react";
import Link from "next/link";

export default async function TripsList() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const trips = await fetchDriverTrips(user.id);

  return (
    <div className="grid auto-rows-fr gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
