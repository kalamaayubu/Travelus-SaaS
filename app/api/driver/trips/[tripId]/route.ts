import { createClient } from "@/lib/supabase/server";
import { DriverIndividualTripData } from "@/types/driver";
import { SeatMapStatus } from "@/types/trip.types";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { tripId: string } },
) {
  const { tripId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("Unauthorized");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data: trip, error } = await supabase
      .from("trips")
      .select(
        `
        id, departure_location_name, destination_location_name, departure_time,
        driver_vehicle_id (
            vehicle_id (
                number_plate,
                vehicle_type_id ( seats_layout, capacity )
            )
        ), 
        bookings ( id, seats, full_name, contact_number, status, amount, user_type )
      `,
      )
      .eq("id", tripId)
      .single();

    if (error || !trip) {
      console.error("ERROR: ", error.message || "Trip not found");
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const seatStatuses: Record<string, SeatMapStatus> = {};
    trip.bookings?.forEach((booking) => {
      booking.seats?.forEach((seatId: string) => {
        // Bookings: Driver-initiated = LOCKED, Passenger-initiated = BOOKED
        seatStatuses[seatId] =
          booking.user_type === "DRIVER" ? "LOCKED" : "BOOKED";
      });
    });

    const revenueValue =
      trip.bookings
        ?.filter((b) => b.status === "BOOKED" || b.status === "APPROVED")
        .reduce((sum: number, b) => sum + b.amount, 0) || 0;

    const transformedData: DriverIndividualTripData = {
      id: trip.id,
      displayId: trip.id.substring(0, 6).toUpperCase(),
      route: `${trip.departure_location_name} ➝ ${trip.destination_location_name}`,
      departure: new Date(trip.departure_time).toLocaleString("en-KE", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
      vehicle: {
        plate: trip.driver_vehicle_id?.vehicle_id?.number_plate,
        capacity: trip.driver_vehicle_id?.vehicle_id?.vehicle_type_id?.capacity,
      },
      layout: trip.driver_vehicle_id?.vehicle_id?.vehicle_type_id?.seats_layout,
      seatStatuses,
      manifest: trip.bookings || [],
      stats: {
        revenue: revenueValue.toLocaleString(),
        totalOccupied: Object.keys(seatStatuses).length,
        lockedByDriver:
          trip.bookings?.filter((b) => b.user_type === "DRIVER").length || 0,
      },
    };

    console.log("Tranformed data: ", JSON.stringify(transformedData, null, 2));
    return NextResponse.json({ transformedData });
  } catch (err: any) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
