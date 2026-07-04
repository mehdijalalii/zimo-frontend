'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import type { Locale } from '@/i18n/config';
import type { Plan, ComparisonFeature } from '@/data/pricing';
import PricingCard from './PricingCard';

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
  feature_cards: {
    title: string;
    title_bold: string;
    cards: { title: string; description: string }[];
  };
  comparison: {
    kicker: string;
    title: string;
    lead: string;
    features_header: string;
    custom_price: string;
    price: string;
    two_months_free_yearly: string;
    rows?: { category?: string; label: string; values: (boolean | string)[] }[];
  };
};

function getHref(locale: string, page: string): string {
  const prefix = locale === 'fa' ? '' : `/${locale}`;
  return `${prefix}/${page}`;
}

function CellValue({ value }: { value: boolean | string | null }) {
  if (value === null || value === undefined || value === false) {
    return (
      <svg className="mx-auto h-5 w-5 lg:h-6 lg:w-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  }
  if (typeof value === 'string') {
    return <span className="font-semibold text-gray-900 text-xs lg:text-sm">{value}</span>;
  }
  return (
    <svg className="mx-auto h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function formatPrice(locale: Locale, price: number): string {
  if (locale === 'fa') {
    return `${price.toLocaleString('fa-IR')} تومان`;
  }
  if (locale === 'tr') {
    return `₺${price.toLocaleString('tr-TR')}`;
  }
  return `$${price}`;
}

function getYearlyPrice(monthlyPrice: number): number {
  return monthlyPrice * 10;
}

function getMonthlyFromYearly(yearlyPrice: number): number {
  return Math.round(yearlyPrice / 10);
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
  const [isYearly, setIsYearly] = useState(false);

  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: '-60px' });
  const tableRef = useRef<HTMLDivElement>(null);
  const tableInView = useInView(tableRef, { once: true, margin: '-60px' });

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
  };

  function getDisplayPrice(plan: Plan): number | null {
    if (plan.price === null || plan.price === 0 || typeof plan.price === 'string') return null;
    if (isYearly) return getYearlyPrice(plan.price);
    return plan.price;
  }

  function getPriceLabel(): string {
    if (isYearly) {
      return locale === 'fa' ? 'هر شعبه' : locale === 'tr' ? 'Yıl / Şube' : 'yr per branch';
    }
    return locale === 'fa' ? 'هر شعبه' : locale === 'tr' ? 'Ay / Şube' : 'mo per branch';
  }

  function getTablePriceLabel(): string {
    if (isYearly) {
      return locale === 'fa' ? 'هر شعبه / سال' : locale === 'tr' ? 'Şube / Yıl' : 'branch / yr';
    }
    return locale === 'fa' ? 'هر شعبه / ماه' : locale === 'tr' ? 'Şube / Ay' : 'branch / mo';
  }

  return (
    <>
      {/* Billing Toggle */}
      <div className="mb-10 flex justify-center">
        <div className="relative inline-flex flex-col items-center">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 whitespace-nowrap mb-1 self-end">
            {translations.two_months_free}
          </span>
          <div className="flex items-center rounded border border-gray-900">
          <button
            type="button"
            onClick={() => setIsYearly(false)}
            className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-colors rounded-sm ${
              !isYearly
                ? 'bg-gray-900 text-white'
                : 'bg-transparent text-gray-900 hover:bg-gray-100'
            }`}
          >
            {translations.monthly}
          </button>
          <button
            type="button"
            onClick={() => setIsYearly(true)}
            className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-colors rounded-sm ${
              isYearly
                ? 'bg-gray-900 text-white'
                : 'bg-transparent text-gray-900 hover:bg-gray-100'
            }`}
          >
            {translations.yearly}
          </button>
        </div>
        </div>
      </div>

      {/* Cards */}
      <motion.div
        ref={cardsRef}
        initial="hidden"
        animate={cardsInView ? 'visible' : 'hidden'}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        className="grid items-stretch gap-4 lg:grid-cols-3"
      >
        {plans.map((plan) => {
          const isCustom = plan.pricing_type === 'custom' || plan.price === null || plan.price === 0;
          return (
            <motion.div
              key={plan.id}
              className="relative"
              variants={cardVariants}
            >
              <PricingCard
                locale={locale}
                plan={{ ...plan, price: isCustom ? null : getDisplayPrice(plan) }}
                ctaHref={isCustom ? getHref(locale, 'contact') : getHref(locale, 'demo')}
                ctaLabel={translations.request_demo}
                showFeatures={true}
                viewAllHref="#comparison"
                viewAllLabel={locale === 'fa' ? 'مشاهده همه قابلیت‌ها' : locale === 'tr' ? 'Tüm özellikleri görüntüle' : 'View all features'}
                translations={translations}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Comparison Table */}
      <motion.section
        id="comparison"
        ref={tableRef}
        initial={{ opacity: 0, y: 30 }}
        animate={tableInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mt-32"
      >
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
              {(translations.comparison.rows || []).map((row, i) => {
                const isCategory = !!row.category;
                if (isCategory) {
                  return (
                    <tr key={i} className="bg-gray-50">
                      <td colSpan={4} className="px-3 py-3 lg:px-5 lg:py-4">
                        <span className="text-xs lg:text-sm font-bold uppercase tracking-wider text-[#841474]">
                          {row.category}
                        </span>
                      </td>
                    </tr>
                  );
                }
                return (
                  <tr key={i} className="[&>:not(:first-child)]:border-r [&>:not(:first-child)]:border-gray-200 transition-colors hover:bg-[#841474]/5">
                    <td className="p-3 lg:p-5 font-medium text-gray-700 text-xs lg:text-sm">{row.label}</td>
                    {row.values.map((val, j) => (
                      <td key={j} className="p-3 lg:p-5 text-center">
                        <CellValue value={val} />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-[#841474]/5">
              <tr className="[&>:not(:first-child)]:border-r [&>:not(:first-child)]:border-gray-200">
                <th className="whitespace-nowrap p-3 lg:p-5 font-bold text-[#841474] text-xs lg:text-base"></th>
                {plans.map((plan) => {
                  const isCustom = plan.pricing_type === 'custom' || plan.price === null || plan.price === 0;
                  const displayPrice = getDisplayPrice(plan);
                  return (
                    <th key={plan.id} className={`whitespace-nowrap p-3 lg:p-5 text-center font-bold ${plan.is_featured ? 'text-[#841474]' : 'text-gray-900'}`}>
                      {isCustom ? (
                        <span className="text-sm font-bold text-[#841474]">{translations.contact_us}</span>
                      ) : (
                        <div>
                          {isYearly && (
                            <span className="block text-xs text-gray-400 line-through mb-0.5">
                              {formatPrice(locale, plan.price as number)}
                            </span>
                          )}
                          <span className="text-lg font-extrabold text-gray-900">{formatPrice(locale, displayPrice!)}</span>
                          <span className="block text-[10px] text-gray-500 mt-0.5">/ {getTablePriceLabel()}</span>
                        </div>
                      )}
                    </th>
                  );
                })}
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
                  <span>{isCustom ? translations.contact_us : translations.request_demo}</span>
                      </Link>
                    </th>
                  );
                })}
              </tr>
            </tfoot>
          </table>
        </div>
      </motion.section>
    </>
  );
}
