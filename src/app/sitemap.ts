import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { languageAlternates, pageUrl, publicRoutes } from '@/lib/seo';
import { getBlogPosts } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = publicRoutes.flatMap(path => locales.map(locale => ({
    url: pageUrl(locale, path),
    alternates: { languages: languageAlternates(path) },
  })));

  const posts = [];
  try {
    let page = 1;
    let lastPage = 1;
    do {
      const response = await getBlogPosts({ page });
      posts.push(...response.data);
      lastPage = response.meta.last_page;
      page += 1;
    } while (page <= lastPage && page <= 100);
  } catch {
    // The sitemap still serves its static URLs while the content API is unavailable.
  }

  const articlePages = posts.flatMap(post => locales.map(locale => {
    const path = `/blog/${post.slug}`;
    return {
      url: pageUrl(locale, path),
      lastModified: new Date(post.updated_at),
      alternates: { languages: languageAlternates(path) },
    };
  }));

  return [...staticPages, ...articlePages];
}
