import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        {
          success: false,
          error: "No verification code provided",
          message: "Invalid verification link",
        },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    console.log("Exchanging code for session...");
    const { error: exchangeError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error("Code exchange error:", exchangeError);
      return NextResponse.json(
        {
          success: false,
          error: exchangeError.message,
          message: "Link has already been used or is invalid",
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "You can now log in to your account.",
    });
  } catch (error) {
    console.error("Unexpected error during verification:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: "An unexpected error occurred",
      },
      { status: 500 },
    );
  }
}
