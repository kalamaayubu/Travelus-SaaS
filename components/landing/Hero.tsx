"use client";

import { CheckCircle, MapIcon, Shield } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <>
      <section className="relative pb-24 pt-36 sm:pt-36 md:pt-36 min-h-[90vh] items-center flex flex-col overflow-hidden bg-dark">
        <div className="size-40 top-30 left-10 absolute rounded-full blur-3xl bg-blue-500/50 shadow-2xl" />

        <div className="relative max-w-6xl px-6 text-center z-10">
          {/* Headline */}
          <h1 className="text-[38px] sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white">
            <span className="text-secondary">Your </span>
            <span> Competitive </span>
            <span className="text-green-600">Advantage</span>
          </h1>

          {/* Subtext */}
          <p className="mt-4 text-xl md:text-2xl text-gray3 leading-snug">
            Giving you all the benefits of a booking system at a very low cost.
            Start scaling your travel business today.
          </p>
          <div className="flex flex-col relative justify-between w-full">
            <Image
              src="/assets/images/Illustration.png"
              alt="Hero Image"
              width={600}
              height={400}
              className="w-full"
            />

            <div className="p-5 flex md:hidden shadow shadow-secondary/60  left-20 top-1/2 rounded-lg gap-6 px-8  z-20 flex-col bg-gray8/20 border border-white/10">
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
        </div>
        <div className="p-5 hidden md:flex left-20 top-1/2 shadow shadow-secondary/60 absolute rounded-lg gap-6 px-8  z-20 flex-col bg-gray8/20 border border-white/10">
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
        <div className="size-40 hidden md:flex right-10 top-60 absolute rounded-full blur-3xl bg-amber-600/40 shadow-2xl" />
      </section>
    </>
  );
}
