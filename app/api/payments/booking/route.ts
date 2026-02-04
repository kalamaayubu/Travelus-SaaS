import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const supabase = await createClient();
  const { bookingId } = await req.json();

  console.log("SIMULATING...");

  try {
    const { data, error } = await supabase
      .from("bookings")
      .update({ status: "BOOKED" })
      .eq("id", bookingId)
      .select("id, seats");

    if (error || !data || data.length === 0) {
      console.error("Error:", error);
      return NextResponse.json(
        { error: error?.message || "Booking not found or expired." },
        { status: 404 },
      );
    }
    // Generate ticket number from UUID prefix
    const result = data[0]; // Manually get the first item
    const ticketNumber = result.id.split("-")[0].toUpperCase();

    return NextResponse.json(
      {
        success: true,
        ticketNumber,
        bookingId: bookingId,
        seats: result.seats,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Error occured: ", err);
    return NextResponse.json({ error: "Confirmation failed" }, { status: 500 });
  }
}
