import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";

const supabase = createClient();

interface Props {
  bookingId: string | null;
  onBooked: (data: any) => void;
  onFailed: (data: any) => void;
}

export function useBookingStatusSubscription({
  bookingId,
  onBooked,
  onFailed,
}: Props) {
  useEffect(() => {
    if (!bookingId) return;

    const channel = supabase
      .channel(`booking-${bookingId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "bookings",
          filter: `id=eq.${bookingId}`,
        },
        (payload) => {
          const updated = payload.new;
          console.log("Updated booking status:", updated.status);

          if (updated.status === "BOOKED") {
            console.log("[BookingSub] Booking SUCCESSFUL!");
            onBooked?.(updated);
          }

          if (updated.status === "FAILED") {
            console.log("[BookingSub] Booking FAILED!");
            onFailed?.(updated);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [bookingId, onBooked, onFailed]);
}
