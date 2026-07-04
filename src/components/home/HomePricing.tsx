'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Locale } from '@/i18n/config';
import type { Plan } from '@/data/pricing';
import PricingCard from '@/components/pricing/PricingCard';

type HomePricingTranslations = {
  monthly: string;
  yearly: string;
  two_months_free: string;
  request_demo: string;
  contact_us: string;
};

function getHref(locale: string, page: string): string {
  const prefix = locale === 'fa' ? '' : `/${locale}`;
  return `${prefix}/${page}`;
}

function getYearlyPrice(monthlyPrice: number): number {
  return monthlyPrice * 10;
}

export default function HomePricing({
  locale,
  plans,
  translations,
}: {
  locale: Locale;
  plans: Plan[];
  translations: HomePricingTranslations;
}) {
  const [isYearly, setIsYearly] = useState(false);

  function getDisplayPrice(plan: Plan): number | null {
    if (plan.price === null || plan.price === 0 || typeof plan.price === 'string') return null;
    if (isYearly) return getYearlyPrice(plan.price);
    return plan.price;
  }

  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <p className="section-kicker mx-auto mb-4">
            {locale === 'fa' ? 'قیمت‌گذاری' : locale === 'tr' ? 'Fiyatlandırma' : 'Pricing'}
          </p>
          <h2 className="text-3xl font-bold text-gray-900">
            {locale === 'fa' ? 'پلن مناسب کسب‌وکار شما' : locale === 'tr' ? 'İşiniz için doğru plan' : 'The right plan for your business'}
          </h2>
        </div>

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

        <div className="grid items-stretch gap-4 lg:grid-cols-3">
          {plans.map((plan) => {
            const isCustom = plan.pricing_type === 'custom' || plan.price === null || plan.price === 0;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <PricingCard
                  locale={locale}
                  plan={{ ...plan, price: isCustom ? null : getDisplayPrice(plan) }}
                  ctaHref={isCustom ? getHref(locale, 'contact') : getHref(locale, 'pricing')}
                  ctaLabel={isCustom ? translations.contact_us : translations.request_demo}
                  showFeatures={true}
                  viewAllHref={getHref(locale, 'pricing') + '#comparison'}
                  viewAllLabel={locale === 'fa' ? 'مشاهده همه قابلیت‌ها' : locale === 'tr' ? 'Tüm özellikleri görüntüle' : 'View all features'}
                  translations={translations}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
