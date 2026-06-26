'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface MegaMenuItem {
  slug: string;
  icon: React.ReactNode;
}

interface HeaderProps {
  locale: 'fa' | 'en' | 'tr';
  translations: {
    nav: {
      home: string;
      features: string;
      pricing: string;
      faq: string;
      about: string;
      contact: string;
      demo: string;
      login: string;
      all_features: string;
      mega: Record<string, { title: string; desc: string }>;
    };
  };
}

const features: MegaMenuItem[] = [
  {
    slug: 'appointments',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    slug: 'finance',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    slug: 'branches',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    slug: 'loyalty',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    slug: 'payroll',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    slug: 'reporting',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
  },
  {
    slug: 'staff-performance',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    slug: 'staff-dashboard',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    slug: 'marketing-crm',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
  },
  {
    slug: 'security',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

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

function getLoginHref(): string {
  return 'https://zimo.beauty/login';
}

const localeFlags: Record<string, string> = {
  fa: '🇮🇷 FA',
  en: '🇺🇸 EN',
  tr: '🇹🇷 TR',
};

function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();

  const getLangHref = (targetLocale: string) => {
    const segments = pathname.split('/');
    const currentLocale = segments[1];
    if (['fa', 'en', 'tr'].includes(currentLocale)) {
      segments[1] = targetLocale;
    } else {
      segments.splice(1, 0, targetLocale);
    }
    const path = segments.join('/');
    return targetLocale === 'fa' ? (path.replace(/^\/fa/, '') || '/') : path;
  };

  const langOptions = [
    { code: 'fa', label: 'فارسی 🇮🇷' },
    { code: 'en', label: '🇺🇸 English' },
    { code: 'tr', label: '🇹🇷 Türkçe' },
  ];

  return (
    <div className="relative group/lang">
      <button className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-700 transition hover:bg-gray-50">
        {localeFlags[locale] || localeFlags.fa}
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`invisible absolute top-full z-50 mt-1 w-36 translate-y-2 opacity-0 transition-all duration-200 group-hover/lang:visible group-hover/lang:translate-y-0 group-hover/lang:opacity-100 ${locale === 'fa' ? 'left-0' : 'right-0'}`}>
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl">
          {langOptions.map((opt) => (
            <Link
              key={opt.code}
              href={getLangHref(opt.code)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50 ${locale === opt.code ? 'bg-gray-100' : ''}`}
            >
              {opt.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileLangLink({ locale, target, pathname, children }: { locale: string; target: string; pathname: string; children: React.ReactNode }) {
  const segments = pathname.split('/');
  const currentLocale = segments[1];
  if (['fa', 'en', 'tr'].includes(currentLocale)) {
    segments[1] = target;
  } else {
    segments.splice(1, 0, target);
  }
  const path = segments.join('/');
  const href = target === 'fa' ? (path.replace(/^\/fa/, '') || '/') : path;
  return (
    <Link href={href} className={`flex h-9 items-center justify-center rounded-lg border px-3 text-xs font-bold ${locale === target ? 'border-[#841474] bg-[#841474]/10 text-[#841474]' : 'border-gray-200 text-gray-600'}`}>
      {children}
    </Link>
  );
}

function isActive(pathname: string, locale: string, slug: string): boolean {
  const prefix = locale === 'fa' ? '' : `/${locale}`;
  const href = slug === 'home' ? (prefix || '/') : `${prefix}/${slug}`;
  if (slug === 'home') {
    return pathname === '/' || pathname === `/${locale}`;
  }
  return pathname.startsWith(href);
}

export default function Header({ locale, translations }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const nav = translations.nav;

  return (
    <><header className="fixed inset-x-0 top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href={getHref(locale, 'home')} className="flex items-center">
            <Image
              src={`/images/logo/zimo-${locale === 'tr' ? 'en' : locale}.png`}
              alt="Zimo CRM"
              width={36}
              height={36}
              className="h-9 w-auto"
            />
          </Link>
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            href={getHref(locale, 'home')}
            className={`nav-link px-3 py-2 ${isActive(pathname, locale, 'home') ? 'nav-link-active' : ''}`}
          >
            {nav.home}
          </Link>

          <div className="group relative">
            <Link
              href={getHref(locale, 'features')}
              className={`nav-link flex items-center gap-1 px-3 py-2 ${isActive(pathname, locale, 'features') ? 'nav-link-active' : ''}`}
            >
              {nav.features}
              <svg className="h-4 w-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>

            <div className={`invisible absolute top-full w-[540px] translate-y-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${locale === 'fa' ? 'right-0' : 'left-0'}`}>
              <div className="mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl">
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {features.map((item) => {
                    const megaData = nav.mega[item.slug];
                    if (!megaData) return null;
                    return (
                      <Link
                        key={item.slug}
                        href={getFeatureHref(locale, item.slug)}
                        className="group/item flex items-start gap-4 rounded-xl p-3 transition hover:bg-gray-50"
                      >
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#841474]/10 text-[#841474]">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-[15px] font-bold text-gray-900 group-hover/item:text-[#841474]">
                            {megaData.title}
                          </div>
                          <div className="mt-1 text-[11px] leading-relaxed text-gray-500">
                            {megaData.desc}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-6 border-t border-gray-100 pt-4">
                  <Link
                    href={getHref(locale, 'features')}
                    className="flex items-center justify-center gap-2 text-xs font-bold text-[#841474] hover:underline"
                  >
                    {nav.all_features}
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link href={getHref(locale, 'pricing')} className={`nav-link px-3 py-2 ${isActive(pathname, locale, 'pricing') ? 'nav-link-active' : ''}`}>
            {nav.pricing}
          </Link>
          <Link href={getHref(locale, 'faq')} className={`nav-link px-3 py-2 ${isActive(pathname, locale, 'faq') ? 'nav-link-active' : ''}`}>
            {nav.faq}
          </Link>
          <Link href={getHref(locale, 'about')} className={`nav-link px-3 py-2 ${isActive(pathname, locale, 'about') ? 'nav-link-active' : ''}`}>
            {nav.about}
          </Link>
          <Link href={getHref(locale, 'contact')} className={`nav-link px-3 py-2 ${isActive(pathname, locale, 'contact') ? 'nav-link-active' : ''}`}>
            {nav.contact}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href={getHref(locale, 'demo')}
              className="rounded-full bg-[#841474] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#6b105d]"
            >
              {nav.demo}
            </Link>
            {/* <Link
              href={getLoginHref()}
              className="rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
            >
              {nav.login}
            </Link> */}
          </div>

          {!mobileMenuOpen && <LanguageSwitcher locale={locale} />}

          <button
            className="flex size-10 items-center justify-center rounded-full bg-[#841474] text-white lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

    </header>
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-[60] bg-white overflow-y-auto lg:hidden">
          <div className="p-4 flex flex-col gap-1">
            <Link href={getHref(locale, 'home')} onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-medium text-gray-700 hover:text-[#841474] hover:bg-gray-50 transition-colors">
              <svg className="size-5 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {nav.home}
            </Link>

            <Link href={getHref(locale, 'features')} onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-medium text-gray-700 hover:text-[#841474] hover:bg-gray-50 transition-colors">
              <svg className="size-5 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              {nav.features}
            </Link>
            <div className="flex flex-wrap gap-2 pr-11 pb-2">
              {features.map((item) => {
                const megaData = nav.mega[item.slug];
                if (!megaData) return null;
                return (
                  <Link
                    key={item.slug}
                    href={getFeatureHref(locale, item.slug)}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[11px] py-1.5 px-3 rounded-lg bg-gray-100/80 text-gray-500 hover:bg-[#841474]/10 hover:text-[#841474] transition-colors"
                  >
                    {megaData.title}
                  </Link>
                );
              })}
            </div>

            <Link href={getHref(locale, 'pricing')} onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-medium text-gray-700 hover:text-[#841474] hover:bg-gray-50 transition-colors">
              <svg className="size-5 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {nav.pricing}
            </Link>

            <Link href={getHref(locale, 'faq')} onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-medium text-gray-700 hover:text-[#841474] hover:bg-gray-50 transition-colors">
              <svg className="size-5 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              {nav.faq}
            </Link>

            <Link href={getHref(locale, 'about')} onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-medium text-gray-700 hover:text-[#841474] hover:bg-gray-50 transition-colors">
              <svg className="size-5 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {nav.about}
            </Link>

            <Link href={getHref(locale, 'contact')} onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-medium text-gray-700 hover:text-[#841474] hover:bg-gray-50 transition-colors">
              <svg className="size-5 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {nav.contact}
            </Link>

            <div className="h-px bg-gray-100 mx-2 my-2" />

            <div className="flex flex-wrap items-center justify-center gap-2 px-4 py-2">
              <MobileLangLink locale={locale} target="fa" pathname={pathname}>🇮🇷 FA</MobileLangLink>
              <MobileLangLink locale={locale} target="en" pathname={pathname}>🇺🇸 EN</MobileLangLink>
              <MobileLangLink locale={locale} target="tr" pathname={pathname}>🇹🇷 TR</MobileLangLink>
            </div>

            <div className="h-px bg-gray-100 mx-2 my-2" />

            <div className="px-4 mt-2">
              <Link href={getHref(locale, 'demo')} onClick={() => setMobileMenuOpen(false)}
                className="flex h-12 w-full items-center justify-center rounded-xl bg-[#841474] font-bold text-white hover:bg-[#6b105d] transition-colors">
                {nav.demo}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
