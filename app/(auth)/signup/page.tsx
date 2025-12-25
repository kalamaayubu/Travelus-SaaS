"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  User,
  ArrowRight,
  Check,
  Globe,
  CarFront,
} from "lucide-react";

type Role = "passenger" | "driver" | "operator";

export default function SignupPage() {
  const [role, setRole] = useState<Role | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    password: "",
    businessName: "",
    subdomain: "",
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Helper to get button color based on role
  const getAccentColor = () => {
    switch (role) {
      case "passenger":
        return "bg-green-500 hover:bg-green-400 text-black";
      case "driver":
        return "bg-primary hover:bg-blue-400 text-black";
      case "operator":
        // This targets your 'secondary' which we've set as the Royal Orange-Gold
        return "bg-secondary hover:bg-amber-400 text-black";
      default:
        return "";
    }
  };

  return (
    <section className="min-h-screen bg-bg-dark flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full">
        {/* Progress Bar (Only show if role is selected) */}
        {role === "operator" && (
          <div className="flex justify-between mb-8 px-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`size-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step >= s
                      ? "bg-secondary border-secondary text-black"
                      : "bg-white/10 text-gray-500"
                  }`}
                >
                  {step > s ? <Check className="size-4" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-12 md:w-20 h-[2px] mx-2 ${
                      step > s ? "bg-secondary border-secondary" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">
            {role ? `Join as ${role}` : "Create an account"}
          </h1>
          <p className="text-gray-400">Join the future of Kenyan transport</p>
        </div>

        {!role ? (
          /* ROLE SELECTION (Same as before) */
          <div className="space-y-4">
            <button
              onClick={() => setRole("passenger")}
              className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-5 hover:border-green-500 hover:bg-green-500/5 transition-all group"
            >
              <div className="size-12 px-3 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                <User />
              </div>
              <div className="text-left">
                <h3 className="text-white font-bold">Passenger</h3>
                <p className="text-gray-400 text-sm">
                  Book seats and travel comfortably.
                </p>
              </div>
              <ArrowRight className="size-5 text-gray-600 ml-auto group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
            </button>
            {/* ... Driver and Operator buttons same as previous code ... */}
            {/* Driver Option */}
            <button
              onClick={() => setRole("driver")}
              className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-5 hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <div className="size-12 px-3 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <CarFront className="size-6" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-bold">Independent Driver</h3>
                <p className="text-gray-400 text-sm">
                  Pay 10% per seat. No monthly fees.
                </p>
              </div>
              <ArrowRight className="size-5 text-gray-600 ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </button>

            {/* Operator option */}
            <button
              onClick={() => setRole("operator")}
              className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-5 hover:border-secondary hover:bg-secondary border-secondary/5 transition-all group"
            >
              <div className="size-12 px-3 rounded-xl bg-secondary/10 border-secondary/10 flex items-center justify-center text-secondary border-secondary">
                <Building2 />
              </div>
              <div className="text-left">
                <h3 className="text-white font-bold">Fleet Operator</h3>
                <p className="text-gray-400 text-sm">
                  Manage routes and 0% commission.
                </p>
              </div>
              <ArrowRight className="size-5 text-gray-600 ml-auto group-hover:text-secondary border-secondary group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            {/* STEP 1: PERSONAL BASICS */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">
                    Phone (M-Pesa)
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors"
                    placeholder="07..."
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  onClick={role === "operator" ? nextStep : undefined}
                  className={`w-full py-4 rounded-xl font-bold mt-4 transition-all ${getAccentColor()}`}
                >
                  {role === "operator"
                    ? "Continue to Business Details"
                    : "Complete Registration"}
                </button>
              </div>
            )}

            {/* STEP 2: BUSINESS DETAILS (Operator Only) */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">
                    Sacco / Company Name
                  </label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setFormData({ ...formData, businessName: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors"
                    placeholder="Super Metro Sacco"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">
                    Choose your Travelus URL
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-32 py-3 text-white focus:outline-none focus:border-secondary transition-colors"
                      placeholder="supermetro"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                      .travelus.co.ke
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2 flex items-center gap-1 uppercase tracking-wider">
                    <Globe className="size-3" /> This will be your private fleet
                    portal
                  </p>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={prevStep}
                    className="flex-1 py-3 rounded-xl font-bold bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="flex-2 py-3 secondary-btn font-bold hover:bg-amber-400 transition-all"
                  >
                    Review & Finish
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: FINAL REVIEW */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-bg-dark border-secondary/5 border border-secondary/20 space-y-3">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400 text-sm">Business</span>
                    <span className="text-white font-medium">
                      {formData.businessName || "Not set"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Plan</span>
                    <span className="text-secondary border-secondary font-bold uppercase text-xs tracking-widest">
                      Pro Subscription
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center leading-relaxed">
                  By clicking finish, you agree to our Terms of Service and will
                  be redirected to your new dashboard.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={prevStep}
                    className="flex-1 py-4 rounded-xl font-bold bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all"
                  >
                    Back
                  </button>
                  <button className="flex-[2] py-4 rounded-xl font-bold bg-secondary border-secondary text-black hover:bg-amber-400 transition-all">
                    Finish & Launch
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setRole(null);
                setStep(1);
              }}
              className="block mx-auto text-gray-500 text-xs hover:text-white transition-colors"
            >
              ← Cancel and go back
            </button>
          </div>
        )}

        <p className="text-center text-gray-500 mt-8 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-secondary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}
