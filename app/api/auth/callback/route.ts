import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();

    console.log("Verifying... ");

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    console.log("Verified.");

    if (!error) {
      console.log("Verification Error: ", error);
      return NextResponse.redirect(`${origin}/callback`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
