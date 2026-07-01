import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/login", "/signup"],
      },
    ],
    sitemap: "https://zimo.beauty/sitemap.xml",
  };
}
