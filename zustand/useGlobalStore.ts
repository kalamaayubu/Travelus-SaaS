import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  createItinerarySlice,
  ItinerarySlice,
} from "./slices/createItinerarySlice";
import {
  BookingTransactionMonitorSlice,
  createBookingTransactionMonitorSlice,
} from "./slices/createBookingTransactionMonitorSlice";

type AppState = ItinerarySlice & BookingTransactionMonitorSlice;

export const useGlobalStore = create<AppState>()(
  persist(
    (...a) => ({
      ...createItinerarySlice(...a),
      ...createBookingTransactionMonitorSlice(...a),
    }),
    {
      name: "travelus-app-storage",
      storage: createJSONStorage(() => localStorage),
      // Passive expiry check for the booking portion
      onRehydrateStorage: () => (state) => {
        if (
          state?.activeTransaction &&
          Date.now() > state.activeTransaction.expiresAt
        ) {
          state.clearTransaction();
        }
      },
    },
  ),
);

export const itinerarySelector = (state: AppState) => state as ItinerarySlice;
export const bookingTransactionSelector = (state: AppState) =>
  state as BookingTransactionMonitorSlice;
