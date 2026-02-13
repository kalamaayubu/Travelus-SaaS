import { create } from "zustand";
import { persist } from "zustand/middleware";

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

interface ItineraryState extends Itinerary {
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
  segmentPrice: 0,
};

export const useItineraryStore = create<ItineraryState>()(
  persist(
    (set) => ({
      ...initialState,

      // Actions
      setItinerary: (data) => set((state) => ({ ...state, ...data })),
      resetItinerary: () => set(initialState),
    }),
    {
      name: "itinerary-storage",
    },
  ),
);
