"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full bg-[#0b0f14]/90 backdrop-blur border-b border-gray-800/5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <span className="text-xl font-semibold text-primary">Travelus</span>

        <div className="items-center gap-4 flex">
          <Link href="/login" className=" hidden sm:flex transition">
            Log in
          </Link>
          <Link href="/login" className=" hidden sm:flex transition">
            Features
          </Link>
          <Link href="/login" className=" hidden sm:flex transition">
            Pricing
          </Link>
          <button className="primary-btn">Get Started</button>
        </div>
      </nav>
    </header>
  );
}
