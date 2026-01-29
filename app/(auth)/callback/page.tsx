"use client";

import { Check, X } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("Verifying your email...");
  const [details, setDetails] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      const code = searchParams.get("code");

      if (!code) {
        setStatus("error");
        setMessage("Invalid verification link");
        setDetails("No verification code found in the link.");
        return;
      }

      try {
        setStatus("loading");
        setMessage("Verifying your email...");

        const response = await fetch(`/api/auth/verify-email?code=${code}`);
        const data = await response.json();

        if (data.success) {
          setStatus("success");
          setMessage("Verified Successfully!");
          setDetails(data.message);
        } else {
          setStatus("error");
          setMessage("Verification Failed");
          setDetails(data.message || data.error || "Something went wrong");
        }
      } catch (error) {
        setStatus("error");
        setMessage("Network Error");
        setDetails(
          "Failed to connect to verification service. Please check your internet connection.",
        );
      }
    };

    verifyEmail();
  }, [searchParams]);

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <>
            <div className="w-16 h-16 border-4 border-t-primary border-gray8 rounded-full animate-spin mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2 text-white">Verifying...</h1>
            <p className="text-gray4">{message}</p>
          </>
        );

      case "success":
        return (
          <>
            <div className="w-16 h-16 bg-tertiary rounded-full flex items-center justify-center mx-auto mb-4">
              <Check />
            </div>
            <h1 className="text-2xl font-bold mb-2 text-white">{message}</h1>
            <p className="text-gray-300 mb-6">{details}</p>
            <div className="space-y-3">
              <button
                onClick={() => router.push("/login")}
                className="w-full px-6 py-3 bg-tertiary text-white rounded-lg transition-colors"
              >
                Go to Login
              </button>
            </div>
          </>
        );

      case "error":
        return (
          <>
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <X />
            </div>
            <h1 className="text-2xl font-bold mb-2 text-white">{message}</h1>
            <p className="text-gray-300 mb-6">{details}</p>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col bg-dark items-center justify-center min-h-screen p-4">
      <div
        className={`max-w-md border ${
          status === "success"
            ? "border-green-500/30"
            : status === "error"
              ? "border-red-500/40"
              : "border-gray8"
        } w-full p-8 rounded-xl shadow-md text-center`}
      >
        {renderContent()}
      </div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col bg-dark items-center justify-center min-h-screen p-4">
          <div className="max-w-md border border-gray8 w-full p-8 rounded-xl shadow-md text-center">
            <div className="w-16 h-16 border-4 border-t-primary border-gray8 rounded-full animate-spin mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2 text-white">Loading...</h1>
            <p className="text-gray4">Preparing verification...</p>
          </div>
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}
