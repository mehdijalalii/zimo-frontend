'use client';

import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { Plan, ComparisonFeature } from '@/data/pricing';

type PricingTranslations = {
  monthly: string;
  yearly: string;
  billing_label: string;
  two_months_free: string;
  custom_price: string;
  custom_period: string;
  price_per_month: string;
  price_per_year: string;
  request_demo: string;
  contact_us: string;
  comparison: {
    kicker: string;
    title: string;
    lead: string;
    features_header: string;
    custom_price: string;
    price: string;
    two_months_free_yearly: string;
    rows?: { label: string; values: (boolean | string)[] }[];
  };
};

function getHref(locale: string, page: string): string {
  const prefix = locale === 'fa' ? '' : `/${locale}`;
  return `${prefix}/${page}`;
}

function CellValue({ value }: { value: boolean | string | null }) {
  if (value === null || value === undefined || value === false) {
    return (
      <svg className="mx-auto h-5 w-5 lg:h-6 lg:w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  }
  if (typeof value === 'string') {
    return <span className="font-medium text-gray-900 text-xs lg:text-sm">{value}</span>;
  }
  return (
    <svg className="mx-auto h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function PricingSection({
  locale,
  translations,
  plans,
  comparisonFeatures,
}: {
  locale: Locale;
  translations: PricingTranslations;
  plans: Plan[];
  comparisonFeatures: ComparisonFeature[];
}) {
  const dir = locale === 'fa' ? 'rtl' : 'ltr';

  return (
    <>
      {/* Cards */}
      <div className="grid items-stretch gap-4 lg:grid-cols-3">
        {plans.map((plan) => {
          return (
            <div key={plan.id} className="relative">
              <article
                className={`relative flex flex-col h-full overflow-hidden rounded-3xl bg-white p-8 transition-all ${
                  plan.is_featured
                    ? 'border border-[#841474] ring-2 ring-[#841474]/20 shadow-2xl z-10'
                    : 'border border-gray-100 shadow-sm hover:shadow-lg'
                }`}
              >
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                {plan.landing_subtitle && (
                  <p className="mt-1 text-sm text-gray-500">{plan.landing_subtitle}</p>
                )}

                <p className="mt-5 text-base font-bold text-[#841474]">{translations.contact_us}</p>

              <ul className="flex-1 space-y-3 pt-6 mt-5 pb-0">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#841474]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature.text}
                  </li>
                ))}
              </ul>

              <Link
                href={getHref(locale, 'demo')}
                className={`mt-8 mx-8 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all ${
                  plan.is_featured
                    ? 'bg-[#841474] text-white shadow-lg shadow-[#841474]/20 hover:bg-[#6b105d] hover:shadow-[#841474]/40'
                    : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {translations.request_demo}
              </Link>
            </article>
            </div>
          );
        })}
      </div>

      {/* Comparison Table */}
      <section className="mt-32">
        <div className="mb-10 text-center md:mb-12">
          <p className="section-kicker mx-auto mb-4">{translations.comparison.kicker}</p>
          <h2 className="text-3xl font-bold text-gray-900">{translations.comparison.title}</h2>
          <p className="section-lead section-lead--center">{translations.comparison.lead}</p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-sm">
          <table className="w-full border-collapse" dir={dir}>
            <thead className="bg-[#841474]/5">
              <tr className="[&>:not(:first-child)]:border-r [&>:not(:first-child)]:border-gray-200">
                <th className="whitespace-nowrap py-6 px-3 lg:py-8 lg:px-5 text-start font-bold text-[#841474]">
                  <span className="flex items-center gap-1 lg:gap-2">
                    <svg className="h-4 w-4 lg:h-5 lg:w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <span>{translations.comparison.features_header}</span>
                  </span>
                </th>
                {plans.map((plan) => (
                    <th key={plan.id} className={`whitespace-nowrap py-6 px-3 lg:py-8 lg:px-5 text-center font-bold ${plan.is_featured ? 'text-[#841474]' : 'text-gray-900'}`}>
                      <span className="flex items-center justify-center gap-1 lg:gap-2">
                        <svg className="h-4 w-4 lg:h-5 lg:w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span>{plan.name}</span>
                      </span>
                    </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {(translations.comparison.rows || []).map((row, i) => (
                <tr key={i} className="[&>:not(:first-child)]:border-r [&>:not(:first-child)]:border-gray-200 transition-colors even:bg-gray-50/50 hover:bg-[#841474]/5">
                  <td className="p-3 lg:p-5 font-medium text-gray-900 text-xs lg:text-sm">{row.label}</td>
                  {row.values.map((val, j) => (
                    <td key={j} className="p-3 lg:p-5 text-center">
                      <CellValue value={val} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-[#841474]/5">
              <tr className="[&>:not(:first-child)]:border-r [&>:not(:first-child)]:border-gray-200">
                <th className="whitespace-nowrap p-3 lg:p-5 font-bold text-[#841474] text-xs lg:text-base"></th>
                {plans.map((plan) => (
                    <th key={plan.id} className={`whitespace-nowrap p-3 lg:p-5 text-center font-bold ${plan.is_featured ? 'text-[#841474]' : 'text-gray-900'}`}>
                      <span className="text-base font-bold text-[#841474]">{translations.contact_us}</span>
                    </th>
                ))}
              </tr>
              <tr className="[&>:not(:first-child)]:border-r [&>:not(:first-child)]:border-gray-200">
                <th className="whitespace-nowrap p-3 lg:p-5"></th>
                {plans.map((plan) => {
                  const isCustom = plan.pricing_type === 'custom' || plan.price === null || plan.price === 0;
                  return (
                    <th key={plan.id} className="whitespace-nowrap p-3 lg:p-5 text-center">
                      <Link
                        href={isCustom ? getHref(locale, 'contact') : getHref(locale, 'demo')}
                        className="inline-flex items-center gap-1 lg:gap-1.5 rounded-lg bg-[#841474] px-3 py-2 lg:px-4 lg:py-3 text-[11px] lg:text-xs font-semibold text-white transition-colors hover:bg-[#6a105e]"
                      >
                        <svg className="h-3 w-3 lg:h-3.5 lg:w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>{translations.request_demo}</span>
                      </Link>
                    </th>
                  );
                })}
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </>
  );
}
