import { useQuery } from "@tanstack/react-query";

export function useDriverVehicles() {
  return useQuery({
    queryKey: ["driver-vehicles"],
    queryFn: async () => {
      const res = await fetch("/api/driver/vehicles");
      if (!res.ok) throw new Error("Failed to fetch vehicles");
      return res.json();
    },
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24 * 7, // Keep data in cache for a week
  });
}
