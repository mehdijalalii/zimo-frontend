import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '@/lib/api';
import { pageMetadata, pageUrl } from '@/lib/seo';
import type { Locale } from '@/i18n/config';
import BlogArticlePresentation from '@/components/blog/BlogArticlePresentation';
import { estimateReadingMinutes, prepareBlogContent } from '@/lib/blog-content';

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export const revalidate = false;

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const posts = await getBlogPosts({ locale: params.locale as Locale }).catch(() => null);
  return (posts?.data ?? []).map((post) => ({ slug: post.slug }));
}

const labels = {
  fa: { back: 'بازگشت به مجله', related: 'مقاله‌های مرتبط', contents: 'در این مقاله', share: 'اشتراک‌گذاری', copied: 'لینک مقاله کپی شد', copyFailed: 'کپی لینک انجام نشد', backToTop: 'بازگشت به بالای صفحه', author: 'نویسنده', updated: 'آخرین به‌روزرسانی', reading: 'دقیقه مطالعه' },
  en: { back: 'Back to the blog', related: 'Related articles', contents: 'In this article', share: 'Share article', copied: 'Article link copied', copyFailed: 'Could not copy the link', backToTop: 'Back to top', author: 'By', updated: 'Updated', reading: 'min read' },
  tr: { back: 'Bloga dön', related: 'İlgili yazılar', contents: 'Bu yazıda', share: 'Yazıyı paylaş', copied: 'Yazı bağlantısı kopyalandı', copyFailed: 'Bağlantı kopyalanamadı', backToTop: 'Başa dön', author: 'Yazar', updated: 'Son güncelleme', reading: 'dk okuma' },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  const post = await getBlogPost(slug, typedLocale);
  if (!post) return { title: 'مقاله پیدا نشد | زیمو', robots: { index: false, follow: true } };

  const metadata = pageMetadata(typedLocale, `/blog/${post.slug}`, {
    title: post.seo_title || post.title,
    description: post.seo_description || post.summary,
  });
  metadata.openGraph = {
    ...metadata.openGraph,
    type: 'article',
    url: pageUrl(typedLocale, `/blog/${post.slug}`),
    title: post.seo_title || post.title,
    description: post.seo_description || post.summary,
    images: post.image ? [{ url: post.image, alt: post.image_alt || post.title }] : [],
  };
  metadata.twitter = {
    card: 'summary_large_image',
    title: post.seo_title || post.title,
    description: post.seo_description || post.summary,
    images: post.image ? [post.image] : [],
  };
  metadata.alternates = { canonical: pageUrl(typedLocale, `/blog/${post.slug}`) };
  return metadata;
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  const text = labels[typedLocale] ?? labels.fa;
  const post = await getBlogPost(slug, typedLocale);
  if (!post) notFound();
  const { html: articleContent, headings } = prepareBlogContent(post.content);
  const readingMinutes = estimateReadingMinutes(post.content);

  const relatedPosts = await getBlogPosts({ locale: typedLocale, category: post.category?.slug, page: 1 }).catch(() => null);
  const related = (relatedPosts?.data ?? []).filter((item) => item.id !== post.id).slice(0, 3);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seo_description || post.summary,
    image: post.image ? [post.image] : undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    inLanguage: typedLocale,
    author: post.author_name ? {
      '@type': 'Person',
      name: post.author_name,
      ...(post.author_url ? { url: post.author_url } : {}),
    } : undefined,
    mainEntityOfPage: pageUrl(typedLocale, `/blog/${post.slug}`),
    publisher: { '@type': 'Organization', name: 'Zimo', url: 'https://zimo.beauty' },
  };
  const formatDate = (date: string) => new Intl.DateTimeFormat(typedLocale === 'fa' ? 'fa-IR' : typedLocale === 'tr' ? 'tr-TR' : 'en-US', { dateStyle: 'long' }).format(new Date(date));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c') }} />
      <BlogArticlePresentation
        locale={typedLocale}
        title={post.title}
        summary={post.summary}
        category={post.category?.name ?? null}
        authorName={post.author_name}
        authorUrl={post.author_url}
        publishedAtLabel={formatDate(post.published_at)}
        publishedAtDateTime={post.published_at}
        updatedAtLabel={new Date(post.updated_at).getTime() > new Date(post.published_at).getTime() ? `${text.updated}: ${formatDate(post.updated_at)}` : undefined}
        updatedAtDateTime={post.updated_at}
        image={post.image}
        imageAlt={post.image_alt}
        tags={post.tags}
        content={articleContent}
        headings={headings}
        readingMinutes={readingMinutes}
        backLabel={text.back}
        relatedTitle={text.related}
        relatedPosts={related}
        labels={text}
      />
    </>
  );
}
