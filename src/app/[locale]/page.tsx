import { getMessages } from '@/i18n/request';
import type { Locale } from '@/i18n/config';
import HomeHero from '@/components/home/HomeHero';
import HomeHighlights from '@/components/home/HomeHighlights';
import HomeHowItWorks from '@/components/home/HomeHowItWorks';
import HomeStats from '@/components/home/HomeStats';
import HomeTrust from '@/components/home/HomeTrust';
import DemoCta from '@/components/home/DemoCta';

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
      <DemoCta locale={typedLocale} translations={messages} />
    </>
  );
}
