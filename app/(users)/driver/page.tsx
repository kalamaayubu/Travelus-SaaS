"use client";

import {
  Users,
  Armchair,
  TrendingUp,
  Banknote,
  MoreHorizontal,
  MapPin,
  CalendarDays,
} from "lucide-react";

export default function IndependentDriverDashboard() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-700">
      {/* 1. FOUR METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
            className="p-6 rounded-2xl bg-bg-soft border border-white/5 hover:border-primary/20 transition-all"
          >
            <div className="flex justify-between items-center mb-4">
              <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                <stat.icon className="size-5" />
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Lifetime
              </span>
            </div>
            <p className="text-gray-400 text-xs font-medium">{stat.label}</p>
            <h3 className="text-2xl font-black text-white mt-1">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      {/* 2. WEEKLY EARNINGS LINE GRAPH */}
      <div className="p-8 rounded-3xl bg-bg-soft border border-white/5">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-lg font-bold text-white">Weekly Performance</h3>
            <p className="text-xs text-gray-500">
              Earnings across the last 7 days
            </p>
          </div>
          <div className="flex items-center gap-2 text-primary font-bold text-sm bg-primary/10 px-3 py-1 rounded-full">
            <TrendingUp size={14} /> +18%
          </div>
        </div>

        <div className="h-64 w-full flex items-end justify-between gap-2 relative">
          {/* Visualizing a Line Graph with SVG Area */}
          <svg className="absolute inset-0 h-full w-full">
            <polyline
              fill="none"
              stroke="#51baff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="0,150 150,120 300,180 450,80 600,100 750,40 900,60"
              className="drop-shadow-[0_0_10px_rgba(81,186,255,0.5)]"
            />
          </svg>
          {/* X-Axis Labels */}
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div
              key={day}
              className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter w-full text-center"
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* 3. ACTIVE TRIP MANIFEST */}
      <div className="rounded-3xl bg-bg-soft border border-primary/20 overflow-hidden shadow-2xl shadow-primary/5">
        <div className="p-6 border-b border-white/5 bg-white/[0.02] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <MapPin className="size-6" />
            </div>
            <div>
              <h3 className="text-white font-black uppercase tracking-tight">
                Active Trip Manifest
              </h3>
              <p className="text-xs text-gray-500">
                Route: Nairobi (CBD) → Nakuru (Main)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-green-500/10 text-green-500 px-3 py-1 rounded-full font-bold">
              LOADED
            </span>
            <span className="text-[10px] bg-white/5 text-gray-400 px-3 py-1 rounded-full font-bold uppercase tracking-widest flex items-center gap-1">
              <CalendarDays size={10} /> 25 Dec
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-[10px] text-gray-500 uppercase tracking-widest bg-white/[0.01]">
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
                  seats: "02",
                  amount: "1,600",
                  status: "Paid",
                },
                {
                  name: "Mercy Wanjiku",
                  seats: "01",
                  amount: "800",
                  status: "Paid",
                },
                {
                  name: "Brian Mutua",
                  seats: "01",
                  amount: "800",
                  status: "Boarded",
                },
              ].map((booking, i) => (
                <tr
                  key={i}
                  className="group hover:bg-white/[0.02] transition-colors"
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
                  <td className="px-8 py-5 text-gray-400 text-sm font-medium">
                    {booking.seats} Seats
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
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-500">
                      <MoreHorizontal className="size-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-white/[0.01] border-t border-white/5 text-center">
          <button className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">
            Close Manifest & Complete Trip
          </button>
        </div>
      </div>
    </div>
  );
}
