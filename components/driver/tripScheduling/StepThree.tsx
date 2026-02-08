"use client";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Phone, MapPin, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { TripSchedulingFields } from "@/types/driver";
import { KENYA_LOCATIONS, LocationId } from "@/constants/location";

const inputClasses =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 h-12 text-sm text-white outline-none focus:border-primary transition-all";
const labelClasses =
  "text-[9px] font-black uppercase tracking-widest text-gray2 flex items-center gap-2 mb-1.5";

export default function StepThree() {
  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<TripSchedulingFields>();

  // 1. Watch Step One values
  const originId = watch("origin");
  const destinationId = watch("destination");
  const watchedSegments = watch("segments") || [];
  const price = watch("price");

  // 2. Find names for the dynamic label
  const destinationName =
    KENYA_LOCATIONS.find((l) => l.id === destinationId)?.name || "Destination";

  const routeLocations = (() => {
    const startIndex = KENYA_LOCATIONS.findIndex((l) => l.id === originId);
    const endIndex = KENYA_LOCATIONS.findIndex((l) => l.id === destinationId);

    const start = Math.min(startIndex, endIndex);
    const end = Math.max(startIndex, endIndex);

    return KENYA_LOCATIONS.slice(start, end + 1);
  })();
  // Use field array to manage the dynamic list of segments
  const { fields, append, remove } = useFieldArray({
    control,
    name: "segments", // This matches the JSONB column in your DB
  });

  return (
    <div className="space-y-6">
      {/* Payout Number remains unchanged */}
      <div>
        <label className={labelClasses}>
          <Phone size={10} className="text-primary" /> M-Pesa Payout Number
        </label>
        <input
          {...register("mpesaNumber", { required: "Payout number required" })}
          className={cn(inputClasses, "font-mono text-primary")}
          placeholder="07..."
        />
        {errors.mpesaNumber && (
          <p className="text-[9px] text-red-500 font-bold uppercase mt-1">
            {errors.mpesaNumber.message}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className={labelClasses}>
            <MapPin size={10} className="text-primary" />
            Stops & Pricing to {destinationName}
          </label>
          <button
            type="button"
            onClick={() =>
              append({
                location_id: "",
                location_name: "",
                price_to_destination: 0,
                rank: fields.length,
              })
            }
            className="text-[9px] bg-primary/10 text-primary px-2 py-1 rounded flex items-center gap-1 hover:bg-primary/20 transition-all"
          >
            <Plus size={10} /> Add Stop
          </button>
        </div>

        {/* Dynamic List of Stops */}
        <div className="space-y-3">
          {fields.map((field, index) => {
            // 2. Logic: Get all IDs selected in OTHER rows
            const otherSelectedIds = watchedSegments
              .filter((_, i) => i !== index)
              .map((s) => s.location_id);

            return (
              <div
                key={field.id}
                className="flex gap-2 items-end animate-in fade-in slide-in-from-top-2"
              >
                <div className="flex-1">
                  <select
                    {...register(`segments.${index}.location_id` as const)}
                    className={cn(inputClasses, "text-xs appearance-none")}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      const name =
                        KENYA_LOCATIONS.find((l) => l.id === selectedId)
                          ?.name || "";

                      // Manually set both values in the form state
                      setValue(
                        `segments.${index}.location_id`,
                        selectedId as LocationId,
                      );
                      setValue(`segments.${index}.location_name`, name);
                    }}
                  >
                    <option value="" className="bg-slate-900">
                      Select Stage
                    </option>
                    {/* Filter out IDs used in other rows */}
                    {routeLocations
                      .filter((loc) => !otherSelectedIds.includes(loc.id))
                      .map((loc) => (
                        <option
                          key={loc.id}
                          value={loc.id}
                          className="bg-slate-900"
                        >
                          {loc.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="w-28">
                  <input
                    type="number"
                    placeholder="P2D"
                    {...register(
                      `segments.${index}.price_to_destination` as const,
                      {
                        valueAsNumber: true,
                        max: { value: price, message: "Exceeds..." },
                      },
                    )}
                    className={cn(
                      inputClasses,
                      "font-mono text-center text-primary",
                    )}
                  />
                  {errors.segments?.[index]?.price_to_destination && (
                    <p className="text-[9px] text-red-500 font-bold uppercase mt-1 text-center">
                      {errors.segments[index]?.price_to_destination?.message}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="h-12 px-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })}

          {fields.length === 0 && (
            <p className="text-xs text-gray5 italic text-center py-4 border border-dashed border-white/10 rounded-lg">
              No pickup points added yet. Use "Add Stop" to define your route.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
