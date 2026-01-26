import { NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

export async function proxy(req: NextRequest) {
  return await updateSession(req);
}

export const config = {
  matcher: ["/driver/:path*", "/passenger/:path*"],
};
