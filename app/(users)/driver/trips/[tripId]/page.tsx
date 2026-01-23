"use client";

import { useState } from "react";
import { ArrowLeft, MapPin, Users, Phone, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import SeatMapManager, { SeatStatus } from "@/components/driver/SeatMapManager";
import { useRouter } from "next/navigation";
import Link from "next/link";

const MOCK_LAYOUT_DATA = {
  rows: 12,
  aisle: true,
  layout: [
    { row: 1, seats: ["Aisle", "Aisle", "Aisle", "Aisle", "Driver"] },
    { row: 2, seats: ["DoorGap", "Aisle", "Aisle", "Seat", "Seat"] },
    { row: 3, seats: ["Seat", "Seat", "Aisle", "Seat", "Seat"] },
    { row: 4, seats: ["Seat", "Seat", "Aisle", "Seat", "Seat"] },
    { row: 5, seats: ["Seat", "Seat", "Aisle", "Seat", "Seat"] },
    { row: 6, seats: ["Seat", "Seat", "Aisle", "Seat", "Seat"] },
    { row: 7, seats: ["Seat", "Seat", "Aisle", "Seat", "Seat"] },
    { row: 8, seats: ["Seat", "Seat", "Aisle", "Seat", "Seat"] },
    { row: 9, seats: ["Seat", "Seat", "Aisle", "Seat", "Seat"] },
    { row: 10, seats: ["Seat", "Seat", "Aisle", "Seat", "Seat"] },
    { row: 11, seats: ["Seat", "Seat", "Aisle", "Seat", "Seat"] },
    { row: 12, seats: ["Seat", "Seat", "Seat", "Seat", "Seat"] },
  ],
};

export default function EditTripPage() {
  // statuses holds the "Truth" from DB + local "SELECTED"
  const [statuses, setStatuses] = useState<Record<string, SeatStatus>>({
    C1: "BOOKED",
    C2: "BOOKED",
    E4: "BOOKED",
    I4: "LOCKED",
    H1: "LOCKED",
  });
  const router = useRouter();

  const handleSeatClick = (id: string) => {
    const current = statuses[id] || "AVAILABLE";

    if (current === "AVAILABLE") {
      setStatuses((prev) => ({ ...prev, [id]: "SELECTED" }));
    } else if (current === "SELECTED") {
      setStatuses((prev) => ({ ...prev, [id]: "AVAILABLE" }));
    }
  };

  const selectedCount = Object.values(statuses).filter(
    (s) => s === "SELECTED",
  ).length;

  const bookSelectedSeats = () => {
    const newStatuses = { ...statuses };
    Object.keys(newStatuses).forEach((key) => {
      if (newStatuses[key] === "SELECTED") newStatuses[key] = "LOCKED";
    });
    setStatuses(newStatuses);
  };

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tighter">
                Nairobi ➝ Mombasa
              </h1>
              <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em]">
                Departure: 20/2/2026 12:25 AM
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* LEFT: Seat Management */}
          <div className="lg:col-span-5 bg-soft-dark rounded-2xl border border-white/10 p-2 pb-6">
            <div className="mb-8 flex justify-between items-center p-4 px-6">
              <h2 className="text-xs font-black uppercase tracking-widest text-gray4">
                Seat Layout
              </h2>
              <div className="flex gap-3">
                <LegendItem color="bg-primary" label="Paid" />
                <LegendItem color="bg-green-500" label="Locked" />
                <LegendItem color="bg-secondary" label="Selected" />
              </div>
            </div>

            <SeatMapManager
              layout={MOCK_LAYOUT_DATA}
              seatStatuses={statuses}
              onSeatClick={handleSeatClick}
            />

            {/* Action for selected seats */}
            {selectedCount > 0 && (
              <div className="mt-8 px-6 animate-in slide-in-from-bottom-2">
                <button
                  onClick={bookSelectedSeats}
                  className="w-full h-14 bg-secondary text-black rounded-lg font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-secondary-dark"
                >
                  <UserPlus size={18} strokeWidth={3} />
                  Book {selectedCount} Seat{selectedCount > 1 ? "s" : ""}{" "}
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: Stats & Manifest */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <StatCard
                label="Live Revenue"
                value="KES 14,200"
                sub="Verified"
              />
              <StatCard
                label="Available"
                value={`${14 - Object.values(statuses).filter((s) => s !== "AVAILABLE" && s !== "SELECTED").length}`}
                sub="Seats Left"
              />
              <StatCard
                label="Locked"
                value={`${Object.values(statuses).filter((s) => s === "LOCKED").length}`}
                sub="By Driver"
              />
            </div>

            <div className="bg-soft-dark rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/5 bg-white/2">
                <h3 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2">
                  <Users size={14} className="text-primary" /> Current Manifest
                </h3>
              </div>
              <div className="divide-y divide-white/5 max-h-100 overflow-y-auto custom-scrollbar">
                <ManifestRow
                  seat="C1"
                  name="Peter Kamau"
                  phone="0712 345 678"
                  pickup="Kencom"
                />
                <ManifestRow
                  seat="C2"
                  name="Sarah Wanjiku"
                  phone="0722 987 654"
                  pickup="Mlolongo"
                />
                <ManifestRow
                  seat="E4"
                  name="David Otieno"
                  phone="0733 111 222"
                  pickup="Voi"
                />
                {/* Visual indicator for Locked seats in manifest */}
                {Object.keys(statuses)
                  .filter((k) => statuses[k] === "LOCKED")
                  .map((id) => (
                    <div
                      key={id}
                      className="p-4 bg-green-500/5 flex items-center gap-4 border-l-2 border-green-500"
                    >
                      <div className="size-10 bg-green-500 rounded-lg flex items-center justify-center text-black font-mono font-black text-xs">
                        {id}
                      </div>
                      <p className="text-[10px] font-black uppercase text-green-500 tracking-widest">
                        Reserved by Driver (Walk-in)
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components
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

function ManifestRow({ seat, name, phone, pickup }: any) {
  return (
    <div className="p-4 flex items-center justify-between hover:bg-white/2 transition-colors group">
      <div className="flex items-center gap-4">
        <div className="size-10 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center text-primary font-mono font-black text-xs">
          {seat}
        </div>
        <div>
          <p className="text-sm font-black text-white">{name}</p>
          <p className="text-[10px] text-gray4 font-bold uppercase flex items-center gap-1">
            <MapPin size={8} /> {pickup}
          </p>
        </div>
      </div>
      <Link
        href={`tel:${phone}`}
        className="size-10 bg-white/5 rounded-lg flex items-center justify-center text-gray4 hover:text-primary transition-all"
      >
        <Phone size={16} />
      </Link>
    </div>
  );
}
