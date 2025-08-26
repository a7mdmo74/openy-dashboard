import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if user is authenticated by looking for auth data in cookies
  // You can also check localStorage data if you set it as a cookie
  const authUser = request.cookies.get("authUser");
  const rememberMe = request.cookies.get("rememberMe");

  // Alternative: Check for a session token or JWT
  // const token = request.cookies.get("authToken");

  // Check if user is authenticated - either with remember me or session auth
  const isAuthenticated = authUser !== undefined;

  // If user visits root `/`, redirect based on auth status
  if (pathname === "/") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Protect dashboard routes - redirect to login if not authenticated
  if (pathname.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Redirect authenticated users away from login page
  if (pathname === "/login" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};
