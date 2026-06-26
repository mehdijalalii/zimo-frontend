import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "./i18n/config";

function getLocaleFromPathname(pathname: string): string | null {
  const firstSegment = pathname.split("/")[1];
  if (locales.includes(firstSegment as (typeof locales)[number])) {
    return firstSegment;
  }
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = getLocaleFromPathname(pathname);

  if (pathnameHasLocale) return;

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|images|assets).*)",
  ],
};
