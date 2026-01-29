// app/(auth)/callback/page.tsx
import { Suspense } from "react";
import AuthCallback from "@/components/shared/AuthCallback";

function LoadingFallback() {
  return (
    <div className="flex flex-col bg-dark items-center justify-center min-h-screen p-4">
      <div className="max-w-md border border-gray8 w-full p-8 rounded-xl shadow-md text-center">
        <div className="w-16 h-16 border-4 border-t-tertiary border-gray8 rounded-full animate-spin mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2 text-white">Verifying...</h1>
        <p className="text-gray4">Please wait while we validate your link.</p>
      </div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthCallback />
    </Suspense>
  );
}
