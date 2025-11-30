import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { getSession, updateSession } from "./lib/session";

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

// types of route
const onlyAdminRoutes = ["/admin"];
const authRoutes = ["/auth"];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const session = await getSession();

  if (session) {
    await updateSession();
  }

  const isProtectedAdmin = onlyAdminRoutes.some((route) =>
    path.startsWith(route)
  );

  const isAuthRoutes = authRoutes.some((route) => path.startsWith(route));

  /**
   * ADMIN
   */

  // redirect user to login if user is not logged
  if (isProtectedAdmin && !session?._id) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  /**
   * AUTH
   */
  // Only redirect from auth routes if user is logged in
  if (isAuthRoutes && session?._id) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  return handleI18nRouting(req);
}

// Routes Middleware should not run on
export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
