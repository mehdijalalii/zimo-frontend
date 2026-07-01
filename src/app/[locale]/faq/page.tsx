import type { Metadata } from 'next';
import { getMessages } from '@/i18n/request';
import type { Locale } from '@/i18n/config';
import FaqAccordion from '@/components/faq/FaqAccordion';

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
  const canonical = `${SITE_URL}${prefix}/faq`;

  return {
    title: `${meta.faq.title} | ${typedLocale === "fa" ? "زیمو" : "Zimo"}`,
    description: meta.faq.description,
    alternates: {
      canonical,
      languages: {
        fa: `${SITE_URL}/faq`,
        en: `${SITE_URL}/en/faq`,
        tr: `${SITE_URL}/tr/faq`,
      },
    },
    openGraph: {
      title: meta.faq.title,
      description: meta.faq.description,
      images: [
        {
          url: `${SITE_URL}/images/landing/zimo-dashboard-${typedLocale}.webp`,
          alt: meta.faq.title,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.faq.title,
      description: meta.faq.description,
      images: [`${SITE_URL}/images/landing/zimo-dashboard-${typedLocale}.webp`],
    },
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const messages = getMessages(typedLocale);

  const faqItems = messages.faq_page.items as { question: string; answer: string }[];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="section-block pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-6xl">
        {/* Hero */}
        <div className="mb-12 text-center md:mb-16">
          <p className="section-kicker mx-auto mb-4">
            {messages.faq_page.kicker}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#841474]">
            {messages.faq_page.title}
          </h1>
          <p className="section-lead section-lead--center mx-auto mt-3 max-w-2xl">
            {messages.faq_page.description}
          </p>
        </div>

        <FaqAccordion
          items={messages.faq_page.items}
          accordionLabel={messages.faq_page.accordion_label}
        />
      </div>
    </section>
  );
}
