import { PaymentStatus } from "@/types/payments";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Transaction {
  bookingId: string;
  status: PaymentStatus;
  ticketData?: any;
  expiresAt: number;
}

interface BookingState {
  activeTransaction: Transaction | null;
  startTransaction: (bookingId: string) => void;
  resolveTransaction: (status: "SUCCESS" | "FAILED", data?: any) => void;
  clearTransaction: () => void;
}

const SIX_MINUTES = 6 * 60 * 1000;

export const useBookingTransactionMonitor = create<BookingState>()(
  persist(
    (set, get) => ({
      activeTransaction: null,

      startTransaction: (bookingId) => {
        const expiresAt = Date.now() + SIX_MINUTES;

        set({
          activeTransaction: {
            bookingId,
            status: "WAITING",
            expiresAt,
          },
        });
      },

      resolveTransaction: (status, data) => {
        const current = get().activeTransaction;
        if (!current) return;

        set({
          activeTransaction: {
            ...current,
            status,
            ticketData: data,
          },
        });
      },

      clearTransaction: () => {
        set({ activeTransaction: null });
      },
    }),
    {
      name: "booking-transaction-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
