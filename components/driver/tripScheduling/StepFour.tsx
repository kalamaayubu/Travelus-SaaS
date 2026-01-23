"use client";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { TripSchedulingFields } from "@/types/driver";

export default function StepFour({
  formData,
}: {
  formData: TripSchedulingFields;
}) {
  return (
    <div className="space-y-4">
      <div className="bg-white/2 border border-white/10 rounded-xl p-5 space-y-4">
        <SummaryRow
          label="Route"
          value={`${formData.origin || "—"} ➝ ${formData.destination || "—"}`}
          highlight
        />
        <SummaryRow
          label="Schedule"
          value={`${formData.departureDate || "—"} @ ${formData.departureTime || "—"}`}
        />
        <SummaryRow label="Vehicle" value={formData.vehicle || "—"} />
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
