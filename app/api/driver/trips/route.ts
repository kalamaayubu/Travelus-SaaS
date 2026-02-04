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

  console.log("USER/DRIVER:", user.id);

  try {
    const { data, error } = await supabase
      .from("trips")
      .select(
        `
        id,
        departure_location,
        destination_location,
        departure_time,
        status,
        total_capacity,
        driver_vehicle_id (
            driver_id
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

    console.log("TRIPS DATA:", data);

    const formattedTrips = data.map((trip) => {
      const confirmedBookings = trip.bookings || [];
      const revenue = confirmedBookings.reduce((sum, b) => sum + b.amount, 0);
      console.log("Confirmed Bookings:", confirmedBookings);
      console.log("Trip revenue:", revenue);

      return {
        id: trip.id,
        displayId: trip.id.substring(0, 6).toUpperCase(),
        from: trip.departure_location,
        to: trip.destination_location,
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
        totalSeats: trip.total_capacity,
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
