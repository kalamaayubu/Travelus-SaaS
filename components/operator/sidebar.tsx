"use client";

import {
  LayoutDashboard,
  Bus,
  Users,
  ShieldCheck,
  CreditCard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  isOpen: boolean;
  operator_slug: string;
}

export function Sidebar({
  isCollapsed,
  setIsCollapsed,
  isOpen,
  operator_slug,
}: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Command Center",
      href: `/${operator_slug}`,
    },
    { icon: Bus, label: "Fleet & Vehicles", href: `/${operator_slug}/fleet` },
    { icon: Users, label: "Driver Network", href: `/${operator_slug}/staff` },
    {
      icon: ShieldCheck,
      label: "Compliance/Sacco",
      href: `/${operator_slug}/compliance`,
    },
    {
      icon: CreditCard,
      label: "Payroll & Billing",
      href: `/${operator_slug}/billing`,
    },
    {
      icon: Settings,
      label: "Portal Settings",
      href: `/${operator_slug}/settings`,
    },
  ];

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 bg-dark border-r border-white/5 transition-all duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        ${isCollapsed ? "w-24" : "w-72"}
      `}
    >
      {/* COLLAPSE TOGGLE (Desktop Only) */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:flex absolute -right-3 top-12 size-6 rounded-full bg-secondary text-black items-center justify-center hover:scale-110 transition-transform z-50"
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
            <div className="size-8 min-w-8  uppercase rounded-lg bg-secondary flex items-center justify-center text-black font-black shrink-0">
              {operator_slug.charAt(0)}
            </div>
            {!isCollapsed && (
              <span className="uppercase font-black tracking-tighter">
                {operator_slug}
              </span>
            )}
          </div>
          {!isCollapsed && (
            <div className="mt-2 inline-flex items-center gap-2 px-2 py-1 rounded-md bg-secondary/10 border border-secondary/20 animate-in fade-in duration-500">
              <div className="size-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">
                Pro Operator
              </span>
            </div>
          )}
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            // Checks if the current pathname matches the href.
            // For the dashboard (root), we check for exact match to prevent it from always being active.
            const isActive =
              item.href === `/${operator_slug}`
                ? pathname === item.href
                : pathname.startsWith(item.href);

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
                      ? "bg-secondary text-black font-bold"
                      : "text-gray5 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                <item.icon
                  className={`size-5 shrink-0 transition-colors ${
                    isActive ? "text-black" : "group-hover:text-secondary"
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

        {/* FOOTER / LOGOUT */}
        <div className="mt-auto pt-6 border-t border-white/5">
          <div
            className={`p-2 rounded-xl bg-white/5 mb-4 flex items-center ${
              isCollapsed ? "justify-center" : "gap-3"
            }`}
          >
            <div className="size-10 min-w-10 rounded-full bg-gradient-to-tr from-secondary to-amber-600 shrink-0" />
            {!isCollapsed && (
              <div className="overflow-hidden animate-in fade-in">
                <p className="text-sm font-bold truncate uppercase text-white">
                  {operator_slug}
                </p>
                <p className="text-[10px] text-gray5 truncate">
                  Premium Portal
                </p>
              </div>
            )}
          </div>
          <button
            className={`flex items-center text-gray5 hover:text-red-500 transition-colors group ${
              isCollapsed ? "justify-center py-3" : "gap-3 px-4 py-3 w-full"
            }`}
          >
            <LogOut className="size-5 shrink-0 group-hover:rotate-12 transition-transform" />
            {!isCollapsed && (
              <span className="text-sm font-medium">Exit Portal</span>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
