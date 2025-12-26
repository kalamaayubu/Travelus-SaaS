"use client";

import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Bus,
  ShieldCheck,
  CarFront,
  Calendar,
} from "lucide-react";
import BookingDrawer from "@/components/shared/booking-drawer";

export default function PublicSearchPage() {
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTrip, setActiveTrip] = useState<any>(null);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const words = [
    "Safe Travels",
    "Instant Booking",
    "Verified Shuttles",
    "Your Next Journey",
  ];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % words.length;
      const fullText = words[i];
      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );
      setTypingSpeed(isDeleting ? 30 : 150);
      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };
    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  return (
    <div className="min-h-screen bg-bg-dark mb-10 text-white font-sans">
      {/* HERO & SEARCH */}
      <div className="pt-20 pb-16 px-6 max-w-6xl mt-20 mx-auto">
        <div className="space-y-6 mb-12">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
            Book{" "}
            <span className="text-secondary inline-block min-w-[300px]">
              {text}
              <span className="animate-pulse">|</span>
            </span>
            <br /> <span className="text-white/20 italic">Across Kenya</span>
          </h1>
          <p className="text-gray3 max-w-lg font-medium text-lg italic mx-auto md:mx-0">
            Enter your departure, destination and time below to book your trip
            now
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="bg-bg-soft p-3 rounded-2xl border border-white/10 flex flex-col lg:items-center lg:flex-row gap-3">
          <div className="relative flex-1">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-primary" />
            <input
              className="w-full h-16 bg-bg-dark border border-white/5 pl-12 pr-4 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-gray4"
              placeholder="From"
            />
          </div>

          <div className="relative flex-1">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-primary" />
            <input
              className="w-full h-16 bg-bg-dark border border-white/5 pl-12 pr-4 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-gray4"
              placeholder="To"
            />
          </div>

          <div className="relative flex-[0.8]">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-primary pointer-events-none" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full h-16 bg-bg-dark border border-white/5 pl-12 pr-4 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-all color-scheme-dark"
              style={{ colorScheme: "dark" }}
            />
          </div>

          <button
            onClick={() => setHasSearched(true)}
            className="primary-btn flex items-center gap-4 justify-center h-12 px-8 rounded-xl hover:scale-[1.02] transition-transform active:scale-95 shadow-lg shadow-primary/20"
          >
            <Search size={20} />
            <span className="uppercase font-bold tracking-widest text-xs">
              Search Trips
            </span>
          </button>
        </div>
      </div>

      {/* CONDITIONAL RENDERING: PRE-SEARCH vs RESULTS */}
      <main className="max-w-6xl p-4 mx-auto">
        {!hasSearched ? (
          <div className="text-center py-20 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="flex justify-center">
              <div className="size-24 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10">
                <CarFront className="text-primary size-10 opacity-40" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black uppercase tracking-widest text-white/80">
                Ready to move?
              </h2>
              <p className="text-gray4 max-w-xs mx-auto font-medium">
                Enter your departure and destination above to see available
                trips.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-primary/10"></div>
              <span className=" font-black uppercase tracking-[0.4em] text-gray-400 italic">
                Available Results
              </span>
              <div className="h-px flex-1 bg-primary/10"></div>
            </div>

            <div className="grid gap-6">
              {[1, 2].map((trip) => {
                const tripData = {
                  id: trip,
                  from: "Nairobi",
                  to: "Nakuru",
                  price: 800,
                  provider: "Easy Coach Sacco",
                };

                return (
                  <div
                    key={trip}
                    className="group bg-bg-soft border border-white/5 py-6 px-3 md:px-5 lg:py-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 hover:border-secondary/10 transition-all"
                  >
                    <div className="flex items-center justify-between gap-6 sm:gap-8">
                      <div className="size-16 md:size-20 rounded-xl bg-gray-800 border border-white/5 flex items-center justify-center text-primary/40 group-hover:text-primary transition-colors">
                        <Bus className="size-8" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter group-hover:text-primary transition-colors">
                          {tripData.from} → {tripData.to}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-gray3 font-bold uppercase text-[10px] tracking-widest">
                            {tripData.provider}
                          </p>
                          <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary/10 border border-secondary/20 text-[8px] font-black text-secondary uppercase tracking-widest">
                            <ShieldCheck size={10} /> Verified
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-12 w-full md:w-auto justify-between border-t md:border-t-0 border-white/5 pt-6 md:pt-0">
                      <div className="text-center md:text-left">
                        <p className="text-[10px] font-black text-gray4 uppercase tracking-widest mb-1">
                          Departure
                        </p>
                        <p className="text-xl font-black italic">14:30 PM</p>
                      </div>
                      <div className="text-center md:text-right">
                        <p className="text-[10px] font-black text-gray4 uppercase tracking-widest mb-1">
                          Fare
                        </p>
                        <p className="text-xl md:text-2xl font-black text-white">
                          KES {tripData.price}
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTrip(tripData)}
                        className="secondary-btn whitespace-nowrap rounded-lg h-12 px-4 py-2 uppercase font-bold text-xs tracking-widest"
                      >
                        Select Seat
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {activeTrip && (
        <BookingDrawer trip={activeTrip} onClose={() => setActiveTrip(null)} />
      )}
    </div>
  );
}
