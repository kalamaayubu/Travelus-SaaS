"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // Define the routes where the Navbar is allowed to show
  const allowedPaths = ["/", "/trips"];

  // If the current path is not in the allowed list, return nothing
  if (!allowedPaths.includes(pathname)) {
    return null;
  }
  return (
    <header className="fixed top-0 z-50 w-full bg-[#0b0f14]/90 backdrop-blur border-b border-gray-800/5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <span className="text-xl font-semibold text-primary">Travelus</span>

        <div className="items-center gap-4 flex">
          <Link href="/#features" className=" hidden sm:flex transition">
            Features
          </Link>
          <Link href="/#pricing" className=" hidden sm:flex transition">
            Pricing
          </Link>
          {pathname === "/" ? (
            <Link href="/login" className=" hidden sm:flex transition">
              Log in
            </Link>
          ) : (
            <Link href="/login" className="sm:flex primary-btn transition">
              Log in
            </Link>
          )}
          {pathname === "/" && (
            <Link href={"/trips"} className="primary-btn">
              Book a trip
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
