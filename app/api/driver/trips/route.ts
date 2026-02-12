import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

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
        driver_vehicles:driver_vehicle_id (
          driver_id,
          vehicles (
            vehicle_types (
              capacity 
            )
          )   
        ),
        bookings (
          id,
          amount,
          status
        )
      `,
      )
      .eq("driver_vehicle_id.driver_id", user.id)
      .order("departure_time", { ascending: true });

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

    console.log("TRIPS DATA:", JSON.stringify(data, null, 2));

    const formattedTrips = data.map((trip) => {
      // Safe access joined data
      const dv = Array.isArray(trip.driver_vehicle_id)
        ? trip.driver_vehicle_id[0]
        : trip.driver_vehicle_id;

      const vehicle = Array.isArray(dv?.vehicles)
        ? dv.vehicles[0]
        : dv?.vehicles;
      const vType = Array.isArray(vehicle?.vehicle_types)
        ? vehicle.vehicle_types[0]
        : vehicle?.vehicle_types;

      // Revenue calculation
      const confirmedBookings = trip.bookings || [];
      const revenue = confirmedBookings.reduce((sum, b) => sum + b.amount, 0);
      // console.log("Confirmed Bookings:", confirmedBookings);
      // console.log("Trip revenue:", revenue);

      return {
        id: trip.id,
        displayId: trip.id.substring(0, 6).toUpperCase(),
        from: trip.departure_location_name,
        to: trip.destination_location_name,
        departureDate: new Date(trip.departure_time).toLocaleDateString(
          "en-KE",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          },
        ),
        departureTime: new Date(trip.departure_time).toLocaleTimeString(
          "en-KE",
          {
            hour: "2-digit",
            minute: "2-digit",
          },
        ),
        status: trip.status,
        bookedSeats: confirmedBookings.length,
        totalSeats: vType?.capacity,
        revenue: revenue.toLocaleString(),
      };
    });

    console.log("TRIPS:", formattedTrips);
    return NextResponse.json(formattedTrips);
  } catch (err) {
    console.error("Fetch trips error:", err);
    return NextResponse.json(
      { error: "Failed to fetch trips" },
      { status: 500 },
    );
  }
}
