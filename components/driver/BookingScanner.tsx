"use client";

import {
  ShieldCheck,
  Loader2,
  QrCode,
  X,
  Zap,
  ZapOff,
  WifiOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useScanner } from "@/hooks/useScanner";

interface ScannerProps {
  tripId: string;
  onVerified: (passengerData: any) => void;
  onClose: () => void;
}

export default function BookingScanner(props: ScannerProps) {
  const { scanResult, isTorchOn, isOnline, toggleTorch, resetScanner } =
    useScanner(props);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-6 backdrop-blur-md">
      <div className="w-full max-w-md bg-soft-dark border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
          <div className="flex items-center gap-2">
            <QrCode className="text-primary" size={20} />
            <h2 className="font-bold text-white uppercase tracking-tighter text-sm">
              <span className="text-primary">Safari</span>
              <span className="text-secondary">Bridge</span>
            </h2>
          </div>
          <button
            onClick={props.onClose}
            className="text-gray4 bg-white/5 rounded-lg hover:text-white p-2"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 relative">
          {/* Offline State */}
          {!isOnline && scanResult.status === "idle" && (
            <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
              <div className="size-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                <WifiOff size={32} className="text-red-500" />
              </div>
              <p className="text-white font-black">Connection Lost</p>
            </div>
          )}

          {/* Camera View */}
          {scanResult.status === "idle" && (
            <div className="relative">
              <div
                id="reader"
                className={cn(
                  "overflow-hidden rounded-2xl border-2 bg-black aspect-square",
                  isOnline
                    ? "border-primary/20"
                    : "border-red-500/20 grayscale",
                )}
              />
              <button
                onClick={toggleTorch}
                disabled={!isOnline}
                className="absolute bottom-8 right-8 p-4 rounded-full bg-black/60 border border-white/20 text-white z-10"
              >
                {isTorchOn ? (
                  <ZapOff size={24} className="text-yellow-400" />
                ) : (
                  <Zap size={24} />
                )}
              </button>
            </div>
          )}

          {/* Loading State */}
          {scanResult.status === "loading" && (
            <div className="h-75 flex flex-col items-center justify-center gap-4 py-12">
              <Loader2 className="animate-spin text-primary" size={48} />
              <p className="text-[10px] font-black animate-pulse uppercase text-gray4">
                Validating Receipt...
              </p>
            </div>
          )}

          {/* Success State */}
          {scanResult.status === "success" && (
            <div className="h-full flex flex-col p-6 animate-in gap-4 fade-in zoom-in duration-300">
              {/* Header Section: Keeps the "Success" vibe */}
              <div className="flex flex-col items-center justify-center mb-4 text-center">
                <ShieldCheck
                  size={64}
                  className="text-primary mb-4 drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"
                />
                <h3 className="text-2xl font-black text-white italic uppercase tracking-tight">
                  {scanResult.data.name}
                </h3>
              </div>

              {/* Key-Value Details Section */}
              <div className="space-y-4 py-2  border-y border-white/10">
                <DataRow
                  label="Seats"
                  value={scanResult.data.seats.join(", ")}
                />
                <DataRow
                  label="Amount"
                  value={new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "KES",
                  }).format(scanResult.data.amount)}
                />
                <DataRow
                  label="Ticket NO"
                  value={scanResult.data.ticketNumber}
                  isMono
                />

                <div className="pt-2 mt-2 border-t border-white/5 flex justify-between items-center">
                  <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">
                    Verified At
                  </span>
                  <span className="text-[10px] text-white/60 font-medium">
                    {new Date(scanResult.data.verifiedAt).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  </span>
                </div>
              </div>

              <button
                onClick={props.onClose}
                className="mt-auto w-full py-4 bg-primary text-black font-black uppercase rounded-lg active:scale-95 transition-transform"
              >
                Done
              </button>
            </div>
          )}

          {/* Error State */}
          {scanResult.status === "error" && (
            <div className="h-75 flex flex-col items-center justify-center gap-4 py-12">
              <X
                size={60}
                className="text-red-500 bg-gray2/5 p-2 rounded-full"
              />
              <p className="text-white font-black">{scanResult.message}</p>
              <button
                onClick={resetScanner}
                className="mt-4 px-8 py-3 bg-white/10 rounded-lg text-[10px] font-black uppercase"
              >
                Scan another one
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper Component for the Rows
const DataRow = ({ label, value, isMono = false }) => (
  <div className="flex justify-between items-baseline gap-4">
    <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest shrink-0">
      {label}
    </span>
    <span
      className={`text-white text-right font-medium ${isMono ? "font-mono text-xs" : "text-sm"}`}
    >
      {value}
    </span>
  </div>
);
