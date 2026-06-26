import Image from 'next/image';
import Link from 'next/link';

interface HomeHighlightsProps {
  locale: string;
  translations: {
    highlights: {
      kicker: string;
      heading: string;
      lead: string;
      items: { number: string; title: string; description: string }[];
      cta: string;
    };
  };
}

function getHref(locale: string, slug: string): string {
  const prefix = locale === 'fa' ? '' : `/${locale}`;
  if (slug === 'features') return `${prefix}/features`;
  return prefix || '/';
}

export default function HomeHighlights({ locale, translations }: HomeHighlightsProps) {
  const { highlights } = translations;

  return (
    <section className="section-block bg-[#841474]/[0.12]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="section-kicker mx-auto">{highlights.kicker}</p>
          <h2 className="section-heading section-heading--center">
            {highlights.heading}
          </h2>
          <p className="section-lead section-lead--center mx-auto mt-3 max-w-2xl">
            {highlights.lead}
          </p>
        </div>

        <div className="bento-grid">
          <Link
            href={getHref(locale, 'features')}
            className="feature-card feature-card--bento group relative transition hover:-translate-y-1"
          >
            <div className="absolute inset-x-0 top-0 rounded-t-3xl bg-[#841474]" />
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-[#841474]/10 text-sm font-bold text-[#841474]">
                {highlights.items[0]?.number}
              </span>
              <svg
                className="h-6 w-6 text-[#841474]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="mt-3 text-lg font-bold text-gray-900">
              {highlights.items[0]?.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {highlights.items[0]?.description}
            </p>
          </Link>

          <Link
            href={`${getHref(locale, 'features')}#operations`}
            className="feature-card feature-card--bento group relative transition hover:-translate-y-1"
          >
            <div className="absolute inset-x-0 top-0 rounded-t-3xl bg-[#841474]" />
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-[#841474]/10 text-sm font-bold text-[#841474]">
                {highlights.items[1]?.number}
              </span>
              <svg
                className="h-6 w-6 text-[#841474]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </div>
            <h3 className="mt-3 text-lg font-bold text-gray-900">
              {highlights.items[1]?.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {highlights.items[1]?.description}
            </p>
          </Link>

          <Link
            href={getHref(locale, 'features')}
            className="feature-card feature-card--bento group relative transition hover:-translate-y-1"
          >
            <div className="absolute inset-x-0 top-0 rounded-t-3xl bg-[#841474]" />
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-[#841474]/10 text-sm font-bold text-[#841474]">
                {highlights.items[2]?.number}
              </span>
              <svg
                className="h-6 w-6 text-[#841474]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="mt-3 text-lg font-bold text-gray-900">
              {highlights.items[2]?.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {highlights.items[2]?.description}
            </p>
          </Link>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href={getHref(locale, 'features')}
            className="btn-bridge"
          >
            {highlights.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
