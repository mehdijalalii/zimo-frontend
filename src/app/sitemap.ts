import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { languageAlternates, pageUrl, publicRoutes } from '@/lib/seo';
import { getBlogPosts } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = publicRoutes.flatMap(path => locales.map(locale => ({
    url: pageUrl(locale, path),
    ...(path === '/blog' ? {} : { alternates: { languages: languageAlternates(path) } }),
  })));

  const articlePages = [];
  for (const locale of locales) {
    try {
      let page = 1;
      let lastPage = 1;
      do {
        const response = await getBlogPosts({ locale, page });
        articlePages.push(...response.data.map(post => ({
          url: pageUrl(locale, `/blog/${post.slug}`),
          lastModified: new Date(post.updated_at),
        })));
        lastPage = response.meta.last_page;
        page += 1;
      } while (page <= lastPage && page <= 100);
    } catch {
      // The sitemap still serves its available URLs while the content API is unavailable.
    }
  }

  return [...staticPages, ...articlePages];
}
