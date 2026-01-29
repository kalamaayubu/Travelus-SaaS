import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  console.log("Callback received:", { code, error, errorDescription });

  if (error) {
    console.log("Supabase error:", error, errorDescription);
    return NextResponse.redirect(
      new URL(
        `/callback?status=error&message=${encodeURIComponent(errorDescription || "Verification failed")}`,
        origin,
      ),
    );
  }

  // Handle code exchange for session
  if (code) {
    const supabase = await createClient();

    try {
      const { error: exchangeError } =
        await supabase.auth.exchangeCodeForSession(code);

      if (exchangeError) {
        console.log("Exchange error:", exchangeError);
        return NextResponse.redirect(
          new URL(
            `/callback?status=error&message=${encodeURIComponent(exchangeError.message)}`,
            origin,
          ),
        );
      }

      console.log("Verification successful!");
      return NextResponse.redirect(new URL("/callback?status=success", origin));
    } catch (err) {
      console.log("Unexpected error:", err);
      return NextResponse.redirect(
        new URL(
          `/callback?status=error&message=${encodeURIComponent("Unexpected error during verification")}`,
          origin,
        ),
      );
    }
  }

  // No code or error - invalid request
  console.log("No code or error parameter found");
  return NextResponse.redirect(
    new URL(
      `/callback?status=error&message=${encodeURIComponent("Invalid verification link")}`,
      origin,
    ),
  );
}
