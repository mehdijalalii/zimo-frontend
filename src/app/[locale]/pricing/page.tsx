import type { Metadata } from 'next';
import { getMessages } from '@/i18n/request';
import type { Locale } from '@/i18n/config';
import PricingSection from '@/components/pricing/PricingSection';
import { getStaticPlans, getStaticComparisonFeatures } from '@/data/pricing';

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
  const canonical = `${SITE_URL}${prefix}/pricing`;

  return {
    title: `${meta.pricing.title} | ${typedLocale === "fa" ? "زیمو" : "Zimo"}`,
    description: meta.pricing.description,
    alternates: {
      canonical,
      languages: {
        fa: `${SITE_URL}/pricing`,
        en: `${SITE_URL}/en/pricing`,
        tr: `${SITE_URL}/tr/pricing`,
      },
    },
    openGraph: {
      title: meta.pricing.title,
      description: meta.pricing.description,
      images: [
        {
          url: `${SITE_URL}/images/landing/zimo-dashboard-${typedLocale}.webp`,
          alt: meta.pricing.title,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.pricing.title,
      description: meta.pricing.description,
      images: [`${SITE_URL}/images/landing/zimo-dashboard-${typedLocale}.webp`],
    },
  };
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
    url: SITE_URL,
    offers: plans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      price: plan.price,
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
