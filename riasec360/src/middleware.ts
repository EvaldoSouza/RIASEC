// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("Middleware running for path:", pathname); // Debug log

  // Define your protected routes
  const protectedRoutes = [
    // Admin routes
    "/gerenciarTestes",
    "/gerenciarTestes/(.*)",
    "/gerenciarCartoes",
    "/gerenciarCartoes/(.*)",
    "/usuarios/gerenciar",
    "/usuarios/gerenciar/(.*)",
    "/gerenciarAplicacao",
    "/gerenciarAplicacao/(.*)",

    // User routes
    "/realizarTeste",
    "/resultadosParticipante",
    "/perfil",
    "/dashboard",
    "/dashboard/(.*)",
  ];

  const adminRoutes = [
    "/gerenciarTestes",
    "/gerenciarTestes/(.*)",
    "/gerenciarCartoes",
    "/gerenciarCartoes/(.*)",
    "/usuarios/gerenciar",
    "/usuarios/gerenciar/(.*)",
    "/gerenciarAplicacao",
    "/gerenciarAplicacao/(.*)",
  ];

  // Check if current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  console.log("Is protected route:", isProtectedRoute); // Debug log
  console.log("Is admin route:", isAdminRoute); // Debug log

  // Get token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("Token exists:", !!token); // Debug log
  if (token) console.log("User privilege:", token.privilegio); // Debug log
  if (token) console.log("The token:", token); // Debug log

  // Handle protected routes
  if (isProtectedRoute) {
    if (!token) {
      console.log("Redirecting to login"); // Debug log
      const loginUrl = new URL("/usuarios/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Handle admin routes
    if (isAdminRoute && token?.privilegio !== "admin") {
      console.log("Redirecting to unauthorized"); // Debug log
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files and auth API
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
