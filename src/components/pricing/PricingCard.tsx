'use client';

import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { Plan } from '@/data/pricing';

function getHref(locale: string, page: string): string {
  const prefix = locale === 'fa' ? '' : `/${locale}`;
  return `${prefix}/${page}`;
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

function getPriceLabel(locale: Locale): string {
  return locale === 'fa' ? 'به ازای هر شعبه' : locale === 'tr' ? '/ Şube' : '/ branch';
}

type PricingCardTranslations = {
  request_demo: string;
  contact_us: string;
};

export default function PricingCard({
  locale,
  plan,
  ctaHref,
  ctaLabel,
  showFeatures = true,
  viewAllHref,
  viewAllLabel,
  translations,
}: {
  locale: Locale;
  plan: Plan;
  ctaHref: string;
  ctaLabel: string;
  showFeatures?: boolean;
  viewAllHref?: string;
  viewAllLabel?: string;
  translations: PricingCardTranslations;
}) {
  const isCustom = plan.pricing_type === 'custom' || plan.price === null || plan.price === 0;

  return (
    <article
      className={`relative flex flex-col h-full overflow-hidden rounded-lg border p-6 transition-all ${
        plan.is_featured
          ? 'border-[#841474] bg-gray-50 shadow-lg z-10'
          : 'border-gray-200 bg-white'
      }`}
    >
      {/* Badge */}
      <h3 className={`w-fit whitespace-nowrap px-5 py-2 text-sm font-bold uppercase tracking-widest ${
        plan.is_featured ? 'bg-[#841474] text-white' : 'bg-gray-100 text-gray-700'
      }`}>{plan.name}</h3>

      {/* Subtitle */}
      {plan.landing_subtitle && (
        <p className="mt-4 text-sm text-gray-500">{plan.landing_subtitle}</p>
      )}

      {/* Price */}
      <div className="mt-1 mb-4 min-h-[80px] flex flex-col justify-end">
        {isCustom ? (
          <p className="text-2xl font-bold text-[#841474]">{translations.contact_us}</p>
        ) : (
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">{formatPrice(locale, plan.price as number)}</span>
            <span className="text-sm text-gray-500"> {getPriceLabel(locale)}</span>
          </div>
        )}
      </div>

      {/* Tagline */}
      {plan.tagline && (
        <p className={`mt-5 text-sm font-semibold leading-relaxed text-gray-700 ${locale === 'fa' ? 'text-right' : 'text-left'}`}>{plan.tagline}</p>
      )}

      {/* CTA Button */}
      <Link
        href={ctaHref}
        className={`mt-6 w-full inline-flex items-center justify-between gap-2 border px-5 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
          plan.is_featured
            ? 'border-[#841474] bg-[#841474] text-white hover:bg-[#6b105d]'
            : 'border-gray-900 bg-transparent text-gray-900 hover:bg-gray-900 hover:text-white'
        }`}
      >
        <span>{ctaLabel}</span>
        <svg className={`h-3 w-3 ${locale === 'fa' ? 'rotate-90' : '-rotate-90'}`} viewBox="0 0 12 8" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M.253.623a.857.857 0 0 1 1.212 0l4.537 4.536L10.54.623a.857.857 0 0 1 1.212 1.212L6.608 6.978a.857.857 0 0 1-1.212 0L.253 1.835a.857.857 0 0 1 0-1.212Z" />
        </svg>
      </Link>

      {/* Features */}
      {showFeatures && (
        <div className="mt-8 grid gap-y-4">
          <h5 className={`text-sm font-semibold mt-4 uppercase tracking-wider text-gray-400 ${locale === 'fa' ? 'text-right' : 'text-left'}`}>
            {plan.code === 'starter'
              ? (locale === 'fa' ? 'شامل امکانات:' : locale === 'tr' ? 'Dahil Olanlar:' : 'What\'s included:')
              : plan.code === 'professional'
              ? (locale === 'fa' ? 'شامل امکانات پایه و همچنین:' : locale === 'tr' ? 'Başlangıç artı:' : 'Essentials plus:')
              : (locale === 'fa' ? 'شامل امکانات حرفه‌ای و همچنین:' : locale === 'tr' ? 'Profesyonel artı:' : 'Professional plus:')
            }
          </h5>
          <ul className="grid gap-y-3">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2.5 text-sm text-gray-600">
                <svg className="h-3 w-3 shrink-0 text-gray-400" viewBox="0 0 11 9" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.648.977c.22.22.22.576 0 .796L4.46 7.96a.563.563 0 0 1-.795 0L.852 5.148a.563.563 0 0 1 .796-.796l2.414 2.415 5.79-5.79c.22-.22.576-.22.796 0Z" />
                </svg>
                <span>{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* View all features */}
      {viewAllHref && viewAllLabel && (
        <Link
          href={viewAllHref}
          className={`mt-6 block underline text-sm font-semibold text-gray-600 hover:text-gray-900 ${locale === 'fa' ? 'text-right' : 'text-left'}`}
        >
          {viewAllLabel}
        </Link>
      )}
    </article>
  );
}
