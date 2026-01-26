"use client";

import { useState } from "react";
import Link from "next/link";
import { User, CarFront, Building2, ArrowRight } from "lucide-react";
import PassengerSignup from "@/components/passenger/Signup";
import DriverSignup from "@/components/driver/Signup";
import OperatorSignup from "@/components/operator/Signup";

type Role = "passenger" | "driver" | "operator";

export default function SignupPage() {
  const [role, setRole] = useState<Role | null>(null);

  return (
    <section className="min-h-screen bg-dark flex items-center justify-center px-6 py-20">
      <div className="max-w-lg px-8 py-6 rounded-xl bg-white/5 border border-white/2 w-full">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">
            {role ? `Join as ${role}` : "Create an account"}
          </h1>
          <p className="text-gray4">Join the future of Kenyan transport</p>
        </div>

        {/* 1. ROLE SELECTION VIEW (Shown when role is null) */}
        {!role ? (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
            {/* Passenger Option */}
            <RoleButton
              title="Passenger"
              description="Book seats and travel comfortably."
              icon={<User />}
              colorClass="hover:border-tertiary hover:bg-tertiary/5"
              iconBg="bg-tertiary/10 text-tertiary"
              onClick={() => setRole("passenger")}
            />

            {/* Driver Option */}
            <RoleButton
              title="Independent Driver"
              description="Pay 10% per seat. No monthly fees."
              icon={<CarFront className="size-6" />}
              colorClass="hover:border-primary hover:bg-primary/5"
              iconBg="bg-primary/10 text-primary"
              onClick={() => setRole("driver")}
            />

            {/* Operator Option */}
            <RoleButton
              title="Fleet Operator"
              description="Manage routes and 0% commission."
              icon={<Building2 />}
              colorClass="hover:border-secondary hover:bg-secondary/5"
              iconBg="bg-secondary/10 text-secondary"
              onClick={() => setRole("operator")}
            />
          </div>
        ) : (
          /* 2. SPECIFIC FORM VIEW (Shown when a role is selected) */
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {role === "passenger" && <PassengerSignup />}
            {role === "driver" && <DriverSignup />}
            {role === "operator" && <OperatorSignup />}

            <button
              onClick={() => setRole(null)}
              className="block mx-auto mt-8 text-gray4 text-sm hover:text-white transition-colors"
            >
              ← Choose a different role
            </button>
          </div>
        )}

        <p className="text-center text-gray2 mt-8 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-secondary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}

/**
 * Reusable Button for Role Selection
 */
function RoleButton({
  title,
  description,
  icon,
  colorClass,
  iconBg,
  onClick,
}: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-5 transition-all group ${colorClass}`}
    >
      <div
        className={`size-12 px-3 rounded-xl flex items-center justify-center ${iconBg}`}
      >
        {icon}
      </div>
      <div className="text-left">
        <h3 className="text-white font-bold">{title}</h3>
        <p className="text-gray4 text-sm">{description}</p>
      </div>
      <ArrowRight className="size-5 text-gray6 ml-auto group-hover:translate-x-1 transition-all" />
    </button>
  );
}
