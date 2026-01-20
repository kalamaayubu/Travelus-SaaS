"use client";

import {
  UserCircle,
  Car,
  Search,
  Armchair,
  CreditCard,
  CheckCircle2,
  MapPin,
  Wallet,
} from "lucide-react";

const operatorSteps = [
  {
    title: "Register & Add Vehicles",
    description: "Sign up and verify your account. Add your vehicle details.",
    icon: UserCircle,
  },
  {
    title: "Create a Trip",
    description: "Set your route, departure time, and price per seat.",
    icon: MapPin,
  },
  {
    title: "Get Bookings",
    description:
      "Accept bookings automatically or manually. Fill up your seats.",
    icon: CheckCircle2,
  },
  {
    title: "Drive & Earn",
    description: "Complete the trip and get paid securely and instantly.",
    icon: Wallet,
  },
];

const passengerSteps = [
  {
    title: "Browse Trips",
    description: "Search for trips by destination or schedule.",
    icon: Search,
  },
  {
    title: "Select Your Seat",
    description: "View vehicle layout and pick your preferred seat.",
    icon: Armchair,
  },
  {
    title: "Pay Securely",
    description: "Pay via M-Pesa or Card to confirm your booking.",
    icon: CreditCard,
  },
  {
    title: "Enjoy the Ride",
    description: "Get vehicle details and track your journey in real-time.",
    icon: Car,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#0b0f14] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            How <span className="text-primary">Travelus</span> Works
          </h2>
          <p className="text-gray4 text-lg">
            Simple steps for everyone on the road.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Passengers Column */}
          <div className="relative">
            <h3 className="text-2xl font-bold text-white mb-10 flex items-center gap-3">
              <span className="bg-secondary/10 text-secondary p-2 px-3 rounded-lg">
                For Passengers
              </span>
            </h3>

            <div className="space-y-12 relative">
              {/* Vertical Line */}
              <div className="absolute left-[27px] top-2 bottom-2 w-[2px] bg-linear-to-b from-secondary/50 to-transparent" />

              {passengerSteps.map((step, idx) => (
                <div key={idx} className="relative flex gap-8 group">
                  <div className="relative z-10 size-14 shrink-0 rounded-full bg-[#161b22] border border-white/10 flex items-center justify-center text-white font-bold group-hover:border-secondary/60 transition-colors">
                    <step.icon className="size-6 text-secondary" />
                    <span className="absolute -top-1 -right-1 size-6 bg-gray7 rounded-full text-[10px] flex items-center justify-center">
                      {idx + 1}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-gray4 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Operators Column */}
          <div className="relative">
            <h3 className="text-2xl font-bold text-white mb-10 flex items-center gap-3">
              <span className="bg-primary/10 text-primary p-2 px-3 rounded-lg">
                For Operators
              </span>
            </h3>

            <div className="space-y-12 relative">
              {/* Vertical Line */}
              <div className="absolute left-6.75 top-2 bottom-2 w-[2px] bg-gradient-to-b from-primary/50 to-transparent" />

              {operatorSteps.map((step, idx) => (
                <div key={idx} className="relative flex gap-8 group">
                  <div className="relative z-10 size-14 shrink-0 rounded-full bg-[#161b22] border border-white/10 flex items-center justify-center text-white font-bold group-hover:border-primary/60 transition-colors">
                    <step.icon className="size-6 text-blue-400" />
                    <span className="absolute -top-1 -right-1 size-6 rounded-full text-[10px] flex items-center justify-center bg-gray7">
                      {idx + 1}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-gray4 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
