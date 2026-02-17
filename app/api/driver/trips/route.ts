import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import dayjs from "dayjs";
import { TripSearchResponse } from "@/types/trip.types";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
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
      .eq("driver_vehicle_id.driver_id.driver_id", user.id)
      .order("departure_time", { ascending: false });

    if (error || !data) {
      console.error("ERROR: ", error);
      return NextResponse.json(
        { error: error.message || "You have no trip yet" },
        { status: 400 },
      );
    }

    if (!data) {
      console.log("404: No trips data found");
      return NextResponse.json(
        { error: "No trips data found" },
        { status: 404 },
      );
    }

    const formattedTrips = data.map((trip) => {
      // Safe access joined data
      const dv = Array.isArray(trip.driver_vehicle_id)
        ? trip.driver_vehicle_id[0]
        : trip.driver_vehicle_id;
      const vehicle = dv?.vehicle_id;
      const vType = vehicle?.vehicle_type_id;
      const capacity = vType?.capacity || 0;

      // Filter out PENDING and CANCELLED bookings
      const validBookings = (trip.bookings || []).filter(
        (b) => b.status !== "PENDING" && b.status !== "CANCELLED",
      );

      const bookedSeatsCount = validBookings.reduce(
        (total, b) => total + (b.seats?.length || 0),
        0,
      );

      // console.log("VALID BOOKINGS: ", validBookings);
      // Revenue calculation
      const revenue = validBookings.reduce(
        (totalRevenue, b) => totalRevenue + (b.amount || 0),
        0,
      );

      return {
        id: trip.id,
        displayId: trip.id.substring(0, 6).toUpperCase(),
        from: trip.departure_location_name,
        to: trip.destination_location_name,
        departureDate: dayjs(trip.departure_time).format("MMM, D, YYYY"),
        departureTime: dayjs(trip.departure_time).format("hh:mm A"),
        status: trip.status,
        bookedSeats: bookedSeatsCount,
        vehicle: {
          capacity: capacity,
        },
        totalSeats: vType?.capacity,
        revenue: revenue.toLocaleString(),
      };
    });

    // console.log("TRIPS:", formattedTrips);
    return NextResponse.json(formattedTrips);
  } catch (err) {
    console.error("Fetch trips error:", err);
    return NextResponse.json(
      { error: "Failed to fetch trips" },
      { status: 500 },
    );
  }
}
