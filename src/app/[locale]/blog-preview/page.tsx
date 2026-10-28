import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPreview } from '@/lib/api';
import type { Locale } from '@/i18n/config';

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'پیش‌نمایش مقاله | زیمو',
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  };
}

export default async function BlogPreviewPage({ params, searchParams }: PageProps) {
  const [{ locale }, query] = await Promise.all([params, searchParams]);
  if (!query.token || query.token.length > 512 || !/^[A-Za-z0-9_-]+$/.test(query.token)) notFound();

  const post = await getBlogPreview(query.token).catch(() => null);
  if (!post || post.locale !== locale) notFound();

  const typedLocale = locale as Locale;
  const dateLocale = typedLocale === 'fa' ? 'fa-IR' : typedLocale === 'tr' ? 'tr-TR' : 'en-US';
  const dateLabel = typedLocale === 'fa' ? 'تاریخ انتشار برنامه‌ریزی‌شده' : typedLocale === 'tr' ? 'Planlanan yayın tarihi' : 'Scheduled publication';

  return (
    <>
      <div className="bg-amber-50 px-4 py-3 text-center text-sm font-bold text-amber-900">
        {typedLocale === 'fa' ? 'پیش‌نمایش خصوصی؛ این مقاله هنوز منتشر نشده است.' : typedLocale === 'tr' ? 'Özel önizleme; bu yazı henüz yayımlanmadı.' : 'Private preview; this article is not published yet.'}
      </div>
      <article className="px-4 pb-14 pt-12 sm:pt-16">
        <div className="mx-auto max-w-4xl">
          <header className="py-8 text-center">
            {post.category && <span className="rounded-full bg-[#841474]/10 px-4 py-2 text-sm font-bold text-[#841474]">{post.category.name}</span>}
            <h1 className="mt-5 text-3xl font-black leading-relaxed text-gray-950 sm:text-5xl">{post.title}</h1>
            {post.summary && <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-gray-600">{post.summary}</p>}
            {post.author_name && <p className="mt-4 text-sm font-bold text-gray-600">{post.author_name}</p>}
            <p className="mt-5 text-sm text-gray-500">{dateLabel}: {new Intl.DateTimeFormat(dateLocale, { dateStyle: 'long', timeStyle: 'short' }).format(new Date(post.published_at))}</p>
          </header>
          {post.image && (
            <div className="mb-10 overflow-hidden rounded-3xl bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.image} alt={post.image_alt || post.title} className="max-h-[560px] w-full object-cover" />
            </div>
          )}
          <div className="blog-content mx-auto max-w-3xl text-base leading-9 text-gray-700" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </article>
    </>
  );
}
