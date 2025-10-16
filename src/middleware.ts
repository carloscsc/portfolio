import "server-only";

// TODO: criar guard para verificar senhas e funções
// TODO: mudar sistema de roles

import { NextRequest, NextResponse } from "next/server";
import { getSession, updateSession } from "./lib/session";

// types of route
const onlyAdminRoutes = ["/admin"];
const authRoutes = ["/auth"];

export default async function middleware(req: NextRequest) {
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

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
