"use client";

import { useState } from "react";
import { X, CreditCard, User } from "lucide-react";
import SeatMap from "./SeatMap";
import { cn } from "@/lib/utils";

const MOCK_LAYOUT_DATA = {
  rows: 12,
  aisle: true,
  layout: [
    { row: 1, seats: ["Aisle", "Aisle", "Aisle", "Aisle", "Driver"] },
    { row: 2, seats: ["DoorGap", "Aisle", "Aisle", "Seat", "Seat"] },
    { row: 3, seats: ["Seat", "Seat", "Aisle", "Seat", "Seat"] },
    { row: 4, seats: ["Seat", "Seat", "Aisle", "Seat", "Seat"] },
    { row: 5, seats: ["Seat", "Seat", "Aisle", "Seat", "Seat"] },
    { row: 6, seats: ["Seat", "Seat", "Aisle", "Seat", "Seat"] },
    { row: 7, seats: ["Seat", "Seat", "Aisle", "Seat", "Seat"] },
    { row: 8, seats: ["Seat", "Seat", "Aisle", "Seat", "Seat"] },
    { row: 9, seats: ["Seat", "Seat", "Aisle", "Seat", "Seat"] },
    { row: 10, seats: ["Seat", "Seat", "Aisle", "Seat", "Seat"] },
    { row: 11, seats: ["Seat", "Seat", "Aisle", "Seat", "Seat"] },
    { row: 12, seats: ["Seat", "Seat", "Seat", "Seat", "Seat"] },
  ],
};

// Updated mock to use our actual Coordinate Labels
const BOOKED_SEATS = ["C1", "C2", "E4", "L1", "L5"];
const RESERVED_SEATS = ["I4", "H1", "H2"];

interface BookingDrawerProps {
  trip: { from: string; to: string; price: number; provider: string };
  onClose: () => void;
}

export default function BookingDrawer({ trip, onClose }: BookingDrawerProps) {
  // State is now an array of strings
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatClick = (id: string, isBooked: boolean) => {
    if (isBooked) return;
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((seat) => seat !== id) : [...prev, id]
    );
  };

  const totalFare = selectedSeats.length * trip.price;

  return (
    <div className="fixed inset-0 z-100 flex justify-end">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-dark border-l border-white/10 h-full flex flex-col animate-in slide-in-from-right duration-500 shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-soft-dark/30">
          <div>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter text-primary leading-none">
              Choose Seats
            </h2>
            <p className="text-[10px] font-bold text-gray1 uppercase tracking-[0.2em] mt-1">
              {trip.from} → {trip.to}
            </p>
          </div>
          <button
            onClick={onClose}
            className="size-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 hover:bg-white/10 transition-colors"
          >
            <X size={20} className="text-gray4" />
          </button>
        </div>

        {/* Interior View */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="flex flex-col items-center">
            {/* Legend */}
            <div className="flex flex-wrap gap-6 pb-10">
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-sm bg-soft-dark border border-white/10"></div>
                <span className="text-[12px] uppercase text-gray4">
                  Available
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-sm bg-primary/80 border border-white/10"></div>
                <span className="text-[12px] uppercase text-gray4">
                  Reserved
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-sm bg-secondary" />
                <span className="text-[12px] uppercase text-gray4">
                  Selected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-6 flex items-center justify-center border border-white/5 rounded-sm bg-white/2">
                  <User className="text-primary size-3" />
                </div>
                <span className="text-[12px] uppercase text-gray4">
                  Occupied
                </span>
              </div>
            </div>
            <div className="w-full h-0.5 bg-linear-to-r from-transparent via-primary/20 to-transparent rounded-full mb-12" />

            <SeatMap
              layout={MOCK_LAYOUT_DATA}
              bookedSeats={BOOKED_SEATS}
              reservedSeats={RESERVED_SEATS}
              selectedSeats={selectedSeats}
              onSeatClick={handleSeatClick}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-white/5 bg-soft-dark/50 space-y-6 backdrop-blur-md">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-gray3 uppercase tracking-widest">
                Selected Seats ({selectedSeats.length})
              </p>
              <div className="flex flex-wrap gap-1 max-w-[200px]">
                {selectedSeats.length > 0 ? (
                  selectedSeats.map((seat) => (
                    <span
                      key={seat}
                      className="text-sm font-black text-white bg-white/5 px-2 py-0.5 rounded border border-white/10"
                    >
                      {seat}
                    </span>
                  ))
                ) : (
                  <p className="text-3xl font-extrabold text-white/10 italic tracking-tighter">
                    --
                  </p>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-gray3 uppercase tracking-widest">
                Total to Pay
              </p>
              <p
                className={cn(
                  "text-3xl font-black transition-all",
                  selectedSeats.length > 0 ? "text-secondary" : "text-white/10"
                )}
              >
                {selectedSeats.length > 0
                  ? `KES ${totalFare.toLocaleString()}`
                  : "--"}
              </p>
            </div>
          </div>

          <button
            disabled={selectedSeats.length === 0}
            className="primary-btn w-full h-16 rounded-xl flex items-center justify-center gap-3 disabled:opacity-20 disabled:grayscale transition-all shadow-xl shadow-primary/10 group"
          >
            <CreditCard
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
            <span className="uppercase tracking-[0.2em] font-black text-sm">
              Pay with M-Pesa
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
