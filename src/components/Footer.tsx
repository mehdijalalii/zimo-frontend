import Link from 'next/link';
import Image from 'next/image';

interface FooterProps {
  locale: 'fa' | 'en' | 'tr';
  translations: {
    nav: {
      mega: Record<string, { title: string; desc: string }>;
      logo_alt: string;
    };
    footer: {
      tagline: string;
      description: string;
      columns: {
        zimo: { title: string; links: { features: string; pricing: string; demo: string } };
        support: { title: string; links: { faq: string; about: string; contact: string } };
        features: { title: string };
        more_features: { title: string };
      };
      copyright: string;
    };
  };
}

function getHref(locale: string, slug: string): string {
  const prefix = locale === 'fa' ? '' : `/${locale}`;
  if (slug === 'home') return prefix || '/';
  if (slug === 'features') return `${prefix}/features`;
  if (slug === 'pricing') return `${prefix}/pricing`;
  if (slug === 'faq') return `${prefix}/faq`;
  if (slug === 'about') return `${prefix}/about`;
  if (slug === 'contact') return `${prefix}/contact`;
  if (slug === 'demo') return `${prefix}/demo`;
  if (slug === 'feature') return `${prefix}/feature`;
  return prefix || '/';
}

function getFeatureHref(locale: string, featureSlug: string): string {
  const prefix = locale === 'fa' ? '' : `/${locale}`;
  return `${prefix}/feature/${featureSlug}`;
}

export default function Footer({ locale, translations }: FooterProps) {
  const footer = translations.footer;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-12 justify-between gap-x-0 gap-y-16 pt-16 pb-12 xl:pt-[90px]">
          <div className="col-span-12 xl:col-span-4 flex flex-col items-center md:items-start">
            <div className="max-w-[306px]">
              <Link href={getHref(locale, 'home')} className="flex items-center">
                <span className="inline-flex items-center rounded-xl bg-white px-5 py-3">
                  <Image
                    src={`/images/logo/zimo-${locale === 'tr' ? 'en' : locale}.webp`}
                    alt={translations.nav.logo_alt}
                    width={28}
                    height={28}
                    sizes="28px"
                    className="h-7 w-auto"
                  />
                </span>
              </Link>
              <p className="mt-4 mb-7 text-lg leading-[1.7] text-gray-300">
                {footer.tagline}
              </p>
              <p className="text-sm leading-[1.7] text-gray-500">
                {footer.description}
              </p>

              <div className="mt-6 flex items-center gap-3 justify-center md:justify-start">
                <a href="#" className="text-gray-400 transition hover:text-white" aria-label="Instagram">
                  <span className="flex size-6 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="stroke-current">
                      <path fillRule="evenodd" clipRule="evenodd" d="M10.75 0.75H4.75C2.54086 0.75 0.75 2.54086 0.75 4.75V10.75C0.75 12.9591 2.54086 14.75 4.75 14.75H10.75C12.9591 14.75 14.75 12.9591 14.75 10.75V4.75C14.75 2.54086 12.9591 0.75 10.75 0.75Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M7.75 10.75C6.09315 10.75 4.75 9.40685 4.75 7.75C4.75 6.09315 6.09315 4.75 7.75 4.75C9.40685 4.75 10.75 6.09315 10.75 7.75C10.75 8.54565 10.4339 9.30871 9.87132 9.87132C9.30871 10.4339 8.54565 10.75 7.75 10.75Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="10.75" y="4.75" width="2" height="2" rx="1" transform="rotate(-90 10.75 4.75)" className="fill-current" />
                    </svg>
                  </span>
                </a>
                <div className="h-6 w-px bg-gray-700"></div>
                <a href="#" className="text-gray-400 transition hover:text-white" aria-label="Telegram">
                  <span className="flex size-6 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="stroke-current">
                      <path fillRule="evenodd" clipRule="evenodd" d="M14.75 1.75L1.75 7.25C0.75 7.75 0.75 8.25 1.75 8.75L5.75 9.75L12.25 4.75L6.75 10.25L6.75 13.25L9.25 11.25L12.75 14.25C13.75 14.75 14.5 14.25 14.75 13.25L14.75 1.75Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="col-span-12 hidden md:grid md:grid-cols-4 xl:col-span-8">
            <div className="md:col-span-1">
              <div className="space-y-8">
                <p className="text-sm font-bold uppercase tracking-wider text-gray-400">{footer.columns.zimo.title}</p>
                <ul className="space-y-3 sm:space-y-5">
                  <li>
                    <Link href={getHref(locale, 'features')} className="text-sm text-gray-400 transition hover:text-white">
                      {footer.columns.zimo.links.features}
                    </Link>
                  </li>
                  <li>
                    <Link href={getHref(locale, 'pricing')} className="text-sm text-gray-400 transition hover:text-white">
                      {footer.columns.zimo.links.pricing}
                    </Link>
                  </li>
                  <li>
                    <Link href={getHref(locale, 'demo')} className="text-sm text-gray-400 transition hover:text-white">
                      {footer.columns.zimo.links.demo}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="space-y-8">
                <p className="text-sm font-bold uppercase tracking-wider text-gray-400">{footer.columns.support.title}</p>
                <ul className="space-y-3 sm:space-y-5">
                  <li>
                    <Link href={getHref(locale, 'faq')} className="text-sm text-gray-400 transition hover:text-white">
                      {footer.columns.support.links.faq}
                    </Link>
                  </li>
                  <li>
                    <Link href={getHref(locale, 'about')} className="text-sm text-gray-400 transition hover:text-white">
                      {footer.columns.support.links.about}
                    </Link>
                  </li>
                  <li>
                    <Link href={getHref(locale, 'contact')} className="text-sm text-gray-400 transition hover:text-white">
                      {footer.columns.support.links.contact}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="space-y-8">
                <p className="text-sm font-bold uppercase tracking-wider text-gray-400">{footer.columns.features.title}</p>
                <ul className="space-y-3 sm:space-y-5">
                  <li>
                    <Link href={getFeatureHref(locale, 'appointments')} className="text-sm text-gray-400 transition hover:text-white">
                      {translations.nav.mega.appointments?.title}
                    </Link>
                  </li>
                  <li>
                    <Link href={getFeatureHref(locale, 'finance')} className="text-sm text-gray-400 transition hover:text-white">
                      {translations.nav.mega.finance?.title}
                    </Link>
                  </li>
                  <li>
                    <Link href={getFeatureHref(locale, 'branches')} className="text-sm text-gray-400 transition hover:text-white">
                      {translations.nav.mega.branches?.title}
                    </Link>
                  </li>
                  <li>
                    <Link href={getFeatureHref(locale, 'loyalty')} className="text-sm text-gray-400 transition hover:text-white">
                      {translations.nav.mega.loyalty?.title}
                    </Link>
                  </li>
                  <li>
                    <Link href={getFeatureHref(locale, 'payroll')} className="text-sm text-gray-400 transition hover:text-white">
                      {translations.nav.mega.payroll?.title}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="space-y-8">
                <p className="text-sm font-bold uppercase tracking-wider text-gray-400">{footer.columns.more_features.title}</p>
                <ul className="space-y-3 sm:space-y-5">
                  <li>
                    <Link href={getFeatureHref(locale, 'staff-performance')} className="text-sm text-gray-400 transition hover:text-white">
                      {translations.nav.mega.staff_performance?.title}
                    </Link>
                  </li>
                  <li>
                    <Link href={getFeatureHref(locale, 'staff-dashboard')} className="text-sm text-gray-400 transition hover:text-white">
                      {translations.nav.mega.staff_dashboard?.title}
                    </Link>
                  </li>
                  <li>
                    <Link href={getFeatureHref(locale, 'marketing-crm')} className="text-sm text-gray-400 transition hover:text-white">
                      {translations.nav.mega.marketing_crm?.title}
                    </Link>
                  </li>
                  <li>
                    <Link href={getFeatureHref(locale, 'security')} className="text-sm text-gray-400 transition hover:text-white">
                      {translations.nav.mega.security?.title}
                    </Link>
                  </li>
                  <li>
                    <Link href={getFeatureHref(locale, 'reporting')} className="text-sm text-gray-400 transition hover:text-white">
                      {translations.nav.mega.reporting?.title}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="relative pt-[26px] pb-8 text-center">
          <div className="border-t border-gray-800 pt-8">
            <p className="text-sm text-gray-500">
              {footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
