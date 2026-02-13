import { createClient } from "@/lib/supabase/server";
import { encrypt } from "@/lib/crypto";
import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Redis initialization(for rate limiting)
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// 5 request for 10 minutes
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "10 m"),
  analytics: true,
  ephemeralCache: new Map(),
});

export async function POST(req: Request) {
  try {
    // Get the ip
    const ip = req.headers.get("x-nf-client-connection-ip") || "127.0.0.1";
    //Check if user is over the limit
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);
    console.log(
      `success: ${success}, limit: ${limit}, reset${reset}, remaining: ${remaining}`,
    );

    if (!success) {
      // Calculate delta in milliseconds
      const now = Date.now();
      const diff = reset - now;

      // Convert to minutes and seconds
      const minutes = Math.floor(diff / 1000 / 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const waitTime =
        minutes > 0
          ? `${minutes} minute${minutes > 1 ? "s" : ""}${seconds > 0 ? ` and ${seconds} second${seconds > 1 ? "s" : ""}` : ""}`
          : `${seconds} second${seconds > 1 ? "s" : ""}`;

      return NextResponse.json(
        {
          success: false,
          error: `Too many attempts. Please wait ${waitTime} before trying again.`,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Reset": reset.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
          },
        },
      );
    }
    const request = await req.json();
    const supabase = await createClient();
    const ticketNo = request.ticketNumber.toLowerCase();
    console.log("Ticket No: ", ticketNo);

    const { data: booking, error } = await supabase
      .from("bookings")
      .select("id, full_name, email, status, seats, booked_at")
      .eq("email", request.email)
      .eq("ticket_number", ticketNo)
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
