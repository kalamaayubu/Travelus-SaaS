"use client";

import { useState, useRef } from "react";
import { Download, Loader2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";
import { saveTicketAsImage } from "@/utils/download-ticket";

interface TicketSuccessProps {
  ticketNumber: string;
  encryptedBookingId: string;
  fullName: string;
  seats: string[];
  status: string;
  onClose: () => void;
}

export const TicketSuccessView = ({
  ticketNumber,
  seats,
  encryptedBookingId,
  onClose,
}: TicketSuccessProps) => {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!ticketRef.current) return;
    setIsDownloading(true);

    const success = await saveTicketAsImage(ticketRef.current, ticketNumber);

    if (success) toast.success("Ticket saved to gallery");
    else toast.error("Failed to generate image");

    setIsDownloading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-6">
      {/* THE BRANDED TICKET (The part being captured) */}
      <div
        ref={ticketRef}
        className="w-full flex flex-col items-center space-y-6 p-8 bg-[#0F1115] rounded-[32px]"
      >
        <div className="text-center">
          <h2 className="text-3xl font-black text-secondary italic tracking-tighter uppercase">
            SafariBridge
          </h2>
          <p className="text-[10px] uppercase font-bold text-gray4 tracking-[0.2em] mt-1">
            Official Boarding Pass
          </p>
        </div>

        <div className="bg-white p-4 rounded-3xl shadow-2xl shadow-secondary/10">
          <QRCodeSVG value={encryptedBookingId} size={160} level="H" />
        </div>

        {/* Perforated Card Effect */}
        <div className="w-full bg-white/5 border-2 border-dashed border-white/10 p-6 rounded-3xl relative">
          {/* Side Cutouts */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 size-8 bg-[#0F1115] rounded-full" />
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 size-8 bg-[#0F1115] rounded-full" />

          <div className="text-center space-y-1 mb-4">
            <p className="text-[10px] uppercase font-black text-gray3">
              Ticket Number
            </p>
            <p className="text-4xl font-black text-white tracking-tighter uppercase">
              {ticketNumber}
            </p>
          </div>

          <div className="flex justify-between border-t border-white/10 pt-4">
            <TicketDetail label="Passenger Seats" value={seats.join(", ")} />
            <TicketDetail label="Trip Status" value="Confirmed" isPrimary />
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="w-full space-y-3 px-2">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all active:scale-95 disabled:opacity-50"
        >
          {isDownloading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Download size={20} />
          )}
          <span className="uppercase font-black text-xs tracking-widest">
            Save to Phone
          </span>
        </button>
        <button
          onClick={onClose}
          className="primary-btn w-full h-14 rounded-2xl font-black uppercase"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

// Internal helper for the ticket rows
const TicketDetail = ({
  label,
  value,
  isPrimary = false,
}: {
  label: string;
  value: string;
  isPrimary?: boolean;
}) => (
  <div className={isPrimary ? "text-right" : "text-left"}>
    <p className="text-[8px] uppercase font-bold text-gray3 mb-0.5">{label}</p>
    <p
      className={`text-sm font-black ${isPrimary ? "text-secondary" : "text-white"}`}
    >
      {value}
    </p>
  </div>
);
