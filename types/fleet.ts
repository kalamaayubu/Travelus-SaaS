export type VehicleStatus = "active" | "maintenance" | "idle";

export type VehicleType = {
  id: string;
  name: string;
  capacity: number;
  layout: "standard" | "vip"; // We'll use this later for the seat-picker
};

export interface Vehicle {
  id: string;
  registrationNumber: string; // e.g., KCH 123X
  type: string; // e.g., "14-Seater Matatu"
  status: VehicleStatus;
  currentDriver?: string;
  totalTrips: number;
  lastServiceDate: string;
}

// Pre-defined types to streamline the "Add Vehicle" process
export const VEHICLE_CATEGORIES: VehicleType[] = [
  {
    id: "14-matatu",
    name: "14-Seater Matatu",
    capacity: 14,
    layout: "standard",
  },
  {
    id: "33-minibus",
    name: "33-Seater Minibus",
    capacity: 33,
    layout: "standard",
  },
  { id: "7-shuttle", name: "7-Seater Shuttle", capacity: 7, layout: "vip" },
  { id: "52-coach", name: "52-Seater Coach", capacity: 52, layout: "standard" },
];
