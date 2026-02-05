import { decrypt } from "@/lib/crypto";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  // 1. Authenticate the person scanning (The Driver)
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { qrData, currentTripId } = await request.json();

    // 2. Decrypt booking id
    let bookingId: string;
    try {
      bookingId = decrypt(qrData);
    } catch (err) {
      console.error("Failed to decode ticket:", err);
      return NextResponse.json(
        { success: false, error: "Invalid QR format" },
        { status: 400 },
      );
    }

    // Fetch Booking only if it belongs to a trip of this user(Driver)
    const { data: booking, error: fetchError } = await supabase
      .from("bookings")
      .select(
        ` 
        id, 
        full_name, 
        trip_id, 
        status, 
        seats, 
        amount,
        trips (
          driver_vehicles (
            driver_id
          )
        )
      `,
      )
      .eq("id", bookingId)
      .eq("trips.driver_vehicles.driver_id", user.id)
      .maybeSingle();

    // If fetchError exists, it means either the ticket is wrong OR it's not the driver's trip
    if (fetchError) {
      return NextResponse.json(
        {
          success: false,
          error: fetchError.message || "Ticket not found or Access Denied",
        },
        { status: 404 },
      );
    }

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          error: "Ticket not found",
        },
        { status: 404 },
      );
    }

    // 4. Verification: Does this ticket belong to the specific trip being scanned?
    if (booking.trip_id !== currentTripId) {
      return NextResponse.json(
        {
          success: false,
          error: "Wrong Trip: Ticket is for a different schedule.",
        },
        { status: 400 },
      );
    }

    // 5. Update Status: Mark as APPROVED
    const { error: updateError } = await supabase
      .from("bookings")
      .update({ status: "APPROVED" })
      .eq("id", booking.id);

    if (updateError) throw updateError;

    return NextResponse.json({
      success: true,
      data: {
        ticketNumber: booking.id.substring(0, 8).toUpperCase(),
        name: booking.full_name,
        seats: booking.seats,
        amount: booking.amount,
        verifiedAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json(
      { success: false, error: "Server Error" },
      { status: 500 },
    );
  }
}
