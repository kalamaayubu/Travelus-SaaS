"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  X,
  MapPin,
  Calendar,
  Clock,
  Car,
  Banknote,
  ChevronRight,
  ChevronLeft,
  Check,
  Phone,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ScheduleTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMpesa?: string;
}

interface ScheduleFields {
  origin: string;
  destination: string;
  price: string;
  departureDate: string;
  departureTime: string;
  vehicle: string;
  mpesaNumber: string;
  pickupPoints: string;
  dropoffPoints: string;
}

export default function ScheduleTripModal({
  isOpen,
  onClose,
  defaultMpesa = "0712345678",
}: ScheduleTripModalProps) {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
    reset,
  } = useForm<ScheduleFields>({
    mode: "onChange",
    defaultValues: { mpesaNumber: defaultMpesa },
  });

  const formData = watch();

  if (!isOpen) return null;

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ["origin", "destination", "price"];
    if (step === 2)
      fieldsToValidate = ["departureDate", "departureTime", "vehicle"];
    if (step === 3) fieldsToValidate = ["mpesaNumber"];

    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid) {
      setStep(step + 1);
    } else {
      console.log("Validation failed for:", fieldsToValidate, errors);
    }
  };

  const onSubmit = (data: ScheduleFields) => {
    // This only fires when type="submit" (Step 4 button) is clicked
    console.log("Trip Published Successfully:", data);
    reset();
    setStep(1);
    onClose();
  };

  const inputClasses =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 h-12 text-sm text-white outline-none focus:border-primary focus:bg-primary/5 transition-all placeholder:text-gray-600";
  const labelClasses =
    "text-[9px] font-black uppercase tracking-widest text-gray4 flex items-center gap-2 mb-1.5";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl bg-soft-dark border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Progress Tracker */}
        <div className="h-1 w-full bg-white/5 flex">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={cn(
                "h-full transition-all duration-500",
                s <= step ? "bg-primary w-1/4" : "w-0",
              )}
            />
          ))}
        </div>

        {/* Header */}
        <div className="p-6 pb-2 flex items-center justify-between">
          <div>
            <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em]">
              Step {step} of 4
            </span>
            <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">
              {step === 1 && "Route & Pricing"}
              {step === 2 && "Schedule & Vehicle"}
              {step === 3 && "Logistics & Payout"}
              {step === 4 && "Review & Confirm"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="size-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 hover:bg-white/10 text-gray4 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 pt-4 space-y-5">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <div>
                <label className={labelClasses}>
                  <MapPin size={10} className="text-primary" /> Departure City
                </label>
                <input
                  {...register("origin", { required: "Origin is required" })}
                  placeholder="e.g. Nairobi"
                  className={inputClasses}
                />
                {errors.origin && (
                  <p className="text-[9px] text-red-500 font-bold uppercase mt-1">
                    {errors.origin.message}
                  </p>
                )}
              </div>
              <div>
                <label className={labelClasses}>
                  <MapPin size={10} className="text-primary" /> Destination City
                </label>
                <input
                  {...register("destination", {
                    required: "Destination is required",
                  })}
                  placeholder="e.g. Mombasa"
                  className={inputClasses}
                />
                {errors.destination && (
                  <p className="text-[9px] text-red-500 font-bold uppercase mt-1">
                    {errors.destination.message}
                  </p>
                )}
              </div>
              <div>
                <label className={labelClasses}>
                  <Banknote size={10} className="text-primary" /> Fare Per Seat
                  (KES)
                </label>
                <input
                  type="number"
                  {...register("price", { required: "Price is required" })}
                  placeholder="1200"
                  className={cn(inputClasses, "font-mono")}
                />
                {errors.price && (
                  <p className="text-[9px] text-red-500 font-bold uppercase mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>
                    <Calendar size={10} className="text-primary" /> Travel Date
                  </label>
                  <input
                    type="date"
                    {...register("departureDate", { required: "Required" })}
                    className={cn(inputClasses, "[color-scheme:dark]")}
                  />
                </div>
                <div>
                  <label className={labelClasses}>
                    <Clock size={10} className="text-primary" /> Time
                  </label>
                  <input
                    type="time"
                    {...register("departureTime", { required: "Required" })}
                    className={cn(inputClasses, "[color-scheme:dark]")}
                  />
                </div>
              </div>
              <div>
                <label className={labelClasses}>
                  <Car size={10} className="text-primary" /> Select Vehicle
                </label>
                <select
                  {...register("vehicle", { required: "Select a vehicle" })}
                  className={cn(inputClasses, "appearance-none cursor-pointer")}
                >
                  <option value="" className="bg-dark">
                    Choose vehicle...
                  </option>
                  <option value="KDM 123X" className="bg-dark">
                    KDM 123X (14-Seater)
                  </option>
                  <option value="KCP 882B" className="bg-dark">
                    KCP 882B (10-Seater)
                  </option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <div>
                <label className={labelClasses}>
                  <Phone size={10} className="text-primary" /> M-Pesa Payout
                  Number
                </label>
                <input
                  {...register("mpesaNumber", {
                    required: "Payout number required",
                  })}
                  className={cn(inputClasses, "font-mono text-primary")}
                />
                {errors.mpesaNumber && (
                  <p className="text-[9px] text-red-500 font-bold uppercase mt-1">
                    {errors.mpesaNumber.message}
                  </p>
                )}
              </div>
              <div>
                <label className={labelClasses}>
                  <MapPin size={10} className="text-primary" /> Pickup Points
                </label>
                <textarea
                  {...register("pickupPoints")}
                  placeholder="e.g. Kencom..."
                  className={cn(inputClasses, "h-20 py-3 resize-none text-xs")}
                />
              </div>
              <div>
                <label className={labelClasses}>
                  <MapPin size={10} className="text-primary" /> Drop-off Points
                </label>
                <textarea
                  {...register("dropoffPoints")}
                  placeholder="e.g. Voi..."
                  className={cn(inputClasses, "h-20 py-3 resize-none text-xs")}
                />
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW */}
          {step === 4 && (
            <div className="space-y-4 animate-in zoom-in-95 duration-300">
              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5 space-y-4">
                <SummaryRow
                  label="Route"
                  value={`${formData.origin} ➝ ${formData.destination}`}
                  highlight
                />
                <SummaryRow
                  label="Date & Time"
                  value={`${formData.departureDate} @ ${formData.departureTime}`}
                />
                <SummaryRow label="Vehicle" value={formData.vehicle} />
                <SummaryRow
                  label="Seat Price"
                  value={`KES ${formData.price}`}
                  highlight
                />
                <div className="pt-3 border-t border-white/5 mt-2">
                  <SummaryRow
                    label="Receiving Payout"
                    value={formData.mpesaNumber}
                    highlight
                    color="text-primary"
                  />
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-orange-500/5 rounded-xl border border-orange-500/20">
                <AlertCircle
                  size={16}
                  className="text-orange-500 shrink-0 mt-0.5"
                />
                <p className="text-[10px] text-gray3 leading-relaxed">
                  Carefully review the details. Clicking{" "}
                  <strong>Publish Trip</strong> will make this journey live.
                </p>
              </div>
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => (step === 1 ? onClose() : setStep(step - 1))}
              className="flex-1 h-12 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2"
            >
              <ChevronLeft size={16} /> {step === 1 ? "Cancel" : "Back"}
            </button>

            {step < 4 ? (
              <button
                type="button" // CRITICAL FIX: Ensures this doesn't submit the form
                onClick={nextStep}
                className="flex-[2] h-12 bg-primary text-black rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 hover:opacity-90"
              >
                Next Step <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="submit" // Only the final button can submit
                className="flex-[2] h-12 bg-green-500 text-black rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
              >
                <Check size={16} strokeWidth={3} /> Publish Trip
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, highlight, color = "text-white" }: any) {
  return (
    <div className="flex justify-between items-center text-[10px] uppercase tracking-tight">
      <span className="text-gray4 font-bold">{label}</span>
      <span
        className={cn(
          "font-black text-right",
          color,
          highlight && "text-sm italic tracking-tighter",
        )}
      >
        {value}
      </span>
    </div>
  );
}
