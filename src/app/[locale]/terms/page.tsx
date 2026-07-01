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

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const prefix = getPrefix(locale);

  return (
    <section className="section-block pt-32">
      <div className="section-container px-4 max-w-3xl">
        <span className="section-kicker">شرایط استفاده</span>
        <h1 className="section-heading mt-3">شرایط و قوانین استفاده</h1>
        <p className="section-copy mt-4">
          شرایط و قوانین استفاده از خدمات و پلتفرم زیمو
        </p>
        <div className="mt-12 rounded-3xl border border-gray-100 bg-gray-50 p-8 md:p-12 text-center">
          <p className="text-gray-500">محتوای این صفحه در حال آماده‌سازی است.</p>
          <Link href={prefix || '/'} className="btn-bridge mt-6 inline-flex">
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </section>
  );
}
