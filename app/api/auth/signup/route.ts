import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const data = await req.json();

    const { data: signupData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          fullname: data.fullname,
          phone: data.phone,
          role: data.role,
        },
      },
    });

    if (authError) {
      return NextResponse.json(
        {
          error: authError.message,
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      user: signupData.user,
      message: "Successful. Check your email for verification.",
    });
  } catch (error) {
    console.log("Unknown error occured", error);
    return NextResponse.json(
      { error: "Internal Server error!" },
      { status: 500 },
    );
  }
}
