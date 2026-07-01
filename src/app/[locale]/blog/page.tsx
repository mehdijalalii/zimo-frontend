import type { Metadata } from 'next';
import { getMessages } from '@/i18n/request';
import type { Locale } from '@/i18n/config';
import Link from 'next/link';

function getPrefix(locale: string) {
  return locale === 'fa' ? '' : `/${locale}`;
}

export const metadata: Metadata = {
  robots: { index: false },
};

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const prefix = getPrefix(locale);

  return (
    <section className="section-block pt-32">
      <div className="section-container px-4 text-center">
        <span className="section-kicker">بلاگ</span>
        <h1 className="section-heading mt-3">بلاگ زیمو</h1>
        <p className="section-copy mx-auto mt-4 max-w-2xl">
          مقالات، راهنماها و نکات تخصصی مدیریت سالن زیبایی
        </p>
        <div className="mt-16 rounded-3xl border border-gray-100 bg-gray-50 py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-[#841474]/10 text-[#841474]">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">به زودی</h2>
            <p className="text-gray-500">مقالات تخصصی مدیریت سالن زیبایی در حال آماده‌سازی است</p>
            <Link href={prefix || '/'} className="btn-bridge mt-4">
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
