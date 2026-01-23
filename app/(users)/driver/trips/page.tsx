"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Clock, Users, Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for the trips list
const MOCK_TRIPS = [
  {
    id: "882B-2026",
    from: "Nairobi",
    to: "Mombasa",
    departureDate: "Jan 25, 2026",
    departureTime: "14:00",
    status: "ACTIVE", // Currently boarding/on the road
    bookedSeats: 12,
    totalSeats: 14,
    revenue: "14,200",
  },
  {
    id: "991X-2026",
    from: "Nairobi",
    to: "Kisumu",
    departureDate: "Jan 26, 2026",
    departureTime: "08:30",
    status: "SCHEDULED",
    bookedSeats: 5,
    totalSeats: 14,
    revenue: "6,500",
  },
  {
    id: "442Z-2026",
    from: "Nakuru",
    to: "Nairobi",
    departureDate: "Jan 23, 2026",
    departureTime: "10:00",
    status: "COMPLETED",
    bookedSeats: 14,
    totalSeats: 14,
    revenue: "11,000",
  },
];

export default function TripsPage() {
  return (
    <div className="min-h-screen text-white">
      <div className="">
        <header className="mb-10">
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">
            My Trips
          </h1>
          <p className="text-xs text-gray4 font-bold uppercase tracking-widest mt-1">
            Manage your past and upcoming journeys
          </p>
        </header>

        <div className="grid auto-rows-fr gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {MOCK_TRIPS.map((trip) => (
            <Link
              key={trip.id}
              href={`/driver/trips/${trip.id}`}
              className="block group"
            >
              <div className="bg-soft-dark border border-white/10 rounded-2xl p-6 transition-all group-hover:border-primary/50 group-hover:bg-soft-dark/60 max-w-200">
                <div className="flex flex-col justify-between gap-10">
                  {/* Route Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 mb-4">
                      <StatusBadge status={trip.status} />
                      <span className="text-[10px] font-black text-gray5 uppercase tracking-widest">
                        #{trip.id}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-3">
                        {trip.from}
                        <ArrowRight size={18} className="text-primary" />
                        {trip.to}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-6">
                      <InfoItem
                        icon={<Calendar size={14} className="text-tertiary" />}
                        text={trip.departureDate}
                      />
                      <InfoItem
                        icon={<Clock size={14} className="text-secondary" />}
                        text={trip.departureTime}
                      />
                    </div>
                    <div>
                      <InfoItem
                        icon={<Users size={14} className="text-white" />}
                        text={`${trip.bookedSeats}/${trip.totalSeats} Seats`}
                      />
                    </div>
                  </div>

                  {/* Revenue & Action */}
                  <div className="flex justify-between gap-2 border-t border-white/5 pt-4">
                    <div className="">
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
    </div>
  );
}

// Internal Helper Components
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
