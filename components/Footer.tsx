"use client";

import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Mail,
} from "lucide-react";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Define the routes where the Navbar is allowed to show
  const allowedPaths = ["/", "/trips"];

  // If the current path is not in the allowed list, return nothing
  if (!allowedPaths.includes(pathname)) {
    return null;
  }
  return (
    <footer className="bg-dark pt-20 pb-10 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="text-2xl font-bold text-white mb-6">
              Travel<span className="text-secondary">us</span>
            </div>
            <p className="text-gray5 text-sm leading-relaxed mb-6">
              Giving you the competitive edge of a booking system without the
              expensive cost or maintenance headaches
            </p>
            <div className="flex gap-4">
              <Facebook className="size-5 text-gray5 hover:text-secondary cursor-pointer transition-colors" />
              <Twitter className="size-5 text-gray5 hover:text-secondary cursor-pointer transition-colors" />
              <Instagram className="size-5 text-gray5 hover:text-secondary cursor-pointer transition-colors" />
              <Linkedin className="size-5 text-gray5 hover:text-secondary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">
              Platform
            </h4>
            <ul className="space-y-4 text-gray5 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">
                Find a Trip
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Register as Driver
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Fleet Management
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Pricing
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">
              Support
            </h4>
            <ul className="space-y-4 text-gray5 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">
                Help Center
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Safety Guidelines
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Terms of Service
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">
              Contact
            </h4>
            <ul className="space-y-4 text-gray5 text-sm">
              <li className="flex items-center gap-3">
                <MapPin className="size-4 text-secondary" />
                Nairobi, Kenya
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-secondary" />
                support@travelus.co.ke
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center text-gray6 text-xs">
          <p>
            © {new Date().getFullYear()} Travelus Technology Ltd. All rights
            reserved. Made for the Kenyan Road.
          </p>
        </div>
      </div>
    </footer>
  );
}
