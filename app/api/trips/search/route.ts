/**
 * @api {get} /api/trips/search Search for available trips
 * @description Fetches and filters trips from Supabase based on origin, destination, and date.
 * Handles timezone normalization to ensure the full 24-hour UTC window is captured.
 * * @param {NextRequest} req - The incoming Next.js request object containing searchParams.
 * @returns {Promise<NextResponse<TripSearchApiResponse | ApiErrorResponse>>}
 * JSON response containing transformed trip data or error details.
 */

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
    const origin = searchParams.get("origin");
    const destination = searchParams.get("destination");
    const date = searchParams.get("date");

    console.log(
      `Trip data: Origin-${origin} . Destination-${destination} . Date-${date}`,
    );

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

    // Treate as a local date
    const [year, month, day] = date.split("-").map(Number);

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
          driver_vehicle_id (
            vehicle_id (
              number_plate,
              vehicle_type_id (
                type_name,
                capacity 
              )
            )
          )
        bookings (
          seats,
          status
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
          // Extract the relationship object safely
          const dvId = trip.driver_vehicle_id;

          // Normalize: handle if it's an array or a single object
          const dv = Array.isArray(dvId) ? dvId[0] : dvId;

          const vehicle = dv?.vehicle_id;
          const vType = vehicle?.vehicle_type_id;

          // Calculate booked seats
          const bookedSeatsCount =
            trip.bookings?.reduce((total: number, booking: any) => {
              if (Array.isArray(booking.seats)) {
                return total + booking.seats.length;
              }
              return total;
            }, 0) || 0;

          return {
            id: trip.id,
            departure_time: trip.departure_time,
            departure_location: trip.departure_location,
            destination_location: trip.destination_location,
            price_per_seat: trip.price_per_seat,
            available_seats: trip.total_capacity | (0 - bookedSeatsCount),
            vehicle: {
              number_plate: vehicle?.number_plate,
              type_name: vType?.type_name,
              capacity: vType?.capacity,
            },
          };
        }) || [];

      console.log(
        "TRIP SEARCH DATA: ",
        JSON.stringify(transformedData, null, 2),
      );
      return NextResponse.json({
        data: transformedData,
        meta: { count: transformedData.length, origin, destination, date },
      });
    } catch (dbError: any) {
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
