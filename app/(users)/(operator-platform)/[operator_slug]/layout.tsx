"use client"; // Remove this if you don't need state here, but we do for the sidebar

import { useState, use } from "react"; // Import 'use' for unwrapping params in Client Components
import { Menu, X } from "lucide-react";
import { Sidebar } from "@/components/operator/sidebar";

// Define the type to match Next.js 15 expectations
type Props = {
  children: React.ReactNode;
  params: Promise<{ operator_slug: string }>;
};

export default function OperatorLayout({ children, params }: Props) {
  // In Client Components, we use the 'use' hook to unwrap the params promise
  const { operator_slug } = use(params);

  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-bg-dark text-white">
      {/* Mobile Navigation menu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 size-14 rounded-full bg-secondary text-black shadow-xl flex items-center justify-center border-4 border-bg-dark"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        operator_slug={operator_slug}
      />

      <main className="flex-1 h-screen overflow-y-auto overflow-x-hidden custom-scrollbar">
        {children}
      </main>
    </div>
  );
}
