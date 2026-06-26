import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getMessages } from '@/i18n/request';
import type { Locale } from '@/i18n/config';
import { getDashboardImage } from '@/lib/utils';

function getHref(locale: string, slug: string): string {
  const prefix = locale === 'fa' ? '' : `/${locale}`;
  if (slug === 'home') return prefix || '/';
  if (slug === 'features') return `${prefix}/features`;
  if (slug === 'demo') return `${prefix}/demo`;
  return prefix || '/';
}

const validSlugs = [
  'appointments',
  'finance',
  'branches',
  'loyalty',
  'payroll',
  'reporting',
  'security',
  'staff-performance',
  'staff-dashboard',
  'marketing-crm',
];

const translationKeyMap: Record<string, string> = {
  appointments: 'feature_appointments',
  finance: 'feature_finance',
  branches: 'feature_branches',
  loyalty: 'feature_loyalty',
  payroll: 'feature_payroll',
  reporting: 'feature_reporting',
  security: 'feature_security',
  'staff-performance': 'feature_staff_performance',
  'staff-dashboard': 'feature_staff_dashboard',
  'marketing-crm': 'feature_marketing_crm',
};

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export default async function FeatureDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;

  if (!validSlugs.includes(slug)) {
    notFound();
  }

  const messages = getMessages(typedLocale);
  const key = translationKeyMap[slug];
  const feature = messages[key as keyof typeof messages] as Record<string, unknown> | undefined;

  if (!feature) {
    notFound();
  }

  const featureDetail = messages.feature_detail as {
    breadcrumb_home: string;
    breadcrumb_features: string;
    demo_cta: string;
    login_cta: string;
    cta_section: {
      heading: string;
      description: string;
      cta: string;
    };
  };

  const title = feature.title as string;
  const description = feature.description as string;
  const imageAlt = feature.image_alt as string;
  const steps = (feature.steps ?? feature.capabilities ?? feature.dashboards ?? []) as {
    number: string;
    title: string;
    description: string;
  }[];
  const benefits = (feature.benefits ?? []) as { title: string; description: string }[];
  const faq = (feature.faq ?? []) as { q: string; a: string }[];
  const faqTitle = (feature.faq_title ?? '') as string;
  const stepsTitle = (feature.steps_title ?? feature.step_by_step_title ?? feature.capabilities_title ?? feature.dashboards_title ?? '') as string;
  const benefitsTitle = (feature.benefits_title ?? '') as string;

  return (
    <section className="section-block pt-32">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link href={getHref(typedLocale, 'home')} className="hover:text-[#841474]">
            {featureDetail.breadcrumb_home}
          </Link>
          <span>/</span>
          <Link href={getHref(typedLocale, 'features')} className="hover:text-[#841474]">
            {featureDetail.breadcrumb_features}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{(feature as Record<string, string>).breadcrumb_current ?? ''}</span>
        </nav>

        {/* Hero */}
        <div className="mb-16 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h1
              className="text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl lg:text-5xl"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <p className="mt-6 text-base leading-relaxed text-gray-600 md:text-lg">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={getHref(typedLocale, 'demo')}
                className="rounded-full bg-[#841474] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#6b105d]"
              >
                {featureDetail.demo_cta}
              </Link>
              <Link
                href="https://zimo.beauty/login"
                className="rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
              >
                {featureDetail.login_cta}
              </Link>
            </div>
          </div>
          <div className="relative z-10 overflow-hidden rounded-[2rem] border-8 border-white bg-white shadow-[0_32px_64px_-16px_rgba(132,20,116,0.12)] transition-all duration-700">
            <Image
              src={getDashboardImage(typedLocale)}
              alt={imageAlt}
              width={800}
              height={500}
              className="w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 -z-10 h-80 w-80 rounded-full bg-[#841474]/5 blur-[100px]"></div>
        </div>

        {/* Steps / Capabilities / Dashboards */}
        {steps.length > 0 && (
          <div className="mb-16">
            <h2 className="section-heading mb-8">{stepsTitle}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-[#841474]/10 text-sm font-bold text-[#841474]">
                    {step.number}
                  </span>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Benefits */}
        {benefits.length > 0 && (
          <div className="mb-16">
            <h2 className="section-heading mb-8">{benefitsTitle}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
                >
                  <h3 className="mb-2 text-lg font-bold text-[#841474]">
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        {faq.length > 0 && (
          <div className="mb-16">
            <h2 className="section-heading mb-8">{faqTitle}</h2>
            <div className="space-y-4">
              {faq.map((item, index) => (
                <details
                  key={index}
                  className="group rounded-2xl border border-gray-100 bg-white p-6"
                >
                  <summary className="cursor-pointer text-lg font-bold text-gray-900 transition hover:text-[#841474]">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="rounded-3xl bg-[#841474] px-8 py-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            {featureDetail.cta_section.heading}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base text-white/80">
            {featureDetail.cta_section.description}
          </p>
          <Link
            href={getHref(typedLocale, 'demo')}
            className="rounded-full bg-white px-8 py-3 text-sm font-bold text-[#841474] transition hover:bg-white/90"
          >
            {featureDetail.cta_section.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
