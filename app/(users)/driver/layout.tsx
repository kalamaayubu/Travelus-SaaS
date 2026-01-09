"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { DriverSidebar } from "@/components/driver/sidebar";

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false); // Mobile Drawer
  const [isCollapsed, setIsCollapsed] = useState(false); // Desktop Collapse

  return (
    <div className="flex min-h-screen bg-dark text-white">
      {/* MOBILE TRIGGER */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 size-14 rounded-full bg-primary text-black shadow-xl flex items-center justify-center border-4 border-bg-dark"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* EXTRACTED SIDEBAR */}
      <DriverSidebar
        isOpen={isOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 h-screen overflow-y-auto overflow-x-hidden custom-scrollbar">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
