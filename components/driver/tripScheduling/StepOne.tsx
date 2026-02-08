"use client";
import { useFormContext } from "react-hook-form";
import { MapPin, Banknote } from "lucide-react";
import { cn } from "@/lib/utils";
import { TripSchedulingFields } from "@/types/driver";
import { KENYA_LOCATIONS } from "@/constants/location"; // Syncing with bundle

const inputClasses =
  "w-full bg-white/5 border border-white/10 rounded-lg px-4 h-12 text-sm text-white outline-none focus:border-primary transition-all placeholder:text-gray2";
const labelClasses =
  "text-[9px] font-black uppercase tracking-widest text-gray2 flex items-center gap-2 mb-1.5";

export default function StepOne() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<TripSchedulingFields>();

  const origin = watch("origin");
  const destination = watch("destination");

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div>
        <label className={labelClasses}>
          <MapPin size={10} className="text-primary" /> Departure City
        </label>
        {/* Switched to Select to match architecture */}
        <select
          {...register("origin", { required: "Origin is required" })}
          className={cn(inputClasses, "appearance-none")}
        >
          <option value="" className="bg-slate-900">
            Select Origin
          </option>
          {KENYA_LOCATIONS.filter((l) => l.id !== destination).map((loc) => (
            <option key={loc.id} value={loc.id} className="bg-slate-900">
              {loc.name}
            </option>
          ))}
        </select>
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
        <select
          {...register("destination", { required: "Destination is required" })}
          className={cn(inputClasses, "appearance-none")}
        >
          <option value="" className="bg-slate-900">
            Select Destination
          </option>
          {KENYA_LOCATIONS.filter((l) => l.id !== origin).map((loc) => (
            <option key={loc.id} value={loc.id} className="bg-slate-900">
              {loc.name}
            </option>
          ))}
        </select>
        {errors.destination && (
          <p className="text-[9px] text-red-500 font-bold uppercase mt-1">
            {errors.destination.message}
          </p>
        )}
      </div>

      <div>
        <label className={labelClasses}>
          <Banknote size={10} className="text-primary" /> Fare Per Seat (KES)
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
  );
}
