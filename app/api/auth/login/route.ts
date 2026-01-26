import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, from } = await req.json();
    const supabase = await createClient();

    // Authenticate user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    // Fetch user role
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profileError) {
      return NextResponse.json(
        { error: "Could not fetch user profile." },
        { status: 500 },
      );
    }

    // Determine user redirection
    const role = profileData.role;
    let redirectUrl = from || "/";

    if (!from) {
      if (role === "passenger") redirectUrl = "/passenger/dashboard";
      else if (role === "driver") redirectUrl = "/driver/dashboard";
      else if (role === "operator") redirectUrl = "/operator";
    }

    // Response object
    const response = NextResponse.json({
      success: true,
      role,
      user: data.user,
      redirectUrl,
    });

    // Set session cookies
    const cookieOptions = {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
    };

    response.cookies.set(
      "authState",
      encodeURIComponent(JSON.stringify({ role, isAuthenticated: true })),
      cookieOptions,
    );

    response.cookies.set("sb-access-token", data.session.access_token, {
      ...cookieOptions,
      maxAge: 60 * 60 * 5,
    });

    response.cookies.set("sb-refresh-token", data.session.refresh_token, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.log("unknown error occured:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
