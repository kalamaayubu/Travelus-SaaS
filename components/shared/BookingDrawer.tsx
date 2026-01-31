"use client";

import { X, ArrowLeft, CreditCard, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBookingLogic } from "@/hooks/useBookingLogic";
import {
  DetailsView,
  PaymentView,
  SeatSelectionView,
} from "../trip/BookingSteps";

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

const BOOKED_SEATS = ["C1", "C2", "E4", "L1", "L5"];
const RESERVED_SEATS = ["I4", "H1", "H2"];

export default function BookingDrawer({ trip, onClose }: any) {
  const {
    step,
    selectedSeats,
    totalFare,
    formMethods,
    formData,
    handleSeatClick,
    nextStep,
    prevStep,
  } = useBookingLogic(trip.price);

  const {
    register,
    formState: { errors, isValid },
  } = formMethods;

  const handleAction = () => {
    if (step === "PAYMENT")
      console.log("Initiating STK Push for:", formData.mpesaPhone);
    else nextStep();
  };

  return (
    <div className="fixed inset-0 z-100 flex justify-end">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-soft-dark border-l border-white/10 h-full flex flex-col animate-in slide-in-from-right duration-500 shadow-2xl">
        <header className="p-6 py-4 border-b border-white/5 flex items-center justify-between bg-bg-soft/30">
          <div className="flex items-center gap-4">
            {step !== "SEATS" && (
              <button
                onClick={prevStep}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <h2 className="text-xl font-black uppercase tracking-tighter text-primary leading-none">
              {step === "SEATS"
                ? "Select Seats"
                : step === "DETAILS"
                  ? "Passenger Info"
                  : "Make payment"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="size-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5"
          >
            <X size={20} className="text-gray4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {step === "SEATS" && (
            <SeatSelectionView
              layout={MOCK_LAYOUT_DATA}
              booked={BOOKED_SEATS}
              reserved={RESERVED_SEATS}
              selected={selectedSeats}
              onSeatClick={handleSeatClick}
            />
          )}
          {step === "DETAILS" && (
            <DetailsView register={register} errors={errors} />
          )}
          {step === "PAYMENT" && (
            <PaymentView
              totalFare={totalFare}
              mpesaPhone={formData.mpesaPhone}
              fullName={formData.fullName}
              seats={selectedSeats}
              trip={trip}
            />
          )}
        </div>

        <footer className="p-6 border-t border-white/5 bg-bg-soft/50 space-y-4 backdrop-blur-md">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-gray2 uppercase tracking-widest">
                Selected Seats ({selectedSeats.length})
              </p>
              <p className="text-lg font-black text-white truncate max-w-37.5">
                {selectedSeats.length > 0 ? selectedSeats.join(", ") : "--"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-gray2 uppercase tracking-widest">
                Total fare
              </p>
              <p className="text-xl font-black uppercase tracking-tighter text-secondary">
                KES&nbsp;&nbsp; {totalFare.toLocaleString()}
              </p>
            </div>
          </div>

          <button
            disabled={step === "SEATS" ? selectedSeats.length === 0 : !isValid}
            onClick={handleAction}
            className="primary-btn w-full h-14 rounded-xl flex items-center justify-center gap-3 disabled:opacity-20 transition-all group shadow-xl shadow-primary/10"
          >
            <span className="uppercase tracking-[0.2em] font-black text-sm">
              {step === "SEATS" && "Proceed to Details"}
              {step === "DETAILS" && "Confirm & Pay"}
              {step === "PAYMENT" && "Pay with M-pesa"}
            </span>
            {step === "PAYMENT" ? (
              <CreditCard size={18} />
            ) : (
              <ChevronRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            )}
          </button>
        </footer>
      </div>
    </div>
  );
}
