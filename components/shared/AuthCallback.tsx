"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";

export default function AuthCallback() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const message = searchParams.get("message");

  return (
    <div className="flex flex-col bg-dark items-center justify-center min-h-screen p-4 font-sans">
      <div className="max-w-md border border-gray8 w-full p-10 rounded-2xl text-center bg-darkCard">
        {/* CASE 1: SUCCESS */}
        {status === "success" && (
          <>
            <div className="w-20 h-20 text-tertiary bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} />
            </div>
            <h1 className="text-3xl font-bold mb-3 text-white">
              Email Verified!
            </h1>
            <p className="text-gray4 mb-10 leading-relaxed">
              Your account has been successfully activated. You're all set to
              start your journey with us.
            </p>
            <Link
              href="/login"
              className="p-4 px-10 primary-btn w-full block rounded-lg font-semibold tracking-wide"
            >
              Go to Login
            </Link>
          </>
        )}

        {/* CASE 2: ERROR */}
        {status === "error" && (
          <>
            <div className="w-20 h-20 text-red-500 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle size={48} />
            </div>
            <h1 className="text-3xl font-bold mb-3 text-white">Oops!</h1>
            <p className="text-gray4 mb-4 font-medium text-red-400">
              {message || "Verification failed"}
            </p>
            <p className="text-gray4 mb-10 text-sm">
              The link might have expired or was already used. Please try
              signing up again.
            </p>
            <Link
              href="/signup"
              className="p-4 px-10 border border-gray8 text-white w-full block rounded-lg hover:bg-white/5 transition-all"
            >
              Back to Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
