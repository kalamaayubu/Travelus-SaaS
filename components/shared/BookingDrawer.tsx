"use client";

import {
  X,
  ArrowLeft,
  CreditCard,
  ChevronRight,
  Loader2,
  FileWarning,
} from "lucide-react";
import { useBookingLogic } from "@/hooks/useBookingLogic";
import {
  DetailsView,
  PaymentView,
  SeatSelectionView,
} from "../trip/BookingSteps";
import { useQuery } from "@tanstack/react-query";
import { TripCardSkeleton } from "../trip/TripCardSkeleton";
import { toast } from "sonner";
import { PassangerBookingProps } from "@/types/trip.types";
import {
  bookingTransactionSelector,
  itinerarySelector,
  useGlobalStore,
} from "@/zustand/useGlobalStore";

export default function BookingDrawer({
  tripId,
  onClose,
}: {
  tripId: string;
  onClose: () => void;
}) {
  const { startTransaction } = useGlobalStore(bookingTransactionSelector);

  // DEBUGGING: observing re-renders
  // const renderCount = useRef(0);
  // useEffect(() => {
  //   renderCount.current += 1;
  //   console.log(`🔁 BookingDrawer re-rendered #${renderCount.current}`, {
  //     tripId,
  //     timestamp: Date.now(),
  //   });
  // });

  // Fetch trip details
  const { data, error, isLoading } = useQuery({
    queryKey: ["trip-details", tripId],
    queryFn: async () => {
      const res = await fetch(`/api/trips/${tripId}/details`);
      if (!res.ok) throw new Error("Failed to load seats");

      const result = await res.json();
      console.log("RAW API RESULT: ", result); // Log the local variable, not 'data'
      return result;
    },
    enabled: !!tripId,
    staleTime: 1000,
    refetchInterval: 1000 * 60 * 3,
    refetchIntervalInBackground: false,
  });

  // 1. Get segment data from the store
  const { originName, destinationName } = useGlobalStore(itinerarySelector);

  const {
    step,
    selectedSeats,
    totalFare,
    formMethods,
    formData,
    handleSeatClick,
    nextStep,
    prevStep,
  } = useBookingLogic();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = formMethods;

  // Handle booking action
  const onFinalSubmit = async (data: PassangerBookingProps) => {
    const bookingPayload = { ...data, tripId, selectedSeats, totalFare };

    try {
      const res = await fetch(`/api/payments/mpesa/booking`, {
        method: "POST",
        body: JSON.stringify({ bookingPayload }),
      });

      const result = await res.json();
      console.log("🎯 API Response:", result);

      if (!res.ok) {
        toast.error(`${result.error}`);
        return;
      }

      // Monitor transaction state globally
      startTransaction(
        result.bookingId,
        result.encryptedBookingId,
        result.ticketNumber,
        selectedSeats,
      );

      onClose();
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Deciding between navigation and final submission
  const handleAction = () => {
    if (step === "PAYMENT") {
      handleSubmit(onFinalSubmit)();
    } else {
      nextStep();
    }
  };

  // Loading and error states
  if (isLoading)
    return (
      <div className="fixed inset-0 z-100 flex justify-end">
        <div className="absolute inset-0 bg-black/80" onClick={onClose} />
        <div className="relative w-full max-w-md bg-soft-dark h-full p-8">
          <TripCardSkeleton />
          <TripCardSkeleton />
          <div className="relative w-full max-w-md bg-soft-dark h-full p-8 flex flex-col justify-center items-center">
            <Loader2 className="animate-spin text-secondary mb-4" size={40} />
            <h2 className="text-xl font-black uppercase text-white">
              {originName} ➙ {destinationName}
            </h2>
            <p className="text-gray4 mt-2">Fetching live seat map...</p>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col  text-red-500 items-center">
        <FileWarning className="size-12 text-red-500" />
        <div className="text-2xl text-center">
          Could not load seats Please check your internet connection and try
          again.
        </div>
      </div>
    );

  return (
    <div className="fixed inset-0 z-100 flex justify-end">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-soft-dark border-l border-white/10 h-full flex flex-col animate-in slide-in-from-right duration-500 shadow-2xl">
        <>
          {/* Booking drawer heading */}
          <div className="p-6 py-4 border-b border-white/5 flex items-center justify-between bg-bg-soft/30">
            <div className="flex items-center gap-4">
              {step !== "SEATS" && (
                <button
                  onClick={prevStep}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              <h2 className="text-xl font-black uppercase tracking-tighter text-primary leading-none">
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

          {/* Steps views */}
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {step === "SEATS" && (
              <SeatSelectionView
                layout={data?.layout}
                booked={data?.occupiedSeats}
                reserved={[]}
                selected={selectedSeats}
                onSeatClick={handleSeatClick}
              />
            )}
            {step === "DETAILS" && (
              <DetailsView register={register} errors={errors} />
            )}
            {step === "PAYMENT" && (
              <PaymentView
                totalFare={totalFare}
                mpesaNumber={formData.mpesaNumber}
                fullName={formData.fullName}
                seats={selectedSeats}
                trip={data.trip}
              />
            )}
          </div>

          <footer className="p-6 border-t border-white/5 bg-bg-soft/50 space-y-4 backdrop-blur-md">
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
                <p className="text-xl font-black uppercase tracking-tighter text-secondary">
                  KES&nbsp;&nbsp; {totalFare.toLocaleString()}
                </p>
              </div>
            </div>

            <button
              disabled={
                isSubmitting ||
                (step === "SEATS" ? selectedSeats.length === 0 : !isValid)
              }
              onClick={handleAction}
              className="primary-btn w-full h-14 rounded-xl flex items-center justify-center gap-3 disabled:opacity-70 transition-all group shadow-xl shadow-primary/10"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  <span className="uppercase tracking-[0.2em] font-black text-sm">
                    Sending Request...
                  </span>
                </>
              ) : (
                <>
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
                </>
              )}
            </button>
          </footer>
        </>
      </div>
    </div>
  );
}
