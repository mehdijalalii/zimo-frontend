import { getMessages } from '@/i18n/request';
import type { Locale } from '@/i18n/config';
import Link from 'next/link';

function getPrefix(locale: string) {
  return locale === 'fa' ? '' : `/${locale}`;
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const prefix = getPrefix(locale);

  return (
    <section className="section-block pt-32">
      <div className="section-container px-4 text-center">
        <span className="section-kicker">خدمات</span>
        <h1 className="section-heading mt-3">خدمات زیمو</h1>
        <p className="section-copy mx-auto mt-4 max-w-2xl">
          خدمات تخصصی راه‌اندازی، آموزش و پشتیبانی برای سالن‌های زیبایی
        </p>
        <div className="mt-16 rounded-3xl border border-gray-100 bg-gray-50 py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-[#841474]/10 text-[#841474]">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">به زودی</h2>
            <p className="text-gray-500">جزئیات خدمات زیمو در حال آماده‌سازی است</p>
            <Link href={prefix || '/'} className="btn-bridge mt-4">
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
