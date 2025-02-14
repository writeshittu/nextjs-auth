import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url)); // Redirect to login if not authenticated
  }

  return NextResponse.next(); // Allow access if authenticated
}

// Define protected routes
export const config = {
  matcher: [
    "/", // Protect the landing page
    "/dashboard/:path*", // Protect all dashboard routes
  ],
};
