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

    const { searchParams } = new URL(req.url);
    const origin = searchParams.get("origin"); // Should be location_id like "ke-nbi-nairobi-cbd"
    const destination = searchParams.get("destination");
    const date = searchParams.get("date");

    if (!origin || !destination || !date) {
      return NextResponse.json(
        {
          error:
            "Missing required parameters: origin, destination, and date are required",
        },
        { status: 400 },
      );
    }

    const [year, month, day] = date.split("-").map(Number);
    const startOfDay = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));

    try {
      const { data, error } = await supabase
        .from("trips")
        .select(
          `
          id,
          departure_time,
          segments,
          price_per_seat,
          destination_location_name,
          departure_location_name,
          driver_vehicle_id (
            vehicle_id (
              number_plate,
              vehicle_type_id (
                type_name,
                capacity 
              )
            )
          ),
          bookings (
            seats,
            status
          )
        `,
        )
        .gte("departure_time", startOfDay.toISOString())
        // Filter: segments must contain both origin and destination location_ids
        .contains("segments", JSON.stringify([{ location_id: origin }]))
        .contains("segments", JSON.stringify([{ location_id: destination }]))
        .order("departure_time", { ascending: true });

      if (error) throw error;

      const transformedData: TripSearchResponse[] = (data as any[])
        .map((trip) => {
          const segments = trip.segments || [];

          // Find the specific objects in the segments array
          const originSegment = segments.find(
            (s: any) => s.location_id === origin,
          );
          const destSegment = segments.find(
            (s: any) => s.location_id === destination,
          );

          // VALIDATION: Origin must come BEFORE Destination in the route rank
          if (
            !originSegment ||
            !destSegment ||
            originSegment.rank >= destSegment.rank
          ) {
            return null;
          }

          const dv = Array.isArray(trip.driver_vehicle_id)
            ? trip.driver_vehicle_id[0]
            : trip.driver_vehicle_id;
          const vehicle = dv?.vehicle_id;
          const vType = vehicle?.vehicle_type_id;
          const capacity = vType?.capacity || 0;

          const bookedSeatsCount =
            trip.bookings?.reduce((total: number, b: any) => {
              return b.status !== "CANCELLED" && Array.isArray(b.seats)
                ? total + b.seats.length
                : total;
            }, 0) || 0;

          // Calculate Dynamic Price based on segments (e.g., price from origin to destination)
          // Based on your data, price_to_destination is the cost FROM that stop TO the end.
          // Adjust this logic if your pricing is calculated differently.
          const segmentPrice = originSegment.price_to_destination;

          return {
            id: trip.id,
            departure_time: trip.departure_time,
            trip_origin: trip.departure_location_name,
            trip_destiny: trip.destination_location_name,
            departure_location: originSegment.location_name,
            destination_location: destSegment.location_name,
            price_per_seat: segmentPrice || trip.price_per_seat,
            available_seats: capacity - bookedSeatsCount,
            vehicle: {
              number_plate: vehicle?.number_plate,
              type_name: vType?.type_name,
              capacity: capacity,
            },
          };
        })
        .filter(Boolean) as TripSearchResponse[]; // Remove trips where origin rank > destination rank

      return NextResponse.json({
        data: transformedData,
        meta: { count: transformedData.length, origin, destination, date },
      });
    } catch (dbError: any) {
      console.error("Database error: ", dbError);
      return NextResponse.json(
        { error: dbError.message || "Database query failed" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Unknown error: ", error);
    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 },
    );
  }
}
