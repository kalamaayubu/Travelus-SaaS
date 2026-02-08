import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  // Get the authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("driver_vehicles")
    .select(
      `
        id,
        drivers!inner ( driver_id ),
        driver_vehicle_link:vehicles (
          number_plate,
            vehicle_types (
            type_name,
            capacity,
            seats_layout
          )
        )
    `,
    )
    .eq("drivers.driver_id", user.id);

  if (error) {
    console.error("VEHICLES FETCH ERROR::", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  console.log("VEHICLES DATA::", JSON.stringify(data, null, 2));
  return NextResponse.json(data);
}
