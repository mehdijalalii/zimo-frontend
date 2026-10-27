import type { Metadata } from 'next';
import { getMessages } from '@/i18n/request';
import type { Locale } from '@/i18n/config';
import PricingSection from '@/components/pricing/PricingSection';
import { getStaticPlans, getStaticComparisonFeatures } from '@/data/pricing';

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

  return pageMetadata(typedLocale, "/pricing", meta.pricing);
}

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Zimo CRM",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: pageUrl(typedLocale, '/pricing'),
    offers: plans.filter(plan => plan.pricing_type === 'fixed' && Number(plan.price) > 0).map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      price: Number(plan.price) * (typedLocale === 'fa' ? 10 : 1),
      priceCurrency: typedLocale === 'fa' ? 'IRR' : typedLocale === 'tr' ? 'TRY' : 'USD',
      description: plan.landing_subtitle,
    })),
  };

  return (
    <section className="section-block pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center md:mb-12">
          <p className="section-kicker mx-auto mb-4">
            {messages.pricing_page.kicker}
          </p>
          <h1 className="page-title">
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
