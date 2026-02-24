"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw, Home, MoveLeft } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service like Sentry
    console.error("System Failure:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center p-6 relative overflow-hidden">
      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        {/* Icon with Glitch Effect Style */}
        <div className="relative inline-block">
          <div className="size-24 bg-soft-dark border border-white/10 rounded-3xl flex items-center justify-center mx-auto">
            <AlertTriangle size={48} className="text-red-500" />
          </div>
          <div className="absolute -inset-1 bg-red-500/20 blur-lg rounded-3xl -z-10 animate-pulse" />
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white">
            An <span className="text-red-500">error</span> occured
          </h1>
          <p className="text-gray4 leading-relaxed">
            Something went wrong while processing your request. The engine
            stalled, but we can try to jumpstart it.
          </p>
          {error.digest && (
            <code className="block text-[10px] font-mono text-gray3 bg-white/5 py-1 px-2 rounded mt-4">
              Error ID: {error.digest}
            </code>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {/* Primary Action: Retry */}
          <button
            onClick={() => reset()}
            className="w-full h-14 bg-white text-black font-black uppercase tracking-[0.2em] text-sm rounded-xl flex items-center justify-center gap-3 hover:bg-gray2 transition-all active:scale-[0.98]"
          >
            <RefreshCcw size={18} />
            Try Again
          </button>

          {/* Secondary Action: Go Home */}
          <Link
            href="/"
            className="w-full h-14 bg-soft-dark border border-white/10 text-white font-black uppercase tracking-[0.2em] text-sm rounded-xl flex items-center justify-center gap-3 hover:bg-white/5 transition-all"
          >
            <Home size={18} />
            Go back
          </Link>
        </div>
      </div>
    </div>
  );
}
