import { getMessages } from '@/i18n/request';
import type { Locale } from '@/i18n/config';
import PricingSection from '@/components/pricing/PricingSection';
import { getStaticPlans, getStaticComparisonFeatures } from '@/data/pricing';

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const messages = getMessages(typedLocale);
  const plans = getStaticPlans(typedLocale);
  const comparisonFeatures = getStaticComparisonFeatures(typedLocale);

  return (
    <section className="section-block pt-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center md:mb-12">
          <p className="section-kicker mx-auto mb-4">
            {messages.pricing_page.kicker}
          </p>
          <h1 className="text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl">
            {messages.pricing_page.title}
          </h1>
          <p className="section-lead section-lead--center mx-auto mt-3 max-w-3xl">
            {messages.pricing_page.description}
          </p>
        </div>

        <PricingSection
          locale={typedLocale}
          translations={messages.pricing}
          plans={plans}
          comparisonFeatures={comparisonFeatures}
        />
      </div>
    </section>
  );
}
