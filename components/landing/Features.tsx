"use client";

import {
  PlusCircle,
  Armchair,
  Route,
  Wallet,
  BarChart3,
  Percent,
} from "lucide-react";

const features = [
  {
    title: "Create Trips Instantly",
    description:
      "Operators and drivers can post trips in seconds with intuitive tools. Set your route, vehicle, and schedule effortlessly.",
    icon: PlusCircle,
    color: "text-blue-500",
    glow: "bg-blue-500",
  },
  {
    title: "Flexible Booking",
    description:
      "Passengers can book specific seats in advance. Choose your preferred spot and travel time that fits your schedule.",
    icon: Armchair,
    color: "text-green-500",
    glow: "bg-green-500",
  },
  {
    title: "Smart Route Management",
    description:
      "Save frequently used routes and pickup points as templates. Efficiently manage complex logistics.",
    icon: Route,
    color: "text-amber-500",
    glow: "bg-amber-500",
  },
  {
    title: "Secure Payments",
    description:
      "Integrated mobile money and card payments. Instant confirmation and automated receipts for every transaction.",
    icon: Wallet,
    color: "text-emerald-500",
    glow: "bg-emerald-500",
  },
  {
    title: "Analytics & Insights",
    description:
      "Track revenue, passenger trends, and vehicle performance with our comprehensive dashboard.",
    icon: BarChart3,
    color: "text-purple-500",
    glow: "bg-purple-500",
  },
  {
    title: "Flexible Commission",
    description:
      "Fair pricing models for operators. Choose between subscription plans or commission-per-seat options.",
    icon: Percent,
    color: "text-rose-500",
    glow: "bg-rose-500",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="bg-bg-dark py-24 px-6 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Everything you need to{" "}
            <span className="text-secondary">move people</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Whether you're an operator managing a fleet or a passenger looking
            for a comfortable ride, we've built features just for you.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl overflow-hidden bg-white/5 border border-white/10 transition-all duration-500"
            >
              <div className="h-px absolute top-0 left-0 rounded-full w-full bg-linear-to-l from-transparent via-primary to-transparent" />
              <div className="h-px absolute bottom-0 left-0 rounded-full w-full bg-linear-to-l from-transparent via-secondary to-transparent" />

              <div
                className={`size-12 relative rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                {/* The Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-full blur-xl opacity-20 group-hover:opacity-50 group-hover:scale-150 transition-all duration-700 pointer-events-none ${feature.glow}`}
                />

                <feature.icon className={`size-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
