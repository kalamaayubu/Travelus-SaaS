"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  MapPin,
  Users,
  Phone,
  UserPlus,
  Camera,
} from "lucide-react";
import { cn } from "@/lib/utils";
import SeatMapManager from "@/components/driver/SeatMapManager";
import BookingScanner from "@/components/driver/BookingScanner";
import Link from "next/link";
import { DriverIndividualTripData, ManifestEntry } from "@/types/driver";
import TripDetailsPageSkeleton from "@/components/driver/skeletons/TripDetailsPageSkeleton";

export default function EditTripPage() {
  const { tripId } = useParams();
  const router = useRouter();
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [localSelections, setLocalSelections] = useState<
    Record<string, "SELECTED">
  >({});

  const { data, isLoading, error } = useQuery<DriverIndividualTripData>({
    queryKey: ["trip", tripId],
    queryFn: async () => {
      const res = await fetch(`/api/driver/trips/${tripId}`);
      if (!res.ok) throw new Error("Failed to sync");
      const json = await res.json();
      return json.transformedData;
    },
    refetchInterval: 100000000, // Sync every 10s
  });

  // Merge server statuses with local unconfirmed selections
  const combinedStatuses = useMemo(() => {
    if (!data) return {};
    return { ...data.seatStatuses, ...localSelections };
  }, [data, localSelections]);

  const handleSeatClick = (id: string) => {
    const current = combinedStatuses[id] || "AVAILABLE";
    if (current === "AVAILABLE") {
      setLocalSelections((prev) => ({ ...prev, [id]: "SELECTED" }));
    } else if (current === "SELECTED") {
      const next = { ...localSelections };
      delete next[id];
      setLocalSelections(next);
    }
  };

  // Guard 1: Loading
  if (isLoading) return <TripDetailsPageSkeleton />;

  // Guard 2: Error
  if (error) return <div className="p-20 text-red-500">Sync Error.</div>;

  // Guard 3: Data Integrity (The fix for TypeScript)
  if (!data) return null;

  const selectedCount = Object.keys(localSelections).length;

  return (
    <div className="min-h-screen text-white pt-4">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tighter">
                {data.route}
              </h1>
              <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em]">
                Departure: {data.departure}
              </p>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 flex items-center justify-between group">
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-secondary">
                Verification
              </h3>
              <p className="text-xs text-gray2 font-bold uppercase mt-1">
                Scan QR code to verify passenger.
              </p>
            </div>
            <button
              onClick={() => setIsScannerOpen(true)}
              className="bg-primary text-black h-12 px-6 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <Camera size={16} />
              <span>Open Scanner</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* SEAT MAP */}
          <div className="lg:col-span-5 bg-soft-dark rounded-2xl border border-white/10 p-2 pb-6">
            <div className="mb-8 flex justify-between items-center p-4 px-6">
              <h2 className="text-xs font-black uppercase tracking-widest text-gray4">
                Seat Layout
              </h2>
              <div className="flex gap-3">
                <LegendItem color="bg-primary" label="Booked" />
                <LegendItem color="bg-green-500" label="Locked" />
                <LegendItem color="bg-secondary" label="Selected" />
              </div>
            </div>

            <SeatMapManager
              layout={data.layout}
              seatStatuses={combinedStatuses}
              onSeatClick={handleSeatClick}
            />

            {selectedCount > 0 && (
              <div className="mt-8 px-6 animate-in slide-in-from-bottom-2">
                <button className="w-full h-14 bg-secondary text-black rounded-lg font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3">
                  <UserPlus size={18} strokeWidth={3} />
                  Lock {selectedCount} Seat{selectedCount > 1 ? "s" : ""}
                </button>
              </div>
            )}
          </div>

          {/* MANIFEST & STATS */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <StatCard
                label="Live Revenue"
                value={`KES ${data.stats.revenue}`}
                sub="Verified"
              />
              <StatCard
                label="Available"
                value={data.vehicle.capacity - data.stats.totalOccupied}
                sub="Seats Left"
              />
              <StatCard
                label="Reference"
                value={data.displayId}
                sub={`Plate: ${data.vehicle.plate}`}
              />
            </div>

            <div className="bg-soft-dark rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/5 bg-white/2">
                <h3 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2">
                  <Users size={14} className="text-primary" /> Current Manifest
                </h3>
              </div>
              <div className="divide-y divide-white/5 max-h-125 overflow-y-auto custom-scrollbar">
                {data.manifest.map((booking) => (
                  <ManifestRow
                    key={booking.id}
                    seats={booking.seats}
                    name={booking.full_name}
                    phone={booking.contact_number}
                    pickup={booking.pickup_point}
                    isLocked={booking.user_type === "DRIVER"}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isScannerOpen && (
        <BookingScanner
          tripId={tripId as string}
          onVerified={() => {}}
          onClose={() => setIsScannerOpen(false)}
        />
      )}
    </div>
  );
}

// Internal Sub-components
function ManifestRow({ seats, name, phone, pickup, isLocked }: any) {
  return (
    <div
      className={cn(
        "p-4 flex items-center justify-between transition-colors",
        isLocked
          ? "bg-green-500/5 border-l-2 border-green-500"
          : "hover:bg-white/2",
      )}
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "size-10 rounded-lg flex items-center justify-center font-mono font-black text-[10px]",
            isLocked
              ? "bg-green-500 text-black"
              : "bg-primary/10 text-primary border border-primary/20",
          )}
        >
          {seats.join(", ")}
        </div>
        <div>
          <p className="text-sm font-black text-white">
            {isLocked ? "DRIVER RESERVATION" : name}
          </p>
          <p className="text-[10px] text-gray4 font-bold uppercase flex items-center gap-1">
            <MapPin size={8} /> {pickup || "Terminal"}
          </p>
        </div>
      </div>
      {!isLocked && (
        <Link
          href={`tel:${phone}`}
          className="size-10 bg-white/5 rounded-lg flex items-center justify-center text-gray4 hover:text-primary transition-all"
        >
          <Phone size={16} />
        </Link>
      )}
    </div>
  );
}

function StatCard({ label, value, sub }: any) {
  return (
    <div className="bg-soft-dark border border-white/10 rounded-2xl p-5">
      <p className="text-[8px] font-black text-gray4 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className="text-lg font-black italic tracking-tighter text-white">
        {value}
      </p>
      <p className="text-[8px] font-bold text-primary uppercase mt-1 tracking-wider">
        {sub}
      </p>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={cn("size-2 rounded-full", color)} />
      <span className="text-[8px] font-black uppercase text-gray4 tracking-tighter">
        {label}
      </span>
    </div>
  );
}
