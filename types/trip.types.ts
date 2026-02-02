export interface Trip {
  id: string;
  departure_time: string;
  departure_location: string;
  destination_location: string;
  price_per_seat: number;
  total_capacity: number;
  created_at?: string;
  updated_at?: string;
  driver_vehicle_id?: string;
}

export interface Vehicle {
  id: string;
  number_plate: string;
  vehicle_type_id: string;
  created_at?: string;
}

export interface VehicleType {
  id: string;
  type_name: string;
  capacity: number;
  seats_layout: object;
  created_at?: string;
}

// Combined types for the API response
export interface TripSearchResponse {
  id: string;
  departure_time: string;
  departure_location: string;
  destination_location: string;
  price_per_seat: number;
  total_capacity: number;
  available_seats: number;
  driver_id?: string;
  vehicle: {
    number_plate: string;
    type_name?: string;
    capacity: number;
  };
}

export interface TripSearchParams {
  origin: string;
  destination: string;
  date: string;
}

export interface TripSearchMetaData {
  count: number;
  origin: string;
  destination: string;
  date: string;
}

export interface TripSearchApiResponse {
  data: TripSearchResponse[];
  meta: TripSearchMetaData;
}

export interface ApiErrorResponse {
  error: string;
  details?: any;
}

// Booking
export interface PassangerBookingProps {
  fullName: string;
  contactNumber: string;
  mpesaNumber: string;
  email?: string;
}
