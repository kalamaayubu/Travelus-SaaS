import { CardSim, User } from "lucide-react";
import { cn } from "@/lib/utils";
import SeatMap from "../shared/SeatMap";

// 1. Seat Selection View
export const SeatSelectionView = ({
  layout,
  booked,
  reserved,
  selected,
  onSeatClick,
}: any) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <SeatLegend />
    <div className="w-full h-0.5 bg-linear-to-r from-transparent via-primary/20 to-transparent rounded-full mb-12" />
    <SeatMap
      layout={layout}
      bookedSeats={booked}
      reservedSeats={reserved}
      selectedSeats={selected}
      onSeatClick={onSeatClick}
    />
  </div>
);

// 2. Passenger Details View
export const DetailsView = ({ register, errors }: any) => (
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
      error={errors.contactNumber?.message}
      {...register("contactNumber", {
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
      error={errors.mpesaNumber?.message}
      {...register("mpesaNumber", {
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
        pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address" },
      })}
    />
  </div>
);

// 3. Payment View
export const PaymentView = ({
  totalFare,
  mpesaNumber,
  fullName,
  seats,
  trip,
}: any) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-right-8 text-center duration-500">
    <div className="size-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
      <CardSim size={40} className="text-secondary" />
    </div>
    <p className="text-gray4 text-sm font-medium px-4">
      A payment request for{" "}
      <span className="text-white font-bold">
        KES {totalFare.toLocaleString()}
      </span>{" "}
      will be sent to{" "}
      <span className="text-secondary font-black">{mpesaNumber}</span>
    </p>

    <div className="bg-bg-soft p-6 rounded-xl border border-white/5 tracking-wider text-left space-y-4">
      <SummaryRow label="Traveler" value={fullName} />
      <SummaryRow label="Seats" value={seats.join(", ")} />
      <SummaryRow
        label="Route"
        value={`${trip.departure_location} → ${trip.destination_location}`}
      />
      {trip.provider && (
        <SummaryRow label="Provider" value={trip.provider} italic />
      )}
    </div>
  </div>
);

// --- Sub-components (Helpers) ---
export const FormInput = ({ label, error, className, ...props }: any) => (
  <div className="space-y-4">
    <label className="text-[10px] font-black uppercase tracking-widest text-gray3">
      {label}
    </label>
    <input
      className={cn(
        "w-full h-12 bg-bg-soft border  rounded-xl px-4 text-white focus:outline-none transition-all placeholder:text-white/10",
        error ? "border-red-500/50" : "border-white/20 focus:border-primary",
        className,
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
