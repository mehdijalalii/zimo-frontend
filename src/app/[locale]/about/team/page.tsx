import { getMessages } from '@/i18n/request';
import type { Locale } from '@/i18n/config';
import Link from 'next/link';

function getPrefix(locale: string) {
  return locale === 'fa' ? '' : `/${locale}`;
}

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const prefix = getPrefix(locale);

  return (
    <section className="section-block pt-32">
      <div className="section-container px-4 text-center">
        <span className="section-kicker">تیم ما</span>
        <h1 className="section-heading mt-3">تیم زیمو</h1>
        <p className="section-copy mx-auto mt-4 max-w-2xl">
          آشنایی با اعضای تیمی که زیمو را می‌سازند
        </p>
        <div className="mt-16 rounded-3xl border border-gray-100 bg-gray-50 py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-[#841474]/10 text-[#841474]">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">به زودی</h2>
            <p className="text-gray-500">معرفی اعضای تیم زیمو در حال آماده‌سازی است</p>
            <Link href={prefix || '/'} className="btn-bridge mt-4">
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
