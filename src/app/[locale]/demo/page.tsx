import type { Metadata } from 'next';
import { getMessages } from '@/i18n/request';
import type { Locale } from '@/i18n/config';
import DemoForm from '@/components/demo/DemoForm';

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
  const canonical = `${SITE_URL}${prefix}/demo`;

  return {
    title: `${meta.demo.title} | ${typedLocale === "fa" ? "زیمو" : "Zimo"}`,
    description: meta.demo.description,
    alternates: {
      canonical,
      languages: {
        fa: `${SITE_URL}/demo`,
        en: `${SITE_URL}/en/demo`,
        tr: `${SITE_URL}/tr/demo`,
      },
    },
    openGraph: {
      title: meta.demo.title,
      description: meta.demo.description,
      images: [
        {
          url: `${SITE_URL}/images/landing/zimo-dashboard-${typedLocale}.webp`,
          alt: meta.demo.title,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.demo.title,
      description: meta.demo.description,
      images: [`${SITE_URL}/images/landing/zimo-dashboard-${typedLocale}.webp`],
    },
  };
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const messages = getMessages(typedLocale);

  return (
    <section className="section-block pt-32">
      <div className="mx-auto max-w-6xl">
        {/* Hero */}
        <div className="mb-16 text-center md:mb-20">
          <p className="section-kicker mx-auto mb-4">
            {messages.demo_page.kicker}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#841474]">
            {messages.demo_page.title}
          </h1>
          <p className="section-lead section-lead--center mx-auto mt-3 max-w-2xl">
            {messages.demo_page.description}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* Left: Steps */}
          <div>
            <h2 className="section-heading">{messages.demo_form.heading}</h2>
            <p className="section-copy">{messages.demo_form.lead}</p>

            <ul className="mt-8 space-y-6">
              {messages.demo_form.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#841474]/10 text-xl text-[#841474]">
                    {step.number}
                  </span>
                  <div>
                    <strong className="block text-base text-gray-900">
                      {step.title}
                    </strong>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Form */}
          <DemoForm translations={messages.demo_form.form} />
        </div>
      </div>
    </section>
  );
}
