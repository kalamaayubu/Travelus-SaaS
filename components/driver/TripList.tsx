import { fetchDriverTrips } from "@/lib/services/driver/trips";
import { createClient } from "@/lib/supabase/server";
import TripsListSearch from "@/components/driver/tripSearch/TripsListSearch";

export default async function TripsList() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const trips = await fetchDriverTrips(user.id);

  // Pass data to client wrapper
  return <TripsListSearch initialTrips={trips} />;
}
