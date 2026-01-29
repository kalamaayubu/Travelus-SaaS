"use client";

import { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import {
  ShieldCheck,
  XCircle,
  Loader2,
  QrCode,
  X,
  Zap,
  ZapOff,
  WifiOff,
} from "lucide-react";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { cn } from "@/lib/utils";

interface ScannerProps {
  tripId: string;
  onVerified: (passengerData: any) => void;
  onClose: () => void;
}

export default function BookingScanner({
  tripId,
  onVerified,
  onClose,
}: ScannerProps) {
  const [scanResult, setScanResult] = useState<{
    status: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ status: "idle" });

  const [isTorchOn, setIsTorchOn] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isOnline = useOnlineStatus(); // Subscribe to network changes

  useEffect(() => {
    // Initialize the lower-level scanner
    const html5QrCode = new Html5Qrcode("reader");
    scannerRef.current = html5QrCode;

    const startScanner = async () => {
      try {
        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
          },
          onScanSuccess,
          () => {
            /* Frame-by-frame fail (ignore) */
          },
        );
      } catch (err) {
        console.error("Failed to start scanner:", err);
      }
    };

    async function onScanSuccess(decodedText: string) {
      if (scannerRef.current?.isScanning) {
        await scannerRef.current.stop(); // Stop camera for processing
      }

      setScanResult({ status: "loading" });

      try {
        const response = await fetch("/api/bookings/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            qrData: decodedText,
            currentTripId: tripId,
          }),
        });

        const result = await response.json();

        if (result.success) {
          setScanResult({
            status: "success",
            message: `Verified: ${result.name}`,
          });
          onVerified(result);
          setTimeout(onClose, 2000);
        } else {
          setScanResult({
            status: "error",
            message: result.error || "Verification Failed",
          });
        }
      } catch (err) {
        setScanResult({ status: "error", message: "Network Error" });
      }
    }

    startScanner();

    return () => {
      if (html5QrCode.isScanning) {
        html5QrCode.stop().catch(console.error);
      }
    };
  }, [tripId]);

  // Handle hardware Flash/Torch
  const toggleTorch = async () => {
    const scanner = scannerRef.current;
    if (scanner && scanner.isScanning) {
      try {
        const newState = !isTorchOn;
        // applyVideoConstraints is part of the MediaTrack standard handled by html5-qrcode
        await scanner.applyVideoConstraints({
          advanced: [{ torch: newState }] as any,
        });
        setIsTorchOn(newState);
      } catch (err) {
        console.error("Torch not supported on this device/browser:", err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-6 backdrop-blur-md">
      <div className="w-full max-w-md bg-soft-dark border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
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
            onClick={onClose}
            className="text-gray4 bg-white/5 rounded-lg hover:text-white p-2 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scanner Area */}
        <div className="p-4 relative">
          {!isOnline && scanResult.status === "idle" && (
            <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
              <div className="size-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                <WifiOff size={32} className="text-red-500" />{" "}
              </div>
              <p className="text-white font-black uppercase text-sm tracking-[0.2em]">
                Connection Lost
              </p>
              <p className="text-sm text-gray2 mt-2 leading-relaxed max-w-100">
                Please check your internet connection
              </p>
            </div>
          )}

          {scanResult.status === "idle" && (
            <>
              <div
                id="reader"
                className={cn(
                  "overflow-hidden rounded-2xl border-2 transition-all duration-300 bg-black aspect-square",
                  isOnline
                    ? "border-primary/20"
                    : "border-red-500/20 grayscale",
                )}
              />
              {/* Torch Toggle Button - Positioned over the camera feed */}
              <button
                onClick={toggleTorch}
                disabled={!isOnline}
                className={cn(
                  "absolute bottom-8 right-8 p-4 rounded-full bg-black/60 border border-white/20 text-white z-10",
                  !isOnline && "opacity-0 pointer-events-none", // Hide torch when offline
                )}
              >
                {isTorchOn ? (
                  <ZapOff size={24} className="text-yellow-400" />
                ) : (
                  <Zap size={24} />
                )}
              </button>
            </>
          )}

          {scanResult.status === "loading" && (
            <div className="h-75 flex flex-col items-center justify-center gap-4 py-12">
              <Loader2 className="animate-spin text-primary" size={48} />
              <p className="text-[10px] font-black uppercase tracking-widest text-gray4">
                Validating Receipt...
              </p>
            </div>
          )}

          {scanResult.status === "success" && (
            <div className="h-75 flex flex-col items-center justify-center gap-4 py-12 animate-in zoom-in-95">
              <div className="size-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20">
                <ShieldCheck size={40} className="text-black" />
              </div>
              <p className="text-lg font-black text-white italic tracking-tighter">
                {scanResult.message}
              </p>
              <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest text-center">
                Boarding Confirmed • Funds Released
              </p>
            </div>
          )}

          {scanResult.status === "error" && (
            <div className="h-75 flex flex-col items-center justify-center gap-4 py-12">
              <XCircle size={60} className="text-red-500" />
              <p className="text-white font-black">{scanResult.message}</p>
              <button
                onClick={() => setScanResult({ status: "idle" })}
                className="mt-4 px-8 py-3 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all"
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        {scanResult.status === "idle" && isOnline && (
          <div className="p-6 bg-black/40 border-t border-white/5">
            <p className="text-[9px] text-secondary text-center font-black uppercase leading-relaxed tracking-widest animate-pulse">
              Center the QR code
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
