import { createClient } from "@/lib/supabase/server";
import {
  ApiErrorResponse,
  TripSearchApiResponse,
  TripSearchResponse,
} from "@/types/trip.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
): Promise<NextResponse<TripSearchApiResponse | ApiErrorResponse>> {
  try {
    const supabase = await createClient();

    // Get query parameters from URL
    const { searchParams } = new URL(req.url);
    const origin = searchParams.get("origin");
    const destination = searchParams.get("destination");
    const date = searchParams.get("date");

    console.log(
      `Trip data: Origin-${origin} . Destination-${destination} . Date-${date}`,
    );

    // Validate required parameters
    if (!origin || !destination || !date) {
      return NextResponse.json(
        {
          error:
            "Missing required parameters: origin, destination, and date are required",
        },
        { status: 400 },
      );
    }

    // Validate date format
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 },
      );
    }

    // Create date range for the day
    // 1. Ensure the date string is treated as a local date, not UTC 00:00
    const [year, month, day] = date.split("-").map(Number);

    // 2. Create bounds for the full 24 hours in UTC
    const startOfDay = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
    const endOfDay = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));

    console.log(
      "Searching between (UTC):",
      startOfDay.toISOString(),
      "and",
      endOfDay.toISOString(),
    );
    try {
      const { data, error } = await supabase
        .from("trips")
        .select(
          `
          id,
          departure_time,
          departure_location,
          destination_location,
          price_per_seat,
          total_capacity,
          driver_vehicle_id (
            driver_id,
            vehicle_id (
              number_plate,
              vehicle_type_id (
                type_name,
                capacity,
                seats_layout
              )
            )
          )
        `,
        )
        .gte("departure_time", startOfDay.toISOString())
        .eq("departure_location", origin)
        .eq("destination_location", destination)
        .order("departure_time", { ascending: true });

      if (error) {
        console.error("Error searching trips: ", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      // console.log("Raw Data: ", JSON.stringify(data, null, 2));

      // Transform data from supabase
      const transformedData: TripSearchResponse[] =
        (data as any[])?.map((trip) => {
          // 1. Extract the relationship object safely
          const dvId = trip.driver_vehicle_id;

          // 2. Normalize: handle if it's an array or a single object
          const dv = Array.isArray(dvId) ? dvId[0] : dvId;

          // 3. Extract nested vehicle and type data
          const vehicle = dv?.vehicle_id;
          const vType = vehicle?.vehicle_type_id;

          // 4. Return the object using ONLY the local variables we just created
          // This prevents TS from looking at the 'trip' type definition again
          return {
            id: trip.id,
            departure_time: trip.departure_time,
            departure_location: trip.departure_location,
            destination_location: trip.destination_location,
            price_per_seat: trip.price_per_seat,
            total_capacity: trip.total_capacity,
            available_seats: trip.total_capacity,
            driver_id: dv?.driver_id, // Use 'dv', not 'trip.driver_vehicle_id'
            vehicle: {
              number_plate: vehicle?.number_plate,
              type_name: vType?.type_name,
              capacity: vType?.capacity,
              seats_layout: vType?.seats_layout?.layout || vType?.seats_layout,
            },
          };
        }) || [];

      // console.log("Transformed data: ", transformedData);
      console.log(`Found ${transformedData.length} trips`);
      return NextResponse.json(
        {
          data: transformedData,
          meta: {
            count: transformedData.length,
            origin,
            destination,
            date,
          },
        },
        { status: 200 },
      );
    } catch (dbError) {
      console.error("Database error: ", dbError);
      return NextResponse.json(
        { error: "Database query failed" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Unknown error occurred: ", error);
    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 },
    );
  }
}
