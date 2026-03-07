import { createClient } from "@/lib/supabase/server";
import dayjs from "dayjs";

export async function fetchDriverTrips(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase

    .from("trips")
    .select(
      `
      id,
      departure_location_name,
      destination_location_name,
      departure_time,
      status,
      driver_vehicle_id (
        driver_id (
          driver_id
        ),
        vehicle_id (
          vehicle_type_id (
            capacity
          )
        )
      ),
      bookings (
        id,
        amount,
        seats,
        status
      )
    `,
    )
    .eq("driver_vehicle_id.driver_id.driver_id", userId)
    .order("departure_time", { ascending: false });

  if (error) throw error;

  return data.map((trip) => {
    const dv = Array.isArray(trip.driver_vehicle_id)
      ? trip.driver_vehicle_id[0]
      : trip.driver_vehicle_id;

    const vType = dv?.vehicle_id?.vehicle_type_id;
    const capacity = vType?.capacity || 0;

    const validBookings = (trip.bookings || []).filter(
      (b) => b.status !== "PENDING" && b.status !== "CANCELLED",
    );

    const bookedSeatsCount = validBookings.reduce(
      (t, b) => t + (b.seats?.length || 0),
      0,
    );

    const revenue = validBookings.reduce((t, b) => t + (b.amount || 0), 0);

    return {
      id: trip.id,
      displayId: trip.id.substring(0, 6).toUpperCase(),
      from: trip.departure_location_name,
      to: trip.destination_location_name,
      departureDate: dayjs(trip.departure_time).format("MMM, D, YYYY"),
      departureTime: dayjs(trip.departure_time).format("hh:mm A"),
      status: trip.status,
      bookedSeats: bookedSeatsCount,
      vehicle: { capacity },
      totalSeats: capacity,
      revenue: revenue.toLocaleString(),
    };
  });
}
