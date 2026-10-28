import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '@/lib/api';
import { pageMetadata, pageUrl } from '@/lib/seo';
import type { Locale } from '@/i18n/config';
import BlogPostCard from '@/components/blog/BlogPostCard';

type PageProps = { params: Promise<{ locale: string; slug: string }> };

const labels = {
  fa: { back: 'بازگشت به مجله', related: 'مقاله‌های مرتبط', article: 'مقاله' },
  en: { back: 'Back to the blog', related: 'Related articles', article: 'Article' },
  tr: { back: 'Bloga dön', related: 'İlgili yazılar', article: 'Yazı' },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  const post = await getBlogPost(slug);
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
    images: post.image ? [{ url: post.image, alt: post.title }] : [],
  };
  metadata.twitter = {
    card: 'summary_large_image',
    title: post.seo_title || post.title,
    description: post.seo_description || post.summary,
    images: post.image ? [post.image] : [],
  };
  return metadata;
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  const text = labels[typedLocale] ?? labels.fa;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const relatedPosts = await getBlogPosts({ category: post.category?.slug, page: 1 }).catch(() => null);
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
    mainEntityOfPage: pageUrl(typedLocale, `/blog/${post.slug}`),
    publisher: { '@type': 'Organization', name: 'Zimo', url: 'https://zimo.beauty' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c') }} />
      <article className="px-4 pb-14 pt-12 sm:pt-16">
        <div className="mx-auto max-w-4xl">
          <Link href={`/${typedLocale === 'fa' ? '' : `${typedLocale}/`}blog`} className="text-sm font-bold text-[#841474] hover:underline">← {text.back}</Link>
          <header className="py-8 text-center">
            {post.category && <span className="rounded-full bg-[#841474]/10 px-4 py-2 text-sm font-bold text-[#841474]">{post.category.name}</span>}
            <h1 className="mt-5 text-3xl font-black leading-relaxed text-gray-950 sm:text-5xl">{post.title}</h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-gray-600">{post.summary}</p>
            <time dateTime={post.published_at} className="mt-5 block text-sm text-gray-500">
              {new Intl.DateTimeFormat(dateLocale, { dateStyle: 'long' }).format(new Date(post.published_at))}
            </time>
          </header>
          {post.image && (
            <div className="mb-10 overflow-hidden rounded-3xl bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.image} alt={post.title} className="max-h-[560px] w-full object-cover" />
            </div>
          )}
          <div className="blog-content mx-auto max-w-3xl text-base leading-9 text-gray-700" dangerouslySetInnerHTML={{ __html: post.content }} />
          {!!post.tags.length && <div className="mx-auto mt-10 flex max-w-3xl flex-wrap gap-2">{post.tags.map((tag) => <span key={tag.id} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">#{tag.name}</span>)}</div>}
        </div>
      </article>
      {related.length > 0 && <section className="bg-gray-50 px-4 py-14"><div className="mx-auto max-w-6xl"><h2 className="mb-7 text-2xl font-black text-gray-900">{text.related}</h2><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((item) => <BlogPostCard key={item.id} post={item} locale={typedLocale} />)}</div></div></section>}
    </>
  );
}
