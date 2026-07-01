import type { Metadata } from 'next';
import { getMessages } from '@/i18n/request';
import type { Locale } from '@/i18n/config';
import HomeHero from '@/components/home/HomeHero';
import HomeHighlights from '@/components/home/HomeHighlights';
import HomeHowItWorks from '@/components/home/HomeHowItWorks';
import HomeStats from '@/components/home/HomeStats';
import HomeTrust from '@/components/home/HomeTrust';

const SITE_URL = "https://zimo.beauty";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const messages = getMessages(typedLocale);
  const meta = messages.meta;

  const prefix = typedLocale === "fa" ? "" : `/${typedLocale}`;
  const path = prefix || "/";
  const canonical = `${SITE_URL}${path}`;

  return {
    title: `${meta.home.title} | ${typedLocale === "fa" ? "زیمو" : "Zimo"}`,
    description: meta.home.description,
    alternates: {
      canonical,
      languages: {
        fa: `${SITE_URL}/`,
        en: `${SITE_URL}/en`,
        tr: `${SITE_URL}/tr`,
      },
    },
    openGraph: {
      title: meta.home.title,
      description: meta.home.description,
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const messages = getMessages(typedLocale);

  return (
    <>
      <HomeHero locale={typedLocale} translations={messages} />
      <HomeHighlights locale={typedLocale} translations={messages} />
      <HomeHowItWorks translations={messages} />
      <HomeStats translations={messages} />
      <HomeTrust translations={messages} />
    </>
  );
}
