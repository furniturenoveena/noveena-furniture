import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/sessions";

// Public route(s) under /admin
const publicUserRoutes = ["/admin/login"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isAdminRoute = path.startsWith("/admin");
  const isPublicAdminRoute = publicUserRoutes.includes(path);

  if (isAdminRoute && !isPublicAdminRoute) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = sessionCookie ? await decrypt(sessionCookie) : null;
    const user = session?.customerId;

    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    return NextResponse.next(); // Authenticated, proceed
  }

  if (isPublicAdminRoute) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = sessionCookie ? await decrypt(sessionCookie) : null;
    const user = session?.customerId;

    if (user) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    return NextResponse.next(); // Not authenticated, allow access to login
  }

  // No internationalization handling, just proceed with the request
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
