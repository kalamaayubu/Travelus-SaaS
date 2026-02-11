/**
 * @component SearchBar
 * @description A form component using react-hook-form to capture trip criteria.
 * Syncs input data with the browser URL to maintain shareable search states.
 * @param {Object} props
 * @param {Function} props.startTransition - Transition function to manage navigation pending state.
 * @param {boolean} props.isPending - Indicates if a search/navigation is currently in progress.
 */

"use client";

import { TripSearchParams } from "@/types/trip.types";
import { Calendar, Search, Loader2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useRouter, usePathname } from "next/navigation";
import { KENYA_LOCATIONS } from "@/constants/location";

interface SearchBarProps {
  startTransition: (callback: () => void) => void;
  isPending: boolean;
}
export const SearchBar = ({ startTransition, isPending }: SearchBarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useFormContext<TripSearchParams>();

  const origin = watch("origin");

  const onSubmit = async (data: TripSearchParams) => {
    const { origin, destination, date } = data;

    // Update URL with search params
    const params = new URLSearchParams();
    params.set("origin", origin.trim());
    params.set("destination", destination.trim());
    params.set("date", date);

    // Small delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Navigate to same page with new params
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-soft-dark p-3 rounded-2xl border border-white/10 flex flex-col lg:items-center lg:flex-row gap-3"
    >
      <div className="flex flex-col space-y-2">
        <select
          {...register("origin")}
          className="bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:border-secondary transition outline-none appearance-none"
        >
          <option value="">From</option>
          {KENYA_LOCATIONS.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      {/* Destination Select */}
      <div className="flex flex-col space-y-2">
        <select
          {...register("destination")}
          className="bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:border-secondary transition outline-none appearance-none"
        >
          <option value="">To</option>
          {KENYA_LOCATIONS.filter((l) => l.id !== origin).map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-primary pointer-events-none" />
          <input
            {...register("date", {
              required: "Date is required",
              validate: (value) => {
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return (
                  selectedDate >= today || "Date must be today or in the future"
                );
              },
            })}
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className={`w-full ${errors.date ? "border-destructive" : "border-white"} h-12 bg-dark border pl-12 pr-4 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-all color-scheme-dark`}
            style={{ colorScheme: "dark" }}
          />
        </div>
        {errors.date && (
          <p className="text-destructive text-sm mt-1">
            {errors.date.message as string}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="primary-btn flex items-center gap-4 justify-center h-12 px-8 rounded-xl disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Loader2 className="animate-spin size-5" />
            <span className="uppercase font-bold tracking-widest text-xs">
              Searching...
            </span>
          </>
        ) : (
          <>
            <Search size={20} />
            <span className="uppercase font-bold tracking-widest text-xs">
              Search Trips
            </span>
          </>
        )}
      </button>
    </form>
  );
};
