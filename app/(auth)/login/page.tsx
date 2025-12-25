"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function LoginPage() {
  return (
    <section className="min-h-screen bg-[#0b0f14] flex items-center justify-center px-6">
      <div className="max-w-sm w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-secondary/10 text-secondary mb-6">
            <ShieldCheck className="size-8" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Securely log in to your dashboard</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors"
              placeholder="07..."
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm text-gray-400 block">Password</label>
            </div>
            <input
              type="password"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors"
              placeholder="••••••••"
            />
          </div>
          <Link href="#" className="text-xs text-secondary hover:underline">
            Forgot password?
          </Link>

          <button className="w-full bg-secondary text-black py-4 rounded-xl font-bold mt-4 hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/10">
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-500 mt-8 text-sm">
          New to Travelus?{" "}
          <Link href="/signup" className="text-secondary hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}
