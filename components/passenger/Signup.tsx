"use client";

import { useState } from "react";
import { User } from "lucide-react";

export default function PassengerSignup() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ ...data, role: "passenger" }),
    });

    const result = await res.json();
    if (result.success) alert("Check email to verify!");
    else alert(result.error);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 animate-in fade-in slide-in-from-bottom-4"
    >
      <div>
        <label className="text-sm text-gray4 mb-1 block">Full Name</label>
        <input
          name="name"
          type="text"
          required
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-tertiary outline-none"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label className="text-sm text-gray4 mb-1 block">Email</label>
        <input
          name="email"
          type="email"
          required
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-tertiary outline-none"
          placeholder="john@example.com"
        />
      </div>
      <div>
        <label className="text-sm text-gray4 mb-1 block">Password</label>
        <input
          name="password"
          type="password"
          required
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-tertiary outline-none"
          placeholder="••••••••"
        />
      </div>
      <button
        disabled={loading}
        className="w-full py-4 rounded-xl font-bold mt-4 bg-tertiary hover:bg-green-400 text-black transition-all"
      >
        {loading ? "Creating Account..." : "Complete Registration"}
      </button>
    </form>
  );
}
