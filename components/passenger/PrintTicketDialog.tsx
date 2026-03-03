"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";
import { BaseModal } from "../shared/BaseModal";
import { TicketPrintSchema } from "@/lib/validations/validate";
import { cn } from "@/lib/utils";
import { saveTicketAsImage } from "@/utils/download-ticket";

type TicketFormValues = z.infer<typeof TicketPrintSchema>;

export default function PrintTicketDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [retrievedTicket, setRetrievedTicket] = useState<{
    encryptedId: string;
    fullName: string;
    ticketNo: string;
    seats: string[];
    status: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TicketFormValues>({
    resolver: zodResolver(TicketPrintSchema),
    defaultValues: { ticketNumber: "", email: "" },
    mode: "onTouched",
  });

  const onSubmit = async (values: TicketFormValues) => {
    try {
      const res = await fetch("/api/bookings/print-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (data.success) {
        setRetrievedTicket({
          encryptedId: data.encryptedId,
          fullName: data.full_name,
          seats: data.seats,
          ticketNo: data.ticketNo, // Fixed key from your API JSON
          status: data.status,
        });
        toast.success("Ticket retrieved successfully!");
      } else {
        toast.error(data.error || "Ticket not found");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    }
  };

  const handleDownload = async () => {
    if (!ticketRef.current || !retrievedTicket) return;
    setIsDownloading(true);
    const success = await saveTicketAsImage(
      ticketRef.current,
      retrievedTicket.ticketNo,
    );
    if (success) toast.success("Ticket downloaded successfully!");
    setIsDownloading(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setRetrievedTicket(null);
      reset();
    }, 200);
  };

  return (
    <BaseModal isOpen={isOpen} onClose={handleClose}>
      {!retrievedTicket ? (
        /* --- FORM VIEW --- */
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="animate-in fade-in duration-300"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black uppercase tracking-tighter">
              Print Ticket
            </h2>
            <p className="text-[10px] uppercase font-bold text-gray4 mt-3 tracking-[0.2em]">
              Enter details to retrieve your boarding pass.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-gray4 ml-1">
                Ticket Number
              </label>
              <input
                {...register("ticketNumber")}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary/50 transition font-mono uppercase"
                placeholder="e.g. 4A665687"
              />
              {errors.ticketNumber && (
                <p className="text-red-500 text-xs font-bold ml-1">
                  {errors.ticketNumber.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-gray4 ml-1">
                Email Address
              </label>
              <input
                {...register("email")}
                type="email"
                className="w-full bg-white/5 border lowercase border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary/50 transition"
                placeholder="email@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs font-bold ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full py-4 primary-btn text-black font-black uppercase rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Retrieve Ticket <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* --- Success ticket retrieval VIEW (THE SWAP) --- */
        <div className="flex flex-col items-center space-y-6 animate-in zoom-in-95 duration-300">
          {/* WRAPPER FOR HTML2CANVAS */}
          <div
            ref={ticketRef}
            className="w-full flex flex-col px-8 py-8 items-center space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-black uppercase tracking-tighter italic">
                <span className="text-primary">Safari</span>
                <span className="text-secondary">Bridge</span>
              </h2>
            </div>

            <div className="p-3 bg-white rounded-2xl shadow-xl">
              <QRCodeSVG
                value={retrievedTicket.encryptedId}
                size={150}
                level="H"
              />
            </div>

            {/* Perforated Details Card */}
            <div className="w-full relative">
              <div className="space-y-4">
                <TicketRow label="Passenger" value={retrievedTicket.fullName} />
                <TicketRow
                  label={retrievedTicket.seats.length > 1 ? "Seats" : "Seat"}
                  value={retrievedTicket.seats.join(", ")}
                  isMono
                />
                <TicketRow
                  label="Ticket ID"
                  value={retrievedTicket.ticketNo}
                  isMono
                />
                <TicketRow
                  label="Status"
                  customValue={
                    <span
                      className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full font-black uppercase",
                        retrievedTicket.status === "APPROVED"
                          ? "bg-green-500/20 text-green-500"
                          : "bg-secondary/20 text-secondary",
                      )}
                    >
                      {retrievedTicket.status}
                    </span>
                  }
                />
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS (Hidden from Image) */}
          <div className="w-full grid grid-cols-2 gap-3">
            <button
              onClick={() => setRetrievedTicket(null)}
              className="py-4 border border-white/10 text-white font-black uppercase rounded-lg text-xs hover:bg-white/5 transition"
            >
              Back
            </button>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="py-4 primary-btn whitespace-nowrap text-black font-black uppercase rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition text-xs"
            >
              {isDownloading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <>
                  <Download size={16} /> Download ticket
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </BaseModal>
  );
}

const TicketRow = ({ label, value, isMono = false, customValue }: any) => (
  <div className="flex justify-between items-end border-b border-white/15 border-dashed pb-1">
    <span className="text-[9px] uppercase font-black tracking-widest text-gray3">
      {label}
    </span>
    {customValue || (
      <span
        className={cn(
          "font-bold text-xs text-white",
          isMono && "font-mono text-gray3",
        )}
      >
        {value}
      </span>
    )}
  </div>
);
