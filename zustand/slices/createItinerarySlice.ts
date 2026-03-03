import { StateCreator } from "zustand";

export interface Itinerary {
  tripId: string;
  tripOrigin: string;
  tripDestiny: string;
  departureTime: string;
  originId: string;
  originName: string;
  destinationId: string;
  destinationName: string;
  selectedSeats: string[];
  segmentPrice: number;
  totalFare: number;
}

export interface ItinerarySlice extends Itinerary {
  setItinerary: (data: Partial<Itinerary>) => void;
  resetItinerary: () => void;
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
  selectedSeats: [],
  segmentPrice: 0,
  totalFare: 0,
};

export const createItinerarySlice: StateCreator<ItinerarySlice> = (set) => ({
  ...initialState,
  setItinerary: (data) => set((state) => ({ ...state, ...data })),
  resetItinerary: () => set(initialState),
});
