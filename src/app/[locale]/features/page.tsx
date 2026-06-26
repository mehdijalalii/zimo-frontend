import Link from 'next/link';
import { getMessages } from '@/i18n/request';
import type { Locale } from '@/i18n/config';

function getFeatureHref(locale: string, featureSlug: string): string {
  const prefix = locale === 'fa' ? '' : `/${locale}`;
  return `${prefix}/feature/${featureSlug}`;
}

const featureSlugs = [
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

export default async function FeaturesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const messages = getMessages(typedLocale);

  return (
    <section id="features" className="section-block pt-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="section-kicker mx-auto">
            {messages.features_page.kicker}
          </p>
          <h1
            className="section-heading section-heading--center"
            dangerouslySetInnerHTML={{ __html: messages.features_page.title }}
          />
          <p className="section-lead section-lead--center mx-auto mt-3 max-w-3xl">
            {messages.features_page.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {messages.features_grid.items.map((item, index) => (
            <article
              key={index}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-[#841474]" />
              <span className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-[#841474]/10 text-lg font-bold text-[#841474]">
                {item.number}
              </span>
              <h3 className="mb-3 text-lg font-bold text-gray-900">
                {item.title}
              </h3>
              <p className="flex-1 text-sm leading-relaxed text-gray-500">
                {item.description}
              </p>
              <Link
                href={getFeatureHref(typedLocale, featureSlugs[index] ?? '')}
                className="mt-8 inline-flex items-center gap-1 text-sm font-bold text-[#841474] hover:underline"
              >
                {item.details_link}
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
