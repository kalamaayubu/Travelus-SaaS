import { LocationId } from "@/constants/location";
import {
  BookingStatus,
  SeatMapStatus,
  TripStatus,
  UserType,
} from "./trip.types";

export interface TripSegment {
  location_id: LocationId | "";
  price_to_destination: number;
  location_name: string | "";
  rank: number;
}

export interface TripSchedulingFields {
  origin: LocationId | "";
  destination: LocationId | "";
  price: string;
  departureDate: string;
  departureTime: string;
  vehicleDriverLink: string;
  mpesaNumber: string;
  segments: TripSegment[];
}

export interface DriverTripsResponse {
  id: string;
  displayId: string;
  from: string;
  to: string;
  departureDate: string;
  departureTime: string;
  status: TripStatus;
  bookedSeats: number;
  totalSeats: number;
  revenue: string;
}

export interface ManifestEntry {
  id: string;
  seats: string[];
  full_name: string;
  contact_number: string;
  status: BookingStatus;
  amount: number;
  user_type: UserType;
  pickup_point?: string;
}

export interface DriverIndividualTripData {
  id: string;
  displayId: string;
  route: string;
  departure: string;
  vehicle: {
    plate: string;
    capacity: number;
  };
  layout: any;
  seatStatuses: Record<string, SeatMapStatus>;
  manifest: ManifestEntry[];
  stats: {
    revenue: string;
    totalOccupied: number;
    lockedByDriver: number;
  };
}
