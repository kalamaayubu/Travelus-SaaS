"use client";

import { DriverSchema, DriverSignupFields } from "@/lib/validations/validate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function DriverSignup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DriverSignupFields>({
    resolver: zodResolver(DriverSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: DriverSignupFields) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data }),
      });

      const result = await res.json();

      if (!result.success) {
        toast.error("Registration failed", {
          description: result.error,
        });
        throw new Error(result.error || "Signup failed");
      }

      toast.success("Account created successfully", {
        description: "Please check your email for verification.",
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Full name */}
      <div>
        <label className="text-sm uppercase text-gray4 mb-1 block">
          Full Name
        </label>
        <input
          {...register("fullname")}
          type="text"
          placeholder="Enter Full Name"
          className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-colors ${
            errors.fullname ? "border-red-500" : "border-white/10"
          }`}
        />
        {errors.fullname && (
          <p className="text-red-500 text-xs mt-1">{errors.fullname.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="text-sm text-gray4 uppercase mb-1 block">Email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="Enter Email"
          className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-colors ${
            errors.email ? "border-red-500" : "border-white/10"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Phone  */}
      <div>
        <label className="text-sm text-gray4 uppercase mb-1 block">
          Phone (M-Pesa)
        </label>
        <input
          {...register("phone")}
          type="tel"
          placeholder="0712345678"
          className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-colors ${
            errors.phone ? "border-red-500" : "border-white/10"
          }`}
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="text-sm uppercase tracking-tight text-gray4 mb-1 block">
          Password
        </label>
        <input
          {...register("password")}
          type="password"
          placeholder="Enter Password"
          className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-colors ${
            errors.password ? "border-red-500" : "border-white/10"
          }`}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full py-4 flex items-center gap-4 justify-center rounded-lg font-bold bg-primary hover:bg-primary/90 text-black transition-all"
      >
        {isSubmitting && <Loader2 className="size-5 animate-spin" />}
        {isSubmitting ? "Processing..." : "Join as Driver"}
      </button>
    </form>
  );
}
