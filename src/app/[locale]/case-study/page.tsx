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

export default async function CaseStudyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const prefix = getPrefix(locale);

  return (
    <section className="section-block pt-32">
      <div className="section-container px-4 text-center">
        <span className="section-kicker">داستان موفقیت</span>
        <h1 className="section-heading mt-3">داستان‌های موفقیت مشتریان زیمو</h1>
        <p className="section-copy mx-auto mt-4 max-w-2xl">
          چگونه سالن‌های زیبایی با زیمو تحول دیجیتال را تجربه کردند
        </p>
        <div className="mt-16 rounded-3xl border border-gray-100 bg-gray-50 py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-[#841474]/10 text-[#841474]">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">به زودی</h2>
            <p className="text-gray-500">داستان‌های موفقیت مشتریان در حال آماده‌سازی است</p>
            <Link href={prefix || '/'} className="btn-bridge mt-4">
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
