"use client";

import { CircleArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// SELECTED is local to the UI, LOCKED and BOOKED are from DB
export type SeatStatus = "AVAILABLE" | "BOOKED" | "LOCKED" | "SELECTED";

interface SeatMapManagerProps {
  layout: typeof MOCK_LAYOUT_DATA;
  seatStatuses: Record<string, SeatStatus>;
  onSeatClick: (id: string) => void;
}

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

export default function SeatMapManager({
  layout,
  seatStatuses,
  onSeatClick,
}: SeatMapManagerProps) {
  const getRowLabel = (index: number) => String.fromCharCode(65 + index);

  return (
    <div className="grid gap-2 select-none">
      {layout.layout.map((row, rowIndex) => {
        const rowLetter = getRowLabel(rowIndex);
        let seatInRowCounter = 0;

        return (
          <div key={rowIndex} className="flex gap-2 justify-center">
            {row.seats.map((seatType, colIndex) => {
              let seatLabel = "";
              if (seatType === "Seat") {
                seatInRowCounter++;
                seatLabel = `${rowLetter}${seatInRowCounter}`;
              }

              const status = seatStatuses[seatLabel] || "AVAILABLE";

              if (seatType === "Aisle")
                return <div key={colIndex} className="size-11" />;

              if (seatType === "DoorGap") {
                return (
                  <div
                    key={colIndex}
                    className="size-11 border border-dashed border-white/10 rounded-lg flex items-center justify-center bg-white/5"
                  >
                    <span className="text-[7px] font-black uppercase text-gray4 -rotate-90">
                      Door
                    </span>
                  </div>
                );
              }

              if (seatType === "Driver") {
                return (
                  <div
                    key={colIndex}
                    className="size-11 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]"
                  >
                    <CircleArrowRight size={20} />
                  </div>
                );
              }

              return (
                <button
                  key={colIndex}
                  type="button"
                  // BOOKED and LOCKED are un-clickable for the selection flow
                  disabled={status === "BOOKED" || status === "LOCKED"}
                  onClick={() => onSeatClick(seatLabel)}
                  className={cn(
                    "size-11 rounded-lg flex flex-col items-center justify-center transition-all border shrink-0",
                    status === "BOOKED" &&
                      "bg-primary border-primary text-black cursor-not-allowed",
                    status === "LOCKED" &&
                      "bg-tertiary border-tertiary text-black cursor-not-allowed shadow-lg shadow-green-500/10",
                    status === "SELECTED" &&
                      "bg-secondary border-secondary text-black scale-105 z-10",
                    status === "AVAILABLE" &&
                      "bg-soft-dark border-white/5 text-white hover:border-primary/50 active:scale-95",
                  )}
                >
                  <span className="text-xs font-black font-mono">
                    {seatLabel}
                  </span>
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
