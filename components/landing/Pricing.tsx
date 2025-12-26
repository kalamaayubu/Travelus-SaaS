"use client";

import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Pay As You Go",
    tagline: "Perfect for individual drivers",
    price: "3%",
    unit: "per seat",
    cta: "Start Free",
    popular: false,
    features: [
      "Unlimited Trip Creation",
      "Standard Support",
      "Basic Analytics",
      "Secure Payments",
    ],
  },
  {
    name: "Pro Subscription",
    tagline: "For fleet operators",
    price: "KES 2,500",
    unit: "/mo",
    cta: "Get Pro",
    popular: true,
    features: [
      "Everything in Free",
      "0% Commission",
      "Priority Support",
      "Advanced Fleet Analytics",
      "Multi-vehicle Management in one Place",
    ],
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="bg-[#0b0f14] py-24 px-6 relative overflow-hidden"
    >
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 bg-secondary/10 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Simple <span className="text-primary">Pricing</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Choose the model that works for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative p-8 md:p-12 rounded-2xl border transition-all duration-300 ${
                plan.popular
                  ? "bg-white/10 border-secondary shadow-2xl shadow-secondary/10 scale-105"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                  <Zap className="size-3 fill-current" />
                  Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-sm">{plan.tagline}</p>
              </div>

              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-extrabold text-white">
                  {plan.price}
                </span>
                <span className="text-gray-400">{plan.unit}</span>
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <Check
                      className={`size-5 shrink-0 ${
                        plan.popular ? "text-secondary" : "text-green-500"
                      }`}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  plan.popular
                    ? "bg-secondary text-black hover:bg-secondary/90 shadow-lg shadow-secondary/20"
                    : "primary-btn text-black hover:bg-primary/80 border border-white/10"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
