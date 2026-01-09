"use client";

import { useState } from "react";
import { Plus, Search, Filter, MoreVertical, ToolCase } from "lucide-react";
import { Vehicle, VEHICLE_CATEGORIES } from "@/types/fleet";
import { AddVehicleModal } from "@/components/operator/add-vehicle-modal";
import { AssignDriverModal } from "@/components/operator/assign-driver-modal";
import { UserPlus } from "lucide-react"; // Highly recommended for a "Quick Assign" icon

// Mock Data for the UI-First phase
const MOCK_VEHICLES: Vehicle[] = [
  {
    id: "1",
    registrationNumber: "KDA 442Z",
    type: "14-Seater Matatu",
    status: "active",
    currentDriver: "John Doe",
    totalTrips: 142,
    lastServiceDate: "2025-11-20",
  },
  {
    id: "2",
    registrationNumber: "KCC 110B",
    type: "33-Seater Minibus",
    status: "maintenance",
    currentDriver: "N/A",
    totalTrips: 89,
    lastServiceDate: "2025-12-05",
  },
  {
    id: "3",
    registrationNumber: "KCH 889L",
    type: "7-Seater Shuttle",
    status: "idle",
    currentDriver: "Sarah Juma",
    totalTrips: 210,
    lastServiceDate: "2025-10-15",
  },
];

export default function FleetPage() {
  const [vehicles] = useState<Vehicle[]>(MOCK_VEHICLES);
  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState(false);
  const [assigningVehicleReg, setAssigningVehicleReg] = useState<string | null>(
    null
  );
  return (
    <>
      <div className="space-y-8 animate-in fade-in duration-500">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tight">
              Fleet <span className="text-secondary">Inventory</span>
            </h1>
            <p className="text-gray5 font-medium text-sm">
              Manage and track all registered vehicles
            </p>
          </div>
          <button
            onClick={() => setIsAddVehicleModalOpen(true)}
            className="secondary-btn flex items-center gap-2 group"
          >
            <Plus className="size-5 group-hover:rotate-90 transition-transform" />
            Register New Vehicle
          </button>
        </div>

        {/* FILTER & SEARCH BAR */}
        <div className="flex flex-col md:flex-row gap-4 items-center bg-soft-dark p-4 rounded-lg border border-white/5">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray5" />
            <input
              className="w-full bg-dark border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-secondary outline-none transition-all"
              placeholder="Search by plate number or driver..."
            />
          </div>
          <button className="p-3 bg-dark border border-white/10 rounded-xl text-gray4 hover:text-white">
            <Filter className="size-5" />
          </button>
        </div>

        {/* VEHICLE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {vehicles.map((bus) => (
            <div
              key={bus.id}
              className="bg-soft-dark rounded-xl border border-white/5 overflow-hidden group hover:border-secondary/30 transition-all shadow-xl"
            >
              {/* Top Bar: Status & Registration */}
              <div className="p-6 pb-0 flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-white tracking-tighter">
                      {bus.registrationNumber}
                    </span>
                    <div
                      className={`size-2 rounded-full animate-pulse ${
                        bus.status === "active"
                          ? "bg-green-500"
                          : bus.status === "maintenance"
                          ? "bg-red-500"
                          : "bg-gray5"
                      }`}
                    />
                  </div>
                  <p className="text-[10px] text-gray5 uppercase font-bold tracking-widest">
                    {bus.type}
                  </p>
                </div>
                <button className="p-2 hover:bg-white/5 rounded-full text-gray5 hover:text-white">
                  <MoreVertical className="size-5" />
                </button>
              </div>

              {/* Stats Row */}
              <div className="p-6 grid grid-cols-2 gap-4">
                <div className="bg-dark p-4 rounded-lg border border-white/5">
                  <p className="text-[10px] text-gray5 font-bold uppercase">
                    Driver
                  </p>
                  <p className="text-sm font-bold text-white truncate">
                    {bus.currentDriver || "Unassigned"}
                  </p>
                </div>
                <div className="bg-dark p-4 rounded-lg border border-white/5">
                  <p className="text-[10px] text-gray5 font-bold uppercase">
                    Total Trips
                  </p>
                  <p className="text-sm font-bold text-white">
                    {bus.totalTrips}
                  </p>
                </div>
              </div>

              {/* Maintenance & Action Bar */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-white/5 bg-white/[0.01]">
                <div className="flex items-center gap-2 text-gray5">
                  <ToolCase className="size-3" />
                  <span className="text-[10px] font-bold">
                    Last Service: {bus.lastServiceDate}
                  </span>
                </div>
                <button
                  onClick={() => setAssigningVehicleReg(bus.registrationNumber)} // Triggers the modal
                  className="text-[10px] font-black text-secondary uppercase hover:underline"
                >
                  Assign Driver
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Add vehicle modal */}
      <AddVehicleModal
        isOpen={isAddVehicleModalOpen}
        onClose={() => setIsAddVehicleModalOpen(false)}
      />
      {/* Assign driver to a vehicle modal */}
      <AssignDriverModal
        isOpen={!!assigningVehicleReg}
        vehicleReg={assigningVehicleReg || ""}
        onClose={() => setAssigningVehicleReg(null)}
      />
    </>
  );
}
