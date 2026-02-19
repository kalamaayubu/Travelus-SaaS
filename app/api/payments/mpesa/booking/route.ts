import { encrypt } from "@/lib/crypto";
import { getMpesaAccessToken, getTimeStamp } from "@/lib/mpesa/mpesa";
import { createClient } from "@/lib/supabase/server";
import dayjs from "dayjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  try {
    const { bookingPayload } = await req.json();
    // console.log("BOOKING PAYLOAD: ", bookingPayload);

    // 1️⃣ Create booking
    const { data: booking, error: insertError } = await supabase
      .from("bookings")
      .insert({
        trip_id: bookingPayload.tripId,
        amount: bookingPayload.totalFare,
        status: "PENDING",
        user_type: "PASSENGER",
        seats: bookingPayload.selectedSeats,
        full_name: bookingPayload.fullName,
        contact_number: bookingPayload.contactNumber,
        mpesa_number: bookingPayload.mpesaNumber,
        email: bookingPayload.email,
        reserved_at: dayjs().toISOString(),
      })
      .select("id, ticket_number, seats")
      .maybeSingle();

    if (insertError) {
      console.error("Booking insert error: ", insertError);
      return NextResponse.json(
        { error: "Insert error, failed to create booking" },
        { status: 500 },
      );
    }

    if (!booking) {
      console.error("Failed to create booking: ");
      return NextResponse.json(
        { error: "Failed to create booking" },
        { status: 500 },
      );
    }

    if (!bookingPayload.mpesaNumber || !bookingPayload.totalFare) {
      return NextResponse.json(
        { error: "Phone number and amount are required" },
        { status: 400 },
      );
    }

    // console.log("BOOKING CREATED: ", booking);

    // Prepare M-Pesa credentials
    const accessToken = await getMpesaAccessToken();
    const timestamp = getTimeStamp();
    const shortCode = process.env.MPESA_SHORTCODE || "174379";
    const passKey = process.env.MPESA_PASSKEY;
    const password = Buffer.from(`${shortCode}${passKey}${timestamp}`).toString(
      "base64",
    );

    // Request payload
    const stkPayload = {
      BusinessShortCode: parseInt(shortCode),
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Math.round(bookingPayload.totalFare),
      PartyA: "254" + bookingPayload.mpesaNumber.slice(-9),
      PartyB: parseInt(shortCode),
      PhoneNumber: "254" + bookingPayload.mpesaNumber.slice(-9),
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: "Travelus",
      TransactionDesc: "Payment for Trip",
    };

    console.log("STK PAYLOAD: ", stkPayload);

    // Send STK Push Request
    const mpesaResponse = await fetch(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stkPayload),
      },
    );

    const rawText = await mpesaResponse;
    console.log("MPESA RAW RESPONSE:", rawText);

    const mpesaRes = await mpesaResponse.json();

    if (!mpesaResponse.ok) {
      console.error("M-Pesa API Error:", mpesaRes);
      return NextResponse.json(
        { error: mpesaRes.errorMessage || "STK Push failed" },
        { status: mpesaResponse.status },
      );
    }

    console.log("STK PUSH SUCCESS:", mpesaRes);

    // Save Checkout ID to the booking
    const { error: dbError } = await supabase
      .from("bookings")
      .update({ checkout_request_id: mpesaRes.CheckoutRequestID })
      .eq("id", booking.id);

    if (dbError) {
      console.error("Error Saving Checkout ID: ", dbError);
      return NextResponse.json(
        { error: "Failed to save CheckoutRequestID" },
        { status: 400 },
      );
    }

    console.log("CheckoutId: ", mpesaRes.CheckoutRequestID);

    // Encrypt booking id (for safe ticket approval)
    const encryptedBookingId = encrypt(booking.id);

    console.log("Sending response...");
    return NextResponse.json({
      success: true,
      ticketNumber: booking.ticket_number,
      bookingId: booking.id,
      encryptedBookingId,
      seats: booking.seats,
      checkoutRequestId: mpesaRes.CheckoutRequestID,
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
