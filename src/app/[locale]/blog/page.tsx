import type { Metadata } from 'next';
import Link from 'next/link';
import { getBlogCategories, getBlogPosts } from '@/lib/api';
import { pageMetadata, pageUrl } from '@/lib/seo';
import { getLocalizedPathname } from '@/i18n/paths';
import type { Locale } from '@/i18n/config';
import BlogPostCard from '@/components/blog/BlogPostCard';

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; page?: string }>;
};

const copy = {
  fa: { title: 'مجله زیمو', description: 'راهنماها و ایده‌هایی برای مدیریت بهتر سالن زیبایی و رشد کسب‌وکار شما.', kicker: 'دانش برای رشد سالن شما', all: 'همه مقاله‌ها', empty: 'هنوز مقاله‌ای منتشر نشده است.', previous: 'قبلی', next: 'بعدی' },
  en: { title: 'Zimo Blog', description: 'Guides and ideas for better beauty salon management and business growth.', kicker: 'Ideas for your salon', all: 'All articles', empty: 'No articles have been published yet.', previous: 'Previous', next: 'Next' },
  tr: { title: 'Zimo Blog', description: 'Güzellik salonunuzu daha iyi yönetmek ve işinizi büyütmek için rehberler ve fikirler.', kicker: 'Salonunuz için fikirler', all: 'Tüm yazılar', empty: 'Henüz bir yazı yayımlanmadı.', previous: 'Önceki', next: 'Sonraki' },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const text = copy[typedLocale] ?? copy.fa;
  const metadata = pageMetadata(typedLocale, '/blog', { title: text.title, description: text.description });
  metadata.alternates = { canonical: pageUrl(typedLocale, '/blog') };
  return metadata;
}

export default async function BlogIndexPage({ params, searchParams }: PageProps) {
  const [{ locale }, query] = await Promise.all([params, searchParams]);
  const typedLocale = locale as Locale;
  const text = copy[typedLocale] ?? copy.fa;
  const category = query.category || undefined;
  const currentPage = Math.max(1, Number(query.page) || 1);

  const [categories, result] = await Promise.all([
    getBlogCategories(typedLocale).catch(() => []),
    getBlogPosts({ locale: typedLocale, category, page: currentPage }).catch(() => null),
  ]);
  const posts = result?.data ?? [];
  const meta = result?.meta;
  const basePath = getLocalizedPathname('/blog', typedLocale);

  return (
    <>
      <section className="bg-gradient-to-b from-[#841474]/[0.07] to-white px-4 pb-14 pt-20 sm:pt-28">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-4 text-sm font-black tracking-wide text-[#841474]">{text.kicker}</p>
          <h1 className="text-4xl font-black text-gray-950 sm:text-5xl">{text.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-600">{text.description}</p>
        </div>
      </section>
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 flex flex-wrap justify-center gap-2">
            <Link href={basePath} className={`rounded-full px-4 py-2 text-sm font-bold ${!category ? 'bg-[#841474] text-white' : 'bg-gray-100 text-gray-600 hover:bg-[#841474]/10 hover:text-[#841474]'}`}>{text.all}</Link>
            {categories.map((item) => (
              <Link key={item.id} href={`${basePath}?category=${encodeURIComponent(item.slug)}`} className={`rounded-full px-4 py-2 text-sm font-bold ${category === item.slug ? 'bg-[#841474] text-white' : 'bg-gray-100 text-gray-600 hover:bg-[#841474]/10 hover:text-[#841474]'}`}>
                {item.name}
              </Link>
            ))}
          </div>

          {posts.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => <BlogPostCard key={post.id} post={post} locale={typedLocale} />)}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-gray-200 px-6 py-20 text-center text-gray-500">{text.empty}</div>
          )}

          {meta && meta.last_page > 1 && (
            <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-3">
              {currentPage > 1 && <Link href={`${basePath}?${new URLSearchParams({ ...(category ? { category } : {}), page: String(currentPage - 1) })}`} className="rounded-full border border-gray-200 px-4 py-2 text-sm font-bold text-gray-700">{text.previous}</Link>}
              <span className="text-sm text-gray-500">{currentPage} / {meta.last_page}</span>
              {currentPage < meta.last_page && <Link href={`${basePath}?${new URLSearchParams({ ...(category ? { category } : {}), page: String(currentPage + 1) })}`} className="rounded-full border border-gray-200 px-4 py-2 text-sm font-bold text-gray-700">{text.next}</Link>}
            </nav>
          )}
        </div>
      </section>
    </>
  );
}
