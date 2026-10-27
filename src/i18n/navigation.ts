import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import { type Locale } from "./config";
import { getLocaleFromPathname, getLocalizedPathname } from "./paths";

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
