"use client";
import { useFormContext } from "react-hook-form";
import { Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { TripSchedulingFields } from "@/types/driver";

const inputClasses =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 h-12 text-sm text-white outline-none focus:border-primary transition-all";
const labelClasses =
  "text-[9px] font-black uppercase tracking-widest text-gray2 flex items-center gap-2 mb-1.5";

export default function StepThree() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TripSchedulingFields>();

  return (
    <div className="space-y-4">
      <div>
        <label className={labelClasses}>
          <Phone size={10} className="text-primary" /> M-Pesa Payout Number
        </label>
        <input
          {...register("mpesaNumber", { required: "Payout number required" })}
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
          placeholder="e.g. Kencom, Westlands..."
          className={cn(inputClasses, "h-20 py-3 resize-none text-xs")}
        />
      </div>
      <div>
        <label className={labelClasses}>
          <MapPin size={10} className="text-primary" /> Drop-off Points
        </label>
        <textarea
          {...register("dropoffPoints")}
          placeholder="e.g. Voi, Miritini..."
          className={cn(inputClasses, "h-20 py-3 resize-none text-xs")}
        />
      </div>
    </div>
  );
}
