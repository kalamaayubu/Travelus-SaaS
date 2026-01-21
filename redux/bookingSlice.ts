import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookingState {
  selectedTripId: string | null;
  selectedSeats: string[];
  passengerDetails: { name: string; phone: string };
}

const initialState: BookingState = {
  selectedTripId: null,
  selectedSeats: [],
  passengerDetails: { name: "", phone: "" },
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setTrip: (state, action: PayloadAction<string>) => {
      state.selectedTripId = action.payload;
    },
    toggleSeat: (state, action: PayloadAction<string>) => {
      const seat = action.payload;
      state.selectedSeats = state.selectedSeats.includes(seat)
        ? state.selectedSeats.filter((s) => s !== seat)
        : [...state.selectedSeats, seat];
    },
    updateDetails: (
      state,
      action: PayloadAction<{ name: string; phone: string }>,
    ) => {
      state.passengerDetails = action.payload;
    },
    resetBooking: () => initialState,
  },
});

export const { setTrip, toggleSeat, updateDetails, resetBooking } =
  bookingSlice.actions;
export default bookingSlice.reducer;
