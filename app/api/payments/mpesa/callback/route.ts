// Called by payement provider after user enters their PIN

import { createClient } from "@/lib/supabase/server";
import dayjs from "dayjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  try {
    const body = await req.json();
    const res = body.Body.stkCallback;
    const checkoutRequestId = res.CheckoutRequestID;

    console.log("MPESA CALLBACK RECEIVED:", JSON.stringify(res, null, 2));

    const resultCode = Number(res.ResultCode);
    if (resultCode === 0) {
      // Extract Receipt
      const metadata = res.CallbackMetadata.Item;
      const receipt = metadata.find(
        (i: any) => i.Name === "MpesaReceiptNumber",
      )?.Value;

      //   Update the booking to BOOKED
      const { error: dbError } = await supabase
        .from("bookings")
        .update({
          status: "BOOKED",
          booked_at: dayjs().toISOString(),
          mpesa_receipt: receipt,
        })
        .eq("checkout_request_id", checkoutRequestId);

      if (dbError) console.error("Failed to update booking status:", dbError);
      else console.log(`Booking for ${checkoutRequestId} is now BOOKED.`);
    } else {
      await supabase
        .from("bookings")
        .update({ status: "FAILED" })
        .eq("checkout_request_id", checkoutRequestId);

      console.log(`Transaction ${checkoutRequestId} failed: ${res.ResultDesc}`);
    }
  } catch (error) {
    console.error("Callback crash:", error);
  }

  return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
}
