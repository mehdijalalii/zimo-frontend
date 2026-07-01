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

export default async function TestimonialPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const prefix = getPrefix(locale);

  return (
    <section className="section-block pt-32">
      <div className="section-container px-4 text-center">
        <span className="section-kicker">نظرات مشتریان</span>
        <h1 className="section-heading mt-3">مشتریان زیمو چه می‌گویند؟</h1>
        <p className="section-copy mx-auto mt-4 max-w-2xl">
          نظرات و تجربیات مدیران سالن‌های زیبایی که از زیمو استفاده می‌کنند
        </p>
        <div className="mt-16 rounded-3xl border border-gray-100 bg-gray-50 py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-[#841474]/10 text-[#841474]">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">به زودی</h2>
            <p className="text-gray-500">نظرات مشتریان در حال جمع‌آوری است</p>
            <Link href={prefix || '/'} className="btn-bridge mt-4">
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
