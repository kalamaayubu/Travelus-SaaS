"use client";

import { useBookingStatusSubscription } from "@/hooks/useBookingStatusSubscription";
import { TicketSuccessView } from "../passenger/TicketSuccessView";
import { useBookingTransactionMonitor } from "@/zustand/useBookingTransactionMonitor";
import { useItineraryStore } from "@/zustand/useItineraryStore";
import { Loader2, XCircle } from "lucide-react";
import { useEffect } from "react";

export function GlobalTransactionMonitor() {
  const { activeTransaction, resolveTransaction, clearTransaction } =
    useBookingTransactionMonitor();
  const resetItinerary = useItineraryStore((s) => s.resetItinerary);

  useBookingStatusSubscription({
    bookingId: activeTransaction?.bookingId || null,
    onBooked: (data) => resolveTransaction("SUCCESS", data),
    onFailed: () => resolveTransaction("FAILED"),
  });

  // LIVE EXPIRATION ENFORCEMENT
  useEffect(() => {
    if (!activeTransaction) return;

    const now = Date.now();
    const remaining = activeTransaction.expiresAt - now;

    if (remaining <= 0) {
      clearTransaction();
      return;
    }

    const timer = setTimeout(() => {
      clearTransaction();
    }, remaining);

    return () => clearTimeout(timer);
  }, [activeTransaction, clearTransaction]);

  if (!activeTransaction) return null;

  // DIALOG WRAPPER: For Success and Failure
  if (
    activeTransaction.status === "SUCCESS" ||
    activeTransaction.status === "FAILED"
  ) {
    return (
      <div className="fixed inset-0 z-9999 flex items-center justify-center p-6 sm:p-4">
        {/* Backdrop overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-lg animate-in fade-in duration-500" />

        <div className="relative w-full max-w-md bg-soft-dark border border-white/10 rounded-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
          {activeTransaction.status === "SUCCESS" ? (
            <TicketSuccessView
              {...activeTransaction.ticketData}
              onClose={() => {
                clearTransaction();
                resetItinerary();
              }}
            />
          ) : (
            <div className="p-10 text-center space-y-6">
              <div className="size-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
                <XCircle className="text-red-500 size-12" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                  Payment Failed
                </h2>
                <p className="text-gray-400 leading-relaxed px-4">
                  Your M-Pesa transaction was cancelled or timed out. Your seats
                  have been released.
                </p>
              </div>
              <button
                onClick={() => clearTransaction()}
                className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all active:scale-95 border border-white/5"
              >
                Close and Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // BANNER: for the WAITING state
  return (
    <div className="fixed top-0 left-0 right-0 z-100 bg-secondary p-3 flex justify-center items-center gap-4 animate-in slide-in-from-top duration-500 shadow-lg">
      <div className="flex items-center gap-3">
        <Loader2 className="animate-spin size-4 text-black" />
        <span className="text-[11px] font-black text-black uppercase tracking-[0.15em]">
          Payment Pending... Please authorize on your phone
        </span>
      </div>
    </div>
  );
}
