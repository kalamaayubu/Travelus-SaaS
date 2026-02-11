import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  // if (!user)
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const request = await req.json();
  const {
    origin,
    destination,
    originName,
    destinationName,
    price,
    departureDate,
    departureTime,
    vehicleDriverLink,
    mpesaNumber,
    segments,
  } = request;

  // Combine Date and time into a single ISO string
  const fullDepartureTimestamp = `${departureDate}T${departureTime}:00`;
  console.log("Schedule data::", request);

  const { data, error } = await supabase
    .from("trips")
    .insert({
      departure_time: fullDepartureTimestamp,
      price_per_seat: price,
      departure_location_id: origin,
      destination_location_id: destination,
      destination_location_name: destinationName,
      departure_location_name: originName,
      segments: segments,
      payment_number: mpesaNumber,
      driver_vehicle_id: vehicleDriverLink,
    })
    .select("id")
    .single();

  if (error) {
    console.error("ERROR CREATING TRIP::", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  console.log("TRIP CREATED::", data);
  return NextResponse.json(
    {
      data: data,
      message: "Trip scheduled successfully",
    },
    { status: 200 },
  );
}
