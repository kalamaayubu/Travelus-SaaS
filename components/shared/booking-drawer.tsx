"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  X,
  User,
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import SeatMap from "./SeatMap";
import { cn } from "@/lib/utils";

type BookingStep = "SEATS" | "DETAILS" | "PAYMENT";

// Internal type for the form fields
interface PassangerBookingFields {
  fullName: string;
  contactPhone: string;
  mpesaPhone: string;
  email?: string;
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

const BOOKED_SEATS = ["C1", "C2", "E4", "L1", "L5"];
const RESERVED_SEATS = ["I4", "H1", "H2"];

interface BookingDrawerProps {
  trip: { from: string; to: string; price: number; provider: string };
  onClose: () => void;
}

export default function BookingDrawer({ trip, onClose }: BookingDrawerProps) {
  const [step, setStep] = useState<BookingStep>("SEATS");
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<PassangerBookingFields>({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      contactPhone: "",
      mpesaPhone: "",
      email: "",
    },
  });

  const formData = watch();
  const totalFare = selectedSeats.length * trip.price;

  const handleSeatClick = (id: string, isBooked: boolean) => {
    if (isBooked) return;
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const handleAction = () => {
    if (step === "SEATS") {
      setStep("DETAILS");
    } else if (step === "DETAILS") {
      // handleSubmit is only needed if we want to trigger validation manually
      // but 'isValid' from formState handles the button state for us.
      setStep("PAYMENT");
    } else {
      console.log("Initiating STK Push for:", formData.mpesaPhone);
      // Backend integration goes here
    }
  };

  const prevStep = () => {
    if (step === "DETAILS") setStep("SEATS");
    else if (step === "PAYMENT") setStep("DETAILS");
  };

  return (
    <div className="fixed inset-0 z-100 flex justify-end">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-soft-dark border-l border-white/10 h-full flex flex-col animate-in slide-in-from-right duration-500 shadow-2xl">
        {/*  Header */}
        <div className="p-6 py-4 border-b border-white/5 flex items-center justify-between bg-bg-soft/30">
          <div className="flex items-center gap-4">
            {step !== "SEATS" && (
              <button
                onClick={prevStep}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} className="3" />
              </button>
            )}
            <h2 className="text-xl font-black italic uppercase tracking-tighter text-primary leading-none">
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
        </div>

        {/* Seat map view */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {step === "SEATS" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <SeatLegend />
              <div className="w-full h-0.5 bg-linear-to-r from-transparent via-primary/20 to-transparent rounded-full mb-12" />
              <SeatMap
                layout={MOCK_LAYOUT_DATA}
                bookedSeats={BOOKED_SEATS}
                reservedSeats={RESERVED_SEATS}
                selectedSeats={selectedSeats}
                onSeatClick={handleSeatClick}
              />
            </div>
          )}

          {/* Passanger booking details form */}
          {step === "DETAILS" && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-500">
              <FormInput
                label="Full Name"
                placeholder="John Doe"
                error={errors.fullName?.message}
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: { value: 3, message: "Name is too short" },
                })}
              />
              <FormInput
                label="Contact Phone"
                placeholder="0712345678"
                error={errors.contactPhone?.message}
                {...register("contactPhone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^(?:254|\+254|0)?(7|1)[0-9]{8}$/,
                    message: "Invalid Kenyan number",
                  },
                })}
              />
              <FormInput
                label="M-Pesa Number"
                placeholder="0712345678"
                error={errors.mpesaPhone?.message}
                {...register("mpesaPhone", {
                  required: "M-Pesa number is required",
                  pattern: {
                    value: /^(?:254|\+254|0)?(7|1)[0-9]{8}$/,
                    message: "Invalid M-Pesa number",
                  },
                })}
              />
              <FormInput
                label="Email (Optional)"
                placeholder="john@example.com"
                error={errors.email?.message}
                {...register("email", {
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
          )}

          {/* Confirm details and make payment request */}
          {step === "PAYMENT" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 text-center duration-500">
              <div className="size-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={40} className="text-secondary" />
              </div>
              <p className="text-gray4 text-sm font-medium px-4">
                A payment request for{" "}
                <span className="text-white font-bold">
                  KES {totalFare.toLocaleString()}
                </span>{" "}
                will be sent to{" "}
                <span className="text-secondary font-black">
                  {formData.mpesaPhone}
                </span>
              </p>

              <div className="bg-bg-soft p-6 rounded-xl border border-white/5 tracking-wider text-left space-y-4">
                <SummaryRow label="Traveler" value={formData.fullName} />
                <SummaryRow label="Seats" value={selectedSeats.join(", ")} />
                <SummaryRow label="Route" value={`${trip.from} → ${trip.to}`} />
                <SummaryRow label="Provider" value={trip.provider} italic />
              </div>
            </div>
          )}
        </div>

        {/* Booking drawer Footer */}
        <div className="p-6 border-t border-white/5 bg-bg-soft/50 space-y-4 backdrop-blur-md">
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
              <p
                className={cn(
                  "text-xl font-black uppercase tracking-tighter text-secondary",
                )}
              >
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
        </div>
      </div>
    </div>
  );
}

// Helper components to keep the main code clean
const FormInput = ({ label, error, ...props }: any) => (
  <div className="space-y-4">
    <label className="text-[10px] font-black uppercase tracking-widest text-gray3">
      {label}
    </label>
    <input
      className={cn(
        "w-full h-12 bg-bg-soft border rounded-xl px-4 text-white focus:outline-none transition-all placeholder:text-white/10",
        error ? "border-red-500/50" : "border-white/10 focus:border-primary",
      )}
      {...props}
    />
    {error && (
      <p className="text-[9px] text-red-500 font-bold uppercase tracking-wider">
        {error}
      </p>
    )}
  </div>
);

// Booking summary row
const SummaryRow = ({ label, value, italic }: any) => (
  <div className="flex justify-between text-xs border-b border-white/5 pb-2 last:border-0 last:pb-0">
    <span className="3 uppercase font-bold tracking-widest">{label}</span>
    <span
      className={cn(
        "text-white font-black",
        italic && "italic uppercase text-primary",
      )}
    >
      {value}
    </span>
  </div>
);

// Seat status section
function SeatLegend() {
  const items = [
    { label: "Available", color: "bg-bg-soft" },
    { label: "Reserved", color: "bg-primary/80" },
    { label: "Selected", color: "bg-secondary" },
    { label: "Occupied", icon: <User size={12} className="text-primary" /> },
  ];
  return (
    <div className="flex flex-wrap gap-6 pb-10">
      {items.map((i) => (
        <div key={i.label} className="flex items-center gap-2">
          <div
            className={cn(
              "size-6 rounded-sm border border-white/10 flex items-center justify-center",
              i.color,
            )}
          >
            {i.icon}
          </div>
          <span className="text-[11px] uppercase 3 font-black tracking-widest">
            {i.label}
          </span>
        </div>
      ))}
    </div>
  );
}
