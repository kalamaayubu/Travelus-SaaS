"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service like Sentry or LogSnag
    console.error("Trips Page Error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6">
      <div className="relative mb-8">
        {/* Glow effect for the icon */}
        <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
        <div className="relative size-20 bg-soft-dark border border-red-500/30 rounded-3xl flex items-center justify-center">
          <AlertTriangle className="size-10 text-red-500" />
        </div>
      </div>

      <div className="text-center space-y-2 max-w-md">
        <h1 className="text-3xl font-black tracking-tighter text-white">
          Something went wrong
        </h1>
        <p className="text-[10px] text-gray4 font-bold tracking-[0.2em] leading-relaxed">
          We encountered an error while fetching your journey details. This
          could be a temporary network disruption.
        </p>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-none justify-center">
        <button
          onClick={() => reset()}
          className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-black text-[11px] font-black tracking-[0.2em] rounded-xl hover:bg-primary transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          <RefreshCw size={16} />
          Retry
        </button>

        <Link
          href="/driver"
          className="flex items-center justify-center gap-3 px-8 py-4 bg-soft-dark border border-white/10 text-white text-[11px] font-black tracking-[0.2em] rounded-xl hover:bg-white/5 transition-all"
        >
          <Home size={16} />
          Go home
        </Link>
      </div>

      {error.digest && (
        <p className="mt-8 text-[8px] font-mono text-gray6 tracking-widest">
          Error ID: {error.digest}
        </p>
      )}
    </div>
  );
}
