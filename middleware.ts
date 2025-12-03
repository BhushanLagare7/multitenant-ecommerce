import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /**
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|media/|[\w-]+\.\w+).*)",
  ],
};

/**
 * Middleware function to handle tenant routing.
 * @description This middleware function is used to handle tenant routing.
 * @param request - The incoming request.
 * @returns The response.
 */
export default async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  // Extract the hostname (e.g. "bhushan.funroad.com" or "antonio.localhost:3000")
  const hostname = request.headers.get("host") || "";

  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "";

  if (hostname.endsWith(`.${rootDomain}`)) {
    const tenantSlug = hostname.replace(`.${rootDomain}`, "");
    return NextResponse.rewrite(
      new URL(`/tenants/${tenantSlug}${url.pathname}`, request.url)
    );
  }

  return NextResponse.next();
}
