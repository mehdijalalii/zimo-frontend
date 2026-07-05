import type { Metadata } from 'next';
import { getMessages } from '@/i18n/request';
import type { Locale } from '@/i18n/config';
import ContactForm from '@/components/contact/ContactForm';

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
  const canonical = `${SITE_URL}${prefix}/contact`;

  return {
    title: `${meta.contact.title} | ${typedLocale === "fa" ? "زیمو" : "Zimo"}`,
    description: meta.contact.description,
    alternates: {
      canonical,
      languages: {
        fa: `${SITE_URL}/contact`,
        en: `${SITE_URL}/en/contact`,
        tr: `${SITE_URL}/tr/contact`,
      },
    },
    openGraph: {
      title: meta.contact.title,
      description: meta.contact.description,
      images: [
        {
          url: `${SITE_URL}/images/landing/zimo-dashboard-${typedLocale}.webp`,
          alt: meta.contact.title,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.contact.title,
      description: meta.contact.description,
      images: [`${SITE_URL}/images/landing/zimo-dashboard-${typedLocale}.webp`],
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const messages = getMessages(typedLocale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: messages.meta.contact.title,
    description: messages.meta.contact.description,
    url: `${SITE_URL}${typedLocale === 'fa' ? '' : `/${typedLocale}`}/contact`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />      {/* Hero */}
      <section className="section-block !pb-0 pt-32">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="section-kicker mx-auto mb-4">
            {messages.contact_page.kicker}
          </p>
          <h1 className="page-title">
            {messages.contact_page.title}
          </h1>
          <p className="section-lead section-lead--center mx-auto mt-3 max-w-2xl">
            {messages.contact_page.description}
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="section-block">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* Info */}
          <div>
            <h2 className="section-heading">{messages.contact.heading}</h2>
            <p className="section-copy">{messages.contact.lead}</p>

            <ul className="mt-8 space-y-6">
              {/*<li className="flex items-start gap-4">*/}
              {/*  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#841474]/10 text-[#841474]">*/}
              {/*    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
              {/*      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />*/}
              {/*    </svg>*/}
              {/*  </div>*/}
              {/*  <span>*/}
              {/*    <strong className="block text-sm text-gray-900">*/}
              {/*      {messages.contact.phone_label}*/}
              {/*    </strong>*/}
              {/*    <a*/}
              {/*      href={`tel:${messages.contact.phone_number.replace(/\s/g, '')}`}*/}
              {/*      className="text-lg font-bold text-[#841474] hover:underline"*/}
              {/*      dir="ltr"*/}
              {/*    >*/}
              {/*      {messages.contact.phone_number}*/}
              {/*    </a>*/}
              {/*  </span>*/}
              {/*</li>*/}
              <li className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#841474]/10 text-[#841474] mt-2">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>
                  <strong className="block text-sm text-gray-900">
                    {messages.contact.hours_label}
                  </strong>
                  <span className="text-gray-600">
                    {messages.contact.hours_weekdays}
                  </span>
                  <br />
                  <span className="text-gray-600">
                    {messages.contact.hours_weekend}
                  </span>
                </span>
              </li>
            </ul>
          </div>

          {/* Form */}
          <ContactForm translations={messages.contact.form} />
        </div>
      </section>
    </>
  );
}
