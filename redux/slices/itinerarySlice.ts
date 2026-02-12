import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Itinerary {
  tripId: string;
  tripOrigin: string;
  tripDestiny: string;
  departureTime: string;
  originId: string;
  originName: string;
  destinationId: string;
  destinationName: string;
  segmentPrice: number;
}

const initialState: Itinerary = {
  tripId: "",
  tripOrigin: "",
  tripDestiny: "",
  departureTime: "",
  originId: "",
  originName: "",
  destinationId: "",
  destinationName: "",
  segmentPrice: 0,
};

const itinerarySlice = createSlice({
  name: "itinerary",
  initialState,
  reducers: {
    setItinerary: (state, action: PayloadAction<Itinerary>) => {
      return { ...state, ...action.payload };
    },
    resetItinerary: () => initialState,
  },
});

export const { setItinerary, resetItinerary } = itinerarySlice.actions;
export default itinerarySlice.reducer;
