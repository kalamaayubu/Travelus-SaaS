"use client";

import { CheckCircle, MapIcon, Shield } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <>
      <section className="relative pb-24 pt-36 sm:pt-36 md:pt-36 min-h-[90vh] items-center flex flex-col overflow-hidden bg-[#0b0f14] sm:pt-16">
        <div className="size-40 top-30 left-10 absolute rounded-full blur-3xl bg-blue-500/50 shadow-2xl" />

        <div className="relative max-w-6xl px-6 text-center z-10">
          {/* Headline */}
          <h1 className="text-[38px] sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white">
            <span className="text-secondary">Your </span>
            <span>Travel </span>
            <br />
            <span> Competitive </span>
            <span className="text-green-600">Advantage</span>
          </h1>

          {/* Subtext */}
          <p className="mt-4 text-xl md:text-2xl text-gray-300 leading-snug">
            Stop hunting passengers. Start running predictable income.
          </p>
          <div className="flex flex-col relative justify-between w-full">
            <Image
              src="/assets/Illustration.png"
              alt="Hero Image"
              width={600}
              height={400}
              className="w-full"
            />

            <div className="p-5 flex md:hidden shadow shadow-secondary/60  left-20 top-1/2 rounded-lg gap-6 px-8  z-20 flex-col bg-gray-800/20 border border-white/10">
              <div className="flex items-center gap-4">
                <CheckCircle className="text-green-600" />
                <span>Verified Drivers</span>
              </div>
              <div className="flex items-center gap-4">
                <MapIcon className="text-primary" />
                <span>Real-time Tracking</span>
              </div>
              <div className="flex items-center gap-4">
                <Shield className="text-secondary" />
                <span className="">Secure Payments</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          {/* <div className="mt-12 flex justify-center gap-4">
          <button className="primary-btn">Get Started</button>

          <button className="rounded-lg border border-gray-600/50 px-8 py-2 text-gold hover:bg-gold/10 transition">
            Find a Trip
          </button>
        </div> */}
        </div>
        <div className="p-5 hidden md:flex left-20 top-1/2 shadow shadow-secondary/60 absolute rounded-lg gap-6 px-8  z-20 flex-col bg-gray-800/20 border border-white/10">
          <div className="flex items-center gap-4">
            <CheckCircle className="text-green-600" />
            <span>Verified Drivers</span>
          </div>
          <div className="flex items-center gap-4">
            <MapIcon className="text-primary" />
            <span>Real-time Tracking</span>
          </div>
          <div className="flex items-center gap-4">
            <Shield className="text-secondary" />
            <span className="">Secure Payments</span>
          </div>
        </div>
        <div className="size-40 hidden lg:flex right-40 top-96 absolute rounded-full blur-3xl bg-secondary/60 shadow-2xl" />
        <div className="size-40 hidden md:flex right-10 top-60 absolute rounded-full blur-3xl bg-secondary/40 shadow-2xl" />
      </section>
    </>
  );
}
