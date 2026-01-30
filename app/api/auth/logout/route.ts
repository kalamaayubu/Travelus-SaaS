import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const supabase = await createClient();
    const cookieStore = await cookies();

    // Sign out from Supabase
    const { error } = await supabase.auth.signOut();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    // 2. Clear "authState" cookie
    cookieStore.delete("authState");

    // 3. Return a successful response
    return NextResponse.json({
      success: true,
      message: "Successfully logged out.",
    });
  } catch (error) {
    console.log("Error Logout: ", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
