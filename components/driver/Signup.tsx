"use client";

import { DriverSchema } from "@/lib/validations/validate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import z from "zod";
import Link from "next/link";

type DriverSignupFields = z.infer<typeof DriverSchema>;

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
    const toastId = toast.info(
      <b className="font-bold text-white text-lg">Contact Us</b>,
      {
        description: (
          <span>
            Please contact SafiriBridge team to be registered as a driver.{" "}
            <Link
              href="/#pricing"
              className="underline font-bold text-sky-400"
              // 2. Dismiss the toast using the captured ID on click
              onClick={() => setTimeout(() => toast.dismiss(toastId), 2000)}
            >
              Click here.
            </Link>
          </span>
        ),
        duration: 8000,
      },
    );
    return toastId;

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data }),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Account created successfully", {
          description: "Please check your email for verification.",
        });
        return;
      }

      if (!result.success) {
        toast.error("Registration failed", {
          description: result.error,
        });
      }

      throw new Error(result.error || "Signup failed");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Full name */}
      <div>
        <label className="text-sm text-gray4 mb-1 block">Full Name</label>
        <input
          {...register("fullname")}
          type="text"
          placeholder="e.g, James Kariuki"
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
        <label className="text-sm text-gray4 mb-1 block">Email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="example@gmail.com"
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
        <label className="text-sm text-gray4 mb-1 block">Phone (M-Pesa)</label>
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
        <label className="text-sm tracking-tight text-gray4 mb-1 block">
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
