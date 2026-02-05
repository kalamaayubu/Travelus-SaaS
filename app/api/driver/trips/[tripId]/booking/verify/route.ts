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

  console.log("VERIFYING...");
  try {
    const { qrData, currentTripId } = await request.json();

    // Decrypt booking id
    let bookingId: string;
    try {
      bookingId = decrypt(qrData);
    } catch (err) {
      console.error("TICKET DECRYPTION ERROR: ", err);
      return NextResponse.json(
        { success: false, error: err || "Malformed or expired QR code" },
        { status: 400 },
      );
    }

    // 2. Fetch the booking using the Ticket Number (ID)
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
          driver_vehicle_id,
          driver_vehicles!inner (
            driver_id
          )
         )
      `,
      )
      .eq("id", bookingId) // qrData is the bookingId from the QR
      .single();

    if (fetchError || !booking) {
      return NextResponse.json(
        { success: false, error: "Invalid Ticket" },
        { status: 404 },
      );
    }

    // 3. Security Check: Does this ticket belong to THIS trip?
    if (booking.trip_id !== currentTripId) {
      return NextResponse.json(
        {
          success: false,
          error: "Wrong Trip: Ticket belongs to a different schedule.",
        },
        { status: 400 },
      );
    }

    // Permission Check: Is the person scanning the actual driver of this trip?
    const driverId = (booking.trips as any)?.driver_vehicles?.driver_id;
    if (driverId !== user.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Access Denied",
        },
        { status: 403 },
      );
    }

    // Update: Mark as APPROVED
    const { error: updateError } = await supabase
      .from("bookings")
      .update({ status: "APPROVED" })
      .eq("id", booking.id);

    if (updateError) {
      console.error("ERROR: ", updateError);
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }

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
  } catch (err: any) {
    console.error("Error: ", err);
    return NextResponse.json(
      { success: false, error: "Server Error" },
      { status: 500 },
    );
  }
}
