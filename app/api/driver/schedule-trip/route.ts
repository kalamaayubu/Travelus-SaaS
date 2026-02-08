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

  return NextResponse.json({
    error: "TESTING",
    message: "TESTING",
  });
  const { data, error } = await supabase.from("trips").insert({
    departure_time: fullDepartureTimestamp,
    price_per_seat: price,
    departure_location: origin,
    destination_location: destination,
    segments: segments,
    payment_number: mpesaNumber,
    driver_vehicle_id: vehicleDriverLink,
  });

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
