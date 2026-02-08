"use client";
import { useFormContext } from "react-hook-form";
import { Calendar, Clock, Car } from "lucide-react";
import { cn } from "@/lib/utils";
import { TripSchedulingFields } from "@/types/driver";
import { useDriverVehicles } from "@/hooks/useDriverVehicles";
import { DriverVehicleLink } from "@/types/trip.types";

const inputClasses =
  "w-full bg-white/5 border border-white/10 rounded-lg px-4 h-12 text-sm text-white outline-none focus:border-primary transition-all";
const labelClasses =
  "text-[9px] font-black uppercase tracking-widest text-gray2 flex items-center gap-2 mb-1.5";

export default function StepTwo() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TripSchedulingFields>();

  const { data: vehicles, isLoading, error, refetch } = useDriverVehicles();

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
          {...register("vehicleDriverLink", { required: "Select a vehicle" })}
          className={cn(inputClasses, "appearance-none cursor-pointer")}
        >
          <option value="" className="bg-dark text-gray2">
            Choose vehicle...
          </option>
          {isLoading ? (
            <option>Loading your vehicles...</option>
          ) : error ? (
            <option>Error loading vehicles</option>
          ) : (
            <>
              {vehicles?.map((v: DriverVehicleLink) => (
                <option key={v.id} value={v.id} className="bg-dark">
                  {v.driver_vehicle_link.number_plate} •{" "}
                  {v.driver_vehicle_link.vehicle_types.type_name} • (
                  {v.driver_vehicle_link.vehicle_types.capacity} Seats)
                </option>
              ))}
            </>
          )}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          {isLoading && (
            <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          )}
          {error && (
            <button
              onClick={() => refetch()}
              className="text-[10px] text-red-500 underline pointer-events-auto"
            >
              Retry
            </button>
          )}
        </div>
        {errors.vehicleDriverLink && (
          <p className="text-[9px] text-red-500 font-bold uppercase mt-1">
            {errors.vehicleDriverLink.message}
          </p>
        )}
      </div>
    </div>
  );
}
