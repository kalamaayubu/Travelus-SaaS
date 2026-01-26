"use client";

import { useState } from "react";
import { Check, Globe } from "lucide-react";

export default function OperatorSignup() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    businessName: "",
    subdomain: "",
  });

  const handleFinish = async () => {
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ ...formData, role: "operator" }),
    });
    const result = await res.json();
    if (result.success) window.location.href = "/auth/verify";
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Progress Stepper */}
      <div className="flex justify-between mb-8 px-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`size-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= s ? "bg-secondary text-black" : "bg-white/10 text-gray5"}`}
            >
              {step > s ? <Check className="size-4" /> : s}
            </div>
            {s < 3 && (
              <div
                className={`w-12 h-0.5 mx-2 ${step > s ? "bg-secondary" : "bg-white/10"}`}
              />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <input
            placeholder="Full Name"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            placeholder="Email"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            onClick={() => setStep(2)}
            className="w-full py-4 rounded-xl font-bold bg-secondary text-black"
          >
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <input
            placeholder="Sacco Name"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
            onChange={(e) =>
              setFormData({ ...formData, businessName: e.target.value })
            }
          />
          <div className="relative">
            <input
              placeholder="subdomain"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
              onChange={(e) =>
                setFormData({ ...formData, subdomain: e.target.value })
              }
            />
            <span className="absolute right-3 top-3 text-gray5 text-sm">
              .travelus.co.ke
            </span>
          </div>
          <button
            onClick={() => setStep(3)}
            className="w-full py-4 rounded-xl font-bold bg-secondary text-black"
          >
            Review
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-xl border border-secondary/20">
            <p className="text-white">Business: {formData.businessName}</p>
            <p className="text-secondary text-xs uppercase tracking-widest mt-2">
              Pro Subscription: 0% Commission
            </p>
          </div>
          <button
            onClick={handleFinish}
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold bg-secondary text-black"
          >
            {loading ? "Launching..." : "Finish & Launch"}
          </button>
        </div>
      )}
    </div>
  );
}
