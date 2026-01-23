"use client";
import { useFormContext } from "react-hook-form";
import { Calendar, Clock, Car } from "lucide-react";
import { cn } from "@/lib/utils";
import { TripSchedulingFields } from "@/types/driver";

const inputClasses =
  "w-full bg-white/5 border border-white/10 rounded-lg px-4 h-12 text-sm text-white outline-none focus:border-primary transition-all";
const labelClasses =
  "text-[9px] font-black uppercase tracking-widest text-gray2 flex items-center gap-2 mb-1.5";

export default function StepTwo() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TripSchedulingFields>();

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClasses}>
            <Calendar size={10} className="text-primary" /> Travel Date
          </label>
          <input
            type="date"
            {...register("departureDate", { required: "Date required" })}
            className={cn(inputClasses, "scheme-dark")}
          />
          {errors.departureDate && (
            <p className="text-[9px] text-red-500 font-bold uppercase mt-1">
              {errors.departureDate.message}
            </p>
          )}
        </div>
        <div>
          <label className={labelClasses}>
            <Clock size={10} className="text-primary" /> Time
          </label>
          <input
            type="time"
            {...register("departureTime", { required: "Time required" })}
            className={cn(inputClasses, "scheme-dark")}
          />
          {errors.departureTime && (
            <p className="text-[9px] text-red-500 font-bold uppercase mt-1">
              {errors.departureTime.message}
            </p>
          )}
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
          <option value="" className="bg-dark text-gray2">
            Choose vehicle...
          </option>
          <option value="KDM 123X" className="bg-dark">
            KDM 123X (14-Seater)
          </option>
          <option value="KCP 882B" className="bg-dark">
            KCP 882B (10-Seater)
          </option>
        </select>
        {errors.vehicle && (
          <p className="text-[9px] text-red-500 font-bold uppercase mt-1">
            {errors.vehicle.message}
          </p>
        )}
      </div>
    </div>
  );
}
