import { useEffect, useState, useRef, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useQueryClient } from "@tanstack/react-query";

interface UseScannerProps {
  tripId: string; // Target trip ID for ticket validation
  onVerified: (passengerData: any) => void; // Callback triggered after successful server-side verification
  onClose: () => void; // Function to release camera hardware and close the UI
}

// Manages camera hardware, torch state, and ticket verification API.
export function useScanner({ tripId, onVerified, onClose }: UseScannerProps) {
  const [scanResult, setScanResult] = useState<{
    status: "idle" | "loading" | "success" | "error";
    data?: any;
    message?: string;
  }>({ status: "idle" });

  const [isTorchOn, setIsTorchOn] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isOnline = useOnlineStatus();
  const queryClient = useQueryClient();

  const handleScan = useCallback(
    async (decodedText: string) => {
      if (scannerRef.current?.isScanning) {
        await scannerRef.current.stop();
      }

      setScanResult({ status: "loading" });

      try {
        const response = await fetch(
          `/api/driver/trips/${tripId}/booking/verify`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              qrData: decodedText,
              currentTripId: tripId,
            }),
          },
        );

        const result = await response.json();

        if (result.success) {
          setScanResult({
            status: "success",
            data: result.data,
            message: `Verified: ${result.data.name}`,
          });
          queryClient.invalidateQueries({ queryKey: ["trip", tripId] });
          onVerified(result.data);
        } else {
          setScanResult({
            status: "error",
            message: result.error || `Server Error: ${response.status}`,
          });
        }
      } catch (err) {
        setScanResult({
          status: "error",
          message: err instanceof Error ? err.message : "Connection Failed",
        });
      }
    },
    [tripId, onVerified, onClose, queryClient],
  );

  const startScanner = useCallback(async () => {
    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode("reader");
    }

    if (scannerRef.current.isScanning) return;

    try {
      await scannerRef.current.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 }, aspectRatio: 1.0 },
        handleScan,
        () => {},
      );
    } catch (err) {
      console.error("Failed to start scanner:", err);
    }
  }, [handleScan]);

  useEffect(() => {
    if (isOnline && scanResult.status === "idle") {
      startScanner();
    }

    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, [isOnline, scanResult.status, startScanner]);

  const toggleTorch = async () => {
    const scanner = scannerRef.current;
    if (scanner?.isScanning) {
      try {
        const newState = !isTorchOn;
        await scanner.applyVideoConstraints({
          advanced: [{ torch: newState }] as any,
        });
        setIsTorchOn(newState);
      } catch (err) {
        console.error("Torch not supported", err);
      }
    }
  };

  const resetScanner = () => setScanResult({ status: "idle" });

  return { scanResult, isTorchOn, isOnline, toggleTorch, resetScanner };
}
