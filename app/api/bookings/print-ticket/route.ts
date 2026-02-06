import { createClient } from "@/lib/supabase/server";
import { encrypt } from "@/lib/crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const request = await req.json();
    const supabase = await createClient();
    const ticketNo = request.ticketNumber.toLowerCase();
    console.log("Ticket No: ", ticketNo);

    const { data: booking, error } = await supabase
      .from("bookings")
      .select("id, full_name, email, status, seats, booked_at")
      .eq("email", request.email)
      .in("status", ["BOOKED", "APPROVED"])
      .maybeSingle();

    if (error) throw error;

    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Ticket not found" },
        { status: 404 },
      );
    }

    //  Encrypted ID for the QR code
    const encryptedId = encrypt(booking.id);
    console.log("SEATS", booking.seats);

    return NextResponse.json(
      {
        success: true,
        encryptedId,
        status: booking.status,
        full_name: booking.full_name,
        ticketNo: ticketNo,
        seats: booking.seats,
        message: "Ticket retrieved successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("RETRIEVAL ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
