"use client";

import { Ticket, Calendar, MapPin, ChevronRight, Clock } from "lucide-react";

export default function MyBookings() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <header>
        <h1 className="text-2xl font-black text-white uppercase tracking-tight">
          My <span className="text-green-500">Bookings</span>
        </h1>
        <p className="text-gray-500 text-sm font-medium">
          Manage your tickets and travel history
        </p>
      </header>

      {/* ACTIVE TICKET - THE "HERO" */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-green-500 to-green-700 p-1">
        <div className="bg-bg-soft rounded-[1.9rem] p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-[10px] font-black uppercase">
              Upcoming Trip
            </div>
            <p className="text-white font-mono text-xs">REF: TRV-8829</p>
          </div>

          <div className="flex justify-between items-center mb-8">
            <div className="text-center">
              <h3 className="text-2xl font-black text-white">NRB</h3>
              <p className="text-[10px] text-gray-500 uppercase font-bold">
                Nairobi
              </p>
            </div>
            <div className="flex-1 px-4 flex flex-col items-center">
              <div className="w-full h-[1px] bg-white/10 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-black text-white">KSM</h3>
              <p className="text-[10px] text-gray-500 uppercase font-bold">
                Kisumu
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
            <div className="flex items-center gap-3 text-gray-400">
              <Calendar className="size-4 text-green-500" />
              <span className="text-xs font-bold">Dec 28, 2025</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <Clock className="size-4 text-green-500" />
              <span className="text-xs font-bold">08:30 AM</span>
            </div>
          </div>
        </div>
      </div>

      {/* PAST TRIPS LIST */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
          Travel History
        </h3>
        {[1, 2].map((_, i) => (
          <div
            key={i}
            className="group flex items-center justify-between p-5 rounded-2xl bg-bg-soft border border-white/5 hover:border-white/10 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500">
                <Ticket className="size-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  Nairobi → Mombasa
                </p>
                <p className="text-[10px] text-gray-500">
                  Completed on 12 Nov 2025
                </p>
              </div>
            </div>
            <ChevronRight className="size-4 text-gray-600 group-hover:text-white transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
}
