import type { MetadataRoute } from 'next';

const SITE_URL = "https://zimo.beauty";
const locales = ["fa", "en", "tr"] as const;
const lastModified = new Date("2025-01-01");

const pages = [
  { slug: "", priority: 1.0, changeFrequency: "weekly" as const },
  { slug: "features", priority: 0.9, changeFrequency: "weekly" as const },
  { slug: "pricing", priority: 0.8, changeFrequency: "monthly" as const },
  { slug: "faq", priority: 0.7, changeFrequency: "monthly" as const },
  { slug: "about", priority: 0.7, changeFrequency: "monthly" as const },
  { slug: "contact", priority: 0.8, changeFrequency: "monthly" as const },
  { slug: "demo", priority: 0.9, changeFrequency: "monthly" as const },
];

const featureSlugs = [
  'appointments', 'finance', 'branches', 'loyalty', 'payroll',
  'reporting', 'security', 'staff-performance', 'staff-dashboard', 'marketing-crm',
];

function getAlternates(slug: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    const prefix = locale === "fa" ? "" : `/${locale}`;
    languages[locale] = `${SITE_URL}${prefix}/${slug}`;
  }
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      const prefix = locale === "fa" ? "" : `/${locale}`;
      urls.push({
        url: `${SITE_URL}${prefix}/${page.slug}`,
        lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: getAlternates(page.slug),
        },
      });
    }
  }

  for (const slug of featureSlugs) {
    for (const locale of locales) {
      const prefix = locale === "fa" ? "" : `/${locale}`;
      urls.push({
        url: `${SITE_URL}${prefix}/feature/${slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: getAlternates(`feature/${slug}`),
        },
      });
    }
  }

  return urls;
}
