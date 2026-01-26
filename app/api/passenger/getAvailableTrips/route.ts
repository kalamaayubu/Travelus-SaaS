import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("ride_posts")
    .select(
      `
            id,
            departureLocation,
            destinationLocation,
            departureTime,
            pricePerSeat,
            status,
            vehicle_types (
                type_name,
                capacity
            ),
            bookings (
                count
            )
        `,
    )
    .order("departureTime", { ascending: true })
    .eq("status", "Active");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const transformedData = data?.map((ride) => {
    const bookedSeats =
      ride.bookings?.reduce(
        (total, booking) => total + (booking.count || 0),
        0,
      ) || 0;

    const vehicleCapacity = ride.vehicle_types?.capacity || 0;
    const availableSeats = vehicleCapacity - bookedSeats;

    return {
      id: ride.id || "",
      departureLocation: ride.departureLocation,
      destinationLocation: ride.destinationLocation,
      departureTime: ride.departureTime,
      pricePerSeat: ride.pricePerSeat,
      vehicle: ride.vehicle_types?.type_name,
      availableSeats: availableSeats > 0 ? availableSeats : 0,
      status: ride.status,
    };
  });

  return NextResponse.json(transformedData || []);
}
