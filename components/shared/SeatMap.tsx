"use client";

import { User, CheckCircle2, CircleArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SeatMapProps {
  layout: any;
  bookedSeats: string[];
  reservedSeats: string[];
  selectedSeats: string[];
  onSeatClick: (id: string, isBooked: boolean) => void;
}

export default function SeatMap({
  layout,
  bookedSeats,
  selectedSeats,
  reservedSeats,
  onSeatClick,
}: SeatMapProps) {
  // toast(`BOOKED SEATS: ${bookedSeats}`);

  const getRowLabel = (index: number) => String.fromCharCode(65 + index);
  console.log(`Seat selection: ${selectedSeats}`);
  return (
    <div className="grid gap-3 select-none">
      {layout.layout.map((row: any, rowIndex: number) => {
        const rowLetter = getRowLabel(rowIndex);
        // Reset counter for every new row
        let seatInRowCounter = 0;

        return (
          <div key={rowIndex} className="flex gap-3 justify-center">
            {row.seats.map((seatType: string, colIndex: number) => {
              // Only increment the label if it's an actual seat
              let seatLabel = "";
              if (seatType === "Seat") {
                seatInRowCounter++;
                seatLabel = `${rowLetter}${seatInRowCounter}`;
              }

              const isBooked = bookedSeats.includes(seatLabel);
              const isReserved = reservedSeats.includes(seatLabel);
              const isSelected = selectedSeats.includes(seatLabel);

              if (seatType === "Aisle") {
                return <div key={colIndex} className="size-10" />;
              }

              if (seatType === "DoorGap") {
                return (
                  <div
                    key={colIndex}
                    className="border border-dashed rounded-lg text-[10px] font-black uppercase text-gray4 tracking-tighter border-gray2 flex items-center justify-center size-10 bg-gray1/10"
                  >
                    Door
                  </div>
                );
              }

              if (seatType === "Driver") {
                return (
                  <div
                    key={colIndex}
                    className="size-10 rounded-lg bg-gray1/10 border border-white/5 flex items-center justify-center text-gray4 shadow-inner"
                  >
                    <CircleArrowRight size={18} />
                  </div>
                );
              }

              // Rendering Actual Seats
              return (
                <button
                  key={colIndex}
                  onClick={() => onSeatClick(seatLabel, isBooked)}
                  disabled={isBooked}
                  className={cn(
                    "size-10 rounded-lg flex flex-col items-center justify-center transition-all border shrink-0 relative",
                    isBooked
                      ? "bg-white/2 border-white/10 cursor-not-allowed"
                      : isReserved
                        ? "bg-primary/80 border-white/10 cursor-not-allowed"
                        : isSelected
                          ? "bg-secondary border-secondary text-green-600 shadow-[0_4px_12px_rgba(255,176,0,0.4)] scale-110 z-10"
                          : "bg-soft-dark border-white/10 text-gray6 hover:border-primary active:scale-95 shadow-sm",
                  )}
                >
                  {isBooked ? (
                    <User size={16} className="text-primary" />
                  ) : (
                    <>
                      <span
                        className={`font-mono ${
                          isSelected ? "text-black" : "text-white"
                        }`}
                      >
                        {seatLabel}
                      </span>
                      {isSelected && (
                        <CheckCircle2
                          size={10}
                          className="absolute top-0.5 right-0.5 animate-in zoom-in text-black"
                        />
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
