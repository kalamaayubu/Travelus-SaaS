"use client";

import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="bg-[#0b0f14] py-24 pb-0 relative overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_70%_50%,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent pointer-events-none" />

      <div className="min-w-full relative z-10">
        <div className="bg-white/5 p-8 md:p-16 overflow-hidden relative group">
          {/* Subtle glow that follows the card */}
          <div className="absolute inset-0 bg-linear-to-br from-secondary/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-[1.1]">
              The road is calling. <br />
              <span className="text-secondary">Join </span>
              <span>the movement.</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl mb-12 leading-relaxed">
              Whether you’re behind the wheel or in the passenger seat, Travelus
              makes every kilometer count. No downloads required—start right
              from your browser.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* Operator Action */}
              <Link
                href={"/login"}
                className=" group/btn relative flex items-center gap-3 bg-primary text-black px-10 py-3 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all w-full sm:w-auto justify-center"
              >
                Get Started
                <ArrowRight className="size-5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>

              {/* Passenger Action */}
              <Link
                href={"/trips"}
                className="flex items-center gap-3 bg-secondary/95 hover:bg-secondary text-black px-10 py-3 rounded-xl font-bold text-lgtransition-all w-full sm:w-auto justify-center"
              >
                <Search className="size-5" />
                Book a Trip
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
