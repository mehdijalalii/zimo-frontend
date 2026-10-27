import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { languageAlternates, pageUrl, publicRoutes } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.flatMap(path => locales.map(locale => ({
    url: pageUrl(locale, path),
    alternates: { languages: languageAlternates(path) },
  })));
}
