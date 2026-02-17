"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FinalCTA() {
  // SVG zigzag pattern as a data URI for clean background repeating
  const zigzagString = `url("data:image/svg+xml,%3Csvg width='4' height='12' viewBox='0 0 4 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L4 3 L0 6 L4 9 L0 12' stroke='white' fill='transparent' stroke-width='1.5'/%3E%3C/svg%3E")`;

  return (
    <section className=" py-32 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        {/* --- TOP LEFT STRING --- */}
        <div className="absolute top-8 left-8 md:top-10 md:left-10 z-20">
          <div className="w-2.5 h-2.5 rounded-full bg-primary outline-2 outline-offset-2 outline-primary " />
          <div
            className="absolute bottom-1 left-1/2 w-1 h-200 origin-bottom -rotate-45 opacity-40"
            style={{
              backgroundImage: zigzagString,
              backgroundRepeat: "repeat-y",
              filter: "drop-shadow(0 0 2px #3b82f6)",
            }}
          />
        </div>

        {/* --- TOP RIGHT STRING --- */}
        <div className="absolute top-8 right-8 md:top-10 md:right-10 z-20">
          <div className="w-2.5 h-2.5 rounded-full bg-secondary outline-2 outline-offset-2 outline-secondary shadow-[0_0_10px_rgba(var(--secondary),0.4)]" />
          <div
            className="absolute bottom-1 left-1/2 w-1 h-200 origin-bottom rotate-45 opacity-40"
            style={{
              backgroundImage: zigzagString,
              backgroundRepeat: "repeat-y",
              filter: "drop-shadow(0 0 2px #facc15) hue-rotate(160deg)",
            }}
          />
        </div>
        <div className="relative z-10 overflow-hidden rounded-2xl bg-linear-to-b from-gray-600/50 to-gray-700/20 pt-12 pb-6 px-6 backdrop-blur-md border border-gray4/5">
          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-8">
                <span className="text-primary">Your </span>
                <span className="text-secondary text-glow">journey, </span>{" "}
                <br />
                <span className="text-tertiary text-glow">reimagined.</span>
              </h2>

              <p className="max-w-2xl text-gray-400 text-lg md:text-xl mb-12 leading-relaxed">
                Join the thousands of drivers and passengers moving Travelus
                forward. Claim your spot in the ecosystem and start saving, or
                earning, immediately.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-around gap-6 w-full">
                <Link
                  href="/login"
                  className="group relative flex-1 flex items-center gap-3 bg-primary text-black px-10 py-4 rounded-xl font-bold text-lg w-full sm:w-auto justify-center shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:scale-[1.02] transition-all"
                >
                  <span>Register</span>
                  <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/trips"
                  className="group flex flex-1 items-center gap-3 bg-white/5 border border-white/10 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 hover:scale-[1.02] transition-all w-full sm:w-auto justify-center"
                >
                  <span>Book a trip</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
