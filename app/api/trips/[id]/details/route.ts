import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("trips")
    .select(
      `
      id,
      price_per_seat,
      departure_time,
      departure_location,
      destination_location,
      driver_vehicle_id (
        vehicle_id (
          number_plate,
          vehicle_type_id (
            type_name,
            seats_layout
          )
        )
      ),
      bookings (
        seats,
        status
      )
    `,
    )
    .eq("id", id)
    .in("bookings.status", ["CONFIRMED", "RESERVED"]) // Filter joined relation
    .single();

  if (error || !data) {
    console.error("Error: ", error.message || "No data found");
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  console.log("TRIP DETAILS: ", JSON.stringify(data, null, 2));

  // Flatten the 'seats' arrays from all bookings into one 'occupied' list
  const occupiedSeats = data.bookings?.flatMap((b: any) => b.seats) || [];

  const dv = Array.isArray(data.driver_vehicle_id)
    ? data.driver_vehicle_id[0]
    : data.driver_vehicle_id;
  const vType = dv?.vehicle_id?.vehicle_type_id;

  return NextResponse.json({
    trip: data,
    layout: vType?.seats_layout,
    occupiedSeats,
  });
}
