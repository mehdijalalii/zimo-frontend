import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPreview } from '@/lib/api';
import type { Locale } from '@/i18n/config';
import BlogArticleTools, { BlogArticleTableOfContents } from '@/components/blog/BlogArticleTools';
import { estimateReadingMinutes, prepareBlogContent } from '@/lib/blog-content';

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
  const labels = {
    fa: { contents: 'در این مقاله', share: 'اشتراک‌گذاری', copied: 'لینک مقاله کپی شد', copyFailed: 'کپی لینک انجام نشد', backToTop: 'بازگشت به بالای صفحه', author: 'نویسنده', reading: 'دقیقه مطالعه' },
    en: { contents: 'In this article', share: 'Share article', copied: 'Article link copied', copyFailed: 'Could not copy the link', backToTop: 'Back to top', author: 'By', reading: 'min read' },
    tr: { contents: 'Bu yazıda', share: 'Yazıyı paylaş', copied: 'Yazı bağlantısı kopyalandı', copyFailed: 'Bağlantı kopyalanamadı', backToTop: 'Başa dön', author: 'Yazar', reading: 'dk okuma' },
  } as const;
  const text = labels[typedLocale] ?? labels.fa;
  const dateLabel = typedLocale === 'fa' ? 'تاریخ انتشار برنامه‌ریزی‌شده' : typedLocale === 'tr' ? 'Planlanan yayın tarihi' : 'Scheduled publication';
  const { html: articleContent, headings } = prepareBlogContent(post.content);
  const readingMinutes = estimateReadingMinutes(post.content);

  return (
    <>
      <div className="bg-amber-50 px-4 py-3 text-center text-sm font-bold text-amber-900">
        {typedLocale === 'fa' ? 'پیش‌نمایش خصوصی؛ این مقاله هنوز منتشر نشده است.' : typedLocale === 'tr' ? 'Özel önizleme; bu yazı henüz yayımlanmadı.' : 'Private preview; this article is not published yet.'}
      </div>
      <article className="px-4 pb-14 pt-10 sm:px-6 sm:pt-14">
        <div className="mx-auto max-w-7xl">
          <div className="mt-2 grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-12">
            <div className="min-w-0">
              <header className="py-3 text-start">
                {post.category && <span className="inline-flex rounded-full bg-[#841474]/10 px-4 py-2 text-sm font-bold text-[#841474]">{post.category.name}</span>}
                <h1 className="mt-5 max-w-5xl text-3xl font-black leading-[1.55] text-gray-950 sm:text-4xl lg:text-5xl">{post.title}</h1>
                {post.summary && <p className="mt-4 max-w-4xl text-lg leading-9 text-gray-600">{post.summary}</p>}
                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-500">
                  {post.author_name && <span className="font-bold text-gray-700">{text.author}: {post.author_name}</span>}
                  {post.author_name && <span aria-hidden="true" className="text-gray-300">·</span>}
                  <span>{dateLabel}: {new Intl.DateTimeFormat(dateLocale, { dateStyle: 'long', timeStyle: 'short' }).format(new Date(post.published_at))}</span>
                  <span aria-hidden="true" className="text-gray-300">·</span>
                  <span>{readingMinutes} {text.reading}</span>
                </div>
              </header>
              <BlogArticleTools labels={text} showShare={false} />
              {post.image && (
                <div className="mb-8 aspect-[16/9] max-h-[620px] overflow-hidden rounded-3xl bg-gray-100 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.image} alt={post.image_alt || post.title} className="h-full w-full object-cover" />
                </div>
              )}
              {headings.length >= 2 && (
                <details className="blog-toc-mobile mb-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm lg:hidden">
                  <summary className="cursor-pointer font-black text-gray-900">{text.contents}</summary>
                  <div className="mt-3"><BlogArticleTableOfContents headings={headings} label={text.contents} /></div>
                </details>
              )}
              <div id="blog-article-content" className="blog-content text-base leading-9 text-gray-700 sm:text-lg" dangerouslySetInnerHTML={{ __html: articleContent }} />
              {!!post.tags.length && <div className="mt-10 flex flex-wrap gap-2 border-t border-gray-200 pt-6">{post.tags.map((tag) => <span key={tag.id} className="rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-600">#{tag.name}</span>)}</div>}
            </div>
            {headings.length >= 2 && (
              <aside className="blog-toc-desktop sticky top-24 hidden self-start rounded-2xl border border-gray-200 bg-white p-4 shadow-sm lg:block">
                <BlogArticleTableOfContents headings={headings} label={text.contents} />
              </aside>
            )}
          </div>
        </div>
      </article>
    </>
  );
}
