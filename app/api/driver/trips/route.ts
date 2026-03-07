import { fetchDriverTrips } from "@/lib/services/driver/trips";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const trips = await fetchDriverTrips(user.id);
    return NextResponse.json(trips);
  } catch (err) {
    console.error("Failed to fetch trips: ", err);
    return NextResponse.json(
      { error: "Failed to fetch trips" },
      { status: 500 },
    );
  }
}
