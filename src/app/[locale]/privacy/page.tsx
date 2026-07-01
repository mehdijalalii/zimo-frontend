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

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const prefix = getPrefix(locale);

  return (
    <section className="section-block pt-32">
      <div className="section-container px-4 max-w-3xl">
        <span className="section-kicker">حریم خصوصی</span>
        <h1 className="section-heading mt-3">سیاست حفظ حریم خصوصی</h1>
        <p className="section-copy mt-4">
          نحوه جمع‌آوری، استفاده و حفاظت از اطلاعات شخصی شما در زیمو
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
