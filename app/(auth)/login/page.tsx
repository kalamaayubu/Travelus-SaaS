"use client";

import Link from "next/link";
import { Loader2, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/lib/validations/validate";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface LoginFields {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFields>({
    resolver: zodResolver(LoginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginFields) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data }),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Log in successfully");
        router.replace(result.redirectUrl);
        return;
      }

      if (!result.success) {
        toast.error("Login failed", {
          description: result.error,
        });
      }

      throw new Error(result.error || "Login failed");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <section className="min-h-screen bg-dark flex items-center justify-center px-6">
      <div className="max-w-lg py-6 rounded-xl w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary mb-6">
            <Image
              src={"/assets/icons/logo.svg"}
              width={200}
              height={200}
              alt="Logo"
              className="size-8"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray4">Securely log in to your dashboard</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm text-gray4 mb-1 block">
              Email Address
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="example@gmail.com"
              className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-colors ${
                errors.email ? "border-red-500" : "border-white/10"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm text-gray4 block">Password</label>
            </div>
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-colors ${
                errors.password ? "border-red-500" : "border-white/10"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* <Link href="#" className="text-xs text-primary hover:underline">
            Forgot password?
          </Link> */}

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full py-3 flex items-center gap-4 justify-center rounded-lg font-bold bg-primary hover:bg-primary/90 text-black transition-all"
          >
            {isSubmitting && <Loader2 className="size-5 animate-spin" />}
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-center text-gray5 mt-8 text-sm">
          New to Travelus?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}
