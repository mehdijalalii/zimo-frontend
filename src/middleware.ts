import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "./i18n/config";
import { SITE_URL } from "./lib/seo";

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

  if (request.headers.get("host")?.split(":")[0] === "www.zimo.beauty") {
    const target = new URL(SITE_URL);
    target.pathname = pathnameHasLocale === defaultLocale
      ? pathname.slice(defaultLocale.length + 1) || "/"
      : pathname;
    target.search = request.nextUrl.search;
    return NextResponse.redirect(target, 308);
  }

  if (pathnameHasLocale === defaultLocale) {
    // Consolidate existing /fa aliases into the established Persian canonical URLs.
    request.nextUrl.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(request.nextUrl, 308);
  }
  if (pathnameHasLocale) return;

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(request.nextUrl);
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon\\.ico|favicon\\.png|favicon\\.svg|images|assets|fonts|sitemap\\.xml|robots\\.txt).*)",
  ],
};
