import { NextRequest, NextResponse } from "next/server";

function getRedirectPathByUserType(userType?: string | null) {
  switch ((userType ?? "").toUpperCase()) {
    case "ADMIN":
      return "/dashboard/admin";
    case "RECEPTIONIST":
      return "/dashboard/receptionist";
    case "DOCTOR":
      return "/dashboard/doctor";
    default:
      return "/dashboard/doctor";
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("token")?.value;
  const userType = req.cookies.get("user_type")?.value;
  const roleHome = getRedirectPathByUserType(userType);

  // Protect dashboard routes.
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/signin";
      url.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
      return NextResponse.redirect(url);
    }

    // Keep users within their role area when user_type is known.
    const normalized = (userType ?? "").toUpperCase();
    const isAdminArea = pathname.startsWith("/dashboard/admin");
    const isReceptionistArea = pathname.startsWith("/dashboard/receptionist");
    const isDoctorArea = pathname.startsWith("/dashboard/doctor");

    if (
      userType &&
      ((isAdminArea && normalized !== "ADMIN") ||
        (isReceptionistArea && normalized !== "RECEPTIONIST") ||
        (isDoctorArea && normalized !== "DOCTOR"))
    ) {
      const url = req.nextUrl.clone();
      url.pathname = "/unauthorized";
      url.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
      return NextResponse.redirect(url);
    }

    if (normalized === "ADMIN" && pathname.startsWith("/dashboard/admin")) {
      return NextResponse.next();
    }
    if (
      normalized === "RECEPTIONIST" &&
      pathname.startsWith("/dashboard/receptionist")
    ) {
      return NextResponse.next();
    }
    if (normalized === "DOCTOR" && pathname.startsWith("/dashboard/doctor")) {
      return NextResponse.next();
    }

    if (userType && (isAdminArea || isReceptionistArea || isDoctorArea)) {
      const url = req.nextUrl.clone();
      url.pathname = roleHome;
      url.search = "";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  // If already logged in, keep auth pages from showing.
  if (pathname.startsWith("/auth")) {
    if (token) {
      const next = req.nextUrl.searchParams.get("next");
      const url = req.nextUrl.clone();
      url.pathname = next && next.startsWith("/") ? next : roleHome;
      url.search = "";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
