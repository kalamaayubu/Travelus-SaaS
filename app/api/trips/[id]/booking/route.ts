import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const data = await req.json();

  // console.log("BOOKING DATA:", data);
  const { bookingPayload } = data;

  try {
    const { data: booking, error } = await supabase
      .from("bookings")
      .insert({
        trip_id: bookingPayload.tripId,
        full_name: bookingPayload.fullName,
        user_type: "PASSENGER",
        amount: bookingPayload.totalFare,
        contact_number: bookingPayload.contactNumber,
        mpesa_number: bookingPayload.mpesaNumber,
        seats: bookingPayload.selectedSeats,
        email: bookingPayload.email,
      })
      .select("id")
      .single();
    if (error) {
      // conflicting seats custom error
      if (error.message.includes("CONFLICTING_SEATS")) {
        return NextResponse.json(
          {
            error: `Seat(s) occupied now. Please select another.`,
          },
          { status: 409 },
        );
      }
      console.error("ERROR:", error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("DATA:", booking);
    return NextResponse.json(
      { data: booking, message: "Seat(s) reserved successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("UNKNOWN ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
