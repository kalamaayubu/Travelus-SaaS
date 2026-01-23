"use client";

import { MapPin, Clock, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const MOCK_TRIPS = [
  {
    id: "T1",
    route: "Nairobi → Nakuru",
    vehicle: "KDA 442Z",
    departure: "Today, 14:00",
    fare: "800",
    booked: 8,
    capacity: 14,
    status: "boarding",
  },
  {
    id: "T2",
    route: "Nairobi → Kisumu",
    vehicle: "KCC 110B",
    departure: "Today, 19:30",
    fare: "1,500",
    booked: 33,
    capacity: 33,
    status: "scheduled",
  },
];

export default function TripsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">
            Trip <span className="text-secondary">Scheduler</span>
          </h1>
          <p className="text-gray5 font-medium text-sm">
            Dispatch vehicles and manage active routes
          </p>
        </div>
      </div>

      {/* TRIP TABLE */}
      <div className="bg-soft-dark rounded-xl border border-white/5 overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5 p-2">
            <TableRow className="border-white/5 hover:bg-transparent uppercase">
              <TableHead className="text-[10px] font-black tracking-widest py-5">
                Route & Vehicle
              </TableHead>
              <TableHead className="text-[10px] font-black tracking-widest">
                Departure
              </TableHead>
              <TableHead className="text-[10px] font-black tracking-widest">
                Load Factor
              </TableHead>
              <TableHead className="text-[10px] font-black tracking-widest">
                Status
              </TableHead>
              <TableHead className="text-right text-[10px] font-black tracking-widest">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="p-2">
            {MOCK_TRIPS.map((trip) => (
              <TableRow
                key={trip.id}
                className="border-white/5 hover:bg-white/2 transition-colors"
              >
                <TableCell className="py-5">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-white flex items-center gap-2">
                      {trip.route}
                    </span>
                    <span className="text-[11px] text-gray5 font-mono flex items-center gap-1">
                      <MapPin size={10} /> {trip.vehicle}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-gray3">
                    <Clock className="h-4 w-4 text-secondary" />
                    <span className="text-sm font-medium">
                      {trip.departure}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1.5 w-32">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-gray5">KES {trip.fare}</span>
                      <span className="text-white">
                        {trip.booked}/{trip.capacity}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary rounded-full"
                        style={{
                          width: `${(trip.booked / trip.capacity) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={`
                    capitalize font-bold border-none px-3 py-1 rounded-full text-[10px]
                    ${
                      trip.status === "boarding"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-blue-500/10 text-blue-500"
                    }
                  `}
                  >
                    {trip.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <button className="hover:bg-white/5">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
