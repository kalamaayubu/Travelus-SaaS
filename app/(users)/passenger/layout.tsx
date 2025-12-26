"use client";

import { Search, Ticket, User, LogOut, MapPin } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PassengerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { icon: Search, label: "Find Ride", href: "/search" },
    { icon: Ticket, label: "My Bookings", href: "/my-bookings" },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  return (
    <div className="min-h-screen bg-bg-dark text-white flex flex-col">
      {/* Desktop Header */}
      <header className="hidden md:flex items-center justify-between px-10 py-6 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-green-500 flex items-center justify-center text-black font-black">
            T
          </div>
          <span className="text-xl font-black tracking-tighter uppercase">
            Travel<span className="text-green-500">us</span>
          </span>
        </div>
        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-sm font-bold transition-colors ${
                pathname === item.href
                  ? "text-green-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button className="text-gray-500 hover:text-red-500">
            <LogOut size={18} />
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 md:pb-0">{children}</main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-bg-soft/80 backdrop-blur-xl border-t border-white/5 flex justify-around py-4 z-50">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-1 ${
                isActive ? "text-green-500" : "text-gray-500"
              }`}
            >
              <item.icon size={20} />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
