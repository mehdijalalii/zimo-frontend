import Link from 'next/link';
import type { BlogPost } from '@/lib/api';
import type { Locale } from '@/i18n/config';
import BlogArticleTools, { BlogArticleTableOfContents } from '@/components/blog/BlogArticleTools';
import BlogPostCard from '@/components/blog/BlogPostCard';
import type { BlogHeading } from '@/lib/blog-content';

interface BlogArticlePresentationProps {
  locale: Locale;
  title: string;
  summary: string | null;
  category: string | null;
  authorName: string | null;
  authorUrl: string | null;
  publishedAtLabel: string;
  publishedAtDateTime: string;
  updatedAtLabel?: string;
  updatedAtDateTime?: string;
  image: string | null;
  imageAlt: string | null;
  tags: BlogPost['tags'];
  content: string;
  headings: BlogHeading[];
  readingMinutes: number;
  preview?: boolean;
  previewNotice?: string;
  backLabel?: string;
  relatedTitle?: string;
  relatedPosts?: BlogPost[];
  labels: {
    contents: string;
    share: string;
    copied: string;
    copyFailed: string;
    backToTop: string;
    author: string;
    reading: string;
  };
}

function blogPath(locale: Locale): string {
  return locale === 'fa' ? '/blog' : `/${locale}/blog`;
}

export default function BlogArticlePresentation({
  locale,
  title,
  summary,
  category,
  authorName,
  authorUrl,
  publishedAtLabel,
  publishedAtDateTime,
  updatedAtLabel,
  updatedAtDateTime,
  image,
  imageAlt,
  tags,
  content,
  headings,
  readingMinutes,
  preview = false,
  previewNotice,
  backLabel,
  relatedTitle,
  relatedPosts = [],
  labels,
}: BlogArticlePresentationProps) {
  const direction = locale === 'fa' ? 'rtl' : 'ltr';

  return (
    <>
      {previewNotice && <div className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm font-bold text-amber-900">{previewNotice}</div>}

      <section className="blog-article-hero px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-10">
        <div className="mx-auto max-w-5xl">
          {backLabel && (
            <div className="mb-5 flex justify-end">
              <Link href={blogPath(locale)} className="inline-flex min-h-9 items-center rounded-full border border-gray-200 bg-white/80 px-4 text-xs font-bold text-gray-600 transition hover:border-[#841474]/30 hover:text-[#841474]">
                {backLabel} <span aria-hidden="true" className="ms-2">←</span>
              </Link>
            </div>
          )}

          <header className="mx-auto max-w-4xl text-center">
            {image && (
              <div className="mx-auto mb-7 aspect-[16/9] max-h-[430px] overflow-hidden rounded-2xl bg-gray-100 shadow-[0_18px_45px_rgba(40,30,20,0.12)] sm:rounded-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt={imageAlt || title} className="h-full w-full object-cover" />
              </div>
            )}
            {category && <span className="inline-flex rounded-full bg-[#841474]/[0.08] px-4 py-1.5 text-xs font-extrabold text-[#841474]">{category}</span>}
            <h1 className="mx-auto mt-4 max-w-4xl text-3xl font-black leading-[1.45] tracking-tight text-gray-950 sm:text-4xl lg:text-[2.75rem]">{title}</h1>
            {summary && <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-gray-600 sm:text-lg sm:leading-9">{summary}</p>}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-gray-500 sm:text-sm" dir={direction}>
              {authorName && <span className="font-bold text-gray-700">{labels.author}: {authorUrl ? <Link href={authorUrl} className="hover:text-[#841474]">{authorName}</Link> : authorName}</span>}
              {authorName && <span aria-hidden="true" className="text-gray-300">·</span>}
              <time dateTime={publishedAtDateTime}>{publishedAtLabel}</time>
              {updatedAtLabel && <><span aria-hidden="true" className="text-gray-300">·</span><time dateTime={updatedAtDateTime}>{updatedAtLabel}</time></>}
              <span aria-hidden="true" className="text-gray-300">·</span>
              <span>{readingMinutes} {labels.reading}</span>
            </div>
          </header>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-white px-4 py-8 sm:px-6 sm:py-12">
        <div className="blog-article-layout mx-auto grid max-w-6xl grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-8">
          <article className="min-w-0" dir={direction}>
            <BlogArticleTools labels={labels} showShare={!preview} />

            {headings.length >= 2 && (
              <details className="blog-toc-mobile mb-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm lg:hidden">
                <summary className="cursor-pointer font-black text-gray-900">{labels.contents}</summary>
                <div className="mt-3"><BlogArticleTableOfContents headings={headings} label={labels.contents} /></div>
              </details>
            )}

            <div className="blog-article-card rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_4px_24px_rgba(17,24,39,0.035)] sm:rounded-3xl sm:p-8 lg:p-10">
              <div id="blog-article-content" className="blog-content text-base leading-9 text-gray-700 sm:text-lg" dangerouslySetInnerHTML={{ __html: content }} />
              {!!tags.length && <div className="mt-10 flex flex-wrap gap-2 border-t border-gray-100 pt-6">{tags.map((tag) => <span key={tag.id} className="rounded-full bg-gray-50 px-3 py-1.5 text-sm text-gray-600">#{tag.name}</span>)}</div>}
            </div>
          </article>

          {headings.length >= 2 && (
            <aside className="blog-toc-desktop sticky top-24 hidden self-start rounded-xl border border-gray-200 bg-white p-4 shadow-sm lg:block" dir={direction}>
              <BlogArticleTableOfContents headings={headings} label={labels.contents} />
            </aside>
          )}
        </div>
      </section>

      {!preview && relatedPosts.length > 0 && relatedTitle && (
        <section className="border-t border-gray-100 bg-[#faf9f7] px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-7 text-2xl font-black text-gray-900">{relatedTitle}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post) => <BlogPostCard key={post.id} post={post} locale={locale} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
