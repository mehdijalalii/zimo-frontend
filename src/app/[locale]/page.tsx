import type { Metadata } from 'next';
import { getMessages } from '@/i18n/request';
import type { Locale } from '@/i18n/config';
import HomeHero from '@/components/home/HomeHero';
import HomeHighlights from '@/components/home/HomeHighlights';
import HomeHowItWorks from '@/components/home/HomeHowItWorks';
import HomeStats from '@/components/home/HomeStats';
import HomeTrust from '@/components/home/HomeTrust';
import HomePricing from '@/components/home/HomePricing';
import HomeBlog from '@/components/home/HomeBlog';
import { getStaticPlans } from '@/data/pricing';

import { pageMetadata, pageUrl } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const messages = getMessages(typedLocale);
  const meta = messages.meta;

  return pageMetadata(typedLocale, "/", meta.home);
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const messages = getMessages(typedLocale);
  const plans = getStaticPlans(typedLocale);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Zimo', url: pageUrl(typedLocale, '/'), inLanguage: typedLocale },
        { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Zimo CRM', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', description: messages.meta.home.description, url: pageUrl(typedLocale, '/'), inLanguage: typedLocale, provider: { '@type': 'Organization', name: 'Zimo', url: 'https://zimo.beauty' } },
      ]).replace(/</g, '\u003c') }} />
      <HomeHero locale={typedLocale} translations={messages} />
      <HomeHighlights locale={typedLocale} translations={messages} />
      <HomeHowItWorks translations={messages} />
      <HomeStats translations={messages} />
      <HomeTrust translations={messages} />
      <HomePricing locale={typedLocale} plans={plans} translations={messages.pricing} />
      <HomeBlog locale={typedLocale} />
    </>
  );
}
