"use client";

import { useEffect, useState } from "react";
import { CheckCheck, FerrisWheel, Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("dark"); // Default to dark
  const pathname = usePathname();

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Routes where the Navbar is allowed to show
  const allowedPaths = ["/", "/trips"];

  if (!allowedPaths.includes(pathname)) {
    return null;
  }
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const navLinks = [
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/#pricing" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full bg-dark backdrop-blur border-b border-gray8/5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* LEFT SIDE: Logo */}
        <div className="flex items-center gap-2">
          <FerrisWheel className="text-secondary" />
          <span className="text-xl hidden sm:flex font-semibold text-primary">
            Travelus
          </span>
        </div>

        {/* RIGHT SIDE: Links + Menu + Main Action Button */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Desktop Nav Links (Hidden on mobile) */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-secondary transition text-sm"
              >
                {link.name}
              </Link>
            ))}
            {pathname === "/" && (
              <Link
                href="/login"
                className="hover:text-secondary transition text-sm"
              >
                Log in
              </Link>
            )}
          </div>

          {/* THEME TOGGLE BUTTON */}
          <button
            onClick={toggleTheme}
            className="p-2 hidden md:flex rounded-lg hover:bg-gray8/10 transition text-main-text"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="flex items-center">
            {pathname === "/" ? (
              <Link href="/trips" className="primary-btn whitespace-nowrap">
                Book a trip
              </Link>
            ) : (
              <Link href="/login" className="primary-btn whitespace-nowrap">
                Log in
              </Link>
            )}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-1 hover:bg-gray8/50 rounded-md transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* MOBILE DROPDOWN MENU */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full backdrop-blur bg-dark/90 border-b border-gray8 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg py-2 border-b border-gray8/20 text-primary"
            >
              {link.name}
            </Link>
          ))}
          {pathname === "/" && (
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="text-lg py-2 text-primary"
            >
              Log in
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
