"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function LoginPage() {
  return (
    <section className="min-h-screen bg-dark rounded flex items-center justify-center px-6">
      <div className="max-w-lg px-8 py-6 rounded-xl bg-white/5 border border-white/[0.2] w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary mb-6">
            <ShieldCheck className="size-8" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray4">Securely log in to your dashboard</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="text-sm text-gray4 mb-1 block">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
              placeholder="07..."
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm text-gray4 block">Password</label>
            </div>
            <input
              type="password"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
              placeholder="••••••••"
            />
          </div>
          <Link href="#" className="text-xs text-primary hover:underline">
            Forgot password?
          </Link>

          <button className="w-full bg-primary text-black py-4 rounded-xl font-bold mt-4 hover:bg-primary/90">
            Sign In
          </button>
        </form>

        <p className="text-center text-gray5 mt-8 text-sm">
          New to Travelus?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}
