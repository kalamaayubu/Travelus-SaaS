"use client";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { TripSchedulingFields } from "@/types/driver";
import { useDriverVehicles } from "@/hooks/useDriverVehicles";
import { DriverVehicleLink } from "@/types/trip.types";
import { KENYA_LOCATIONS } from "@/constants/location";

export default function StepFour({
  formData,
}: {
  formData: TripSchedulingFields;
}) {
  const { data: vehicles } = useDriverVehicles();
  // Find the selected vehicle object from the cached list
  const selectedVehicle = vehicles?.find(
    (v: DriverVehicleLink) => v.id === formData.vehicleDriverLink,
  );

  // Extract display string: "KDM 123X (14 Seats)"
  const vehicleDisplay = selectedVehicle
    ? `${selectedVehicle.driver_vehicle_link.number_plate}`
    : "Vehicle not selected";

  // Get origin and destination location names
  const originLocation = KENYA_LOCATIONS.find((s) => s.id === formData.origin);
  const destinationLocation = KENYA_LOCATIONS.find(
    (s) => s.id === formData.destination,
  );

  return (
    <div className="space-y-4">
      <div className="bg-white/2 border border-white/10 rounded-xl p-5 space-y-4">
        <SummaryRow
          label="Route"
          value={`${originLocation?.name} ➝ ${destinationLocation?.name}`}
          highlight
        />

        <SummaryRow
          label="Schedule"
          value={`${formData.departureDate || "—"} @ ${formData.departureTime || "—"}`}
        />
        <SummaryRow label="Vehicle" value={vehicleDisplay} />
        <SummaryRow
          label="Fare"
          value={`KES ${formData.price || "0"}`}
          highlight
        />
        <div className="pt-3 border-t border-white/5 mt-2">
          <SummaryRow
            label="Payout To"
            value={formData.mpesaNumber || "—"}
            highlight
            color="text-primary"
          />
        </div>
      </div>
      <div className="flex items-start gap-3 p-4 bg-orange-500/5 rounded-xl border border-orange-500/20">
        <AlertCircle size={16} className="text-orange-500 shrink-0 mt-0.5" />
        <p className="text-sm text-gray2 leading-relaxed">
          Please confirm the details above. Clicking{" "}
          <strong>Publish Trip</strong> will make this journey live for
          passengers immediately.
        </p>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, highlight, color = "text-white" }: any) {
  return (
    <div className="flex justify-between items-center text-sm uppercase tracking-tight">
      <span className="text-gray2 font-bold">{label}</span>
      <span
        className={cn(
          "font-black text-right",
          color,
          highlight && "text-sm tracking-wider",
        )}
      >
        {value}
      </span>
    </div>
  );
}
