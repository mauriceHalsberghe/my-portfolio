import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const auth = req.cookies.get("admin_auth")?.value;

  if (req.nextUrl.pathname.startsWith("/admin") &&
      !req.nextUrl.pathname.startsWith("/admin/login")) {
    if (auth !== process.env.ADMIN_SECRET) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};