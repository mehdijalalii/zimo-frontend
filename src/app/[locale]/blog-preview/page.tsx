import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPreview } from '@/lib/api';
import type { Locale } from '@/i18n/config';
import BlogArticlePresentation from '@/components/blog/BlogArticlePresentation';
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
    fa: { contents: 'در این مقاله', breadcrumbLabel: 'مسیر راهنما', home: 'خانه', blog: 'مجله', share: 'اشتراک‌گذاری', copied: 'لینک مقاله کپی شد', copyFailed: 'کپی لینک انجام نشد', backToTop: 'بازگشت به بالای صفحه', author: 'نویسنده', reading: 'دقیقه مطالعه' },
    en: { contents: 'In this article', breadcrumbLabel: 'Breadcrumb', home: 'Home', blog: 'Blog', share: 'Share article', copied: 'Article link copied', copyFailed: 'Could not copy the link', backToTop: 'Back to top', author: 'By', reading: 'min read' },
    tr: { contents: 'Bu yazıda', breadcrumbLabel: 'İçerik haritası', home: 'Ana sayfa', blog: 'Blog', share: 'Yazıyı paylaş', copied: 'Yazı bağlantısı kopyalandı', copyFailed: 'Bağlantı kopyalanamadı', backToTop: 'Başa dön', author: 'Yazar', reading: 'dk okuma' },
  } as const;
  const text = labels[typedLocale] ?? labels.fa;
  const dateLabel = typedLocale === 'fa' ? 'تاریخ انتشار برنامه‌ریزی‌شده' : typedLocale === 'tr' ? 'Planlanan yayın tarihi' : 'Scheduled publication';
  const { html: articleContent, headings } = prepareBlogContent(post.content);
  const readingMinutes = estimateReadingMinutes(post.content);
  const publishedAtLabel = `${dateLabel}: ${new Intl.DateTimeFormat(dateLocale, { dateStyle: 'long', timeStyle: 'short' }).format(new Date(post.published_at))}`;
  const previewNotice = typedLocale === 'fa' ? 'پیش‌نمایش خصوصی؛ این مقاله هنوز منتشر نشده است.' : typedLocale === 'tr' ? 'Özel önizleme; bu yazı henüz yayımlanmadı.' : 'Private preview; this article is not published yet.';

  return (
    <BlogArticlePresentation
      locale={typedLocale}
      title={post.title}
      summary={post.summary}
      category={post.category?.name ?? null}
      authorName={post.author_name}
      authorUrl={post.author_url}
      publishedAtLabel={publishedAtLabel}
      publishedAtDateTime={post.published_at}
      image={post.image}
      imageAlt={post.image_alt}
      tags={post.tags}
      content={articleContent}
      headings={headings}
      readingMinutes={readingMinutes}
      preview
      previewNotice={previewNotice}
      labels={text}
    />
  );
}
