"use client";

import { Download, Loader2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useRef, useState } from "react";
import html2canvas from "html2canvas-pro";

interface TicketSuccessProps {
  ticketNumber: string;
  encryptedBookingId: string;
  seats: string[];
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

  const downloadTicket = async () => {
    if (!ticketRef.current) return;
    setIsDownloading(true);

    try {
      const canvas = await html2canvas(ticketRef.current, {
        backgroundColor: "#0F1115", // Soft-dark background
        scale: 3, // Higher quality
        logging: false,
        useCORS: true,
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `Ticket-${ticketNumber}.png`;
      link.click();
    } catch (err) {
      console.error("Download failed", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-6 animate-in zoom-in-95 duration-500">
      {/* WRAP THE DOWNLOADABLE PART IN THE REF */}
      <div
        ref={ticketRef}
        className="w-full flex flex-col items-center space-y-6 p-4 bg-soft-dark"
      >
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
            Confirmed!
          </h2>
          <p className="text-gray4 text-xs">Present this QR to the driver</p>
        </div>

        <div className="bg-white p-4 rounded-2xl">
          <QRCodeSVG
            value={encryptedBookingId}
            size={150}
            level="H"
            marginSize={0}
          />
        </div>

        <div className="w-full bg-bg-soft border-2 border-dashed border-white/10 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 size-6 bg-soft-dark rounded-full" />
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 size-6 bg-soft-dark rounded-full" />

          <p className="text-[10px] uppercase font-black text-gray3 tracking-widest mb-1">
            Ticket Number
          </p>
          <p className="text-4xl font-black text-secondary tracking-tighter mb-4">
            {ticketNumber}
          </p>

          <div className="flex justify-between text-left border-t border-white/5 pt-4">
            <div>
              <p className="text-[8px] uppercase font-bold text-gray3">Seats</p>
              <p className="text-sm font-black text-white">
                {seats.join(", ")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[8px] uppercase font-bold text-gray3">
                Status
              </p>
              <p className="text-sm font-black text-primary uppercase">Paid</p>
            </div>
          </div>
        </div>
      </div>

      {/* BUTTONS (Outside the ref so they aren't in the photo) */}
      <div className="w-full space-y-3">
        <button
          onClick={downloadTicket}
          disabled={isDownloading}
          className="w-full h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
        >
          {isDownloading ? (
            <Loader2 className="animate-spin size-5" />
          ) : (
            <Download size={20} />
          )}
          <span className="uppercase font-black text-xs tracking-widest">
            Download Ticket
          </span>
        </button>

        <button
          onClick={onClose}
          className="primary-btn w-full h-14 rounded-xl font-black uppercase tracking-widest text-sm"
        >
          Done & Close
        </button>
      </div>
    </div>
  );
};
