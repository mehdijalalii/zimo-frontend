import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '@/lib/api';
import { pageMetadata, pageUrl } from '@/lib/seo';
import type { Locale } from '@/i18n/config';
import BlogPostCard from '@/components/blog/BlogPostCard';
import BlogArticleTools, { BlogArticleTableOfContents } from '@/components/blog/BlogArticleTools';
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
  const dateLocale = typedLocale === 'fa' ? 'fa-IR' : typedLocale === 'tr' ? 'tr-TR' : 'en-US';
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c') }} />
      <article className="px-4 pb-14 pt-10 sm:px-6 sm:pt-14">
        <div className="mx-auto max-w-7xl">
          <Link href={`/${typedLocale === 'fa' ? '' : `${typedLocale}/`}blog`} className="text-sm font-bold text-[#841474] hover:underline">← {text.back}</Link>
          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-12">
            <div className="min-w-0">
              <header className="py-3 text-start">
                {post.category && <span className="inline-flex rounded-full bg-[#841474]/10 px-4 py-2 text-sm font-bold text-[#841474]">{post.category.name}</span>}
                <h1 className="mt-5 max-w-5xl text-3xl font-black leading-[1.55] text-gray-950 sm:text-4xl lg:text-5xl">{post.title}</h1>
                <p className="mt-4 max-w-4xl text-lg leading-9 text-gray-600">{post.summary}</p>
                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-500">
                  {post.author_name && <span className="font-bold text-gray-700">{text.author}: {post.author_url ? <Link href={post.author_url} className="hover:text-[#841474]">{post.author_name}</Link> : post.author_name}</span>}
                  {post.author_name && <span aria-hidden="true" className="text-gray-300">·</span>}
                  <time dateTime={post.published_at}>{new Intl.DateTimeFormat(dateLocale, { dateStyle: 'long' }).format(new Date(post.published_at))}</time>
                  <span aria-hidden="true" className="text-gray-300">·</span>
                  <span>{readingMinutes} {text.reading}</span>
                  {new Date(post.updated_at).getTime() > new Date(post.published_at).getTime() && (
                    <>
                      <span aria-hidden="true" className="text-gray-300">·</span>
                      <span>{text.updated}: {new Intl.DateTimeFormat(dateLocale, { dateStyle: 'long' }).format(new Date(post.updated_at))}</span>
                    </>
                  )}
                </div>
              </header>
              <BlogArticleTools labels={text} />
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
      {related.length > 0 && <section className="bg-gray-50 px-4 py-14"><div className="mx-auto max-w-6xl"><h2 className="mb-7 text-2xl font-black text-gray-900">{text.related}</h2><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((item) => <BlogPostCard key={item.id} post={item} locale={typedLocale} />)}</div></div></section>}
    </>
  );
}
