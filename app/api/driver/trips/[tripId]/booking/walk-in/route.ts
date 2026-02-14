import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const request = await req.json();
  const { tripId, fullname, phone, totalFare, seats } = request;

  console.log("DAATA: ", request);

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      trip_id: tripId,
      user_type: "DRIVER",
      amount: totalFare,
      seats: seats,
      status: "BOOKED",
      full_name: fullname,
      contact_number: phone,
      booked_at: new Date().toISOString(),
    })
    .select("ticket_number, booked_at");

  if (error) {
    if (error.message === "CONFLICTING_SEATS") {
      return NextResponse.json(
        {
          error: `The ${seats.length > 1 ? "seats have" : "seat has"} just been occupied now. Choose another.`,
        },
        { status: 400 },
      );
    }

    console.error("ERROR LOCKING SEATS:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  console.log("LOCKED SEATS DATA: ", data);
  return NextResponse.json({
    data: data,
    message: `${request.seats.length} ${request.seats > 1 ? "Seats" : "Seat"} booked successfully!`,
  });
}
