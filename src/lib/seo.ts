import type { Metadata } from 'next';
import { locales, type Locale } from '@/i18n/config';
import { getLocalizedPathname } from '@/i18n/paths';

export const SITE_URL = 'https://zimo.beauty';
export const featureSlugs = [
  'appointments', 'finance', 'branches', 'loyalty', 'payroll',
  'reporting', 'security', 'staff-performance', 'staff-dashboard', 'marketing-crm',
] as const;

/** Only complete, public landing pages belong here. Team is a coming-soon placeholder. */
export const publicRoutes = [
  '/', '/features', '/pricing', '/faq', '/about', '/contact', '/demo',
  ...featureSlugs.map(slug => `/feature/${slug}`),
];

export function pageUrl(locale: Locale, path: string): string {
  const localized = getLocalizedPathname(path, locale);
  // Next's metadata serializer normalizes the bare origin without a terminal slash.
  return SITE_URL + (localized === '/' ? '' : localized);
}

export function languageAlternates(path: string): Record<Locale, string> {
  return Object.fromEntries(locales.map(locale => [locale, pageUrl(locale, path)])) as Record<Locale, string>;
}

export function pageMetadata(locale: Locale, path: string, meta: { title: string; description: string }): Metadata {
  const url = pageUrl(locale, path);
  const image = `${SITE_URL}/images/landing/zimo-dashboard-${locale}.webp`;
  return {
    title: `${meta.title} | ${locale === 'fa' ? 'زیمو' : 'Zimo'}`,
    description: meta.description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: 'website',
      url,
      siteName: 'Zimo CRM',
      locale: locale === 'fa' ? 'fa_IR' : locale === 'en' ? 'en_US' : 'tr_TR',
      title: meta.title,
      description: meta.description,
      images: [{ url: image, alt: meta.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [image],
    },
  };
}
