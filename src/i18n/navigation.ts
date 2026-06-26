import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import { type Locale, locales, defaultLocale } from "./config";

function getLocaleFromPathname(pathname: string): Locale {
  const firstSegment = pathname.split("/")[1];
  if (locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }
  return defaultLocale;
}

function getLocalizedPathname(pathname: string, locale: Locale): string {
  const segments = pathname.split("/");
  const currentLocale = getLocaleFromPathname(pathname);

  if (currentLocale !== defaultLocale) {
    segments.splice(1, 1);
  }

  if (locale === defaultLocale) {
    return segments.join("/") || "/";
  }

  segments.splice(1, 0, locale);
  return segments.join("/");
}

export function useLocalizedRouter() {
  const router = useRouter();
  const pathname = usePathname();

  const push = useCallback(
    (locale: Locale) => {
      const href = getLocalizedPathname(pathname, locale);
      router.push(href);
    },
    [router, pathname],
  );

  const currentLocale = getLocaleFromPathname(pathname);

  return { push, currentLocale, pathname };
}

export { getLocaleFromPathname, getLocalizedPathname };
