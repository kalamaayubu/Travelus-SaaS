"use client";

import {
  CarFront,
  History,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "../providers/auth-provider";

interface DriverSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  isOpen: boolean; // For mobile drawer
}

export function DriverSidebar({
  isCollapsed,
  setIsCollapsed,
  isOpen,
}: DriverSidebarProps) {
  const pathname = usePathname();
  const { user, isLoading } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/driver/dashboard" },
    { icon: CarFront, label: "My trips", href: "/driver/trips" },
    { icon: TrendingUp, label: "Performance", href: "/driver/stats" },
    { icon: History, label: "Trip History", href: "/driver/history" },
    { icon: User, label: "Profile", href: "/driver/profile" },
    { icon: Settings, label: "Settings", href: "/driver/settings" },
  ];

  // Logout
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.success) {
        window.location.href = "/login";
        toast.success("Logged out successful");
      } else {
        console.error("Logout failed:", result.error);
        toast.error("Could not log out. Please try again.");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 bg-dark border-r border-white/5 transition-all duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        ${isCollapsed ? "w-24" : "w-72"}
      `}
    >
      {/* COLLAPSE TOGGLE */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:flex absolute -right-3 top-12 size-6 rounded-full bg-primary text-black items-center justify-center shadow-lg hover:scale-110 transition-transform z-50"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className={`flex flex-col h-full ${isCollapsed ? "p-4" : "p-6"}`}>
        {/* LOGO AREA */}
        <div className={`mb-10 ${isCollapsed ? "text-center" : "px-2"}`}>
          <div
            className={`flex items-center gap-2 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="size-8 min-w-8 rounded-lg bg-primary flex items-center justify-center text-black font-black shrink-0 shadow-[0_0_15px_rgba(81,186,255,0.3)]">
              T
            </div>
            {!isCollapsed && (
              <span className="text-xl font-black tracking-tighter uppercase animate-in fade-in slide-in-from-left-2">
                Travelus
              </span>
            )}
          </div>
          {!isCollapsed && (
            <div className="mt-2 inline-flex items-center gap-2 px-2 py-1 rounded-md bg-primary/10 border border-primary/20 animate-in fade-in duration-500">
              <div className="size-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                Independent
              </span>
            </div>
          )}
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                title={isCollapsed ? item.label : ""}
                className={`
                  flex items-center gap-3 rounded-lg transition-all group overflow-hidden
                  ${isCollapsed ? "justify-center p-3" : "px-4 py-3"}
                  ${
                    isActive
                      ? "bg-primary text-black font-bold"
                      : "text-gray2 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                <item.icon
                  className={`size-5 shrink-0 ${
                    isActive ? "text-black" : "group-hover:text-primary"
                  }`}
                />
                {!isCollapsed && (
                  <span className="text-sm truncate animate-in fade-in slide-in-from-left-2">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="mt-auto pt-6 border-t border-white/5">
          <div
            className={`p-2 rounded-2xl bg-white/5 mb-4 flex items-center ${
              isCollapsed ? "justify-center" : "gap-3"
            }`}
          >
            <div className="size-10 min-w-10 rounded-full bg-linear-to-tr from-primary to-blue-700 shrink-0" />
            {!isCollapsed && (
              <div className="overflow-hidden animate-in fade-in">
                <div className="text-sm font-bold truncate">
                  {isLoading ? (
                    <div className="w-full h-6 bg-gray8 rounded-md animate-pulse" />
                  ) : (
                    user?.user_metadata.fullname
                  )}
                </div>
                <p className="text-[10px] text-gray2 truncate">
                  Commission-based Plan
                </p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className={`flex items-center text-gray2 hover:text-red-500 transition-colors ${
              isCollapsed ? "justify-center py-3" : "gap-3 px-4 py-3 w-full"
            }`}
          >
            <LogOut className="size-5 shrink-0" />
            {!isCollapsed && (
              <span className="text-sm font-medium">Log Out</span>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
