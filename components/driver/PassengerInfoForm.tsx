"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserPlus, Loader2 } from "lucide-react";
import { BaseModal } from "../shared/BaseModal";
import { cn } from "@/lib/utils";
import { PassengerInfoSchema } from "@/lib/validations/validate";
import { toast } from "sonner";

type PassengerInfoData = z.infer<typeof PassengerInfoSchema>;

interface PassengerInfoProps {
  onClose: () => void;
  selectedSeats: string[];
  tripId: string;
}

const PassengerInfoForm = ({
  onClose,
  selectedSeats,
  tripId,
}: PassengerInfoProps) => {
  // 2. Initialize Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PassengerInfoData>({
    resolver: zodResolver(PassengerInfoSchema),
    defaultValues: {
      fullname: "",
      phone: "",
      amountPaid: 0,
    },
    mode: "onTouched",
  });

  // 3. Handle Submission
  const onSubmit = async (data: PassengerInfoData) => {
    try {
      const payload = {
        ...data,
        seats: selectedSeats,
        totalFare: selectedSeats.length * 1000,
        tripId,
      };

      console.log("Submitting Booking:", payload);

      const res = await fetch(`/api/driver/trips/${tripId}/booking/walk-in`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(`${result.error}`);
        return;
      }

      toast.success(result.message);

      onClose();
    } catch (error) {
      console.error("Booking failed", error);
    }
  };

  return (
    <BaseModal
      onClose={onClose}
      isOpen={true}
      title="Book Selected Seats"
      description={`Fill in passenger details to book ${selectedSeats.length > 1 ? "seats" : "seat"}: ${selectedSeats.join(", ")}`}
      icon={<UserPlus className="text-secondary" size={24} />}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name Field */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray4">
            Passenger Full Name
          </label>
          <input
            {...register("fullname")}
            placeholder="e.g. John Doe"
            className={cn(
              "w-full bg-white/5 border rounded-lg px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/50",
              errors.fullname
                ? "border-red-500"
                : "border-white/10 focus:border-primary",
            )}
          />
          {errors.fullname && (
            <p className="text-[10px] text-red-500 font-bold uppercase">
              {errors.fullname.message}
            </p>
          )}
        </div>

        {/* Phone Number Field */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray4">
            Contact Phone Number
          </label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="07..."
            className={cn(
              "w-full bg-white/5 border rounded-lg px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/50",
              errors.phone
                ? "border-red-500"
                : "border-white/10 focus:border-primary",
            )}
          />
          {errors.phone && (
            <p className="text-[10px] text-red-500 font-bold uppercase">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="pt-2 border-t border-white/5">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray4 mb-2 block">
            Total Amount Collected (KES)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary font-black text-sm">
              KES
            </span>
            <input
              {...register("amountPaid")}
              type="number"
              placeholder="Amount paid"
              className="w-full bg-secondary/5 border border-secondary/20 rounded-xl pl-14 pr-4 py-4 text-xl font-black text-white focus:outline-none focus:border-secondary transition-colors"
            />
          </div>
          <p className="text-[9px] text-gray5 mt-2 font-medium italic">
            * Adjust if passenger paid a different amount.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 bg-primary text-black rounded-lg font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all mt-4"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            "Confirm Booking"
          )}
        </button>
      </form>
    </BaseModal>
  );
};

export default PassengerInfoForm;
