"use client";

import { useState } from "react";
import {
  Users,
  Armchair,
  TrendingUp,
  Banknote,
  MoreHorizontal,
  MapPin,
  Plus,
  Clock,
} from "lucide-react";
import ScheduleTripModal from "@/components/driver/tripScheduling/ScheduleTripModal";

export default function IndependentDriverDashboard() {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  return (
    <div className="max-w-350 mx-auto pt-2 space-y-8 animate-in fade-in duration-700 pb-20">
      {/* --- ACTION HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white">
            Dashboard{" "}
          </h1>
          <p className="text-gray4 text-sm font-medium mt-1">
            Welcome back, Juma. You have{" "}
            <span className="text-primary">1 active trip</span> today.
          </p>
        </div>

        <button
          onClick={() => setIsScheduleOpen(true)}
          className="flex items-center max-w-72 justify-center gap-2 bg-primary hover:bg-primary/90 text-black px-6 py-4 rounded-lg font-black uppercase tracking-widest text-xs"
        >
          <Plus size={18} strokeWidth={3} />
          Schedule New Trip
        </button>

        {/* Trip creation/scheduling modal */}
        <ScheduleTripModal
          isOpen={isScheduleOpen}
          onClose={() => setIsScheduleOpen(false)}
        />
      </div>

      {/* 1. FOUR METRIC CARDS */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            label: "Total Rides",
            value: "1,240",
            icon: TrendingUp,
            color: "text-blue-500",
          },
          {
            label: "Seats Filled",
            value: "8,420",
            icon: Armchair,
            color: "text-primary",
          },
          {
            label: "Net Earnings",
            value: "KES 420K",
            icon: Banknote,
            color: "text-green-500",
          },
          {
            label: "Active Seats",
            value: "08/14",
            icon: Users,
            color: "text-orange-500",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className={`
        p-6 rounded-xl bg-soft-dark border border-white/5 
        hover:border-primary/20 transition-all group
        ${i === 0 ? "col-span-2" : ""}   /* Row 1 full width on mobile */
        ${i === 3 ? "col-span-2" : ""}   /* Row 3 full width on mobile */
        lg:col-span-1                    /* On large screens, all 4 cards equal width */
      `}
          >
            <div className="flex justify-between items-center mb-4">
              <div
                className={`p-2 rounded-md bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}
              >
                <stat.icon className="size-5" />
              </div>
              <span className="text-[10px] font-bold text-gray3 uppercase tracking-widest">
                Lifetime
              </span>
            </div>
            <p className="text-gray2 text-xs font-medium">{stat.label}</p>
            <h3 className="text-2xl font-black text-white mt-1">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>
      {/* 2. WEEKLY EARNINGS LINE GRAPH */}
      <div className="p-8 rounded-2xl bg-soft-dark border border-white/5">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-lg font-bold text-white">Weekly Performance</h3>
            <p className="text-xs text-gray3">
              Earnings across the last 7 days
            </p>
          </div>
          <div className="flex items-center gap-2 text-primary font-bold text-sm bg-primary/10 px-3 py-1 rounded-full">
            <TrendingUp size={14} /> +18%
          </div>
        </div>

        <div className="h-48 w-full flex items-end justify-between gap-2 relative border-b border-white/5 pb-2">
          {/* SVG Graph Placeholder */}
          <svg className="absolute inset-0 h-full w-full opacity-50">
            <polyline
              fill="none"
              stroke="#51baff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="0,150 150,120 300,180 450,80 600,100 750,40 900,60"
            />
          </svg>
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div
              key={day}
              className="text-[10px] text-gray4 font-bold uppercase tracking-tighter w-full text-center"
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* 3. ACTIVE TRIP MANIFEST */}
      <div className="rounded-2xl bg-soft-dark border border-primary/20 overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/2 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <MapPin className="size-6" />
            </div>
            <div>
              <h3 className="text-white font-black uppercase tracking-tight">
                Active Trip Manifest
              </h3>
              <p className="text-xs text-gray3">
                Route: Nairobi (CBD) → Nakuru (Main)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-gray4 uppercase font-bold">
                Departure
              </span>
              <span className="text-sm font-black text-white flex items-center gap-2">
                <Clock size={14} className="text-primary" /> 14:30 PM
              </span>
            </div>
            <span className="text-[10px] bg-green-500/10 text-green-500 px-3 py-1 rounded-full font-bold">
              LOADED
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-[10px] text-gray3 uppercase tracking-widest bg-white/1">
              <tr>
                <th className="px-8 py-4">Passenger</th>
                <th className="px-8 py-4">Seats</th>
                <th className="px-8 py-4">Amount</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                {
                  name: "Kevin Otieno",
                  seats: "A1, A2",
                  amount: "1,600",
                  status: "Paid",
                },
                {
                  name: "Mercy Wanjiku",
                  seats: "C3",
                  amount: "800",
                  status: "Paid",
                },
                {
                  name: "Walk-in Guest",
                  seats: "B4",
                  amount: "800",
                  status: "Boarded",
                },
              ].map((booking, i) => (
                <tr
                  key={i}
                  className="group hover:bg-white/2 transition-colors"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                        {booking.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="font-bold text-white text-sm">
                        {booking.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-gray2 text-sm font-medium">
                    {booking.seats}
                  </td>
                  <td className="px-8 py-5 font-mono text-primary font-bold">
                    KES {booking.amount}
                  </td>
                  <td className="px-8 py-5">
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-1 rounded ${
                        booking.status === "Paid"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 hover:bg-white/10 rounded-md transition-colors text-gray3">
                      <MoreHorizontal className="size-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-white/1 border-t border-white/5 text-center flex justify-center gap-4">
          <button className="text-[10px] font-black text-gray4 hover:text-white uppercase tracking-widest px-4 py-2 border border-white/10 rounded-md transition-all">
            Manage Seats
          </button>
          <button className="text-[10px] font-black text-primary hover:bg-primary/5 uppercase tracking-widest px-4 py-2 border border-primary/20 rounded-md transition-all">
            Close Manifest & Depart
          </button>
        </div>
      </div>
    </div>
  );
}
