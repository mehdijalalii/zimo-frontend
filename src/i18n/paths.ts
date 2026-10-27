import { defaultLocale, locales, type Locale } from './config';

export function getLocaleFromPathname(pathname: string): Locale {
  const first = pathname.split('/')[1];
  return locales.includes(first as Locale) ? first as Locale : defaultLocale;
}

/** Persian is the default, unprefixed public URL; all locales share route names. */
export function getLocalizedPathname(pathname: string, locale: Locale): string {
  const path = pathname.split(/[?#]/)[0];
  const segments = path.split('/').filter(Boolean);
  if (locales.includes(segments[0] as Locale)) segments.shift();
  if (locale !== defaultLocale) segments.unshift(locale);
  return '/' + segments.join('/');
}
