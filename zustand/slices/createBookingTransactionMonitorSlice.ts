import { StateCreator } from "zustand";
import { PaymentStatus } from "@/types/payments";

const SIX_MINUTES = 6 * 60 * 1000;

export interface Transaction {
  bookingId: string;
  status: PaymentStatus;
  encryptedBookingId: string;
  ticketNumber: string;
  expiresAt: number;
  seats: string[];
}

export interface BookingTransactionMonitorSlice {
  activeTransaction: Transaction | null;
  startTransaction: (
    bookingId: string,
    encryptedBookingId: string,
    ticketNumber: string,
    seats: string[],
  ) => void;
  resolveTransaction: (status: "SUCCESS" | "FAILED", data?: any) => void;
  clearTransaction: () => void;
}

export const createBookingTransactionMonitorSlice: StateCreator<
  BookingTransactionMonitorSlice
> = (set, get) => ({
  activeTransaction: null,

  startTransaction: (bookingId, encryptedBookingId, ticketNumber, seats) => {
    set({
      activeTransaction: {
        bookingId,
        status: "WAITING",
        seats,
        expiresAt: Date.now() + SIX_MINUTES,
        encryptedBookingId,
        ticketNumber,
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
        ...(data?.encryptedBookingId && {
          encryptedBookingId: data.encryptedBookingId,
        }),
      },
    });
  },

  clearTransaction: () => set({ activeTransaction: null }),
});
