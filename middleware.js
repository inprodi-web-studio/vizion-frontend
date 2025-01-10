import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token");

  // if (process.env.NODE_ENV === "development") {
  //   return NextResponse.next();
  // }

  if (!token) {
    if (
      request.nextUrl.pathname.startsWith("/crm") || 
      request.nextUrl.pathname.startsWith("/stocks")
    ) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  } else {
    if (request.nextUrl.pathname.includes("/auth/login")) {
      return NextResponse.redirect(new URL("/crm/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/:path*/auth/login",
    "/auth/login",
    "/crm/:path*",
    "/v2/crm/:path*",
    "/stocks/:path*",
    "/v2/stocks/:path*",
  ],
};
