"use client";

import { X, ArrowLeft, CreditCard, ChevronRight, Loader2 } from "lucide-react";
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
import { useCallback, useEffect, useRef, useState } from "react";
import { TicketSuccessView } from "../passenger/TicketSuccessView";
import { useItineraryStore } from "@/zustand/useItineraryStore";
import { useBookingStatusSubscription } from "@/hooks/useBookingStatusSubscription";

export default function BookingDrawer({
  tripId,
  onClose,
}: {
  tripId: string;
  onClose: () => void;
}) {
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<
    "IDLE" | "WAITING" | "SUCCESS" | "FAILED"
  >("IDLE");
  const [ticketInfo, setTicketInfo] = useState<{
    number: string;
    encryptedBookingId: string;
    seats: string[];
  } | null>(null);

  const toastIdRef = useRef<string | number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  // DEBUGGING: observing re-renders
  // const renderCount = useRef(0);
  // useEffect(() => {
  //   renderCount.current += 1;
  //   console.log(`🔁 BookingDrawer re-rendered #${renderCount.current}`, {
  //     tripId,
  //     timestamp: Date.now(),
  //   });
  // });

  // DEBBUGING
  useEffect(() => {
    console.log("DEBBUGING...[BookingDrawer] ticketInfo:", ticketInfo);
    console.log("DEBBUGING...[BookingDrawer] paymentStatus:", paymentStatus);
  }, [ticketInfo, paymentStatus]);

  // Clean up timer and remove toast
  const clearTimerAndToast = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (toastIdRef.current) {
      toast.dismiss(toastIdRef.current);
      toastIdRef.current = null;
    }
  };

  const handleBooked = useCallback((updated: any) => {
    clearTimerAndToast();
    setTicketInfo({
      number: updated.ticket_number,
      encryptedBookingId: updated.id,
      seats: updated.seats,
    });
    setPaymentStatus("SUCCESS");
    toast.success("Payment confirmed");
  }, []);

  const handleFailed = useCallback(() => {
    clearTimerAndToast();
    setPaymentStatus("FAILED");
    toast.error("Payment processing failed.");
  }, []);

  // Subscribe to booking status changes
  useBookingStatusSubscription({
    bookingId,
    onBooked: handleBooked,
    onFailed: handleFailed,
  });

  // Toast timer clean up
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

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
  const { originName, destinationName, segmentPrice } = useItineraryStore();

  const {
    step,
    selectedSeats,
    totalFare,
    formMethods,
    formData,
    handleSeatClick,
    nextStep,
    prevStep,
  } = useBookingLogic(segmentPrice);

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
      if (!res.ok) {
        toast.error(`${result.error}`);
        return;
      }

      // Set the payment simulation data
      setBookingId(result.bookingId);
      setTicketInfo({
        number: result.ticketNumber,
        encryptedBookingId: result.encryptedBookingId,
        seats: result.seats,
      });
      setPaymentStatus("WAITING");

      const seatCount = selectedSeats.length;
      const HOLD_TIME_SECONDS = 6 * 60; // 6 minutes

      let remaining = HOLD_TIME_SECONDS;

      toastIdRef.current = toast.success(
        `${seatCount} Seat${seatCount > 1 ? "s" : ""} Reserved Successfully`,
        {
          description: `Please complete payment for seat${seatCount > 1 ? "s" : ""} ${selectedSeats.join(
            ", ",
          )}. Time remaining: 06:00`,
          duration: HOLD_TIME_SECONDS * 1000,
          dismissible: false,
        },
      );

      timerRef.current = setInterval(() => {
        remaining -= 1;

        const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
        const seconds = String(remaining % 60).padStart(2, "0");

        toast.success(
          `${seatCount} Seat${seatCount > 1 ? "s" : ""} Reserved Successfully`,
          {
            id: toastIdRef.current as string,
            description: `Please complete payment for seat${seatCount > 1 ? "s" : ""} ${selectedSeats.join(
              ", ",
            )}. Time remaining: ${minutes}:${seconds}`,
          },
        );

        if (remaining <= 0) {
          if (timerRef.current) clearInterval(timerRef.current);
        }
      }, 1000);
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
    return <div className="...">Error loading trip. Please try again.</div>;

  return (
    <div className="fixed inset-0 z-100 flex justify-end">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-soft-dark border-l border-white/10 h-full flex flex-col animate-in slide-in-from-right duration-500 shadow-2xl">
        {paymentStatus === "SUCCESS" && ticketInfo ? (
          <TicketSuccessView
            ticketNumber={ticketInfo.number}
            encryptedBookingId={ticketInfo.encryptedBookingId}
            seats={ticketInfo.seats}
            onClose={onClose}
          />
        ) : paymentStatus === "WAITING" ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-8 animate-in fade-in duration-500">
            <div className="size-24 bg-secondary/10 rounded-full flex items-center justify-center animate-pulse">
              <CreditCard size={48} className="text-secondary" />
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                Waiting for M-Pesa PIN...
              </h3>
              <p className="text-gray4 px-6">
                We've sent an STK push to your phone. Enter your PIN to complete
                the booking.
              </p>
            </div>
          </div>
        ) : paymentStatus === "FAILED" ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-6">
            <div className="size-24 bg-red-500/10 rounded-full flex items-center justify-center">
              <X size={48} className="text-red-500" />
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-black text-white uppercase">
                Payment Failed
              </h3>
              <p className="text-gray4 px-6">
                Your payment was not completed. You can try again.
              </p>
            </div>
          </div>
        ) : (
          <>
            <header className="p-6 py-4 border-b border-white/5 flex items-center justify-between bg-bg-soft/30">
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
            </header>
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
        )}
      </div>
    </div>
  );
}
